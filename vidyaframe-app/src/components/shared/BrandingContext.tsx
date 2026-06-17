'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface BrandingProfile {
  userName: string;
  userEmail: string;
  schoolName: string;
  schoolLogo: string | null; // Base64 data URL
  slogan: string;
  contactNumber: string;
  themeColor: string;
}

interface BrandingContextType {
  profile: BrandingProfile | null;
  isLoaded: boolean;
  isModalOpen: boolean;
  saveProfile: (newProfile: BrandingProfile) => void;
  clearProfile: () => void;
  openBrandingModal: () => void;
  closeBrandingModal: () => void;
}

const BrandingContext = createContext<BrandingContextType>({
  profile: null,
  isLoaded: false,
  isModalOpen: false,
  saveProfile: () => {},
  clearProfile: () => {},
  openBrandingModal: () => {},
  closeBrandingModal: () => {},
});

export function useBranding() {
  return useContext(BrandingContext);
}

const STORAGE_KEY = 'vidyaframe-branding-profile';

export function BrandingProvider({ children }: { children: ReactNode }) {
  const [profile, setProfile] = useState<BrandingProfile | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Load profile from localStorage on client side mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setProfile(JSON.parse(stored));
      }
    } catch (error) {
      console.error('Failed to load branding profile:', error);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  const saveProfile = (newProfile: BrandingProfile) => {
    setProfile(newProfile);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newProfile));
      // Dispatch storage event to notify other components if any
      window.dispatchEvent(new Event('storage'));
    } catch (error) {
      console.error('Failed to save branding profile:', error);
    }
  };

  const clearProfile = () => {
    setProfile(null);
    try {
      localStorage.removeItem(STORAGE_KEY);
      window.dispatchEvent(new Event('storage'));
    } catch (error) {
      console.error('Failed to clear branding profile:', error);
    }
  };

  const openBrandingModal = () => setIsModalOpen(true);
  const closeBrandingModal = () => setIsModalOpen(false);

  return (
    <BrandingContext.Provider
      value={{
        profile,
        isLoaded,
        isModalOpen,
        saveProfile,
        clearProfile,
        openBrandingModal,
        closeBrandingModal,
      }}
    >
      {children}
    </BrandingContext.Provider>
  );
}

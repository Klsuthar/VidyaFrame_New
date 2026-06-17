'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useBranding, BrandingProfile } from './BrandingContext';

export function BrandingModal() {
  const { profile, isModalOpen, saveProfile, closeBrandingModal } = useBranding();
  
  const [activeTab, setActiveTab] = useState<'personal' | 'school'>('personal');
  
  // Form States
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [schoolName, setSchoolName] = useState('');
  const [slogan, setSlogan] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [schoolLogo, setSchoolLogo] = useState<string | null>(null);
  const [themeColor, setThemeColor] = useState('#0cc87d');
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [logoLoading, setLogoLoading] = useState(false);

  // Sync state with profile when modal opens or profile changes
  useEffect(() => {
    if (isModalOpen) {
      if (profile) {
        setUserName(profile.userName || '');
        setUserEmail(profile.userEmail || '');
        setSchoolName(profile.schoolName || '');
        setSlogan(profile.slogan || '');
        setContactNumber(profile.contactNumber || '');
        setSchoolLogo(profile.schoolLogo || null);
        setThemeColor(profile.themeColor || '#0cc87d');
      } else {
        // Clear forms if no profile exists
        setUserName('');
        setUserEmail('');
        setSchoolName('');
        setSlogan('');
        setContactNumber('');
        setSchoolLogo(null);
        setThemeColor('#0cc87d');
      }
      setActiveTab('personal'); // default tab
    }
  }, [isModalOpen, profile]);

  if (!isModalOpen) return null;

  // Compress logo before saving
  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setLogoLoading(true);
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        // Use canvas to resize image
        const canvas = document.createElement('canvas');
        const MAX_WIDTH = 180;
        const MAX_HEIGHT = 180;
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > MAX_WIDTH) {
            height *= MAX_WIDTH / width;
            width = MAX_WIDTH;
          }
        } else {
          if (height > MAX_HEIGHT) {
            width *= MAX_HEIGHT / height;
            height = MAX_HEIGHT;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0, width, height);
          const compressedBase64 = canvas.toDataURL('image/jpeg', 0.85);
          setSchoolLogo(compressedBase64);
        }
        setLogoLoading(false);
      };
      img.src = event.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const newProfile: BrandingProfile = {
      userName,
      userEmail,
      schoolName,
      schoolLogo,
      slogan: slogan || 'Inspiring Excellence',
      contactNumber,
      themeColor,
    };
    saveProfile(newProfile);
    closeBrandingModal();
  };

  const colorSwatches = [
    { name: 'Emerald Green', hex: '#0cc87d' },
    { name: 'Cyan Blue', hex: '#07a3d1' },
    { name: 'Indigo Blue', hex: '#1d65ff' },
    { name: 'Royal Purple', hex: '#9333ea' },
    { name: 'Ruby Red', hex: '#ef4444' },
    { name: 'Sunset Orange', hex: '#f97316' },
  ];

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-fade-in">
      <div 
        className="w-full max-w-lg bg-[var(--card)] border border-[var(--border)] rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh] animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-5 border-b border-[var(--border)] flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-[var(--foreground)]" style={{ fontFamily: 'var(--font-outfit)' }}>
              👤 Profile & Branding
            </h2>
            <p className="text-xs text-[var(--muted-foreground)] mt-1">Set up details for automated print templates</p>
          </div>
          <button 
            onClick={closeBrandingModal}
            className="rounded-xl p-2 hover:bg-[var(--muted)] text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Tab Selection */}
        <div className="flex border-b border-[var(--border)] bg-[var(--muted)]/30 p-1.5">
          <button
            onClick={() => setActiveTab('personal')}
            className={`flex-1 py-2.5 text-xs font-semibold rounded-xl transition-all flex items-center justify-center gap-2 ${
              activeTab === 'personal'
                ? 'bg-[var(--card)] text-[var(--primary)] shadow-sm border border-[var(--border)]'
                : 'text-[var(--muted-foreground)] hover:text-[var(--foreground)]'
            }`}
          >
            <span>👤</span> Personal Profile
          </button>
          <button
            onClick={() => setActiveTab('school')}
            className={`flex-1 py-2.5 text-xs font-semibold rounded-xl transition-all flex items-center justify-center gap-2 ${
              activeTab === 'school'
                ? 'bg-[var(--card)] text-[var(--primary)] shadow-sm border border-[var(--border)]'
                : 'text-[var(--muted-foreground)] hover:text-[var(--foreground)]'
            }`}
          >
            <span>🏫</span> School Branding
          </button>
        </div>

        {/* Form Content */}
        <form onSubmit={handleSave} className="flex-1 overflow-y-auto p-6 space-y-5">
          {activeTab === 'personal' && (
            <div className="space-y-4 animate-fade-in">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-[var(--muted-foreground)]">
                  Your Full Name
                </label>
                <input
                  type="text"
                  required
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  placeholder="Rahul Sharma"
                  className="w-full text-sm rounded-xl border border-[var(--border)] bg-[var(--muted)]/50 px-4 py-3 outline-none focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/20 transition-all font-medium"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-[var(--muted-foreground)]">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  value={userEmail}
                  onChange={(e) => setUserEmail(e.target.value)}
                  placeholder="rahul@example.com"
                  className="w-full text-sm rounded-xl border border-[var(--border)] bg-[var(--muted)]/50 px-4 py-3 outline-none focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/20 transition-all font-medium"
                />
              </div>
              
              <div className="p-4 rounded-2xl bg-gradient-to-r from-[#0cc87d]/5 to-[#07a3d1]/5 border border-[var(--primary)]/10 text-xs text-[var(--muted-foreground)] leading-relaxed">
                <span className="font-bold text-[var(--foreground)] block mb-1">Why set up a profile?</span>
                Your name and email will be used to personalize certificate creators, save download preferences, and track your dashboard worksheets.
              </div>
            </div>
          )}

          {activeTab === 'school' && (
            <div className="space-y-4 animate-fade-in">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-[var(--muted-foreground)]">
                  School Name
                </label>
                <input
                  type="text"
                  required
                  value={schoolName}
                  onChange={(e) => setSchoolName(e.target.value)}
                  placeholder="Delhi Public School, Dwarka"
                  className="w-full text-sm rounded-xl border border-[var(--border)] bg-[var(--muted)]/50 px-4 py-3 outline-none focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/20 transition-all font-medium"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-[var(--muted-foreground)]">
                    Slogan / Tagline
                  </label>
                  <input
                    type="text"
                    value={slogan}
                    onChange={(e) => setSlogan(e.target.value)}
                    placeholder="Inspiring Excellence"
                    className="w-full text-sm rounded-xl border border-[var(--border)] bg-[var(--muted)]/50 px-4 py-3 outline-none focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/20 transition-all font-medium"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-[var(--muted-foreground)]">
                    Contact Number
                  </label>
                  <input
                    type="text"
                    value={contactNumber}
                    onChange={(e) => setContactNumber(e.target.value)}
                    placeholder="+91 98765 43210"
                    className="w-full text-sm rounded-xl border border-[var(--border)] bg-[var(--muted)]/50 px-4 py-3 outline-none focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/20 transition-all font-medium"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-[var(--muted-foreground)] block">
                  School Logo Image
                </label>
                <div className="flex items-center gap-4">
                  <div className="h-16 w-16 rounded-xl border border-[var(--border)] bg-[var(--muted)]/50 flex items-center justify-center overflow-hidden shrink-0 shadow-inner">
                    {schoolLogo ? (
                      <img src={schoolLogo} alt="Logo preview" className="h-full w-full object-contain" />
                    ) : (
                      <span className="text-2xl">🏫</span>
                    )}
                  </div>
                  <div className="flex-1 space-y-1">
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="px-4 py-2 border border-[var(--border)] hover:bg-[var(--muted)] text-xs font-semibold rounded-xl transition-all flex items-center gap-1.5"
                    >
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-2-8l-4-4m0 0L8 8m4-4v12" />
                      </svg>
                      {logoLoading ? 'Processing...' : 'Upload Logo'}
                    </button>
                    <p className="text-[10px] text-[var(--muted-foreground)]">PNG or JPG. Automatic sizing.</p>
                  </div>
                  {schoolLogo && (
                    <button
                      type="button"
                      onClick={() => setSchoolLogo(null)}
                      className="text-xs text-red-500 hover:underline font-semibold"
                    >
                      Remove
                    </button>
                  )}
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleLogoChange}
                    accept="image/*"
                    className="hidden"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-[var(--muted-foreground)] block">
                  Theme Brand Color
                </label>
                <div className="flex flex-wrap gap-2.5">
                  {colorSwatches.map((color) => (
                    <button
                      key={color.hex}
                      type="button"
                      onClick={() => setThemeColor(color.hex)}
                      className={`h-8 w-8 rounded-full border-2 transition-all flex items-center justify-center ${
                        themeColor === color.hex ? 'scale-110 shadow-md' : 'scale-100 hover:scale-105'
                      }`}
                      style={{ backgroundColor: color.hex, borderColor: themeColor === color.hex ? 'var(--foreground)' : 'transparent' }}
                      title={color.name}
                    >
                      {themeColor === color.hex && (
                        <svg className="h-4.5 w-4.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Footer Actions */}
          <div className="pt-4 border-t border-[var(--border)] flex gap-3 justify-end">
            <button
              type="button"
              onClick={closeBrandingModal}
              className="px-5 py-2.5 border border-[var(--border)] hover:bg-[var(--muted)] text-sm font-semibold rounded-xl transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 bg-gradient-to-r from-[#0cc87d] via-[#07a3d1] to-[#1d65ff] text-white text-sm font-semibold rounded-xl shadow-md hover:shadow-lg transition-all"
            >
              Save Details
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ============================================
// VidyaFrame — Core TypeScript Interfaces
// ============================================

export type CategoryType = 'Chart' | 'Worksheet' | 'Certificate' | 'Poster';
export type ClassLevel = 'Nursery' | 'LKG' | 'UKG' | '1' | '2' | '3' | '4' | '5';
export type Priority = 'High' | 'Medium' | 'Low';

export interface Asset {
  id: number;
  title: string;
  slug: string;
  description: string;
  category: CategoryType;
  classLevel: ClassLevel;
  topic: string;
  tags: string[];
  suggestedImageTypes: string;
  priority: Priority;
  estimatedAssets: number;
  imagePreviewUrl: string;
  imageMasterUrl: string;
  downloads: number;
  views: number;
  createdAt: string;
  language?: string;
  hasRealMaster?: boolean;
}

export interface Category {
  id: string;
  name: CategoryType;
  slug: string;
  description: string;
  icon: string;
  count: number;
  gradient: string;
}

export interface Topic {
  id: string;
  name: string;
  slug: string;
  category: CategoryType;
  count: number;
}

export interface ClassInfo {
  level: ClassLevel;
  label: string;
  slug: string;
  gradient: string;
  icon: string;
  count: number;
}

export interface SearchResult {
  assets: Asset[];
  total: number;
  query: string;
  filters: SearchFilters;
}

export interface SearchFilters {
  category?: CategoryType;
  classLevel?: ClassLevel;
  topic?: string;
  sortBy?: 'relevance' | 'newest' | 'popular' | 'downloads';
}

export interface Testimonial {
  id: number;
  name: string;
  role: string;
  school: string;
  avatar: string;
  content: string;
  rating: number;
}

export interface FAQItem {
  id: number;
  question: string;
  answer: string;
}

export interface BrandProfile {
  id: string;
  schoolName: string;
  logoUrl: string;
  address: string;
  phone: string;
  themeColor: string;
}

export interface NavItem {
  label: string;
  href: string;
  icon?: string;
}

export interface BreadcrumbItem {
  label: string;
  href: string;
}

export interface StatsItem {
  label: string;
  value: string;
  suffix: string;
  icon: string;
}

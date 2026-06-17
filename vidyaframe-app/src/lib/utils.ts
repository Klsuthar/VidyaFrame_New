// ============================================
// VidyaFrame — Utility Functions
// ============================================

import { type ClassValue, clsx } from 'clsx';

/**
 * Merge Tailwind CSS classes with conflict resolution
 */
export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

/**
 * Format number with abbreviation (e.g., 1200 → 1.2K)
 */
export function formatNumber(num: number): string {
  if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
  if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
  return num.toString();
}

/**
 * Generate a slug from a string
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/**
 * Capitalize first letter
 */
export function capitalize(text: string): string {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

/**
 * Get category color gradient
 */
export function getCategoryGradient(category: string): string {
  const gradients: Record<string, string> = {
    Chart: 'from-teal-500 to-cyan-500',
    Worksheet: 'from-blue-500 to-indigo-500',
    Certificate: 'from-amber-500 to-orange-500',
    Poster: 'from-purple-500 to-pink-500',
  };
  return gradients[category] || 'from-gray-500 to-gray-600';
}

/**
 * Get class level gradient
 */
export function getClassGradient(level: string): string {
  const gradients: Record<string, string> = {
    Nursery: 'from-pink-400 to-rose-500',
    LKG: 'from-orange-400 to-amber-500',
    UKG: 'from-yellow-400 to-lime-500',
    '1': 'from-emerald-400 to-teal-500',
    '2': 'from-cyan-400 to-blue-500',
    '3': 'from-blue-400 to-indigo-500',
    '4': 'from-violet-400 to-purple-500',
    '5': 'from-fuchsia-400 to-pink-500',
  };
  return gradients[level] || 'from-gray-400 to-gray-500';
}

/**
 * Get class display label
 */
export function getClassLabel(level: string): string {
  const labels: Record<string, string> = {
    Nursery: 'Nursery',
    LKG: 'LKG',
    UKG: 'UKG',
    '1': 'Class 1',
    '2': 'Class 2',
    '3': 'Class 3',
    '4': 'Class 4',
    '5': 'Class 5',
  };
  return labels[level] || level;
}

/**
 * Debounce function for search
 */
export function debounce<T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

/**
 * Get category icon emoji
 */
export function getCategoryIcon(category: string): string {
  const icons: Record<string, string> = {
    Chart: '📊',
    Worksheet: '📝',
    Certificate: '🏆',
    Poster: '🖼️',
  };
  return icons[category] || '📄';
}

/**
 * Get priority badge color
 */
export function getPriorityColor(priority: string): string {
  const colors: Record<string, string> = {
    High: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
    Medium: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
    Low: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
  };
  return colors[priority] || 'bg-gray-100 text-gray-700';
}

/**
 * Generate placeholder image URL with gradient
 */
export function getPlaceholderImage(title: string, category: string): string {
  const colors: Record<string, { bg: string; text: string }> = {
    Chart: { bg: '0cc87d', text: 'ffffff' },
    Worksheet: { bg: '1d65ff', text: 'ffffff' },
    Certificate: { bg: 'f59e0b', text: 'ffffff' },
    Poster: { bg: 'a855f7', text: 'ffffff' },
  };
  const color = colors[category] || { bg: '6b7280', text: 'ffffff' };
  return `https://placehold.co/400x560/${color.bg}/${color.text}?text=${encodeURIComponent(title.substring(0, 30))}`;
}

/**
 * Truncate text with ellipsis
 */
export function truncate(text: string, length: number): string {
  if (text.length <= length) return text;
  return text.substring(0, length).trim() + '...';
}

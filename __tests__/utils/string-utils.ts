/**
 * 🔧 String utility functions for tests
 */

export const truncateUrl = (url?: string) => {
  if (!url) return 'undefined'
  return url.length > 20 ? url.substring(0, 20) + '...' : url
} 
/**
 * Simple utility function to merge class names
 * Useful for combining CSS classes with conditional logic
 */
export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes
    .filter((cls): cls is string => {
      return typeof cls === 'string' && cls.length > 0;
    })
    .join(' ');
}

import { describe, it, expect } from 'vitest';
import { cn } from './utils';

describe('cn utility', () => {
  it('merges class names correctly', () => {
    expect(cn('flex', 'items-center')).toBe('flex items-center');
  });

  it('handles conditional classes', () => {
    const isActive = true;
    const isError = false;
    expect(cn('base', isActive && 'active', isError && 'error')).toBe('base active');
  });

  it('handles tailwind conflicts with twMerge', () => {
    // tailwind-merge should resolve 'px-2 px-4' to 'px-4'
    expect(cn('px-2', 'px-4')).toBe('px-4');
  });

  it('handles undefined and null inputs', () => {
    expect(cn('base', undefined, null, 'suffix')).toBe('base suffix');
  });
});

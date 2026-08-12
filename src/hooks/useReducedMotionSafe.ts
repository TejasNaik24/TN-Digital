import { useReducedMotion } from 'motion/react';

/**
 * Motion's hook returns `boolean | null` (null before it has measured).
 * Everything downstream wants a plain boolean, and defaulting to "not reduced"
 * during that first tick matches what the user will see a frame later.
 */
export function useReducedMotionSafe(): boolean {
  return useReducedMotion() ?? false;
}

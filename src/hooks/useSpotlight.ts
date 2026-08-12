import { useCallback, useRef, type PointerEvent } from 'react';

/**
 * Tracks the cursor's position *within* an element and writes it to
 * `--spot-x` / `--spot-y`, so hover glows can bloom from where the pointer
 * actually is rather than from a fixed point.
 *
 * Writes straight to the style attribute — no state, no re-render per frame.
 */
export function useSpotlight<T extends HTMLElement>() {
  const ref = useRef<T>(null);

  const onPointerMove = useCallback((event: PointerEvent<T>) => {
    const element = ref.current;
    if (!element) return;
    const rect = element.getBoundingClientRect();
    element.style.setProperty('--spot-x', `${event.clientX - rect.left}px`);
    element.style.setProperty('--spot-y', `${event.clientY - rect.top}px`);
  }, []);

  return { ref, onPointerMove };
}

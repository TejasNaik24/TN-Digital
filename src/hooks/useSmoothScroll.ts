import { useEffect } from 'react';
import Lenis from 'lenis';
import { registerLenis } from '@/lib/scroll';

/**
 * Gentle inertial scrolling on desktop.
 *
 * Deliberately conservative: no touch syncing (native momentum is better than
 * anything we'd fake), and the whole thing is skipped under reduced motion.
 * Scrolling stays the browser's — nothing here hijacks or pins.
 */
export function useSmoothScroll(enabled: boolean): void {
  useEffect(() => {
    if (!enabled) {
      registerLenis(null);
      return;
    }

    const lenis = new Lenis({
      lerp: 0.1,
      wheelMultiplier: 1,
      smoothWheel: true,
      syncTouch: false,
    });
    registerLenis(lenis);

    let frame = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(frame);
      registerLenis(null);
      lenis.destroy();
    };
  }, [enabled]);
}

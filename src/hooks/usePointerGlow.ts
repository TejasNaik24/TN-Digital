import { useEffect } from 'react';

/**
 * Writes a smoothed cursor position to `--mx` / `--my` on the root element.
 *
 * The glow trails the pointer rather than snapping to it — that lag is the
 * whole effect. Two things keep it cheap: the loop only runs while the cursor
 * is actually travelling (it exits as soon as it catches up), and it stops
 * entirely when the tab is hidden. Nothing runs permanently in the background.
 */
export function usePointerGlow(enabled: boolean): void {
  useEffect(() => {
    if (!enabled) return;

    const root = document.documentElement;
    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight * 0.3;
    let x = targetX;
    let y = targetY;
    let frame = 0;
    let running = false;

    const write = () => {
      root.style.setProperty('--mx', `${x.toFixed(1)}px`);
      root.style.setProperty('--my', `${y.toFixed(1)}px`);
    };

    const tick = () => {
      const dx = targetX - x;
      const dy = targetY - y;
      x += dx * 0.075;
      y += dy * 0.075;
      write();

      // Arrived: park the loop instead of burning frames on sub-pixel drift.
      if (Math.abs(dx) < 0.4 && Math.abs(dy) < 0.4) {
        running = false;
        return;
      }
      frame = requestAnimationFrame(tick);
    };

    const start = () => {
      if (running || document.hidden) return;
      running = true;
      frame = requestAnimationFrame(tick);
    };

    const onPointerMove = (event: PointerEvent) => {
      targetX = event.clientX;
      targetY = event.clientY;
      start();
    };

    const onVisibilityChange = () => {
      if (document.hidden) {
        cancelAnimationFrame(frame);
        running = false;
      }
    };

    write();
    window.addEventListener('pointermove', onPointerMove, { passive: true });
    document.addEventListener('visibilitychange', onVisibilityChange);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('pointermove', onPointerMove);
      document.removeEventListener('visibilitychange', onVisibilityChange);
    };
  }, [enabled]);
}

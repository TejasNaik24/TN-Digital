import { animate } from 'motion/react';

/**
 * Anchor navigation.
 *
 * This used to run through Lenis, which was a mistake for two reasons:
 *
 *  1. Lenis owns the scroll position, so a programmatic jump had to fight its
 *     rAF loop and whatever trailing wheel momentum was still queued. Every
 *     workaround (immediate, stop/start, reset) traded one artefact for
 *     another.
 *  2. Its default `scrollTo` easing is a lerp with no duration, which converges
 *     asymptotically — it crawls the last few hundred pixels, reading as lag.
 *
 * Now the scroll is a plain Motion animation over `window.scrollY`. It starts
 * on the same frame as the click, runs on one known curve, and the user can
 * take back control at any point by scrolling.
 */

/** Clears the sticky header. Must stay in sync with `scroll-mt-24` on Section. */
const HEADER_OFFSET = 84;

type Controls = { stop: () => void };

let active: Controls | null = null;

function prefersReducedMotion(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/** Any real scroll input cancels the animation — a programmatic scroll must
 *  never feel like it is holding the page hostage. */
const INTERRUPTS = ['wheel', 'touchstart'] as const;

function detach(): void {
  for (const type of INTERRUPTS) {
    window.removeEventListener(type, cancel);
  }
}

function cancel(): void {
  active?.stop();
  active = null;
  detach();
}

function attach(): void {
  for (const type of INTERRUPTS) {
    window.addEventListener(type, cancel, { passive: true, once: true });
  }
}

export function scrollToY(to: number): void {
  cancel();

  const maxScroll = Math.max(
    0,
    document.documentElement.scrollHeight - window.innerHeight,
  );
  const target = Math.min(Math.max(to, 0), maxScroll);
  const from = window.scrollY;
  const distance = Math.abs(target - from);

  if (distance < 4) return;

  if (prefersReducedMotion()) {
    window.scrollTo(0, target);
    return;
  }

  /* Long jumps take a little longer, but the curve is capped so crossing the
     whole page never feels like waiting. */
  const duration = Math.min(0.8, 0.3 + distance / 9000);

  active = animate(from, target, {
    duration,
    ease: [0.16, 1, 0.3, 1],
    onUpdate: (value) => {
      window.scrollTo(0, value);
    },
    onComplete: () => {
      active = null;
      detach();
    },
  });

  attach();
}

export function scrollToId(id: string): void {
  const target = document.getElementById(id);
  if (!target) return;
  scrollToY(target.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET);
}

export function scrollToTop(): void {
  scrollToY(0);
}

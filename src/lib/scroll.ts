import type Lenis from 'lenis';

/**
 * Anchor navigation has to work whether or not Lenis is running (it's disabled
 * on touch and under reduced motion), so the instance is registered here and
 * every jump goes through one function.
 */
let instance: Lenis | null = null;

export function registerLenis(lenis: Lenis | null): void {
  instance = lenis;
}

export function lockScroll(locked: boolean): void {
  if (locked) instance?.stop();
  else instance?.start();
}

/** Clears the sticky header. */
const HEADER_OFFSET = 84;

export function scrollToId(id: string): void {
  const target = document.getElementById(id);
  if (!target) return;

  if (instance) {
    instance.scrollTo(target, { offset: -HEADER_OFFSET });
    return;
  }

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const top = target.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET;
  window.scrollTo({ top, behavior: reduced ? 'auto' : 'smooth' });
}

export function scrollToTop(): void {
  if (instance) {
    instance.scrollTo(0);
    return;
  }
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  window.scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' });
}

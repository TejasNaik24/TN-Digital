import { useEffect } from 'react';
import { lockScroll } from '@/lib/scroll';

/**
 * Freezes the page behind an overlay. Compensates for the scrollbar's width so
 * locking doesn't shift the whole layout sideways, and pauses Lenis too.
 */
export function useLockBodyScroll(locked: boolean): void {
  useEffect(() => {
    if (!locked) return;

    const { body } = document;
    const previousOverflow = body.style.overflow;
    const previousPadding = body.style.paddingRight;
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

    body.style.overflow = 'hidden';
    if (scrollbarWidth > 0) body.style.paddingRight = `${scrollbarWidth}px`;
    lockScroll(true);

    return () => {
      body.style.overflow = previousOverflow;
      body.style.paddingRight = previousPadding;
      lockScroll(false);
    };
  }, [locked]);
}

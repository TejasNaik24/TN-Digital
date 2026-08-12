import { useEffect, useState, type RefObject } from 'react';

/**
 * Reveals an element the first time it enters view — and, critically, also
 * reveals it if it has *already* been scrolled past.
 *
 * A plain `isIntersecting` check loses elements: scroll fast enough (or land on
 * a deep link) and a section can move from below the viewport to above it
 * between two observer callbacks. It never reports as intersecting, so it stays
 * at opacity 0 forever. Checking `boundingClientRect.top < 0` catches that case.
 */
export function useRevealOnce(
  ref: RefObject<HTMLElement | null>,
  rootMargin = '0px 0px -12% 0px',
): boolean {
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    if (revealed) return;
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting || entry.boundingClientRect.top < 0) {
            setRevealed(true);
            observer.disconnect();
            return;
          }
        }
      },
      { rootMargin },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [ref, revealed, rootMargin]);

  return revealed;
}

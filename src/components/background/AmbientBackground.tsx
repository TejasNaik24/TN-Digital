import { usePointerGlow } from '@/hooks/usePointerGlow';
import { useHasFinePointer } from '@/hooks/useMediaQuery';
import { useReducedMotionSafe } from '@/hooks/useReducedMotionSafe';

/**
 * The room the site sits in.
 *
 * Five stacked layers, all fixed, all `pointer-events: none`, none of them
 * animated with JavaScript except the cursor glow's CSS variables:
 *
 *   1. static radial light fields    — the base depth
 *   2. two slow drifting blooms      — the "breathing"
 *   3. a hairline grid, masked        — structure, fading out at the edges
 *   4. the cursor glow                — the site noticing you
 *   5. grain                          — stops the gradients banding
 *
 * The goal is a dark physical space, not decoration. Every value here is low
 * enough that removing a layer should be noticeable but not obvious.
 */
export function AmbientBackground() {
  const finePointer = useHasFinePointer();
  const reduced = useReducedMotionSafe();

  // Touch devices get the ambient layers without the cursor tracking.
  usePointerGlow(finePointer && !reduced);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      {/* 1 — base light fields */}
      <div
        className="absolute inset-0"
        style={{
          background: [
            'radial-gradient(ellipse 78% 52% at 12% -8%, rgb(77 141 255 / 0.14), transparent 62%)',
            'radial-gradient(ellipse 62% 46% at 92% 4%, rgb(139 92 246 / 0.12), transparent 60%)',
            'radial-gradient(ellipse 90% 60% at 50% 108%, rgb(99 102 241 / 0.09), transparent 66%)',
          ].join(','),
        }}
      />

      {/* 2 — breathing blooms. ~18–24s cycles: present, never a screensaver. */}
      <div
        className="absolute -top-[18vh] left-[6vw] size-[52vw] max-h-[720px] max-w-[720px] rounded-full blur-[120px]"
        style={{
          background:
            'radial-gradient(circle, rgb(77 141 255 / 0.2), transparent 68%)',
          animation: reduced ? undefined : 'breathe 19s var(--ease-out-soft) infinite',
          opacity: reduced ? 0.7 : undefined,
          willChange: 'transform, opacity',
        }}
      />
      <div
        className="absolute -right-[8vw] top-[8vh] size-[44vw] max-h-[620px] max-w-[620px] rounded-full blur-[130px]"
        style={{
          background:
            'radial-gradient(circle, rgb(139 92 246 / 0.17), transparent 68%)',
          animation: reduced ? undefined : 'drift 24s var(--ease-out-soft) infinite',
          opacity: reduced ? 0.6 : undefined,
          willChange: 'transform, opacity',
        }}
      />

      {/* 3 — hairline grid, faded out toward the edges so it never reads as a table */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: [
            'linear-gradient(to right, rgb(150 178 255 / 0.05) 1px, transparent 1px)',
            'linear-gradient(to bottom, rgb(150 178 255 / 0.05) 1px, transparent 1px)',
          ].join(','),
          backgroundSize: '68px 68px',
          maskImage:
            'radial-gradient(ellipse 110% 70% at 50% 0%, #000 15%, transparent 72%)',
          WebkitMaskImage:
            'radial-gradient(ellipse 110% 70% at 50% 0%, #000 15%, transparent 72%)',
        }}
      />

      {/* 4 — the cursor glow. Low opacity and screen blend: the page notices
              you, it doesn't shine a torch at you. */}
      {finePointer && !reduced && (
        <div
          className="absolute inset-0 mix-blend-screen"
          style={{
            background:
              'radial-gradient(560px circle at var(--mx) var(--my), rgb(96 150 255 / 0.07), rgb(139 92 246 / 0.03) 42%, transparent 68%)',
          }}
        />
      )}

      {/* 5 — grain, to keep the gradients from banding on wide displays */}
      <div className="grain absolute inset-0 opacity-[0.028] mix-blend-overlay" />

      {/* Floor: anchors the page so content doesn't float off the bottom edge */}
      <div className="absolute inset-x-0 bottom-0 h-64 bg-[linear-gradient(to_top,var(--color-canvas),transparent)]" />
    </div>
  );
}

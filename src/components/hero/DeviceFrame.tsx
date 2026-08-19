import { AnimatePresence, motion } from 'motion/react';
import { Lock } from 'lucide-react';
import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';
import { EASE_EXPO } from '@/lib/motion';

/**
 * A browser window, drawn rather than photographed — no screenshot to go stale,
 * no image bytes, crisp at any density.
 */
export function DeviceFrame({
  label,
  children,
  className,
}: {
  label: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn('relative', className)}>
      {/* Light pooling under the device — what makes it read as floating. */}
      <div
        aria-hidden="true"
        // inset-x-0 rather than a negative inset: the glow used to spill past
        // the shell and create a 2px horizontal scroll at 390px.
        className="absolute inset-x-0 -bottom-10 h-32 rounded-[50%] blur-3xl"
        style={{
          background:
            'radial-gradient(ellipse at center, rgb(77 141 255 / 0.34), rgb(139 92 246 / 0.16) 45%, transparent 72%)',
        }}
      />

      <div
        className={cn(
          'relative overflow-hidden rounded-[0.95rem] border border-hairline-strong',
          // Opaque, not `backdrop-blur`: this element floats and tilts with the
          // cursor, so a backdrop-filter here made Safari re-sample and re-blur
          // the ambient background on every one of those frames — continuously,
          // just from moving the mouse across the hero.
          'bg-elevated',
          'shadow-[0_1px_0_0_rgb(180_205_255/0.14)_inset,0_40px_90px_-30px_rgb(0_0_0/0.9),0_0_0_1px_rgb(4_6_12/0.6)]',
        )}
      >
        {/* Chrome */}
        <div className="flex h-10 items-center gap-3 border-b border-hairline px-4">
          <div className="flex gap-[0.3rem]" aria-hidden="true">
            <span className="size-[0.4rem] rounded-full bg-white/20" />
            <span className="size-[0.4rem] rounded-full bg-white/20" />
            <span className="size-[0.4rem] rounded-full bg-white/20" />
          </div>

          <div className="mx-auto flex h-6 min-w-0 max-w-[16rem] flex-1 items-center gap-2 rounded-full border border-hairline bg-canvas/60 px-3">
            <Lock aria-hidden="true" className="size-2.5 shrink-0 text-ink-4" />
            <span className="min-w-0 overflow-hidden">
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={label}
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.3, ease: EASE_EXPO }}
                  className="mono-label block truncate text-[0.5625rem] tracking-[0.1em] text-ink-3"
                >
                  {label}
                </motion.span>
              </AnimatePresence>
            </span>
          </div>

          <div className="w-8" aria-hidden="true" />
        </div>

        {/* Viewport */}
        <div className="relative aspect-[16/10] bg-[#050810]">
          <div
            aria-hidden="true"
            className="absolute inset-0"
            style={{
              background:
                'radial-gradient(120% 90% at 50% 0%, rgb(77 141 255 / 0.07), transparent 65%)',
            }}
          />
          {children}
        </div>
      </div>
    </div>
  );
}

/**
 * Blueprint annotations — the one deliberate flourish on the page.
 *
 * Hairline brackets and dimension rules borrowed from design tools. They say
 * "this was measured" rather than decorating, which is exactly the impression
 * the studio is selling. Desktop only; on small screens they'd be clutter.
 */
export function BlueprintMarks() {
  const bracket = 'absolute size-5 border-azure/25';

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute -inset-5 hidden lg:block"
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.1, delay: 1, ease: EASE_EXPO }}
      >
        <span className={cn(bracket, 'left-0 top-0 border-l border-t')} />
        <span className={cn(bracket, 'right-0 top-0 border-r border-t')} />
        <span className={cn(bracket, 'bottom-0 left-0 border-b border-l')} />
        <span className={cn(bracket, 'bottom-0 right-0 border-b border-r')} />

        {/* Width rule */}
        <span className="absolute -top-6 left-0 right-0 flex items-center gap-2">
          <span className="h-2 w-px bg-azure/20" />
          <span className="h-px flex-1 bg-azure/15" />
          <span className="mono-label text-[0.5rem] text-ink-4">1440</span>
          <span className="h-px flex-1 bg-azure/15" />
          <span className="h-2 w-px bg-azure/20" />
        </span>

        {/* Height rule. Sits just inside the right edge rather than outside it:
            the rotated label's visual box is far wider than its 1px layout box,
            so an outside position pushed real horizontal scroll onto the page. */}
        <span className="absolute bottom-0 right-1 top-0 flex w-px flex-col items-center gap-2">
          <span className="h-px w-2 bg-azure/20" />
          <span className="w-px flex-1 bg-azure/15" />
          <span className="mono-label rotate-90 text-[0.5rem] text-ink-4">900</span>
          <span className="w-px flex-1 bg-azure/15" />
          <span className="h-px w-2 bg-azure/20" />
        </span>
      </motion.div>
    </div>
  );
}

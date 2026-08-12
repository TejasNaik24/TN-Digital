import { motion } from 'motion/react';
import { useRef } from 'react';
import { Shell } from '@/components/layout/Section';
import { site } from '@/data/site';
import { DUR, EASE_EXPO } from '@/lib/motion';
import { useRevealOnce } from '@/hooks/useRevealOnce';
import { useReducedMotionSafe } from '@/hooks/useReducedMotionSafe';

/**
 * The argument for the whole site, stated once and given room.
 *
 * One reveal, nothing else moving — the restraint is the point. Everything
 * after this section is evidence for this sentence.
 */
export function Statement() {
  const reduced = useReducedMotionSafe();
  const ref = useRef<HTMLDivElement>(null);
  const revealed = useRevealOnce(ref);

  return (
    <section aria-label="Why this matters" className="relative py-16 sm:py-20">
      <Shell>
        <div ref={ref} className="relative mx-auto max-w-4xl">
          <span
            aria-hidden="true"
            className="absolute -left-2 -top-9 select-none font-mono text-[5rem] leading-none text-ink-4/25 sm:-left-7 sm:text-[7rem]"
          >
            “
          </span>

          <motion.p
            initial={false}
            animate={
              revealed ? { opacity: 1, y: 0 } : { opacity: 0, y: reduced ? 0 : 20 }
            }
            transition={{ duration: reduced ? 0.2 : DUR.reveal * 1.2, ease: EASE_EXPO }}
            className="relative text-balance text-[1.625rem] font-medium leading-[1.32] tracking-[-0.028em] text-ink sm:text-[2.125rem] lg:text-[2.625rem]"
          >
            {site.statement}
          </motion.p>
        </div>
      </Shell>
    </section>
  );
}

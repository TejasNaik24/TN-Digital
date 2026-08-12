import { motion } from 'motion/react';
import { useRef, type ReactNode } from 'react';
import { cn } from '@/lib/cn';
import { DUR, EASE_EXPO } from '@/lib/motion';
import { useRevealOnce } from '@/hooks/useRevealOnce';
import { useReducedMotionSafe } from '@/hooks/useReducedMotionSafe';

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Seconds. Use to build a deliberate reading order, not to decorate. */
  delay?: number;
  distance?: number;
};

/**
 * Rise-and-fade on first scroll into view. Reveals once and never replays —
 * re-animating on every pass is what makes a page feel restless.
 */
export function Reveal({ children, className, delay = 0, distance = 22 }: RevealProps) {
  const reduced = useReducedMotionSafe();
  const ref = useRef<HTMLDivElement>(null);
  const revealed = useRevealOnce(ref);

  return (
    <motion.div
      ref={ref}
      className={cn(className)}
      initial={false}
      animate={
        revealed
          ? { opacity: 1, y: 0 }
          : { opacity: 0, y: reduced ? 0 : distance }
      }
      transition={{
        duration: reduced ? 0.2 : DUR.reveal,
        delay: revealed && !reduced ? delay : 0,
        ease: EASE_EXPO,
      }}
    >
      {children}
    </motion.div>
  );
}

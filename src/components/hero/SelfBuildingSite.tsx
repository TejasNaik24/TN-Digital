import { AnimatePresence, motion, useInView } from 'motion/react';
import { useEffect, useState, type CSSProperties } from 'react';
import { cn } from '@/lib/cn';
import { EASE_EXPO } from '@/lib/motion';
import { useReducedMotionSafe } from '@/hooks/useReducedMotionSafe';

/**
 * A miniature website that builds itself, then dissolves and rebuilds as a
 * different kind of site.
 *
 * This is the hero's whole argument: it says "I build websites" without a
 * sentence of explanation. Restraint is what keeps it premium — one layout at a
 * time, a slow cadence, no bouncing, no flashing. It stops entirely when
 * scrolled out of view, and under reduced motion it renders a single finished
 * layout with no cycling at all.
 *
 * Everything inside is sized in container-query units, so the proportions are
 * identical whether the device is 340px or 640px wide.
 */

const CYCLE_MS = 7600;

/* ── Motion ─────────────────────────────────────────────────────────────── */

const stage = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.055, delayChildren: 0.12 } },
  exit: { opacity: 0, transition: { duration: 0.34, ease: EASE_EXPO } },
};

/** Blocks arrive. */
const rise = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE_EXPO } },
};

/** Text bars get drawn left-to-right, like type being set. */
const draw = {
  hidden: { opacity: 0, scaleX: 0 },
  visible: { opacity: 1, scaleX: 1, transition: { duration: 0.55, ease: EASE_EXPO } },
};

/* ── Primitives ─────────────────────────────────────────────────────────── */

type Tone = 'dim' | 'mid' | 'bright' | 'accent';

const tones: Record<Tone, string> = {
  dim: 'bg-white/[0.07]',
  mid: 'bg-white/[0.13]',
  bright: 'bg-white/[0.3]',
  accent:
    'bg-[linear-gradient(90deg,var(--color-azure),var(--color-violet))] opacity-90',
};

function Bar({
  w,
  h = 2,
  tone = 'mid',
  className,
}: {
  w: number | string;
  h?: number;
  tone?: Tone;
  className?: string;
}) {
  return (
    <motion.div
      variants={draw}
      className={cn('origin-left rounded-full', tones[tone], className)}
      style={{ width: typeof w === 'number' ? `${w}%` : w, height: `${h}cqw` }}
    />
  );
}

function Block({
  className,
  style,
  children,
}: {
  className?: string;
  style?: CSSProperties;
  children?: React.ReactNode;
}) {
  return (
    <motion.div
      variants={rise}
      className={cn(
        'rounded-[1.2cqw] border border-white/[0.07] bg-white/[0.035]',
        className,
      )}
      style={style}
    >
      {children}
    </motion.div>
  );
}

function Pill({ w, accent = false }: { w: number; accent?: boolean }) {
  return (
    <motion.div
      variants={rise}
      className={cn(
        'rounded-full',
        accent
          ? 'bg-[linear-gradient(90deg,var(--color-azure),var(--color-indigo))]'
          : 'bg-white/[0.11]',
      )}
      style={{ width: `${w}cqw`, height: `3.2cqw` }}
    />
  );
}

/* ── Layout A — a marketing site ────────────────────────────────────────── */

function MarketingLayout() {
  return (
    <>
      <motion.div variants={rise} className="flex items-center justify-between">
        <div className="flex items-center gap-[1.6cqw]">
          <div className="size-[2.6cqw] rounded-[0.7cqw] bg-[linear-gradient(135deg,var(--color-azure),var(--color-violet))]" />
          <Bar w="7cqw" h={1.3} tone="mid" />
        </div>
        <div className="flex items-center gap-[2.4cqw]">
          <Bar w="4cqw" h={1.1} tone="dim" />
          <Bar w="4cqw" h={1.1} tone="dim" />
          <Bar w="4cqw" h={1.1} tone="dim" />
          <Pill w={10} accent />
        </div>
      </motion.div>

      <div className="mt-[7cqw] flex items-start gap-[5cqw]">
        <div className="flex w-[52%] flex-col gap-[2.2cqw]">
          <Bar w={44} h={1.4} tone="accent" className="mb-[1cqw]" />
          <Bar w={100} h={4.4} tone="bright" />
          <Bar w={78} h={4.4} tone="bright" />
          <Bar w={92} h={4.4} tone="accent" />
          <div className="mt-[2.4cqw] flex flex-col gap-[1.4cqw]">
            <Bar w={88} h={1.5} tone="dim" />
            <Bar w={72} h={1.5} tone="dim" />
          </div>
          <div className="mt-[2.6cqw] flex gap-[1.8cqw]">
            <Pill w={17} accent />
            <Pill w={14} />
          </div>
        </div>

        <Block className="relative flex-1 overflow-hidden" style={{ height: '30cqw' }}>
          <div
            className="absolute inset-0"
            style={{
              background:
                'radial-gradient(80% 70% at 30% 20%, rgb(77 141 255 / 0.3), transparent 70%), radial-gradient(70% 60% at 85% 90%, rgb(139 92 246 / 0.28), transparent 70%)',
            }}
          />
          <div className="absolute inset-x-[8%] bottom-[10%] flex flex-col gap-[1.4cqw]">
            <Bar w={62} h={1.6} tone="bright" />
            <Bar w={40} h={1.2} tone="mid" />
          </div>
        </Block>
      </div>
    </>
  );
}

/* ── Layout B — a product dashboard ─────────────────────────────────────── */

function DashboardLayout() {
  const reduced = useReducedMotionSafe();

  return (
    <div className="flex h-full gap-[3cqw]">
      <motion.div
        variants={rise}
        className="flex w-[13%] flex-col gap-[2.2cqw] rounded-[1.4cqw] border border-white/[0.06] bg-white/[0.025] p-[2cqw]"
      >
        <div className="size-[2.4cqw] rounded-[0.6cqw] bg-[linear-gradient(135deg,var(--color-azure),var(--color-violet))]" />
        {[0.28, 0.16, 0.16, 0.16, 0.16].map((opacity, index) => (
          <div
            key={index}
            className="h-[1.6cqw] rounded-full bg-white"
            style={{ opacity, width: index === 0 ? '80%' : '62%' }}
          />
        ))}
      </motion.div>

      <div className="flex flex-1 flex-col gap-[2.4cqw]">
        <motion.div variants={rise} className="flex items-center justify-between">
          <Bar w="16cqw" h={2.4} tone="bright" />
          <div className="flex gap-[1.4cqw]">
            <Pill w={9} />
            <Pill w={12} accent />
          </div>
        </motion.div>

        <div className="grid grid-cols-3 gap-[2.2cqw]">
          {[0, 1, 2].map((index) => (
            <Block key={index} className="p-[2cqw]">
              <div className="flex flex-col gap-[1.4cqw]">
                <Bar w={52} h={1.2} tone="dim" />
                <Bar w={72} h={3} tone={index === 0 ? 'accent' : 'bright'} />
              </div>
            </Block>
          ))}
        </div>

        <Block className="relative flex-1 overflow-hidden p-[2cqw]">
          <Bar w={26} h={1.3} tone="dim" />
          <svg
            viewBox="0 0 300 90"
            preserveAspectRatio="none"
            className="absolute inset-x-[4%] bottom-[8%] h-[62%] w-[92%]"
          >
            <defs>
              <linearGradient id="mini-line" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0" stopColor="var(--color-azure)" />
                <stop offset="1" stopColor="var(--color-violet)" />
              </linearGradient>
              <linearGradient id="mini-fill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="var(--color-azure)" stopOpacity="0.28" />
                <stop offset="1" stopColor="var(--color-azure)" stopOpacity="0" />
              </linearGradient>
            </defs>
            <motion.path
              d="M0 74 C 26 70, 40 46, 62 44 S 100 60, 124 50 S 166 20, 192 26 S 236 14, 262 8 L 300 4"
              fill="none"
              stroke="url(#mini-line)"
              strokeWidth="2.5"
              strokeLinecap="round"
              initial={{ pathLength: reduced ? 1 : 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: reduced ? 0 : 1.5, ease: EASE_EXPO, delay: 0.35 }}
            />
            <motion.path
              d="M0 74 C 26 70, 40 46, 62 44 S 100 60, 124 50 S 166 20, 192 26 S 236 14, 262 8 L 300 4 L 300 90 L 0 90 Z"
              fill="url(#mini-fill)"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: reduced ? 0 : 1.1 }}
            />
          </svg>
        </Block>
      </div>
    </div>
  );
}

/* ── Layout C — an editorial portfolio ──────────────────────────────────── */

function EditorialLayout() {
  return (
    <div className="flex h-full flex-col">
      <motion.div variants={rise} className="flex items-center justify-between">
        <Bar w="9cqw" h={1.4} tone="mid" />
        <div className="flex gap-[2.4cqw]">
          <Bar w="4.5cqw" h={1.1} tone="dim" />
          <Bar w="4.5cqw" h={1.1} tone="dim" />
          <Bar w="4.5cqw" h={1.1} tone="dim" />
        </div>
      </motion.div>

      <div className="mt-[6cqw] flex flex-col items-center gap-[2cqw]">
        <Bar w={62} h={5} tone="bright" className="origin-center" />
        <Bar w={40} h={5} tone="accent" className="origin-center" />
        <div className="mt-[1.6cqw] w-[46%]">
          <Bar w={100} h={1.4} tone="dim" className="origin-center" />
        </div>
      </div>

      <div className="mt-[6cqw] grid flex-1 grid-cols-3 gap-[2.2cqw]">
        {[
          'radial-gradient(70% 70% at 40% 30%, rgb(77 141 255 / 0.3), transparent 72%)',
          'radial-gradient(70% 70% at 60% 40%, rgb(139 92 246 / 0.3), transparent 72%)',
          'radial-gradient(70% 70% at 50% 60%, rgb(34 211 238 / 0.22), transparent 72%)',
        ].map((background, index) => (
          <Block key={index} className="relative overflow-hidden">
            <div className="absolute inset-0" style={{ background }} />
            <div className="absolute inset-x-[10%] bottom-[12%]">
              <div className="h-[1.4cqw] w-[70%] rounded-full bg-white/25" />
            </div>
          </Block>
        ))}
      </div>
    </div>
  );
}

/* ── Cycler ─────────────────────────────────────────────────────────────── */

export const buildLayouts = [
  { id: 'marketing', label: 'marketing-site', Component: MarketingLayout },
  { id: 'dashboard', label: 'product-app', Component: DashboardLayout },
  { id: 'editorial', label: 'portfolio', Component: EditorialLayout },
] as const;

/**
 * Drives the cycle. Lives outside the renderer so the device's address bar can
 * label whatever is currently being built.
 */
export function useBuildCycle(ref: React.RefObject<HTMLElement | null>) {
  const reduced = useReducedMotionSafe();
  const inView = useInView(ref, { amount: 0.3 });
  const [index, setIndex] = useState(0);

  useEffect(() => {
    // Nothing runs when the hero is off-screen or motion is reduced.
    if (reduced || !inView) return;
    const timer = window.setInterval(
      () => setIndex((current) => (current + 1) % buildLayouts.length),
      CYCLE_MS,
    );
    return () => window.clearInterval(timer);
  }, [reduced, inView]);

  const active = buildLayouts[index] ?? buildLayouts[0];
  return { index, label: active.label };
}

export function SelfBuildingSite({
  index,
  className,
}: {
  index: number;
  className?: string;
}) {
  const active = buildLayouts[index] ?? buildLayouts[0];
  const { Component } = active;

  return (
    <div
      className={cn('relative size-full overflow-hidden', className)}
      style={{ containerType: 'inline-size' }}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={active.id}
          variants={stage}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="absolute inset-0 p-[4cqw]"
        >
          <Component />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

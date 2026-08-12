import { site } from '@/data/site';
import { cn } from '@/lib/cn';

/** TN monogram — drawn rather than typeset so the strokes stay identical to the
 *  favicon at every size. */
export function Monogram({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        'relative grid size-10 shrink-0 place-items-center rounded-[0.7rem]',
        'border border-hairline-strong bg-elevated',
        'shadow-[0_0_0_1px_rgb(4_6_12/0.8),0_8px_24px_-14px_rgb(77_141_255/0.9)]',
        className,
      )}
    >
      <svg viewBox="0 0 36 36" className="size-5" aria-hidden="true">
        <defs>
          <linearGradient id="tn-mark" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="var(--color-azure)" />
            <stop offset="0.55" stopColor="var(--color-indigo)" />
            <stop offset="1" stopColor="var(--color-violet)" />
          </linearGradient>
        </defs>
        <path
          d="M3 7h13M9.5 7v22M22 29V7l11 22V7"
          fill="none"
          stroke="url(#tn-mark)"
          strokeWidth="3"
          strokeLinecap="square"
        />
      </svg>
    </span>
  );
}

export function Wordmark({ className }: { className?: string }) {
  return (
    <span className={cn('flex items-center gap-3', className)}>
      <Monogram />
      <span className="flex flex-col leading-none">
        <span className="text-[0.9375rem] font-medium tracking-[-0.01em] text-ink">
          {site.name}
        </span>
        <span className="mono-label mt-1.5 text-ink-3">{site.role}</span>
      </span>
    </span>
  );
}

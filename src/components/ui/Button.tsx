import { ArrowRight, ArrowUpRight } from 'lucide-react';
import type { ComponentPropsWithoutRef, ReactNode } from 'react';
import { cn } from '@/lib/cn';

type Variant = 'primary' | 'secondary' | 'ghost';
type Size = 'md' | 'lg';

const base =
  'group/btn relative inline-flex select-none items-center justify-center gap-2.5 ' +
  'whitespace-nowrap rounded-full font-medium tracking-[-0.01em] ' +
  'transition-[transform,border-color,background-color,box-shadow,color] duration-[220ms] ' +
  'ease-[cubic-bezier(0.16,1,0.3,1)] active:scale-[0.985] ' +
  'disabled:pointer-events-none disabled:opacity-45';

const sizes: Record<Size, string> = {
  md: 'h-11 px-5 text-[0.9375rem]',
  lg: 'h-[3.25rem] px-7 text-base',
};

const variants: Record<Variant, string> = {
  // The one saturated element on the page. Everything else stays quiet.
  primary: cn(
    'btn-sheen overflow-hidden text-white',
    'bg-[linear-gradient(100deg,var(--color-azure),var(--color-indigo)_54%,var(--color-violet))]',
    'shadow-[0_1px_0_0_rgb(255_255_255/0.22)_inset,0_10px_34px_-12px_rgb(77_141_255/0.75)]',
    'hover:shadow-[0_1px_0_0_rgb(255_255_255/0.28)_inset,0_16px_44px_-12px_rgb(99_102_241/0.9)]',
  ),
  secondary: cn(
    'border border-hairline-strong bg-surface/70 text-ink',
    'hover:border-[rgb(150_178_255/0.34)] hover:bg-surface-2/70',
  ),
  ghost: 'text-ink-2 hover:text-ink',
};

type SharedProps = {
  variant?: Variant;
  size?: Size;
  /** Trailing arrow that slides on hover — signals "this goes somewhere". */
  arrow?: 'right' | 'up-right' | false;
  children: ReactNode;
  className?: string;
};

function Inner({ arrow, children }: Pick<SharedProps, 'arrow' | 'children'>) {
  const Icon = arrow === 'up-right' ? ArrowUpRight : ArrowRight;
  return (
    <>
      <span className="relative z-10">{children}</span>
      {arrow !== false && (
        <Icon
          aria-hidden="true"
          strokeWidth={2}
          className={cn(
            'relative z-10 size-4 transition-transform duration-[220ms] ease-[cubic-bezier(0.16,1,0.3,1)]',
            arrow === 'up-right'
              ? 'group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5'
              : 'group-hover/btn:translate-x-1',
          )}
        />
      )}
    </>
  );
}

export function Button({
  variant = 'primary',
  size = 'md',
  arrow = false,
  className,
  children,
  ...rest
}: SharedProps & Omit<ComponentPropsWithoutRef<'button'>, 'children' | 'className'>) {
  return (
    <button
      type="button"
      className={cn(base, sizes[size], variants[variant], className)}
      {...rest}
    >
      <Inner arrow={arrow}>{children}</Inner>
    </button>
  );
}

export function LinkButton({
  variant = 'primary',
  size = 'md',
  arrow = false,
  className,
  children,
  ...rest
}: SharedProps & Omit<ComponentPropsWithoutRef<'a'>, 'children' | 'className'>) {
  return (
    <a className={cn(base, sizes[size], variants[variant], className)} {...rest}>
      <Inner arrow={arrow}>{children}</Inner>
    </a>
  );
}

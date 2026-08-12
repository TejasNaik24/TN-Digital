import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';

/**
 * Every section shares one vertical rhythm and one scroll offset, so anchor
 * jumps always clear the sticky header by the same amount.
 */
export function Section({
  id,
  children,
  className,
  labelledBy,
}: {
  id: string;
  children: ReactNode;
  className?: string;
  labelledBy?: string;
}) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={cn(
        'relative scroll-mt-24 py-20 sm:py-28 lg:py-36',
        className,
      )}
    >
      {children}
    </section>
  );
}

export function Shell({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={cn('shell', className)}>{children}</div>;
}

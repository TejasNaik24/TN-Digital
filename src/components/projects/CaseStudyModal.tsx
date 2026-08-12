import { AnimatePresence, motion } from 'motion/react';
import { Check, X } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { LinkButton } from '@/components/ui/Button';
import { ProjectVisual } from './ProjectVisual';
import type { Project } from '@/data/projects';
import { DUR, EASE_EXPO } from '@/lib/motion';
import { scrollToId } from '@/lib/scroll';
import { useFocusTrap } from '@/hooks/useFocusTrap';
import { useLockBodyScroll } from '@/hooks/useLockBodyScroll';
import { useReducedMotionSafe } from '@/hooks/useReducedMotionSafe';

/**
 * The case study behind a card. A real destination rather than a link that goes
 * nowhere — a founder can see what each build was actually solving.
 */
export function CaseStudyModal({
  project,
  onClose,
}: {
  project: Project | null;
  onClose: () => void;
}) {
  const reduced = useReducedMotionSafe();
  const panelRef = useRef<HTMLDivElement>(null);
  const open = project !== null;

  useFocusTrap(panelRef, open);
  useLockBodyScroll(open);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <div className="fixed inset-0 z-50 grid place-items-center p-4 sm:p-6">
          <motion.button
            type="button"
            aria-label="Close case study"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: DUR.exit * 0.7 } }}
            transition={{ duration: 0.34 }}
            className="absolute inset-0 cursor-default bg-canvas/80 backdrop-blur-md"
          />

          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="case-study-title"
            tabIndex={-1}
            initial={{ opacity: 0, y: reduced ? 0 : 22, scale: reduced ? 1 : 0.985 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{
              opacity: 0,
              y: reduced ? 0 : 12,
              scale: reduced ? 1 : 0.99,
              transition: { duration: DUR.exit, ease: EASE_EXPO },
            }}
            transition={{ duration: DUR.panel, ease: EASE_EXPO }}
            style={{ '--glow': project.accent } as React.CSSProperties}
            className="relative max-h-[90dvh] w-full max-w-4xl overflow-y-auto overscroll-contain rounded-panel border border-hairline-strong bg-elevated shadow-[0_40px_120px_-30px_rgb(0_0_0/0.95)]"
          >
            <button
              type="button"
              onClick={onClose}
              aria-label="Close case study"
              className="absolute right-4 top-4 z-20 grid size-10 place-items-center rounded-full border border-hairline bg-canvas/70 text-ink-2 backdrop-blur transition-colors duration-200 hover:border-hairline-strong hover:text-ink"
            >
              <X className="size-4.5" strokeWidth={1.75} />
            </button>

            <div className="relative aspect-[16/10] max-h-[34dvh] overflow-hidden border-b border-hairline">
              <ProjectVisual kind={project.visual} accent={project.accent} />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_top,rgb(7_11_20/0.85),transparent_55%)]"
              />
            </div>

            <div className="p-6 sm:p-9">
              <div className="flex flex-wrap items-center gap-3">
                <span className="mono-label rounded-full border border-hairline-strong bg-surface/80 px-2.5 py-1.5 text-ink-3">
                  {project.kind === 'concept' ? 'Concept' : 'Client'}
                </span>
                <span className="mono-label text-ink-3">{project.industry}</span>
              </div>

              <h2
                id="case-study-title"
                className="mt-5 text-title font-medium tracking-[-0.03em] text-ink"
              >
                {project.name}
              </h2>

              <p className="mt-4 max-w-2xl text-lede text-ink-2">{project.brief}</p>

              <div className="mt-9 grid gap-9 sm:grid-cols-[1.4fr_1fr]">
                <div>
                  <h3 className="mono-label text-ink-3">What it demonstrates</h3>
                  <ul className="mt-4 flex flex-col gap-3">
                    {project.demonstrates.map((item) => (
                      <li key={item} className="flex gap-3 text-[0.9375rem] text-ink-2">
                        <Check
                          aria-hidden="true"
                          className="mt-0.5 size-4 shrink-0"
                          style={{ color: project.accent }}
                          strokeWidth={2}
                        />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="mono-label text-ink-3">Built with</h3>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {project.stack.map((item) => (
                      <li
                        key={item}
                        className="rounded-full border border-hairline bg-surface/70 px-3 py-1.5 font-mono text-xs text-ink-2"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-10 flex flex-col gap-4 border-t border-hairline pt-7 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-sm text-ink-3">
                  Want something like this for your company?
                </p>
                <LinkButton
                  href="#contact"
                  arrow="right"
                  onClick={(event) => {
                    event.preventDefault();
                    onClose();
                    window.setTimeout(() => scrollToId('contact'), reduced ? 0 : 280);
                  }}
                >
                  Start a project
                </LinkButton>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

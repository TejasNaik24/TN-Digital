import { ArrowRight } from 'lucide-react';
import { useState } from 'react';
import { Section, Shell } from '@/components/layout/Section';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { CaseStudyModal } from '@/components/projects/CaseStudyModal';
import { ProjectCard } from '@/components/projects/ProjectCard';
import { projects, type Project } from '@/data/projects';
import { cn } from '@/lib/cn';
import { scrollToId } from '@/lib/scroll';
import { useSpotlight } from '@/hooks/useSpotlight';

/** The last card in the grid: an empty frame, waiting. */
function OpenSlotCard() {
  const { ref, onPointerMove } = useSpotlight<HTMLDivElement>();

  return (
    <div
      ref={ref}
      onPointerMove={onPointerMove}
      className={cn(
        'surface-card group relative flex h-full min-h-[19rem] flex-col justify-center overflow-hidden rounded-panel p-7 sm:p-9',
        'border border-dashed border-[rgb(150_178_255/0.16)] bg-surface/20',
        'transition-[transform,border-color] duration-[380ms] ease-[cubic-bezier(0.16,1,0.3,1)]',
        'hover:-translate-y-1 hover:border-[rgb(150_178_255/0.32)]',
        'has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-azure has-[:focus-visible]:ring-offset-2 has-[:focus-visible]:ring-offset-canvas',
      )}
    >
      {/* An empty browser frame, echoing the previews beside it — it makes the
          slot read as reserved rather than as a card that failed to load. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-9 top-9 hidden overflow-hidden rounded-xl border border-hairline-soft opacity-60 transition-opacity duration-500 group-hover:opacity-100 sm:block"
      >
        <div className="flex h-7 items-center gap-1.5 border-b border-hairline-soft px-3">
          <span className="size-1 rounded-full bg-ink-4/60" />
          <span className="size-1 rounded-full bg-ink-4/60" />
          <span className="size-1 rounded-full bg-ink-4/60" />
        </div>
        <div className="h-16 bg-[linear-gradient(180deg,rgb(150_178_255/0.04),transparent)]" />
      </div>

      <div className="relative z-10 sm:mt-24">
        <span className="mono-label text-ink-3">Open slot</span>
        <h3 className="mt-5 text-[1.625rem] font-medium leading-[1.15] tracking-[-0.03em] text-ink">
          <button
            type="button"
            onClick={() => scrollToId('contact')}
            className="text-left after:absolute after:inset-0 after:content-[''] focus-visible:outline-none"
          >
            Your company could be next.
          </button>
        </h3>
        <p className="mt-3 max-w-sm text-[0.9375rem] leading-relaxed text-ink-2">
          I take on a small number of projects at a time so each one gets proper
          attention. Tell me what you’re building.
        </p>

        <span className="mt-7 inline-flex items-center gap-2.5 text-sm font-medium text-azure">
          Start a project
          <ArrowRight
            aria-hidden="true"
            className="size-4 transition-transform duration-[320ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1"
            strokeWidth={2}
          />
        </span>
      </div>
    </div>
  );
}

export function Work() {
  const [active, setActive] = useState<Project | null>(null);

  return (
    <Section id="work" labelledBy="work-heading" space="loose">
      <Shell>
        <SectionHeading
          id="work-heading"
          label="Selected work"
          title="Built to show what’s possible."
          lede="Self-directed concept builds, each one exploring how a different kind of business should feel online. Every project here is labelled as a concept — none of them are client work."
        />

        <div className="mt-14 grid gap-4 lg:mt-16 lg:grid-cols-2">
          {projects.map((project) => (
            <div key={project.id} className={cn(project.wide && 'lg:col-span-2')}>
              <Reveal className="h-full">
                <ProjectCard project={project} onOpen={setActive} />
              </Reveal>
            </div>
          ))}

          <Reveal className="h-full">
            <OpenSlotCard />
          </Reveal>
        </div>
      </Shell>

      <CaseStudyModal project={active} onClose={() => setActive(null)} />
    </Section>
  );
}

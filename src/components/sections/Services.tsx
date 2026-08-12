import { Section, Shell } from '@/components/layout/Section';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { services, type Service } from '@/data/services';
import { useSpotlight } from '@/hooks/useSpotlight';

function ServiceCard({ service, index }: { service: Service; index: number }) {
  const { ref, onPointerMove } = useSpotlight<HTMLDivElement>();
  const Icon = service.icon;

  return (
    <Reveal delay={index * 0.06} className="h-full">
      <div
        ref={ref}
        onPointerMove={onPointerMove}
        className="surface-card group h-full rounded-panel border border-hairline bg-surface/45 p-7 backdrop-blur-sm transition-[transform,border-color] duration-[320ms] ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-[3px] hover:border-hairline-strong sm:p-8"
      >
        <div className="relative z-10 flex h-full flex-col">
          <div className="flex items-center justify-between">
            <span className="grid size-11 place-items-center rounded-[0.85rem] border border-hairline bg-elevated text-azure transition-colors duration-[320ms] group-hover:border-azure/30 group-hover:text-ink">
              <Icon className="size-[1.15rem]" strokeWidth={1.6} aria-hidden="true" />
            </span>
            <span className="mono-label text-ink-3">{service.label}</span>
          </div>

          <h3 className="mt-7 text-[1.1875rem] font-medium tracking-[-0.02em] text-ink">
            {service.title}
          </h3>
          <p className="mt-3 text-[0.9375rem] leading-relaxed text-ink-2">
            {service.description}
          </p>

          {/* Deliverables as one quiet line rather than a stack of chips —
              keeps four cards side by side from turning into columns. */}
          <p className="mt-auto pt-7 font-mono text-[0.6875rem] leading-[1.9] text-ink-3">
            {service.includes.join('  ·  ')}
          </p>
        </div>
      </div>
    </Reveal>
  );
}

export function Services() {
  return (
    <Section id="services" labelledBy="services-heading">
      <Shell>
        <SectionHeading
          id="services-heading"
          label="What I build"
          title="End to end, from the first sketch to the live site."
          lede="Four things, done properly. Most projects are one of them; the interesting ones are usually two or three combined."
        />

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4">
          {services.map((service, index) => (
            <ServiceCard key={service.id} service={service} index={index} />
          ))}
        </div>
      </Shell>
    </Section>
  );
}

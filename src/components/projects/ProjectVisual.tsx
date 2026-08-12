import { cn } from '@/lib/cn';
import type { ProjectVisualKind } from '@/data/projects';

/**
 * Project previews, drawn rather than screenshotted.
 *
 * Four dark product surfaces — each one composed to look like a real site for
 * that kind of business. Zero image bytes, sharp on any display, and each takes
 * its accent from the project's own colour so the work grid has variety without
 * leaving the design system.
 *
 * REPLACE: when a real screenshot exists, render an <img> here instead. The
 * card and modal don't care which they get.
 */

type VisualProps = { accent: string; className?: string };

/* ── Shared primitives (static — these are pictures, not animations) ────── */

const surface = 'rounded-[1.2cqw] border border-white/[0.07] bg-white/[0.03]';

function Line({
  w,
  h = 1.6,
  opacity = 0.16,
  accent,
  className,
}: {
  w: number | string;
  h?: number;
  opacity?: number;
  accent?: string;
  className?: string;
}) {
  return (
    <div
      className={cn('rounded-full', className)}
      style={{
        width: typeof w === 'number' ? `${w}%` : w,
        height: `${h}cqw`,
        background: accent ?? '#fff',
        opacity,
      }}
    />
  );
}

function Chrome({ accent }: { accent: string }) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-[1.4cqw]">
        <div
          className="size-[2.4cqw] rounded-[0.6cqw]"
          style={{ background: accent, opacity: 0.85 }}
        />
        <Line w="6cqw" h={1.2} opacity={0.2} />
      </div>
      <div className="flex items-center gap-[2cqw]">
        <Line w="3.6cqw" h={1} opacity={0.1} />
        <Line w="3.6cqw" h={1} opacity={0.1} />
        <div
          className="h-[2.8cqw] w-[8cqw] rounded-full"
          style={{ background: accent, opacity: 0.7 }}
        />
      </div>
    </div>
  );
}

/* ── Atelier Nord — editorial architecture portfolio ────────────────────── */

function EditorialVisual({ accent }: VisualProps) {
  /** Massed volumes, read as an elevation. Enough form to say "architecture"
   *  without pretending to be a photograph. */
  const massing = [
    { left: '8%', width: '17%', height: '46%', opacity: 0.1 },
    { left: '25%', width: '13%', height: '68%', opacity: 0.16 },
    { left: '38%', width: '22%', height: '88%', opacity: 0.24 },
    { left: '60%', width: '15%', height: '58%', opacity: 0.14 },
    { left: '75%', width: '19%', height: '36%', opacity: 0.09 },
  ];

  return (
    <div className="flex h-full flex-col p-[4cqw]">
      <div className="flex items-center justify-between">
        <Line w="8cqw" h={1.5} opacity={0.32} />
        <div className="flex gap-[2.4cqw]">
          <Line w="3.4cqw" h={0.9} opacity={0.14} />
          <Line w="3.4cqw" h={0.9} opacity={0.14} />
          <Line w="3.4cqw" h={0.9} opacity={0.14} />
        </div>
      </div>

      <div className="mt-[3.5cqw] flex flex-1 gap-[4cqw]">
        <div className="flex w-[38%] flex-col justify-center gap-[1.8cqw]">
          <Line w={34} h={1} accent={accent} opacity={0.8} />
          <div className="mt-[0.8cqw] flex flex-col gap-[1.6cqw]">
            <Line w={100} h={4} opacity={0.34} />
            <Line w={74} h={4} opacity={0.34} />
          </div>
          <div className="mt-[1.4cqw] flex flex-col gap-[1.1cqw]">
            <Line w={88} h={1} opacity={0.13} />
            <Line w={62} h={1} opacity={0.13} />
          </div>
          <div
            className="mt-[1.6cqw] h-px w-[30%]"
            style={{ background: accent, opacity: 0.5 }}
          />
        </div>

        <div className={cn(surface, 'relative flex-1 overflow-hidden')}>
          {/* Sky */}
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(180deg, ${accent}26 0%, transparent 62%), radial-gradient(60% 45% at 72% 12%, #ffffff1c, transparent 72%)`,
            }}
          />
          {/* Massing */}
          <div className="absolute inset-x-0 bottom-0 top-0">
            {massing.map((block, index) => (
              <div
                key={index}
                className="absolute bottom-0 border-t border-white/[0.14]"
                style={{
                  left: block.left,
                  width: block.width,
                  height: block.height,
                  background: `rgb(255 255 255 / ${block.opacity})`,
                }}
              />
            ))}
          </div>
          {/* Horizon */}
          <div className="absolute inset-x-0 bottom-0 h-[26%] bg-[linear-gradient(to_top,rgb(5_8_16/0.9),transparent)]" />
          <div className="absolute inset-x-[6%] bottom-[9%] flex items-center gap-[1.4cqw]">
            <div
              className="size-[1.1cqw] rounded-full"
              style={{ background: accent, opacity: 0.9 }}
            />
            <Line w={46} h={1} opacity={0.24} />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Vela — AI product site ─────────────────────────────────────────────── */

function ProductVisual({ accent }: VisualProps) {
  return (
    <div className="flex h-full flex-col p-[4cqw]">
      <Chrome accent={accent} />

      <div className="mt-[5.5cqw] flex flex-1 gap-[3.5cqw]">
        <div className="flex w-[42%] flex-col gap-[1.8cqw]">
          <div
            className="w-[46%] rounded-full"
            style={{ height: '2.4cqw', background: `${accent}33` }}
          />
          <Line w={100} h={3.4} opacity={0.28} />
          <Line w={80} h={3.4} opacity={0.28} />
          <div className="mt-[1.4cqw] flex flex-col gap-[1.1cqw]">
            <Line w={92} h={1} opacity={0.11} />
            <Line w={70} h={1} opacity={0.11} />
          </div>
          <div className="mt-[2cqw] flex gap-[1.5cqw]">
            <div
              className="h-[3cqw] w-[13cqw] rounded-full"
              style={{ background: accent, opacity: 0.85 }}
            />
            <div className="h-[3cqw] w-[10cqw] rounded-full border border-white/15" />
          </div>
        </div>

        {/* Product surface */}
        <div className={cn(surface, 'relative flex-1 overflow-hidden p-[2.4cqw]')}>
          <div className="flex items-center justify-between">
            <Line w="30%" h={1.2} opacity={0.22} />
            <div className="flex gap-[0.8cqw]">
              <div className="size-[1.4cqw] rounded-full bg-white/10" />
              <div className="size-[1.4cqw] rounded-full bg-white/10" />
            </div>
          </div>

          <div className="mt-[2.4cqw] grid grid-cols-3 gap-[1.4cqw]">
            {[0.8, 0.16, 0.16].map((opacity, index) => (
              <div
                key={index}
                className="rounded-[0.8cqw] border border-white/[0.06] p-[1.2cqw]"
                style={{ background: index === 0 ? `${accent}1f` : '#ffffff08' }}
              >
                <Line w={60} h={0.9} opacity={0.14} />
                <div className="mt-[1cqw]">
                  <Line w={80} h={2} accent={index === 0 ? accent : undefined} opacity={opacity} />
                </div>
              </div>
            ))}
          </div>

          <svg
            viewBox="0 0 200 60"
            preserveAspectRatio="none"
            className="mt-[2.2cqw] h-[34%] w-full"
          >
            <path
              d="M0 50 C 18 46, 30 28, 46 27 S 78 40, 94 32 S 128 10, 146 15 S 178 6, 200 3"
              fill="none"
              stroke={accent}
              strokeWidth="2"
              strokeLinecap="round"
              opacity="0.9"
            />
            <path
              d="M0 50 C 18 46, 30 28, 46 27 S 78 40, 94 32 S 128 10, 146 15 S 178 6, 200 3 L 200 60 L 0 60 Z"
              fill={accent}
              opacity="0.13"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}

/* ── Maison Levant — restaurant ─────────────────────────────────────────── */

function HospitalityVisual({ accent }: VisualProps) {
  return (
    <div className="relative h-full overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(75% 65% at 50% 8%, ${accent}2e, transparent 68%), radial-gradient(60% 50% at 12% 100%, ${accent}1c, transparent 70%)`,
        }}
      />

      <div className="relative flex h-full flex-col p-[4cqw]">
        <div className="flex items-center justify-between">
          <Line w="3.4cqw" h={1} opacity={0.14} />
          <div
            className="rounded-full px-[2cqw] py-[0.9cqw]"
            style={{ border: `1px solid ${accent}55` }}
          >
            <Line w="6cqw" h={0.9} accent={accent} opacity={0.85} />
          </div>
        </div>

        <div className="flex flex-1 flex-col items-center justify-center gap-[2cqw]">
          <Line w="18cqw" h={1} accent={accent} opacity={0.7} />
          <div className="mt-[0.6cqw] flex flex-col items-center gap-[1.6cqw]">
            <Line w="42cqw" h={4.6} opacity={0.34} />
            <Line w="28cqw" h={4.6} opacity={0.34} />
          </div>
          <div className="mt-[1.4cqw]">
            <Line w="24cqw" h={1.1} opacity={0.13} />
          </div>
        </div>

        {/* Booking bar — permanently reachable, which is the whole point. */}
        <div
          className={cn(surface, 'flex items-center gap-[2cqw] p-[1.8cqw] backdrop-blur')}
          style={{ background: '#ffffff09' }}
        >
          <Line w={22} h={1.4} opacity={0.16} />
          <div className="h-[2.6cqw] w-px bg-white/10" />
          <Line w={16} h={1.4} opacity={0.16} />
          <div className="h-[2.6cqw] w-px bg-white/10" />
          <Line w={14} h={1.4} opacity={0.16} />
          <div
            className="ml-auto h-[3cqw] w-[14cqw] rounded-full"
            style={{ background: accent, opacity: 0.9 }}
          />
        </div>
      </div>
    </div>
  );
}

/* ── Northbeam — B2B services ───────────────────────────────────────────── */

function BusinessVisual({ accent }: VisualProps) {
  return (
    <div className="flex h-full flex-col p-[4cqw]">
      <Chrome accent={accent} />

      <div className="mt-[5cqw] flex gap-[4cqw]">
        <div className="flex w-[52%] flex-col gap-[1.8cqw]">
          <Line w={100} h={3.6} opacity={0.3} />
          <Line w={68} h={3.6} opacity={0.3} />
          <div className="mt-[1.4cqw] flex flex-col gap-[1.1cqw]">
            <Line w={88} h={1} opacity={0.11} />
            <Line w={74} h={1} opacity={0.11} />
          </div>
        </div>

        <div className="flex flex-1 flex-col gap-[1.4cqw]">
          {[0, 1, 2].map((index) => (
            <div
              key={index}
              className={cn(surface, 'flex items-center gap-[1.6cqw] p-[1.6cqw]')}
            >
              <div
                className="size-[2.6cqw] shrink-0 rounded-[0.6cqw]"
                style={{ background: `${accent}44` }}
              />
              <div className="flex flex-1 flex-col gap-[0.8cqw]">
                <Line w={70} h={1.1} opacity={0.2} />
                <Line w={46} h={0.9} opacity={0.1} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Proof row — deliberately abstract placeholders, not invented logos. */}
      <div className="mt-auto flex items-center gap-[3cqw] border-t border-white/[0.06] pt-[2.6cqw]">
        <Line w="6cqw" h={0.9} opacity={0.07} />
        {[0, 1, 2, 3].map((index) => (
          <div
            key={index}
            className="h-[1.8cqw] flex-1 rounded-[0.4cqw] bg-white/[0.06]"
          />
        ))}
      </div>
    </div>
  );
}

/* ── Switch ─────────────────────────────────────────────────────────────── */

const visuals: Record<ProjectVisualKind, (props: VisualProps) => React.JSX.Element> = {
  editorial: EditorialVisual,
  product: ProductVisual,
  hospitality: HospitalityVisual,
  business: BusinessVisual,
};

export function ProjectVisual({
  kind,
  accent,
  className,
}: {
  kind: ProjectVisualKind;
  accent: string;
  className?: string;
}) {
  const Visual = visuals[kind];

  return (
    <div
      className={cn('relative size-full bg-[#050810]', className)}
      style={{ containerType: 'inline-size' }}
      aria-hidden="true"
    >
      <Visual accent={accent} />
    </div>
  );
}

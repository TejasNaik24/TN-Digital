import { AnimatePresence, motion } from 'motion/react';
import { Plus } from 'lucide-react';
import { useId, useState } from 'react';
import { Section, Shell } from '@/components/layout/Section';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { faqs, type FaqItem } from '@/data/faq';
import { cn } from '@/lib/cn';
import { EASE_EXPO } from '@/lib/motion';
import { useReducedMotionSafe } from '@/hooks/useReducedMotionSafe';

function FaqRow({
  item,
  open,
  onToggle,
}: {
  item: FaqItem;
  open: boolean;
  onToggle: () => void;
}) {
  const reduced = useReducedMotionSafe();
  const id = useId();

  return (
    <div className="border-b border-hairline">
      <h3>
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={open}
          aria-controls={`${id}-panel`}
          id={`${id}-trigger`}
          className="group flex w-full items-start justify-between gap-6 py-6 text-left"
        >
          <span
            className={cn(
              'text-[1.0625rem] font-medium tracking-[-0.015em] transition-colors duration-200',
              open ? 'text-ink' : 'text-ink group-hover:text-azure',
            )}
          >
            {item.question}
          </span>
          <span
            aria-hidden="true"
            className={cn(
              'mt-0.5 grid size-7 shrink-0 place-items-center rounded-full border text-ink-3 transition-[transform,color,border-color] duration-[320ms] ease-[cubic-bezier(0.16,1,0.3,1)]',
              open
                ? 'rotate-45 border-azure/40 text-azure'
                : 'border-hairline group-hover:border-hairline-strong group-hover:text-ink',
            )}
          >
            <Plus className="size-3.5" strokeWidth={2} />
          </span>
        </button>
      </h3>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={`${id}-panel`}
            role="region"
            aria-labelledby={`${id}-trigger`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{
              duration: reduced ? 0.01 : 0.42,
              ease: EASE_EXPO,
              opacity: { duration: reduced ? 0.01 : 0.28 },
            }}
            className="overflow-hidden"
          >
            <p className="max-w-2xl pb-7 pr-10 text-[0.9375rem] leading-relaxed text-ink-2">
              {item.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <Section id="faq" labelledBy="faq-heading" tone="raised" space="tight">
      <Shell>
        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.75fr)_minmax(0,1.25fr)] lg:gap-16">
          <SectionHeading
            id="faq-heading"
            label="Questions"
            title="The things people ask first."
            className="lg:sticky lg:top-28 lg:self-start"
          />

          <Reveal delay={0.06}>
            <div className="border-t border-hairline">
              {faqs.map((item, index) => (
                <FaqRow
                  key={item.question}
                  item={item}
                  open={openIndex === index}
                  onToggle={() => setOpenIndex(openIndex === index ? null : index)}
                />
              ))}
            </div>
          </Reveal>
        </div>
      </Shell>
    </Section>
  );
}

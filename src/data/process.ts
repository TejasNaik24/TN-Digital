export type ProcessStep = {
  step: string;
  title: string;
  body: string;
  /** What you actually receive at the end of the stage. */
  output: string;
};

/** Numbered because it genuinely is a sequence — each stage depends on the one
 *  before it. Numbering anything that isn't ordered is decoration. */
export const processSteps: ProcessStep[] = [
  {
    step: '01',
    title: 'Discover',
    body: 'A conversation about your business, your customers, and what the site actually has to accomplish. Scope, timeline, and cost are agreed before any work starts.',
    output: 'Scope, timeline, fixed quote',
  },
  {
    step: '02',
    title: 'Design',
    body: 'Direction, layout, typography, and motion — designed in the browser rather than in a static mockup, so what you approve is what you get.',
    output: 'Design direction & key pages',
  },
  {
    step: '03',
    title: 'Build',
    body: 'The full build: frontend, backend, integrations, CMS if you need one. You get a live preview link from day one and can watch it come together.',
    output: 'Working site on a preview URL',
  },
  {
    step: '04',
    title: 'Launch',
    body: 'Testing across devices, performance and accessibility passes, analytics, then deployment. You get a handover walkthrough and the keys to everything.',
    output: 'Live site, docs, full ownership',
  },
];

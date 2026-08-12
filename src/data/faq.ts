export type FaqItem = { question: string; answer: string };

/**
 * REVIEW BEFORE LAUNCH: these are commitments to prospective clients, especially
 * the timeline and the support answer. Adjust them to what you actually want to
 * promise.
 */
export const faqs: FaqItem[] = [
  {
    question: 'How long does a website take?',
    answer:
      'A focused marketing site is typically two to four weeks from kickoff to launch. Larger builds with custom functionality take longer. You get a real timeline with your quote before anything begins — not an estimate that quietly slips.',
  },
  {
    question: 'Can you redesign an existing website?',
    answer:
      'Yes, and it’s a common starting point. Sometimes that means a full rebuild on modern foundations; sometimes it means keeping what already converts and rebuilding everything around it. I’ll tell you honestly which one your site needs.',
  },
  {
    question: 'Can you build custom functionality or AI features?',
    answer:
      'Yes. Dashboards, booking systems, client portals, integrations with tools you already use, and AI features like assistants, semantic search, or automation. The test is always whether it makes the product genuinely better — not whether it sounds impressive.',
  },
  {
    question: 'Do you offer support after launch?',
    answer:
      'Yes. Every project ends with a handover walkthrough and documentation, so nothing is locked in my head. Ongoing support and maintenance are available if you want them, and entirely optional if you don’t.',
  },
];

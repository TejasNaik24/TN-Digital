import { Gauge, GitBranch, Layers3, MessagesSquare, Ruler, Zap } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export type Reason = {
  title: string;
  body: string;
  icon: LucideIcon;
};

/** Written as plain statements of fact about how the work happens — not
 *  agency-brochure claims. If a line could appear on any studio's site, it's
 *  the wrong line. */
export const reasons: Reason[] = [
  {
    title: 'One person, full ownership',
    body: 'You talk to the person building it. No account manager relaying your feedback, no handoff where the detail quietly goes missing.',
    icon: MessagesSquare,
  },
  {
    title: 'Design and engineering in one head',
    body: 'The person choosing the typography is the person writing the code. Nothing gets watered down in translation between a design file and a build.',
    icon: Layers3,
  },
  {
    title: 'Custom, never a template',
    body: 'Built from scratch around your business. No page builders, no theme a visitor has already seen on three other sites this week.',
    icon: Ruler,
  },
  {
    title: 'Full-stack when you need it',
    body: 'Custom functionality, integrations, dashboards, AI features — built properly into the product rather than bolted on with a plugin.',
    icon: GitBranch,
  },
  {
    title: 'Fast, without cutting corners',
    body: 'Modern AI-assisted development lets me move at studio speed on a solo timeline. It changes how quickly I work, not where the quality bar sits.',
    icon: Zap,
  },
  {
    title: 'Performance and accessibility by default',
    body: 'Not line items on a quote. Fast loads, keyboard support, and real contrast are simply how the site gets built in the first place.',
    icon: Gauge,
  },
];

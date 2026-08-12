import type { ContactValues } from './validation';
import { site } from '@/data/site';

/**
 * The entire contact-form integration lives here, sending through EmailJS.
 *
 * EmailJS's "public key" is designed to be exposed in client-side code (that's
 * the whole model — there's no server to hide it behind), so it's safe to ship
 * in the bundle the same way these three env vars are. Until all three are
 * set, the form says so plainly and falls back to a prefilled email; the same
 * fallback covers a genuine send failure too — nothing is ever silently lost.
 */

const EMAILJS_ENDPOINT = 'https://api.emailjs.com/api/v1.0/email/send';

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID?.trim() ?? '';
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID?.trim() ?? '';
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY?.trim() ?? '';

export const isContactConfigured = Boolean(SERVICE_ID && TEMPLATE_ID && PUBLIC_KEY);

export type SendResult =
  | { status: 'sent' }
  | { status: 'unconfigured' }
  | { status: 'failed'; reason: string };

function composeSubject(values: ContactValues): string {
  const who = values.company.trim() || values.name.trim();
  return `New project enquiry — ${who}`;
}

function composeBody(values: ContactValues): string {
  return [
    `Name: ${values.name}`,
    `Email: ${values.email}`,
    values.company.trim() ? `Company: ${values.company}` : null,
    `Project type: ${values.projectType}`,
    values.budget.trim() ? `Budget: ${values.budget}` : null,
    '',
    values.message,
  ]
    .filter((line): line is string => line !== null)
    .join('\n');
}

/** Used both for the mailto fallback and as EmailJS template variables — the
 *  EmailJS template should reference these same names, e.g. {{from_name}}. */
function templateParams(values: ContactValues) {
  return {
    subject: composeSubject(values),
    from_name: values.name,
    from_email: values.email,
    reply_to: values.email,
    company: values.company.trim() || '—',
    project_type: values.projectType,
    budget: values.budget.trim() || 'Not specified',
    message: values.message,
  };
}

export function buildMailto(values: ContactValues): string {
  const params = new URLSearchParams({
    subject: composeSubject(values),
    body: composeBody(values),
  });
  return `mailto:${site.email}?${params.toString()}`;
}

export async function sendEnquiry(values: ContactValues): Promise<SendResult> {
  if (!isContactConfigured) {
    return { status: 'unconfigured' };
  }

  try {
    const response = await fetch(EMAILJS_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        service_id: SERVICE_ID,
        template_id: TEMPLATE_ID,
        user_id: PUBLIC_KEY,
        template_params: templateParams(values),
      }),
    });

    if (!response.ok) {
      // EmailJS returns a plain-text reason ("template ID not found", "public
      // key is invalid", …) that's genuinely useful while wiring this up.
      const detail = await response.text().catch(() => '');
      return {
        status: 'failed',
        reason: detail || `EmailJS returned ${response.status}.`,
      };
    }

    return { status: 'sent' };
  } catch {
    return {
      status: 'failed',
      reason: 'The message couldn’t be sent — check your connection.',
    };
  }
}

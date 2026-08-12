import type { ContactValues } from './validation';
import { site } from '@/data/site';

/**
 * The entire contact-form integration lives here.
 *
 * Point VITE_CONTACT_ENDPOINT at any form backend that accepts a JSON POST
 * (Formspree, Web3Forms, Basin) and messages start arriving with no code
 * changes. Until that variable is set, the form says so plainly and falls back
 * to a prefilled email — it never pretends to have sent something.
 */

const ENDPOINT = import.meta.env.VITE_CONTACT_ENDPOINT?.trim() ?? '';
const ACCESS_KEY = import.meta.env.VITE_CONTACT_ACCESS_KEY?.trim() ?? '';

export const isContactConfigured = ENDPOINT.length > 0;

export type SendResult =
  | { status: 'sent' }
  | { status: 'unconfigured'; mailto: string }
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

export function buildMailto(values: ContactValues): string {
  const params = new URLSearchParams({
    subject: composeSubject(values),
    body: composeBody(values),
  });
  return `mailto:${site.email}?${params.toString()}`;
}

export async function sendEnquiry(values: ContactValues): Promise<SendResult> {
  if (!isContactConfigured) {
    return { status: 'unconfigured', mailto: buildMailto(values) };
  }

  try {
    const response = await fetch(ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        // Web3Forms wants its key in the payload; harmless for other backends.
        ...(ACCESS_KEY ? { access_key: ACCESS_KEY } : {}),
        subject: composeSubject(values),
        name: values.name,
        email: values.email,
        company: values.company,
        project_type: values.projectType,
        budget: values.budget,
        message: values.message,
      }),
    });

    if (!response.ok) {
      return {
        status: 'failed',
        reason: `The form service returned ${response.status}.`,
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

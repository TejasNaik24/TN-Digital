export type ContactValues = {
  name: string;
  email: string;
  company: string;
  projectType: string;
  budget: string;
  message: string;
};

export type ContactErrors = Partial<Record<keyof ContactValues, string>>;

/**
 * Pragmatic email check: one @, something either side, a dot in the domain.
 * Deliberately not RFC-complete — over-strict patterns reject real addresses,
 * and the endpoint verifies deliverability anyway.
 */
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export const EMPTY_CONTACT: ContactValues = {
  name: '',
  email: '',
  company: '',
  projectType: '',
  budget: '',
  message: '',
};

/** Fields a visitor must fill. Company and budget stay optional on purpose —
 *  every extra required field costs enquiries. */
export const REQUIRED_FIELDS = ['name', 'email', 'projectType', 'message'] as const;

/** Errors say what went wrong *and* what to do about it. */
export function validateField(
  field: keyof ContactValues,
  value: string,
): string | undefined {
  const trimmed = value.trim();

  switch (field) {
    case 'name':
      if (!trimmed) return 'Add your name so I know who I’m replying to.';
      return undefined;
    case 'email':
      if (!trimmed) return 'I need an email address to reply to.';
      if (!EMAIL.test(trimmed)) return 'That address looks incomplete — check for a typo.';
      return undefined;
    case 'projectType':
      if (!trimmed) return 'Pick the closest option — it helps me scope a reply.';
      return undefined;
    case 'message':
      if (!trimmed) return 'Tell me a little about the project.';
      if (trimmed.length < 15) return 'A sentence or two more would help me give a useful answer.';
      return undefined;
    default:
      return undefined;
  }
}

export function validateAll(values: ContactValues): ContactErrors {
  const errors: ContactErrors = {};
  for (const field of REQUIRED_FIELDS) {
    const error = validateField(field, values[field]);
    if (error) errors[field] = error;
  }
  return errors;
}

/**
 * One easing curve and three durations for the entire site.
 *
 * Consistency is what separates "effortlessly alive" from "everything is
 * moving". If a timing value isn't in this file, it shouldn't be in a
 * component.
 */

/** Expo-out. Fast departure, long soft settle — reads expensive. */
export const EASE_EXPO = [0.16, 1, 0.3, 1] as const;

export const DUR = {
  reveal: 0.7,
  panel: 0.5,
  /** Exits run at ~65% of entrances so dismissing never feels sluggish. */
  exit: 0.45,
} as const;

/**
 * Hover/press timings live in Tailwind classes (`duration-[220ms]`) rather than
 * here, because they belong to the element's own transition declaration. 220ms
 * is the number — keep new hover states matching it.
 */

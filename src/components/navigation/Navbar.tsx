import { motion, useMotionValueEvent, useScroll } from 'motion/react';
import { Menu } from 'lucide-react';
import { useState } from 'react';
import { LinkButton } from '@/components/ui/Button';
import { Wordmark } from '@/components/ui/Wordmark';
import { MobileMenu } from './MobileMenu';
import { navLinks } from '@/data/site';
import { cn } from '@/lib/cn';
import { scrollToId, scrollToTop } from '@/lib/scroll';
import { useScrollSpy } from '@/hooks/useScrollSpy';

const sectionIds = navLinks.map((link) => link.href.replace('#', ''));

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { scrollY } = useScroll();
  const active = useScrollSpy(sectionIds);

  useMotionValueEvent(scrollY, 'change', (value) => {
    setScrolled(value > 40);
  });

  return (
    <>
      <motion.header
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="fixed inset-x-0 top-0 z-40"
      >
        {/* Solid surface, NOT `backdrop-filter`.
            A backdrop-filter on a fixed, full-width header is the single worst
            thing for scroll performance in Safari: WebKit re-samples and
            re-blurs everything behind it on every scroll frame, and again on
            any repaint inside the header — including a nav link's hover colour
            transition. That's what made clicking a nav link stall for a beat
            while the identical `scrollToId` call from a plain button elsewhere
            on the page fired instantly. Chrome absorbs it; Safari does not.
            At 92% over a near-black canvas the blur was contributing almost
            nothing visually anyway. */}
        <div
          aria-hidden="true"
          className={cn(
            'pointer-events-none absolute inset-0 -z-10 border-b border-hairline bg-canvas/92 transition-opacity duration-300 ease-out',
            scrolled ? 'opacity-100' : 'opacity-0',
          )}
        />
        <div className="shell flex h-[4.5rem] items-center justify-between gap-6">
          <a
            href="#top"
            aria-label="Tejas Naik — home"
            onClick={(event) => {
              event.preventDefault();
              scrollToTop();
            }}
            className="rounded-lg transition-opacity duration-200 hover:opacity-85"
          >
            <Wordmark />
          </a>

          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {navLinks.map((link) => {
                const id = link.href.replace('#', '');
                const isActive = active === id;
                return (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      aria-current={isActive ? 'true' : undefined}
                      onClick={(event) => {
                        event.preventDefault();
                        scrollToId(id);
                      }}
                      className={cn(
                        'relative block rounded-full px-4 py-2 text-sm transition-colors duration-200',
                        isActive ? 'text-ink' : 'text-ink-2 hover:text-ink',
                      )}
                    >
                      {link.label}
                      {/* Always mounted, opacity-only. This used to be a Motion
                          `layoutId` shared-element FLIP, which forces a
                          synchronous layout measurement every time the scroll
                          spy changes the active link — and that fires
                          repeatedly *during* a scroll. Cross-fading a
                          per-item pill costs nothing and looks the same. */}
                      <span
                        aria-hidden="true"
                        className={cn(
                          'absolute inset-0 -z-10 rounded-full border border-hairline bg-surface/60 transition-opacity duration-300 ease-out',
                          isActive ? 'opacity-100' : 'opacity-0',
                        )}
                      />
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-3">
            <LinkButton
              href="#contact"
              arrow="right"
              className="hidden sm:inline-flex"
              onClick={(event) => {
                event.preventDefault();
                scrollToId('contact');
              }}
            >
              Start a project
            </LinkButton>

            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
              aria-expanded={menuOpen}
              className="grid size-11 place-items-center rounded-full border border-hairline text-ink-2 transition-colors duration-200 hover:border-hairline-strong hover:text-ink lg:hidden"
            >
              <Menu className="size-5" strokeWidth={1.75} />
            </button>
          </div>
        </div>
      </motion.header>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}

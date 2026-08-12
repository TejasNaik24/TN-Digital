import { ArrowUp, Mail } from 'lucide-react';
import { Shell } from './Section';
import { Monogram } from '@/components/ui/Wordmark';
import { GithubIcon, LinkedinIcon } from '@/components/ui/SocialIcons';
import { navLinks, site } from '@/data/site';
import { scrollToId, scrollToTop } from '@/lib/scroll';

const socials = [
  { label: 'GitHub', href: site.social.github, icon: GithubIcon },
  { label: 'LinkedIn', href: site.social.linkedin, icon: LinkedinIcon },
  { label: 'Email', href: `mailto:${site.email}`, icon: Mail },
] as const;

export function Footer() {
  return (
    <footer className="relative border-t border-hairline">
      <Shell className="py-12">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div className="flex items-start gap-4">
            <Monogram />
            <div>
              <p className="text-[0.9375rem] font-medium text-ink">{site.name}</p>
              <p className="mt-1.5 max-w-xs text-[0.875rem] leading-relaxed text-ink-3">
                Websites, web applications, and AI-powered features for companies
                that want to stand out.
              </p>
            </div>
          </div>

          <nav aria-label="Footer" className="md:pt-1">
            <ul className="flex flex-wrap gap-x-7 gap-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(event) => {
                      event.preventDefault();
                      scrollToId(link.href.replace('#', ''));
                    }}
                    className="text-[0.875rem] text-ink-2 transition-colors duration-200 hover:text-ink"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-3">
            {socials.map((social) => {
              const Icon = social.icon;
              const external = social.href.startsWith('http');
              return (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  {...(external
                    ? { target: '_blank', rel: 'noreferrer noopener' }
                    : {})}
                  className="grid size-9 place-items-center rounded-full border border-hairline text-ink-3 transition-[color,border-color,transform] duration-200 hover:-translate-y-0.5 hover:border-hairline-strong hover:text-ink"
                >
                  <Icon className="size-4" strokeWidth={1.75} aria-hidden="true" />
                </a>
              );
            })}
          </div>
        </div>

        <div className="mt-12 flex flex-col-reverse gap-5 border-t border-hairline pt-7 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-[0.75rem] text-ink-3">
            © {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>

          <div className="flex items-center justify-between gap-6 sm:justify-end">
            <p className="font-mono text-[0.75rem] text-ink-3">
              Built with React + TypeScript
            </p>
            <button
              type="button"
              onClick={scrollToTop}
              aria-label="Back to top"
              className="grid size-9 place-items-center rounded-full border border-hairline text-ink-3 transition-[color,border-color,transform] duration-200 hover:-translate-y-0.5 hover:border-hairline-strong hover:text-ink"
            >
              <ArrowUp className="size-4" strokeWidth={1.75} />
            </button>
          </div>
        </div>
      </Shell>
    </footer>
  );
}

import Image from '@/components/ui/skeleton-image';
import {
  ArrowUpRight,
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  Share2,
} from 'lucide-react';

const socialLinks = [
  {
    href: 'https://www.instagram.com/sikkerhetifi/',
    label: 'Instagram',
    icon: Instagram,
  },
  {
    href: 'https://www.linkedin.com/company/sikkerhetifi/',
    label: 'LinkedIn',
    icon: Linkedin,
  },
  {
    href: 'https://www.facebook.com/profile.php?id=100091625065665',
    label: 'Facebook',
    icon: Facebook,
  },
];

const Footer = () => {
  return (
    <footer className="relative isolate w-full overflow-hidden border-t border-white/10 bg-[#03132e] pb-[calc(7rem+env(safe-area-inset-bottom))] pt-10 text-white md:pb-8 md:pt-12">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 -top-40 -z-10 h-[30rem] w-[30rem] rounded-full bg-blue-500/20 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-56 -left-48 -z-10 h-[30rem] w-[30rem] rounded-full bg-cyan-400/10 blur-3xl"
      />

      <div className="mx-auto w-full max-w-6xl px-5 sm:px-8 lg:px-6">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="flex w-full items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.06] p-3.5">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-blue-500/20 text-blue-200">
              <Share2 aria-hidden="true" className="h-[18px] w-[18px]" />
            </span>
            <span className="min-w-0">
              <span className="block text-xs text-blue-200/70">
                Finn oss på
              </span>
              <span className="block text-sm font-semibold text-white">
                Følg oss
              </span>
            </span>
            <div className="ml-auto flex items-center gap-1.5">
              {socialLinks.map((item) => {
                const Icon = item.icon;

                return (
                  <a
                    key={item.label}
                    href={item.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`${item.label} (åpnes i ny fane)`}
                    className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/[0.07] text-blue-100 transition-[background-color,color,transform] hover:-translate-y-0.5 hover:bg-white/[0.15] hover:text-white"
                  >
                    <Icon aria-hidden="true" className="h-4 w-4" />
                  </a>
                );
              })}
            </div>
          </div>

          <div>
            <a
              href="mailto:sikkerhet@ifi.uio.no"
              className="group flex w-full items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.06] p-3.5 transition-colors hover:border-blue-300/30 hover:bg-white/[0.1]"
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-blue-500/20 text-blue-200">
                <Mail aria-hidden="true" className="h-[18px] w-[18px]" />
              </span>
              <span className="min-w-0">
                <span className="block text-xs text-blue-200/70">
                  Send oss en e-post
                </span>
                <span className="block truncate text-sm font-semibold text-white">
                  sikkerhet@ifi.uio.no
                </span>
              </span>
              <ArrowUpRight
                aria-hidden="true"
                className="ml-auto h-4 w-4 shrink-0 text-blue-200/60 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </a>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-5 border-t border-white/10 pt-5 sm:flex-row sm:items-center sm:justify-between">
          <a
            href="https://www.mnemonic.io/"
            target="_blank"
            rel="noreferrer"
            className="group flex w-fit items-center gap-4 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-300 focus-visible:ring-offset-4 focus-visible:ring-offset-[#03132e]"
          >
            <span className="text-xs text-blue-100/55">Samarbeidspartner</span>
            <Image
              src="/images/mnemonic_logo_light.png"
              alt="Mnemonic"
              height={454}
              width={1500}
              sizes="112px"
              className="h-auto w-28 object-contain opacity-80 transition-opacity group-hover:opacity-100"
            />
          </a>

          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-blue-100/50 sm:justify-end">
            <span>© {new Date().getFullYear()} SIFI</span>
            <a
              href="https://data.brreg.no/enhetsregisteret/oppslag/enheter/929168097"
              target="_blank"
              rel="noreferrer"
              className="transition-colors hover:text-blue-100"
            >
              Org.nr. 929 168 097
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

import Link from 'next/link';
import Image from '@/components/ui/skeleton-image';

const Footer = () => {
  return (
    <footer className="w-full border-t border-white/10 bg-[#063f9f] px-[clamp(1rem,5vw,2.5rem)] py-[clamp(2rem,6vw,3rem)] text-blue-50 dark:bg-[#030b18]">
      <div className="mx-auto grid w-full max-w-7xl grid-cols-2 gap-x-[clamp(0.75rem,4vw,2rem)] gap-y-[clamp(2rem,6vw,3rem)] lg:grid-cols-4 lg:gap-8">
        <div className="min-w-0">
          <p className="mb-3 text-[clamp(0.7rem,2.4vw,0.875rem)] font-bold uppercase tracking-[0.14em] text-white">
            Kontakt
          </p>
          <div className="flex flex-col gap-1.5 text-[clamp(0.7rem,2.4vw,0.875rem)] leading-relaxed text-blue-100">
            <a
              href="mailto:sikkerhet@ifi.uio.no"
              className="w-fit max-w-full [overflow-wrap:anywhere] underline-offset-4 hover:text-white hover:underline"
            >
              sikkerhet@ifi.uio.no
            </a>
            <Link
              href="https://data.brreg.no/enhetsregisteret/oppslag/enheter/929168097"
              className="w-fit max-w-full [overflow-wrap:anywhere] underline-offset-4 hover:text-white hover:underline"
            >
              Org.nr. 929 168 097
            </Link>
          </div>
        </div>
        <div className="justify-self-end lg:justify-self-center">
          <p className="mb-3 text-[clamp(0.7rem,2.4vw,0.875rem)] font-bold uppercase tracking-[0.14em] text-white">
            Følg oss
          </p>
          <div className="flex flex-col gap-1.5 text-[clamp(0.7rem,2.4vw,0.875rem)] leading-relaxed text-blue-100">
            <Link
              href="https://www.facebook.com/profile.php?id=100091625065665"
              className="w-fit underline-offset-4 hover:text-white hover:underline"
            >
              Facebook
            </Link>
            <Link
              href="https://www.instagram.com/sikkerhetifi/"
              className="w-fit underline-offset-4 hover:text-white hover:underline"
            >
              Instagram
            </Link>
            <Link
              href="https://www.linkedin.com/company/sikkerhetifi/"
              className="w-fit underline-offset-4 hover:text-white hover:underline"
            >
              LinkedIn
            </Link>
          </div>
        </div>
        <div className="min-w-0 lg:justify-self-center">
          <p className="mb-3 text-[clamp(0.7rem,2.4vw,0.875rem)] font-bold uppercase tracking-[0.14em] text-white">
            <span className="sm:hidden">Partner</span>
            <span className="hidden sm:inline">Samarbeidspartner</span>
          </p>
          <Image
            src="/images/mnemonic_logo_light.png"
            alt="Mnemonic"
            height={60}
            width={160}
            sizes="(max-width: 1023px) 38vw, 150px"
            className="h-auto w-[clamp(6.75rem,38vw,9.375rem)] max-w-full object-contain"
          />
        </div>
        <div className="flex min-w-0 flex-col items-start justify-self-end lg:justify-self-end">
          <p className="mb-3 text-[clamp(0.7rem,2.4vw,0.875rem)] font-bold uppercase tracking-[0.14em] text-white lg:hidden">
            SIFI
          </p>
          <Image
            src="/images/logo_full_utenbak_white.png"
            alt="SIFI logo"
            height={82}
            width={150}
            sizes="(max-width: 1023px) 34vw, 150px"
            className="h-auto w-[clamp(6rem,34vw,9.375rem)] max-w-full shrink-0 object-contain"
          />
        </div>
      </div>
    </footer>
  );
};

export default Footer;

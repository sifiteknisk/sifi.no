import Link from 'next/link';
import Image from 'next/image';

const Footer = () => {
  return (
    <footer className="w-full px-6 md:px-20 py-8 md:py-10 bg-sifiblue">
      <div className="max-w-2xl lg:max-w-screen-xl mx-auto grid grid-cols-2 lg:grid-cols-[1fr_4rem_1fr_4rem_1fr_2rem_minmax(160px,1fr)] gap-8 lg:gap-y-8 lg:gap-x-0 justify-items-center lg:justify-items-start">
        <div className="flex flex-col items-center text-center lg:col-start-1">
          <p className="text-white font-bold text-base mb-2">Ta kontakt:</p>
          <div className="flex flex-col items-center">
            <a href="mailto:sikkerhet@ifi.uio.no" className="hover:underline text-white">
              sikkerhet@ifi.uio.no
            </a>
            <Link href="https://data.brreg.no/enhetsregisteret/oppslag/enheter/929168097" className="text-white hover:underline">
              Organisasjonsnummer: 929 168 097
            </Link>
          </div>
        </div>
        <div className="flex flex-col items-center text-center lg:col-start-3">
          <p className="text-white font-bold text-base mb-2">Følg oss 💻</p>
          <div className="flex flex-col items-center">
            <Link href="https://www.facebook.com/profile.php?id=100091625065665" className="hover:underline text-white">
              Facebook
            </Link>
            <Link href="https://www.instagram.com/sikkerhetifi/" className="hover:underline text-white">
              Instagram
            </Link>
            <Link href="https://www.linkedin.com/company/sikkerhetifi/" className="hover:underline text-white">
              LinkedIn
            </Link>
          </div>
        </div>
        <div className="flex flex-col items-center text-center lg:col-start-5">
          <p className="text-white font-bold text-base mb-2">Hovedsamarbeidspartner:</p>
          <Image src="/images/mnemonic_logo_light.png" alt="Mnemonic logo" height={200} width={167} className="object-contain" />
        </div>
        <div className="flex flex-col items-center text-center lg:col-start-7 min-w-[160px]">
          <Image
            src="/images/logo_full_utenbak_white.png"
            alt="SIFI logo"
            height={120}
            width={160}
            sizes="160px"
            className="w-[160px] h-[120px] shrink-0 object-contain"
          />
        </div>
      </div>
    </footer>
  );
};

export default Footer;

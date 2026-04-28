import Link from 'next/link';
import Image from 'next/image';
import Arrangements from './components/home/Arrangements';
import PhotoStrip from './components/home/PhotoStrip';
import Merch from './components/home/Merch';

export default function Home() {
  return (
    <main className="relative -mt-16 md:-mt-20 pt-16 md:pt-20 min-h-screen">
      <div className="relative z-10">
        <section className="relative w-full max-w-6xl mx-auto px-6 pt-20 pb-10">
          <div className="surface-panel p-8 md:p-12 shadow-md dark:shadow-none">
            <div className="grid grid-cols-1 md:grid-cols-[1.5fr_1fr] gap-8 items-center">
              <div>
                <h1 className="text-4xl font-bold leading-tight max-w-3xl text-black dark:text-white md:hidden">
                  Linjeforening for informasjonssikkerhet
                </h1>
                <h1 className="hidden md:block text-4xl md:text-6xl font-bold leading-tight max-w-3xl">
                  Linjeforening for informasjonssikkerhet
                </h1>
                <p className="text-slate-700 dark:text-gray-300 mt-6 max-w-2xl">
                  Vi er en gjeng med sikkerhetsentusiaster med mål å engasjere
                  studenter ved UiO i sikkerhet.
                </p>

                <div className="flex flex-col sm:flex-row gap-2 md:gap-3 mt-8">
                  <Link
                    href="/about"
                    className="w-full sm:flex-1 text-center text-sm md:text-base px-4 md:px-6 py-3 rounded-full bg-sifiblue text-white font-semibold hover:bg-blue-500 transition-colors"
                  >
                    <span className="sm:hidden">Om oss</span>
                    <span className="hidden sm:inline">Les mer om oss</span>
                  </Link>
                  <Link
                    href="/arrangementer"
                    className="w-full sm:flex-1 text-center text-sm md:text-base px-4 md:px-6 py-3 rounded-full border border-blue-500/40 dark:border-blue-300/50 text-blue-700 dark:text-sky-200 hover:text-blue-900 dark:hover:text-white hover:border-blue-600 dark:hover:border-sky-300 transition-colors"
                  >
                    <span className="sm:hidden">Arrangementer</span>
                    <span className="hidden sm:inline">Se arrangementer</span>
                  </Link>
                </div>
              </div>
              <div className="hidden md:flex p-6 md:p-8 items-center justify-center">
                <Image
                  src="/images/logo_full_utenbak.png"
                  alt="SIFI logo"
                  width={560}
                  height={220}
                  className="h-auto w-full max-w-[22rem] object-contain dark:hidden"
                  priority
                />
                <Image
                  src="/images/logo_full_utenbak_hvitskrift.png"
                  alt="SIFI logo"
                  width={560}
                  height={220}
                  className="hidden h-auto w-full max-w-[22rem] object-contain dark:block"
                  priority
                />
              </div>
            </div>
          </div>
        </section>

        <Arrangements />
        <Merch />
        <PhotoStrip />

        <section className="w-full max-w-6xl mx-auto px-6 py-12 pb-20">
          <div className="p-8 md:p-10">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Samarbeidspartner
            </h2>
            <div className="flex flex-col md:flex-row items-start md:items-center gap-16 mt-8 ml-20">
              <Image
                src="/images/mnemonic-logo.png"
                alt="Mnemonic"
                width={240}
                height={92}
                className="object-contain dark:hidden"
              />
              <Image
                src="/images/mnemonic_logo_light.png"
                alt="Mnemonic"
                width={240}
                height={92}
                className="hidden object-contain dark:block"
              />
              <div>
                <p className="text-slate-700 dark:text-gray-300 max-w-2xl">
                  Vår samarbeidspartner er en av Europas ledende innenfor
                  cybersikkerhetstjenester. Ekspertene deres er alltid klar til
                  å håndtere cyberangrep.
                </p>

                <Link
                  href="https://www.mnemonic.io/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center mt-4 px-5 py-2.5 rounded-full border border-blue-500/40 dark:border-blue-300/50 text-blue-700 dark:text-sky-200 font-medium hover:text-blue-900 dark:hover:text-white hover:border-blue-600 dark:hover:border-sky-300 transition-colors"
                >
                  Les mer om mnemonic
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

import Link from 'next/link';
import { Suspense } from 'react';
import Image from '@/components/ui/skeleton-image';
import { FeatureStripSkeleton } from '@/components/ui/skeleton';
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
                <div className="flex items-center justify-center md:hidden">
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
                <h1 className="site-heading hidden max-w-3xl text-4xl leading-[1.05] md:block md:text-6xl">
                  Linjeforening for informasjonssikkerhet
                </h1>
                <p className="site-copy mt-6 hidden max-w-2xl text-base leading-7 md:block md:text-lg">
                  Vi er en gjeng med sikkerhetsentusiaster med mål å engasjere
                  studenter ved UiO i sikkerhet.
                </p>

                <div className="flex flex-col sm:flex-row gap-2 md:gap-3 mt-8">
                  <Link
                    href="/about"
                    className="cta-pill w-full text-center sm:flex-1 md:text-base"
                  >
                    <span className="sm:hidden">Om oss</span>
                    <span className="hidden sm:inline">Les mer om oss</span>
                  </Link>
                  <Link
                    href="/arrangementer"
                    className="button-secondary w-full text-center sm:flex-1 md:text-base"
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

        <Suspense fallback={<FeatureStripSkeleton />}>
          <Arrangements />
        </Suspense>
        <Suspense fallback={<FeatureStripSkeleton />}>
          <Merch />
        </Suspense>
        <PhotoStrip />

        <section className="w-full max-w-6xl mx-auto px-6 py-12 pb-20">
          <h2 className="site-heading mb-4 text-2xl md:text-3xl">
            Samarbeidspartner
          </h2>
          <div className="flex flex-col md:flex-row items-start md:items-center gap-8 md:gap-16 mt-8 ml-0 md:ml-20">
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
              <p className="site-copy max-w-2xl leading-7">
                Vår samarbeidspartner er en av Europas ledende innenfor
                cybersikkerhetstjenester. Ekspertene deres er alltid klar til å
                håndtere cyberangrep.
              </p>

              <Link
                href="https://www.mnemonic.io/"
                target="_blank"
                rel="noopener noreferrer"
                className="button-secondary mt-5"
              >
                Les mer om mnemonic
              </Link>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

import type { Metadata } from 'next';
import { LockKeyhole, Mail } from 'lucide-react';
import PdfDocuments from './PdfDocuments';

export const metadata: Metadata = {
  title: 'Si ifra | SIFI',
  description: 'Informasjon om varsling og etiske retningslinjer i SIFI.',
};

export default function SiIfraPage() {
  return (
    <main className="w-full py-6 md:py-8">
      <div className="px-1 sm:px-2">
        <section>
          <div className="border-b border-blue-200/60 pb-10 dark:border-blue-300/15 md:pb-14">
            <div className="max-w-3xl">
              <h1 className="site-heading text-4xl md:text-6xl">
                Det skal være trygt å være med i SIFI
              </h1>
              <p className="site-copy mt-5 max-w-2xl text-base leading-7 md:text-lg md:leading-8">
                Si ifra dersom du opplever eller får vite om noe som er
                skadelig, farlig, uetisk eller ulovlig. Når du varsler, gir du
                oss mulighet til å følge opp det som har skjedd og hindre at det
                skjer igjen.
              </p>
            </div>
          </div>

          <div className="grid gap-10 py-10 md:py-14 lg:grid-cols-[1.35fr_0.65fr] lg:gap-0">
            <div className="lg:pr-14">
              <p className="text-sm font-semibold uppercase tracking-[0.14em] text-blue-700 dark:text-blue-300">
                Klar til å si ifra?
              </p>
              <h2 className="mt-2 text-2xl font-bold text-blue-800 dark:text-blue-200 md:text-3xl">
                Kontakt leder eller nestleder
              </h2>
              <p className="site-copy mt-3 max-w-xl text-sm leading-6 md:text-base">
                Hvis varselet gjelder leder, kontakter du nestleder. Du kan be
                en venn, SiO Foreninger, Studentombudet eller andre om hjelp til
                å varsle.
              </p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <a href="mailto:leder@sifi.no" className="cta-pill gap-2">
                  <Mail className="h-4 w-4" aria-hidden="true" />
                  leder@sifi.no
                </a>
                <a
                  href="mailto:nestleder@sifi.no"
                  className="button-secondary gap-2"
                >
                  <Mail className="h-4 w-4" aria-hidden="true" />
                  nestleder@sifi.no
                </a>
              </div>
            </div>

            <aside className="flex flex-col justify-center border-t border-blue-200/60 pt-8 dark:border-blue-300/15 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0">
              <LockKeyhole
                className="h-7 w-7 text-blue-700 dark:text-blue-300"
                aria-hidden="true"
              />
              <h2 className="mt-4 text-xl font-bold">Du kan varsle anonymt</h2>
              <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
                Det kan gjøre det vanskeligere å få nok informasjon til å følge
                opp saken, men det er alltid bedre å varsle anonymt enn å ikke
                varsle.
              </p>
            </aside>
          </div>
        </section>

        <PdfDocuments />
      </div>
    </main>
  );
}

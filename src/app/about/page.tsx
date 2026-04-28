import Image from 'next/image';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

type BoardMember = {
  name: string;
  role: string;
  image?: string;
  images?: string[];
};

type BoardYear = {
  groupPhoto: string;
  members: BoardMember[];
};

const styretImagePath = (year: number, fileName: string) =>
  `/images/Styret/${year}/${fileName}`;
const placeholderImage = '/images/spørsmål.png';

// Store all boards here
const boards: Record<number, BoardYear> = {
  2025: {
    groupPhoto: styretImagePath(2025, 'Styret25ny.jpeg'),
    members: [
      {
        name: 'Pernille Vannebo',
        role: 'Leder',
        image: styretImagePath(2025, 'PernilleLeder.jpeg'),
      },
      {
        name: 'Tobias With Thorsen',
        role: 'Nestleder',
        image: styretImagePath(2025, 'TobiasNestleder.jpeg'),
      },
      {
        name: 'Vegard Otterlei',
        role: 'Økonomiansvarlig',
        image: styretImagePath(2025, 'VegardØkonomi.jpeg'),
      },
      {
        name: 'Magnus Økstad',
        role: 'Bedriftskontakt',
        image: styretImagePath(2025, 'MagnusBedrift.jpeg'),
      },
      {
        name: 'Julia Vister',
        role: 'PR',
        image: styretImagePath(2025, 'JuliaPR.jpeg'),
      },
      {
        name: 'Adrian Skansen',
        role: 'Arrangementansvarlig',
        image: styretImagePath(2025, 'AdrianArrangement.jpeg'),
      },
      {
        name: 'Ahmed Abdulahi Ahmed',
        role: 'Styremedlem',
        image: styretImagePath(2025, 'AhmedStyremedlem.jpeg'),
      },
      {
        name: 'Emil Johannessen',
        role: 'Styremedlem',
        image: styretImagePath(2025, 'EmilStyremedlem.jpeg'),
      },
      {
        name: 'Sindre Vikre',
        role: 'Styremedlem',
        image: styretImagePath(2025, 'SindreStyremedlem.jpeg'),
      },
    ],
  },
  2026: {
    groupPhoto: styretImagePath(2026, 'styret26.jpg'),
    members: [
      {
        name: 'Birk',
        role: 'Leder',
        image: styretImagePath(2026, 'birk.jpg'),
        images: [
          styretImagePath(2026, 'birk.jpg'),
          styretImagePath(2026, 'birk-1.jpg'),
          styretImagePath(2026, 'birk-2.jpg'),
          styretImagePath(2026, 'birk-3.jpg'),
          styretImagePath(2026, 'birk-4.jpg'),
        ],
      },
      {
        name: 'Ny nestleder',
        role: 'Nestleder',
        image: placeholderImage,
      },
      {
        name: 'Ny økonomi',
        role: 'Økonomiansvarlig',
        image: placeholderImage,
      },
      {
        name: 'Ny bedrift',
        role: 'Bedriftskontakt',
        image: placeholderImage,
      },
      { name: 'Ny pr', role: 'PR', image: placeholderImage },
      {
        name: 'Ny arr',
        role: 'Arrangementansvarlig',
        image: placeholderImage,
      },
      {
        name: 'Ny teknisk',
        role: 'Teknisk ansvarlig',
        image: placeholderImage,
      },
      {
        name: 'Ny medlem1',
        role: 'Styremedlem',
        image: placeholderImage,
      },
      {
        name: 'Ny medlem2',
        role: 'Styremedlem',
        image: placeholderImage,
      },
    ],
  },
  2027: {
    groupPhoto: placeholderImage,
    members: [
      { name: 'Ny leder', role: 'Leder', image: placeholderImage },
      { name: 'Ny nestleder', role: 'Nestleder', image: placeholderImage },
      { name: 'Ny økonomi', role: 'Økonomiansvarlig', image: placeholderImage },
      { name: 'Ny bedrift', role: 'Bedriftskontakt', image: placeholderImage },
      { name: 'Ny pr', role: 'PR', image: placeholderImage },
      {
        name: 'Ny arr',
        role: 'Arrangementansvarlig',
        image: placeholderImage,
      },
      {
        name: 'Ny teknisk',
        role: 'Teknisk ansvarlig',
        image: placeholderImage,
      },
      { name: 'Ny medlem1', role: 'Styremedlem', image: placeholderImage },
      { name: 'Ny medlem2', role: 'Styremedlem', image: placeholderImage },
    ],
  },
};

const About = () => {
  const years = Object.keys(boards)
    .map(Number)
    .sort((a, b) => a - b);
  const currentYear = new Date().getFullYear();
  const startYear = years.includes(currentYear)
    ? currentYear
    : years[years.length - 1];

  return (
    <div className="min-h-screen dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">Hvem er vi?</h1>

        {/* Intro */}
        <section className="mb-12">
          <p>
            SIFI, Sikkerhet på IFI, er linjeforeningen for Informasjonssikkerhet
            ved UiO, og alle studenter ved{' '}
            <a
              href="https://www.uio.no/studier/program/informasjonssikkerhet-master/"
              className="hover:underline"
            >
              Master i Informasjonssikkerhet
            </a>{' '}
            er automatisk medlemmer i foreningen.
          </p>
          <p className="mt-4">
            Vi arrangerer sosiale og faglige arrangement for å skape et godt
            miljø for våre medlemmer og andre interesserte studenter ved
            Institutt for Informatikk. Foreningen drives av frivillige og
            engasjerte studenter. Uten om hovedstyret, har SIFI opptil 15
            frivillige studenter som er det vi kaller for interne. De støtter
            hovedstyret med arrangementer og andre oppgaver. Takk til alle
            interne!
          </p>
        </section>

        {/* Board Carousel */}
        <section className="flex flex-col items-center">
          <h2 className="text-2xl font-semibold mb-6">Møt styret</h2>

          <Carousel
            className="w-full"
            opts={{ startIndex: years.indexOf(startYear) }}
          >
            <CarouselContent>
              {years.map((year) => {
                const data = boards[year];

                return (
                  <CarouselItem key={year}>
                    <div className="flex flex-col items-center rounded-2xl border border-gray-200/70 dark:border-gray-700 bg-white/85 dark:bg-gray-800/80 shadow-sm p-4 sm:p-6">
                      <h3 className="text-2xl font-bold mb-5">Styret {year}</h3>

                      {/* Group photo */}
                      <div className="w-full max-w-4xl mx-auto aspect-[16/9] relative mb-6">
                        <Image
                          src={data.groupPhoto}
                          alt={`Styret ${year}`}
                          fill
                          className="w-full rounded-lg shadow-lg object-cover"
                        />
                      </div>

                      {/* Members grid */}
                      <div className="w-full max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                        {data.members.map((member) =>
                          (() => {
                            const hasMontage =
                              Boolean(member.images) &&
                              (member.images?.length ?? 0) > 1;
                            const mainImage = member.image ?? placeholderImage;

                            return (
                              <div
                                key={member.name}
                                className="group flex flex-col items-center text-center bg-white/80 dark:bg-gray-800 p-6 rounded-lg shadow-md w-full backdrop-blur-sm"
                              >
                                <div className="w-full aspect-[3/4] relative mb-4">
                                  {hasMontage ? (
                                    <>
                                      <Image
                                        src={mainImage}
                                        alt={member.name}
                                        fill
                                        sizes="(max-width: 768px) 100vw, 33vw"
                                        className="rounded-lg object-cover transition-opacity duration-300 group-hover:opacity-0"
                                      />
                                      {member.images?.map((imageSrc, index) => (
                                        <Image
                                          key={`${member.name}-montage-${imageSrc}`}
                                          src={imageSrc}
                                          alt={`${member.name} ${index + 1}`}
                                          fill
                                          sizes="(max-width: 768px) 100vw, 33vw"
                                          className="member-montage-frame rounded-lg object-cover opacity-0"
                                          style={{
                                            animationDelay: `${index * 0.8}s`,
                                          }}
                                        />
                                      ))}
                                    </>
                                  ) : member.image ? (
                                    <Image
                                      src={member.image}
                                      alt={member.name}
                                      fill
                                      sizes="(max-width: 768px) 100vw, 33vw"
                                      className="rounded-lg object-cover"
                                    />
                                  ) : (
                                    <div className="h-full w-full rounded-lg bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 flex items-center justify-center">
                                      <p className="text-sm font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-300">
                                        Bilde kommer
                                      </p>
                                    </div>
                                  )}
                                </div>
                                <p className="font-semibold text-lg">
                                  {member.name}
                                </p>
                                <p className="text-sm text-gray-600 dark:text-gray-300">
                                  {member.role}
                                </p>
                              </div>
                            );
                          })()
                        )}
                      </div>
                    </div>
                  </CarouselItem>
                );
              })}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </section>
      </div>
    </div>
  );
};

export default About;

'use client';

import Image from '@/components/ui/skeleton-image';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useMemo, useState } from 'react';
import { boards, placeholderImage, type BoardMember } from './styre-data';

type BoardMemberCardProps = {
  member: BoardMember;
  className?: string;
  imagePositionClass?: string;
  imageSizes?: string;
};

const BoardMemberCard = ({
  member,
  className = '',
  imagePositionClass = 'object-center group-hover:scale-[1.03]',
  imageSizes = '(max-width: 767px) 50vw, (max-width: 1023px) 33vw, 360px',
}: BoardMemberCardProps) => {
  const memberImages = useMemo(() => {
    if (member.images && member.images.length > 0) {
      return member.images;
    }

    return [member.image ?? placeholderImage];
  }, [member.image, member.images]);

  const [isHovered, setIsHovered] = useState(false);
  const [imageIndex, setImageIndex] = useState(0);
  const [isImageLoading, setIsImageLoading] = useState(true);
  const [isMontageReady, setIsMontageReady] = useState(memberImages.length < 2);

  useEffect(() => {
    if (memberImages.length < 2) {
      setIsMontageReady(true);
      return;
    }

    let isCancelled = false;
    setIsMontageReady(false);

    const preloadImages = async () => {
      await Promise.all(
        memberImages.map(async (src) => {
          const preloadedImage = new window.Image();
          const loaded = new Promise<void>((resolve) => {
            preloadedImage.onload = () => resolve();
            preloadedImage.onerror = () => resolve();
          });

          preloadedImage.src = src;

          if (!preloadedImage.complete) {
            await loaded;
          }

          try {
            await preloadedImage.decode();
          } catch {
            // A failed decode should not prevent the remaining montage frames.
          }
        })
      );

      if (!isCancelled) {
        setIsMontageReady(true);
      }
    };

    void preloadImages();

    return () => {
      isCancelled = true;
    };
  }, [memberImages]);

  useEffect(() => {
    if (!isHovered) {
      setImageIndex(0);
      return;
    }

    if (memberImages.length < 2 || !isMontageReady) {
      return;
    }

    let step = 0;
    const timer = setInterval(() => {
      step += 1;
      setImageIndex(step);

      if (step >= memberImages.length - 1) {
        clearInterval(timer);
      }
    }, 560);

    return () => clearInterval(timer);
  }, [isHovered, isMontageReady, memberImages]);

  useEffect(() => {
    if (!member.anonymous) {
      return;
    }

    const timer = setTimeout(() => {
      setIsImageLoading(false);
    }, 180);

    return () => clearTimeout(timer);
  }, [member.anonymous]);

  return (
    <motion.div
      className={`group relative min-h-[13rem] w-full overflow-hidden rounded-xl border border-white/35 bg-slate-200 shadow-md shadow-blue-200/30 sm:min-h-[17rem] sm:rounded-2xl dark:border-white/10 dark:bg-slate-800 dark:shadow-none lg:min-h-0 ${className}`}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <div className="absolute inset-0 overflow-hidden bg-white dark:bg-gray-900">
        <AnimatePresence initial={false}>
          <motion.div
            key={`${member.name}-${memberImages[imageIndex]}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.16, ease: 'easeOut' }}
            className="absolute inset-0"
          >
            {member.anonymous ? (
              <div className="absolute inset-0 flex items-center justify-center overflow-hidden bg-slate-950">
                <div className="h-full w-full origin-center overflow-hidden">
                  <Image
                    src={memberImages[imageIndex]}
                    alt={member.name}
                    fill
                    sizes={imageSizes}
                    quality={90}
                    className={`object-cover transition-transform duration-500 ${imagePositionClass}`}
                  />
                </div>
              </div>
            ) : (
              <Image
                src={memberImages[imageIndex]}
                alt={member.name}
                fill
                sizes={imageSizes}
                quality={90}
                className={`object-cover transition-transform duration-500 ${imagePositionClass}`}
                onLoadingComplete={() => setIsImageLoading(false)}
              />
            )}
          </motion.div>
        </AnimatePresence>
        <div
          className={`pointer-events-none absolute inset-0 transition-opacity duration-300 ${
            isImageLoading ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div className="h-full w-full animate-pulse bg-gradient-to-br from-gray-200 via-gray-100 to-gray-200 dark:from-gray-800 dark:via-gray-700 dark:to-gray-800" />
        </div>
      </div>
      <div className="absolute inset-x-0 bottom-0 border-t border-white/30 bg-slate-950/35 px-3 py-2.5 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.2)] backdrop-blur-xl backdrop-saturate-150 dark:border-white/15 dark:bg-slate-950/45">
        <motion.p className="truncate text-sm font-semibold leading-tight drop-shadow-sm">
          {member.name}
        </motion.p>
        <p className="mt-0.5 truncate text-[11px] leading-tight text-white/75">
          {member.role}
        </p>
      </div>
    </motion.div>
  );
};

const About = () => {
  const years = Object.keys(boards)
    .map(Number)
    .filter((year) => boards[year].groupPhoto !== placeholderImage)
    .sort((a, b) => a - b);
  const currentYear = new Date().getFullYear();
  const startYear = years.includes(currentYear)
    ? currentYear
    : years[years.length - 1];
  const [selectedYear, setSelectedYear] = useState(startYear);
  const selectedBoard = boards[selectedYear];

  return (
    <main className="w-full py-6 md:py-8">
      <div className="surface-panel p-4 sm:p-6 md:p-8">
        <header className="grid gap-7 lg:grid-cols-[minmax(220px,0.65fr)_minmax(0,1.65fr)] lg:gap-12">
          <div className="self-start rounded-2xl border border-white/15 bg-[var(--brand-panel)] p-5 shadow-lg shadow-blue-300/30 sm:p-6 dark:shadow-none">
            <h1 className="site-heading !text-[var(--on-brand)] text-4xl leading-[0.95] sm:text-5xl lg:text-6xl">
              <span className="block">Hvem er</span>
              <span className="block !text-[var(--on-brand-muted)]">vi?</span>
            </h1>
          </div>

          <div className="site-copy grid gap-5 lg:grid-cols-[0.9fr_1.1fr] lg:gap-0">
            <p className="text-base font-medium leading-7 text-slate-800 sm:text-lg sm:leading-8 dark:text-slate-200 lg:pr-7">
              SIFI, Sikkerhet på IFI, er linjeforeningen for
              Informasjonssikkerhet ved UiO, og alle studenter ved{' '}
              <a
                href="https://www.uio.no/studier/program/informasjonssikkerhet-master/"
                className="site-link"
              >
                Master i Informasjonssikkerhet
              </a>{' '}
              er automatisk medlemmer i foreningen.
            </p>
            <p className="border-t border-blue-200/60 pt-5 text-sm leading-6 sm:text-base sm:leading-7 dark:border-blue-300/15 lg:border-l lg:border-t-0 lg:py-1 lg:pl-7">
              Vi arrangerer sosiale og faglige arrangement for å skape et godt
              miljø for våre medlemmer og andre interesserte studenter ved
              Institutt for Informatikk. Foreningen drives av frivillige og
              engasjerte studenter. Uten om hovedstyret, har SIFI opptil 15
              frivillige studenter som er det vi kaller for interne. De støtter
              hovedstyret med arrangementer og andre oppgaver. Takk til alle
              interne!
            </p>
          </div>
        </header>

        <section
          className="mt-8 border-t border-blue-200/60 pt-7 dark:border-blue-300/15 md:mt-10 md:pt-8"
          aria-labelledby="board-heading"
        >
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <h2
              id="board-heading"
              className="site-heading text-2xl md:text-3xl"
            >
              Styret {selectedYear}
            </h2>

            <div className="flex gap-1" aria-label="Velg styreår">
              {years.map((year) => (
                <button
                  key={year}
                  type="button"
                  onClick={() => setSelectedYear(year)}
                  aria-pressed={selectedYear === year}
                  className={`rounded-full px-3.5 py-1.5 text-sm font-semibold transition-colors ${
                    selectedYear === year
                      ? 'bg-blue-600 text-white dark:bg-blue-500 dark:text-white'
                      : 'text-slate-600 hover:bg-blue-50 hover:text-slate-950 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white'
                  }`}
                >
                  {year}
                </button>
              ))}
            </div>
          </div>

          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={selectedYear}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.22, ease: 'easeOut' }}
            >
              <figure className="surface-card mt-5 p-2 sm:mt-6 sm:p-3">
                <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-slate-200 sm:aspect-[16/9] md:aspect-[21/8] dark:bg-slate-800">
                  <Image
                    src={selectedBoard.groupPhoto}
                    alt={`Styret ${selectedYear}`}
                    fill
                    sizes="(max-width: 1200px) 100vw, 1100px"
                    quality={90}
                    className={`object-cover ${
                      selectedYear === 2025
                        ? 'object-[center_20%]'
                        : 'object-[center_35%]'
                    }`}
                  />
                </div>
              </figure>

              <div className="mt-3 grid grid-cols-2 gap-3 sm:mt-4 md:grid-cols-3 md:gap-4 lg:auto-rows-[15rem] lg:grid-cols-12">
                {selectedBoard.members.map((member, index) => {
                  const desktopLayout = [
                    'col-span-2 min-h-[20rem] sm:min-h-[24rem] md:min-h-[22rem] lg:col-span-5 lg:row-span-2 lg:min-h-0',
                    'lg:col-span-3',
                    'lg:col-span-4',
                    'lg:col-span-4',
                    'lg:col-span-3',
                    'lg:col-span-3',
                    'lg:col-span-3',
                    'lg:col-span-3',
                    'lg:col-span-3',
                  ][index];

                  return (
                    <BoardMemberCard
                      key={member.name}
                      member={member}
                      className={desktopLayout}
                      imageSizes={
                        index === 0
                          ? '(max-width: 767px) calc(100vw - 64px), (max-width: 1023px) 66vw, 460px'
                          : '(max-width: 767px) 50vw, (max-width: 1023px) 33vw, 360px'
                      }
                      imagePositionClass={
                        selectedYear !== 2025 ||
                        ['Adrian Skansen', 'Magnus Økstad'].includes(
                          member.name
                        )
                          ? 'object-center group-hover:scale-[1.03]'
                          : ['Pernille Vannebo', 'Sindre Vikre'].includes(
                                member.name
                              )
                            ? 'object-bottom -translate-y-[4%] scale-[1.12] group-hover:-translate-y-[4%] group-hover:scale-[1.15]'
                            : member.name === 'Vegard Otterlei'
                              ? 'object-[center_85%] group-hover:scale-[1.03]'
                              : 'object-[center_78%] group-hover:scale-[1.03]'
                      }
                    />
                  );
                })}
              </div>
            </motion.div>
          </AnimatePresence>
        </section>
      </div>
    </main>
  );
};

export default About;

'use client';

import Image from '@/components/ui/skeleton-image';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { getImageProps } from 'next/image';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { createPortal } from 'react-dom';
import { boards, placeholderImage, type BoardMember } from './styre-data';

const imagePreloadPromises = new Map<string, Promise<void>>();

const preloadCardImage = (src: string, sizes: string) => {
  const cacheKey = `${src}|${sizes}`;
  const existingPromise = imagePreloadPromises.get(cacheKey);

  if (existingPromise) {
    return existingPromise;
  }

  const preloadPromise = new Promise<void>((resolve) => {
    const { props } = getImageProps({
      src,
      alt: '',
      fill: true,
      sizes,
      unoptimized: true,
    });
    const preloadedImage = new window.Image();

    preloadedImage.decoding = 'async';
    preloadedImage.sizes = props.sizes ?? sizes;
    preloadedImage.srcset = props.srcSet ?? '';
    preloadedImage.onload = () => {
      void preloadedImage
        .decode()
        .catch(() => undefined)
        .finally(resolve);
    };
    preloadedImage.onerror = () => resolve();
    preloadedImage.src = props.src;
  });

  imagePreloadPromises.set(cacheKey, preloadPromise);
  return preloadPromise;
};

type BoardMemberCardProps = {
  member: BoardMember;
  className?: string;
  imagePositionClass?: string;
  imageSizes?: string;
  onOpen: () => void;
};

const BoardMemberCard = ({
  member,
  className = '',
  imagePositionClass = 'object-center group-hover:scale-[1.03]',
  imageSizes = '(max-width: 767px) 50vw, (max-width: 1023px) 33vw, 360px',
  onOpen,
}: BoardMemberCardProps) => {
  const memberImages = useMemo(() => {
    if (member.images && member.images.length > 0) {
      return member.images;
    }

    return [member.image ?? placeholderImage];
  }, [member.image, member.images]);

  const [isHovered, setIsHovered] = useState(false);
  const [imageIndex, setImageIndex] = useState(0);
  const [isMontageReady, setIsMontageReady] = useState(memberImages.length < 2);

  const prepareMontage = useCallback(() => {
    if (memberImages.length < 2) {
      setIsMontageReady(true);
      return;
    }

    setIsMontageReady(false);

    void Promise.all(
      memberImages.map((src) => preloadCardImage(src, imageSizes))
    ).then(() => {
      setIsMontageReady(true);
    });
  }, [imageSizes, memberImages]);

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

  return (
    <motion.button
      type="button"
      aria-label={`Åpne bilde av ${member.name}`}
      className={`surface-card group relative min-h-[13rem] w-full cursor-zoom-in overflow-hidden bg-slate-200 text-left outline-none ring-blue-500 ring-offset-2 focus-visible:ring-2 sm:min-h-[17rem] dark:bg-slate-800 dark:ring-offset-slate-950 lg:min-h-0 ${className}`}
      onClick={onOpen}
      onHoverStart={() => {
        prepareMontage();
        setIsHovered(true);
      }}
      onHoverEnd={() => setIsHovered(false)}
    >
      <div className="absolute inset-0 overflow-hidden bg-white dark:bg-gray-900">
        <AnimatePresence mode="wait">
          <motion.div
            key={`${member.name}-${memberImages[imageIndex]}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.24, ease: 'easeInOut' }}
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
                    unoptimized
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
                unoptimized
                className={`object-cover transition-transform duration-500 ${imagePositionClass}`}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </div>
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/95 via-slate-950/70 to-transparent px-3 pb-3 pt-12 text-white">
        <motion.p className="truncate text-sm font-semibold leading-tight drop-shadow-sm">
          {member.name}
        </motion.p>
        <p className="mt-0.5 truncate text-[11px] leading-tight text-white/75">
          {member.role}
        </p>
      </div>
    </motion.button>
  );
};

type LightboxItem = {
  src: string;
  label: string;
};

type LightboxPhoto = {
  items: LightboxItem[];
  itemIndex: number;
};

const PhotoLightbox = ({
  photo,
  onClose,
  onItemChange,
}: {
  photo: LightboxPhoto;
  onClose: () => void;
  onItemChange: (itemIndex: number) => void;
}) => {
  const hasMultiplePeople = photo.items.length > 1;
  const currentItem = photo.items[photo.itemIndex];

  const showPrevious = useCallback(() => {
    onItemChange(
      (photo.itemIndex - 1 + photo.items.length) % photo.items.length
    );
  }, [onItemChange, photo.itemIndex, photo.items.length]);

  const showNext = useCallback(() => {
    onItemChange((photo.itemIndex + 1) % photo.items.length);
  }, [onItemChange, photo.itemIndex, photo.items.length]);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
      if (event.key === 'ArrowLeft' && hasMultiplePeople) showPrevious();
      if (event.key === 'ArrowRight' && hasMultiplePeople) showNext();
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [hasMultiplePeople, onClose, showNext, showPrevious]);

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label={currentItem.label}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/90 p-3 backdrop-blur-sm sm:p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.18 }}
      onClick={onClose}
    >
      <motion.div
        className="pointer-events-none relative flex h-full w-full max-w-6xl items-center justify-center"
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.97 }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
      >
        <div className="absolute inset-0 bottom-12">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentItem.src}
              className="absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.16 }}
            >
              <Image
                src={currentItem.src}
                alt={currentItem.label}
                fill
                sizes="100vw"
                unoptimized
                priority
                className="object-contain"
              />
            </motion.div>
          </AnimatePresence>
        </div>

        <button
          type="button"
          onClick={onClose}
          autoFocus
          aria-label="Lukk bilde"
          className="pointer-events-auto absolute right-0 top-0 z-10 rounded-full bg-slate-950/65 p-2 text-white transition-colors hover:bg-white hover:text-slate-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
        >
          <X className="h-6 w-6" aria-hidden="true" />
        </button>

        {hasMultiplePeople && (
          <>
            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                showPrevious();
              }}
              aria-label="Forrige person"
              className="pointer-events-auto absolute left-0 z-10 rounded-full bg-slate-950/65 p-2 text-white transition-colors hover:bg-white hover:text-slate-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white sm:p-3"
            >
              <ChevronLeft className="h-6 w-6" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                showNext();
              }}
              aria-label="Neste person"
              className="pointer-events-auto absolute right-0 z-10 rounded-full bg-slate-950/65 p-2 text-white transition-colors hover:bg-white hover:text-slate-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white sm:p-3"
            >
              <ChevronRight className="h-6 w-6" aria-hidden="true" />
            </button>
          </>
        )}

        <p className="absolute inset-x-12 bottom-2 text-center text-sm font-medium text-white sm:text-base">
          {currentItem.label}
          {hasMultiplePeople && (
            <span className="ml-2 text-white/60">
              {photo.itemIndex + 1} / {photo.items.length}
            </span>
          )}
        </p>
      </motion.div>
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
  const [lightboxPhoto, setLightboxPhoto] = useState<LightboxPhoto | null>(
    null
  );
  const selectedBoard = boards[selectedYear];

  return (
    <main className="w-full py-6 md:py-8">
      <div className="px-1 py-2 sm:px-2">
        <header className="grid gap-7 lg:grid-cols-[minmax(220px,0.65fr)_minmax(0,0.64fr)_minmax(0,1.01fr)] lg:items-center lg:gap-0">
          <div className="flex min-h-40 self-stretch lg:min-h-0 lg:pr-7">
            <h1 className="site-heading flex min-h-40 flex-1 flex-col items-center justify-center text-center text-[clamp(3.5rem,14vw,4.75rem)] leading-[0.9] text-blue-800 dark:text-blue-100 lg:min-h-0">
              <span className="block">Hvem</span>
              <span className="block whitespace-nowrap text-blue-600 dark:text-blue-300">
                er vi?
              </span>
            </h1>
          </div>

          <div className="site-copy grid gap-5 lg:contents">
            <p className="text-pretty text-base font-medium leading-7 text-slate-800 sm:text-[1.0625rem] sm:leading-8 dark:text-slate-200 lg:px-7 lg:text-right">
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
            <p className="text-pretty border-t border-blue-200/60 pt-5 text-base leading-7 sm:text-[1.0625rem] sm:leading-8 dark:border-blue-300/15 lg:border-l lg:border-t-0 lg:py-0 lg:pl-7">
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

          <motion.div
            key={selectedYear}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
          >
            <figure className="surface-card mt-5 p-2 sm:mt-6 sm:p-3">
              <button
                type="button"
                aria-label={`Åpne gruppebilde av styret ${selectedYear}`}
                onClick={() =>
                  setLightboxPhoto({
                    items: [
                      {
                        src: selectedBoard.groupPhoto,
                        label: `Styret ${selectedYear}`,
                      },
                    ],
                    itemIndex: 0,
                  })
                }
                className="relative block aspect-[4/3] w-full cursor-zoom-in overflow-hidden rounded-xl bg-slate-200 outline-none ring-blue-500 ring-offset-2 focus-visible:ring-2 sm:aspect-[16/9] md:aspect-[21/8] dark:bg-slate-800 dark:ring-offset-slate-950"
              >
                <Image
                  src={selectedBoard.groupPhoto}
                  alt={`Styret ${selectedYear}`}
                  fill
                  sizes="(max-width: 1200px) 100vw, 1100px"
                  unoptimized
                  className={`object-cover ${
                    selectedYear === 2025
                      ? 'object-[center_20%]'
                      : 'object-[center_35%]'
                  }`}
                />
              </button>
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
                    onOpen={() =>
                      setLightboxPhoto({
                        items: selectedBoard.members.map((boardMember) => ({
                          src:
                            boardMember.image ??
                            boardMember.images?.[0] ??
                            placeholderImage,
                          label: `${boardMember.name} – ${boardMember.role}`,
                        })),
                        itemIndex: index,
                      })
                    }
                    className={desktopLayout}
                    imageSizes={
                      index === 0
                        ? '(max-width: 767px) calc(100vw - 64px), (max-width: 1023px) 66vw, 460px'
                        : '(max-width: 767px) 50vw, (max-width: 1023px) 33vw, 360px'
                    }
                    imagePositionClass={
                      selectedYear !== 2025 ||
                      ['Adrian Skansen', 'Magnus Økstad'].includes(member.name)
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
        </section>
      </div>

      {typeof document !== 'undefined' &&
        createPortal(
          <AnimatePresence>
            {lightboxPhoto && (
              <PhotoLightbox
                photo={lightboxPhoto}
                onClose={() => setLightboxPhoto(null)}
                onItemChange={(itemIndex) =>
                  setLightboxPhoto((photo) =>
                    photo ? { ...photo, itemIndex } : null
                  )
                }
              />
            )}
          </AnimatePresence>,
          document.body
        )}
    </main>
  );
};

export default About;

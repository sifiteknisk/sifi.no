'use client';

import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import { AsciiMedia } from 'ascii-react';
import { useEffect, useMemo, useState } from 'react';
import { boards, placeholderImage, type BoardMember } from './styre-data';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

type BoardMemberCardProps = {
  member: BoardMember;
};

type ScrambleTextProps = {
  text: string;
  isActive: boolean;
  scrambleDuration?: number;
  stagger?: number;
  cycles?: number;
  characters?: string;
  className?: string;
};

const ScrambleText = ({
  text,
  isActive,
  scrambleDuration = 0.6,
  stagger = 0.03,
  cycles = 12,
  characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*',
  className,
}: ScrambleTextProps) => {
  const [displayText, setDisplayText] = useState(text);

  useEffect(() => {
    if (!isActive) {
      setDisplayText(text);
      return;
    }

    const letters = text.split('');
    const totalTicks = Math.max(1, Math.floor((scrambleDuration * 1000) / 30));
    let tick = 0;

    const timer = setInterval(() => {
      tick += 1;
      const progress = tick / totalTicks;

      const nextText = letters
        .map((letter, index) => {
          const revealAt = index * stagger;

          if (progress >= revealAt) {
            return letter;
          }

          if (letter === ' ') {
            return ' ';
          }

          const charIndex = (tick + index * cycles) % characters.length;
          return characters[charIndex];
        })
        .join('');

      setDisplayText(nextText);

      if (tick >= totalTicks) {
        setDisplayText(text);
        clearInterval(timer);
      }
    }, 30);

    return () => clearInterval(timer);
  }, [characters, cycles, isActive, scrambleDuration, stagger, text]);

  return <span className={className}>{displayText}</span>;
};

const BoardMemberCard = ({ member }: BoardMemberCardProps) => {
  const memberImages = useMemo(() => {
    if (member.images && member.images.length > 0) {
      return member.images;
    }

    return [member.image ?? placeholderImage];
  }, [member.image, member.images]);

  const [isHovered, setIsHovered] = useState(false);
  const [imageIndex, setImageIndex] = useState(0);
  const [isImageLoading, setIsImageLoading] = useState(true);

  useEffect(() => {
    if (!isHovered) {
      setImageIndex(0);
      return;
    }

    if (memberImages.length < 2) {
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
  }, [isHovered, memberImages]);

  useEffect(() => {
    setIsImageLoading(true);
  }, [imageIndex]);

  useEffect(() => {
    if (!member.anonymous) {
      return;
    }

    const timer = setTimeout(() => {
      setIsImageLoading(false);
    }, 180);

    return () => clearTimeout(timer);
  }, [imageIndex, member.anonymous]);

  return (
    <motion.div
      className="group w-full overflow-hidden rounded-lg bg-white/80 dark:bg-gray-800 shadow-md backdrop-blur-sm"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <div className="w-full aspect-[3/4] relative overflow-hidden bg-white dark:bg-gray-900">
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
              <div className="absolute inset-0 flex items-center justify-center rounded-lg overflow-hidden bg-[#eff6ff] dark:bg-[#111827]">
                <div className="ascii-fit h-full w-full origin-center overflow-hidden">
                  <AsciiMedia
                    src={memberImages[imageIndex]}
                    mediaType="image"
                    resolution={70}
                    fontSize={8}
                    charInterval={120}
                    color="#2563eb"
                    charsRandomLevel="group"
                    backgroundColor="#00000000"
                  />
                </div>
              </div>
            ) : (
              <Image
                src={memberImages[imageIndex]}
                alt={member.name}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover"
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
      <motion.p
        className="px-4 pt-4 text-center font-semibold text-lg"
        whileHover={
          member.anonymous
            ? {
                textShadow: [
                  '0 0 0 rgba(0,0,0,0)',
                  '1px 0 0 rgba(255,0,80,0.7), -1px 0 0 rgba(0,220,255,0.7)',
                  '0 0 0 rgba(0,0,0,0)',
                ],
              }
            : undefined
        }
        transition={
          member.anonymous ? { duration: 0.22, ease: 'linear' } : undefined
        }
      >
        {member.anonymous ? (
          <ScrambleText
            text={member.name}
            isActive={isHovered}
            className="font-mono"
          />
        ) : (
          member.name
        )}
      </motion.p>
      <p className="px-4 pb-4 text-center text-sm text-gray-600 dark:text-gray-300">
        {member.role}
      </p>
    </motion.div>
  );
};

const About = () => {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

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

          {hasMounted ? (
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
                          {data.members.map((member) => (
                            <BoardMemberCard key={member.name} member={member} />
                          ))}
                        </div>
                      </div>
                    </CarouselItem>
                  );
                })}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          ) : (
            <div className="w-full h-24 rounded-2xl bg-gray-100 dark:bg-gray-800 animate-pulse" />
          )}
        </section>
      </div>
    </div>
  );
};

export default About;

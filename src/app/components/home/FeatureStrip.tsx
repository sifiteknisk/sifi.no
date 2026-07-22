import Link from 'next/link';
import Image from '@/components/ui/skeleton-image';
import { ArrowRight } from 'lucide-react';

type StripItem = {
  id: string;
  href: string;
  title: string;
  imageUrl?: string | null;
  metaText?: string;
  description?: string;
};

type FeatureStripProps = {
  title: string;
  subtitle?: string;
  viewAllHref: string;
  viewAllLabel: string;
  featured: StripItem;
  sideItems: StripItem[];
  placeholders: number;
  placeholderTitle: string;
  sideStyle?: 'text' | 'imageOverlay';
  hideImageText?: boolean;
};

export default function FeatureStrip({
  title,
  subtitle,
  viewAllHref,
  viewAllLabel,
  featured,
  sideItems,
  placeholders,
  placeholderTitle,
  sideStyle = 'text',
  hideImageText = false,
}: FeatureStripProps) {
  const showImageText = !hideImageText;

  return (
    <section className="w-full max-w-6xl mx-auto px-6 py-10">
      <div className="mb-6">
        <div>
          <h2 className="site-heading text-2xl md:text-3xl">{title}</h2>
          {subtitle ? <p className="site-copy mt-1">{subtitle}</p> : null}
        </div>
      </div>

      <div className="hidden md:grid grid-cols-[2fr_1fr] gap-6">
        <Link
          href={featured.href}
          className="group surface-card relative min-h-[22rem] overflow-hidden transition-colors hover:border-blue-500/60 dark:hover:border-blue-400/60"
        >
          {featured.imageUrl ? (
            <Image
              src={featured.imageUrl}
              alt={featured.title}
              width={1200}
              height={675}
              sizes="(max-width: 767px) 1px, (max-width: 1152px) 64vw, 720px"
              quality={80}
              className="absolute inset-0 w-full h-full object-cover"
            />
          ) : (
            <div className="absolute inset-0 bg-slate-200 dark:bg-slate-800" />
          )}
          {showImageText ? (
            <div className="absolute inset-x-0 bottom-0 border-t border-blue-300/25 bg-white/85 p-6 backdrop-blur-md dark:border-blue-300/15 dark:bg-slate-950/80">
              {featured.metaText ? (
                <p className="mb-2 text-sm text-blue-700 dark:text-blue-300">
                  {featured.metaText}
                </p>
              ) : null}
              <h3 className="text-2xl font-semibold tracking-tight transition-colors group-hover:text-blue-800 dark:group-hover:text-blue-200">
                {featured.title}
              </h3>
              {featured.description ? (
                <p className="site-copy mt-3 leading-6">
                  {featured.description}
                </p>
              ) : null}
            </div>
          ) : null}
        </Link>

        <div className="grid gap-4">
          {sideItems.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              className={`surface-card ${sideStyle === 'imageOverlay' ? 'relative overflow-hidden min-h-[10rem]' : 'p-4'} transition-colors hover:border-blue-500/60 dark:hover:border-blue-400/60`}
            >
              {sideStyle === 'imageOverlay' ? (
                <>
                  {item.imageUrl ? (
                    <Image
                      src={item.imageUrl}
                      alt={item.title}
                      width={700}
                      height={420}
                      sizes="(max-width: 767px) 1px, (max-width: 1152px) 31vw, 350px"
                      quality={80}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-slate-200 dark:bg-slate-800" />
                  )}
                  {showImageText ? (
                    <div className="absolute inset-x-0 bottom-0 border-t border-blue-300/25 bg-white/85 p-3 backdrop-blur-md dark:border-blue-300/15 dark:bg-slate-950/80">
                      {item.metaText ? (
                        <p className="mb-1 text-xs text-blue-700 dark:text-blue-300">
                          {item.metaText}
                        </p>
                      ) : null}
                      <h3 className="font-semibold">{item.title}</h3>
                    </div>
                  ) : null}
                </>
              ) : (
                <>
                  {item.metaText ? (
                    <p className="mb-1 text-xs text-blue-700 dark:text-blue-300">
                      {item.metaText}
                    </p>
                  ) : null}
                  <h3 className="font-semibold">{item.title}</h3>
                </>
              )}
            </Link>
          ))}

          {Array.from({ length: placeholders }).map((_, index) => (
            <div
              key={`${title.toLowerCase()}-placeholder-${index}`}
              className="surface-card-soft p-4"
            >
              <p className="mb-1 text-xs text-blue-700/70 dark:text-blue-300/70">
                Kommer snart
              </p>
              <h3 className="font-semibold text-slate-700/80 dark:text-gray-300/80">
                {placeholderTitle}
              </h3>
            </div>
          ))}

          <Link
            href={viewAllHref}
            className="group surface-card-soft flex min-h-[5.5rem] items-center justify-between gap-4 p-4 transition-colors hover:border-blue-500/60 dark:hover:border-blue-400/60"
          >
            <div>
              <p className="eyebrow mb-1">Utforsk</p>
              <p className="font-semibold">{viewAllLabel}</p>
            </div>
            <ArrowRight
              aria-hidden="true"
              className="h-5 w-5 shrink-0 text-blue-600 transition-transform group-hover:translate-x-1 dark:text-blue-300"
            />
          </Link>
        </div>
      </div>

      <div className="space-y-3 md:hidden">
        <Link
          href={featured.href}
          className="surface-card overflow-hidden block"
        >
          {featured.imageUrl ? (
            <Image
              src={featured.imageUrl}
              alt={featured.title}
              width={900}
              height={520}
              sizes="(max-width: 767px) calc(100vw - 48px), 1px"
              quality={80}
              className="w-full h-52 object-cover"
            />
          ) : null}
          {showImageText ? (
            <div className="p-4">
              {featured.metaText ? (
                <p className="mb-1 text-xs text-blue-700 dark:text-blue-300">
                  {featured.metaText}
                </p>
              ) : null}
              <h3 className="font-semibold">{featured.title}</h3>
            </div>
          ) : null}
        </Link>

        <Link
          href={viewAllHref}
          className="group surface-card-soft flex min-h-[4.75rem] items-center justify-between gap-4 p-4 transition-colors hover:border-blue-500/60 dark:hover:border-blue-400/60"
        >
          <div>
            <p className="eyebrow mb-1">Utforsk</p>
            <p className="font-semibold">{viewAllLabel}</p>
          </div>
          <ArrowRight
            aria-hidden="true"
            className="h-5 w-5 shrink-0 text-blue-600 transition-transform group-hover:translate-x-1 dark:text-blue-300"
          />
        </Link>
      </div>
    </section>
  );
}

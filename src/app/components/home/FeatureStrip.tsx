import Link from 'next/link';
import Image from 'next/image';
import ScrambledText from './ScrambledText';

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
  scramblePlaceholderText?: boolean;
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
  scramblePlaceholderText = false,
  sideStyle = 'text',
  hideImageText = false,
}: FeatureStripProps) {
  const showImageText = !hideImageText;

  return (
    <section className="w-full max-w-6xl mx-auto px-6 py-10">
      <div className="mb-6 flex items-start justify-between gap-4">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold">{title}</h2>
          {subtitle ? <p className="text-slate-700 dark:text-gray-300 mt-1">{subtitle}</p> : null}
        </div>
        <Link href={viewAllHref} className="cta-pill shrink-0 md:hidden">
          {viewAllLabel}
        </Link>
      </div>

      <div className="hidden md:grid grid-cols-[2fr_1fr] gap-6">
        <Link
          href={featured.href}
          className="group surface-card relative overflow-hidden hover:border-sky-500/60 dark:hover:border-sky-400/60 transition-colors min-h-[22rem]"
        >
          {featured.imageUrl ? (
            <Image
              src={featured.imageUrl}
              alt={featured.title}
              width={1200}
              height={675}
              className="absolute inset-0 w-full h-full object-cover"
            />
          ) : (
            <div className="absolute inset-0 bg-slate-200 dark:bg-slate-800" />
          )}
          {showImageText ? (
            <div className="absolute inset-x-0 bottom-0 border-t border-blue-300/35 dark:border-blue-300/20 bg-white/75 dark:bg-slate-900/70 backdrop-blur-md p-6">
              {featured.metaText ? (
                <p className="text-blue-700 dark:text-sky-300 text-sm mb-2">{featured.metaText}</p>
              ) : null}
              <h3 className="text-2xl font-semibold group-hover:text-blue-900 dark:group-hover:text-sky-200 transition-colors">
                {featured.title}
              </h3>
              {featured.description ? (
                <p className="text-slate-700 dark:text-gray-300 mt-3">{featured.description}</p>
              ) : null}
            </div>
          ) : null}
        </Link>

        <div className="grid gap-4">
          {sideItems.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              className={`surface-card ${sideStyle === 'imageOverlay' ? 'relative overflow-hidden min-h-[10rem]' : 'p-4'} hover:border-sky-500/60 dark:hover:border-sky-400/60 transition-colors`}
            >
              {sideStyle === 'imageOverlay' ? (
                <>
                  {item.imageUrl ? (
                    <Image
                      src={item.imageUrl}
                      alt={item.title}
                      width={700}
                      height={420}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-slate-200 dark:bg-slate-800" />
                  )}
                  {showImageText ? (
                    <div className="absolute inset-x-0 bottom-0 border-t border-blue-300/35 dark:border-blue-300/20 bg-white/75 dark:bg-slate-900/70 backdrop-blur-md p-3">
                      {item.metaText ? (
                        <p className="text-blue-700 dark:text-sky-300 text-xs mb-1">{item.metaText}</p>
                      ) : null}
                      <h3 className="font-semibold">{item.title}</h3>
                    </div>
                  ) : null}
                </>
              ) : (
                <>
                  {item.metaText ? (
                    <p className="text-blue-700 dark:text-sky-300 text-xs mb-1">{item.metaText}</p>
                  ) : null}
                  <h3 className="font-semibold">{item.title}</h3>
                </>
              )}
            </Link>
          ))}

          {Array.from({ length: placeholders }).map((_, index) => (
            <div key={`${title.toLowerCase()}-placeholder-${index}`} className="surface-card-soft p-4">
              <p className="text-blue-700/70 dark:text-sky-300/70 text-xs mb-1">Kommer snart</p>
              {scramblePlaceholderText ? (
                <h3 className="font-semibold text-slate-700/80 dark:text-gray-300/80">
                  <ScrambledText text={placeholderTitle} />
                </h3>
              ) : (
                <h3 className="font-semibold text-slate-700/80 dark:text-gray-300/80">{placeholderTitle}</h3>
              )}
            </div>
          ))}

          <Link
            href={viewAllHref}
            className="group min-h-[8.5rem] rounded-xl border border-blue-500 bg-blue-600 hover:bg-blue-500 dark:border-sky-400 dark:bg-sky-500/90 dark:hover:bg-sky-400 transition-colors p-4 flex items-center justify-center"
          >
            <h3 className="text-xl font-semibold text-white text-center">{viewAllLabel}</h3>
          </Link>

        </div>
      </div>

      <div className="md:hidden">
        <Link href={featured.href} className="surface-card overflow-hidden block">
          {featured.imageUrl ? (
            <Image src={featured.imageUrl} alt={featured.title} width={900} height={520} className="w-full h-52 object-cover" />
          ) : null}
          {showImageText ? (
            <div className="p-4">
              {featured.metaText ? (
                <p className="text-blue-700 dark:text-sky-300 text-xs mb-1">{featured.metaText}</p>
              ) : null}
              <h3 className="font-semibold">{featured.title}</h3>
            </div>
          ) : null}
        </Link>
      </div>
    </section>
  );
}

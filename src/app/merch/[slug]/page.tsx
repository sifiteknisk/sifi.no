import { QueryParams, type SanityDocument } from 'next-sanity';
import imageUrlBuilder from '@sanity/image-url';
import type { SanityImageSource } from '@sanity/image-url/lib/types/types';
import { client } from '@/sanity/client';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Image from '@/components/ui/skeleton-image';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

const MERCH_QUERY = `*[_type == "merch" && slug.current == $slug][0]`;

const { projectId, dataset } = client.config();
const urlFor = (source: SanityImageSource) =>
  projectId && dataset
    ? imageUrlBuilder({ projectId, dataset }).image(source)
    : null;

const options = { next: { revalidate: 30 } };
const MERCH_PLACEHOLDER_IMAGE = '/images/merch-placeholder.svg';

export default async function MerchDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = await params;
  const merch = await client.fetch<SanityDocument>(
    MERCH_QUERY,
    resolvedParams as QueryParams,
    options
  );

  if (!merch) {
    return notFound();
  }

  const imageUrls: string[] =
    (merch.images as SanityImageSource[] | undefined)
      ?.map((image: SanityImageSource) =>
        urlFor(image)?.width(1200).height(675).auto('format').quality(80).url()
      )
      .filter((imageUrl: string | undefined): imageUrl is string =>
        Boolean(imageUrl)
      ) || [];
  const displayedImageUrls =
    imageUrls.length > 0 ? imageUrls : [MERCH_PLACEHOLDER_IMAGE];

  return (
    <main className="w-full py-6 md:py-8">
      <div className="px-1 py-2 sm:px-2">
        <Link href="/merch" className="hover:underline">
          ← Tilbake til merch
        </Link>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-4 items-start">
          <div className="relative">
            <Carousel className="w-full px-0 m-0">
              <CarouselContent>
                {displayedImageUrls.map((imageUrl, index) => (
                  <CarouselItem key={index}>
                    <div className="p-1">
                      <Image
                        src={imageUrl}
                        alt={merch.title}
                        className="aspect-video rounded-xl object-cover"
                        width={1200}
                        height={675}
                        sizes="(max-width: 1023px) calc(100vw - 48px), 520px"
                        quality={80}
                        priority={index === 0}
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="left-2" />
              <CarouselNext className="right-2" />
            </Carousel>
          </div>
          <div className="border-t border-blue-200/60 pt-6 dark:border-blue-300/15 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-2">
            <h1 className="site-heading text-pretty break-words text-3xl md:mb-2 md:text-4xl">
              {merch.title}
            </h1>

            {merch.description && (
              <p className="site-copy mb-3">{merch.description}</p>
            )}

            <p className="font-medium">På lager: {merch.stock ?? 'Ukjent'}</p>

            <p className="mt-4">
              <a
                href={`mailto:styret@sifi.no?subject=Bestilling%20av%20${encodeURIComponent(
                  merch.title
                )}`}
                className="cta-pill"
              >
                Kontakt for bestilling
              </a>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}

import { QueryParams, type SanityDocument } from 'next-sanity';
import imageUrlBuilder from '@sanity/image-url';
import type { SanityImageSource } from '@sanity/image-url/lib/types/types';
import { client } from '@/sanity/client';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Image from 'next/image';
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

  const imageUrls =
    merch.images?.map((image: SanityImageSource) =>
      urlFor(image)?.width(550).height(310).url()
    ) || [];

  return (
    <main className="w-full py-6 md:py-8">
      <div className="surface-panel p-6 md:p-8">
        <Link href="/merch" className="hover:underline">
          ← Tilbake til merch
        </Link>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-4 items-start">
          <div className="relative">
            <Carousel className="w-full px-0 m-0">
              <CarouselContent>
                {Array.from({ length: imageUrls.length }).map((_, index) => (
                  <CarouselItem key={index}>
                    <div className="p-1">
                      {imageUrls && (
                        <Image
                          src={imageUrls[index]}
                          alt={merch.title}
                          className="aspect-video rounded-xl"
                          width="550"
                          height="310"
                        />
                      )}
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="left-2" />
              <CarouselNext className="right-2" />
            </Carousel>
          </div>
          <div className="surface-card-soft p-5 md:p-6">
            <h1 className="text-3xl md:text-4xl font-bold md:mb-2 text-pretty break-words">
              {merch.title}
            </h1>

            {merch.description && (
              <p className="mb-3 text-slate-700 dark:text-gray-300">
                {merch.description}
              </p>
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

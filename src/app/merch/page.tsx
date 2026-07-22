import Link from 'next/link';
import Image from '@/components/ui/skeleton-image';
import imageUrlBuilder from '@sanity/image-url';
import type { SanityImageSource } from '@sanity/image-url/lib/types/types';
import { client } from '@/sanity/client';

const MERCH_QUERY = `
  *[_type == "merch"] | order(_createdAt desc) {
    _id, title, "images": images[0...1], slug, description, stock
  }
`;

const { projectId, dataset } = client.config();
const urlFor = (source: SanityImageSource) =>
  projectId && dataset
    ? imageUrlBuilder({ projectId, dataset }).image(source)
    : null;

const options = { next: { revalidate: 30 } };
const MERCH_PLACEHOLDER_IMAGE = '/images/merch-placeholder.svg';

type Merch = {
  _id: string;
  title: string;
  images?: SanityImageSource[];
  slug?: { current: string };
  description?: string;
  stock?: number;
};

async function MerchPageInner() {
  const merchItems = await client.fetch<Merch[]>(MERCH_QUERY, {}, options);

  if (!merchItems || merchItems.length === 0) {
    return (
      <div className="w-full py-6 md:py-8">
        <div className="px-1 py-10 text-center sm:px-2">
          <p className="text-2xl font-semibold">Ingen merch enda!</p>
          <p className="site-copy mt-2">Følg med her, vi fyller på snart.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full py-6 md:py-8">
      <div className="px-1 py-2 sm:px-2">
        <h1 className="site-heading mb-6 text-3xl md:text-4xl">Merch</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {merchItems.map((item: Merch) => {
            const imageUrls =
              item.images?.map((image: SanityImageSource) =>
                urlFor(image)
                  ?.width(1200)
                  .height(675)
                  .auto('format')
                  .quality(80)
                  .url()
              ) || [];

            const page_id = item.slug?.current || '';
            const firstImageUrl = imageUrls[0] ?? MERCH_PLACEHOLDER_IMAGE;

            return (
              <article
                key={item._id}
                className="flex h-full flex-col border-t border-blue-200/60 px-1 pt-5 dark:border-blue-300/15"
              >
                <Link href={`/merch/${page_id}`}>
                  <Image
                    src={firstImageUrl}
                    alt={item.title}
                    className="mb-3 aspect-video rounded-xl object-cover"
                    width={1200}
                    height={675}
                    sizes="(max-width: 640px) calc(100vw - 80px), (max-width: 1024px) calc(50vw - 52px), 336px"
                    quality={80}
                  />
                </Link>

                <Link href={`/merch/${page_id}`}>
                  <h2 className="mb-2 line-clamp-2 text-xl font-bold tracking-tight sm:min-h-14 md:min-h-16 md:text-2xl">
                    {item.title}
                  </h2>
                </Link>

                <div className="flex flex-1 flex-col">
                  <p className="site-copy mb-2 line-clamp-3 text-sm sm:min-h-[3.75rem]">
                    {item.description ?? ''}
                  </p>

                  <div className="mt-auto">
                    <p className="font-medium">
                      På lager: {item.stock ?? 'Ukjent'}
                    </p>

                    <p className="mt-3">
                      <a
                        href={`mailto:styret@sifi.no?subject=Bestilling%20av%20${encodeURIComponent(
                          item.title
                        )}`}
                        className="cta-pill px-3 py-1 text-xs"
                      >
                        Kontakt for bestilling
                      </a>
                    </p>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </div>
  );
}

const Merch = () => {
  return (
    <div className="w-full">
      <MerchPageInner />
    </div>
  );
};

export default Merch;

import Link from 'next/link';
import Image from 'next/image';
import { type SanityDocument } from 'next-sanity';
import imageUrlBuilder from '@sanity/image-url';
import type { SanityImageSource } from '@sanity/image-url/lib/types/types';
import { client } from '@/sanity/client';

const MERCH_QUERY = `
  *[_type == "merch"] | order(_createdAt desc)
`;

const { projectId, dataset } = client.config();
const urlFor = (source: SanityImageSource) =>
  projectId && dataset
    ? imageUrlBuilder({ projectId, dataset }).image(source)
    : null;

const options = { next: { revalidate: 30 } };

type Merch = {
  _id: string;
  title: string;
  images?: SanityImageSource[];
  slug?: { current: string };
  description?: string;
  stock?: number;
};

async function MerchPageInner() {
  const merchItems = await client.fetch<SanityDocument>(
    MERCH_QUERY,
    {},
    options
  );

  if (!merchItems || merchItems.length === 0) {
    return (
      <div className="w-full py-6 md:py-8">
        <div className="surface-panel p-7 md:p-10 text-center">
          <p className="text-2xl font-semibold">Ingen merch enda!</p>
          <p className="text-slate-700 dark:text-gray-300">
            Følg med her, vi fyller på snart.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full py-6 md:py-8">
      <div className="surface-panel p-6 md:p-8">
      <h1 className="text-3xl md:text-4xl font-bold mb-6">Merch</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {merchItems.map((item: Merch) => {
          const imageUrls =
            item.images?.map((image: SanityImageSource) =>
              urlFor(image)?.width(550).height(310).url()
            ) || [];

          const page_id = item.slug?.current || '';
          const firstImageUrl = imageUrls[0];

          return (
            <div key={item._id} className="p-4 surface-card">
              {firstImageUrl && (
                <Link href={`/merch/${page_id}`}>
                  <Image
                    src={firstImageUrl}
                    alt={item.title}
                    className="aspect-video rounded-xl mb-3"
                    width={550}
                    height={310}
                  />
                </Link>
              )}

              <Link href={`/merch/${page_id}`}>
                <h2 className="text-xl md:text-2xl font-bold mb-2">{item.title}</h2>
              </Link>

              {item.description && (
                <p className="mb-2 text-sm text-gray-700 dark:text-gray-300">
                  {item.description}
                </p>
              )}
              <p className="font-medium">På lager: {item.stock ?? 'Ukjent'}</p>

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

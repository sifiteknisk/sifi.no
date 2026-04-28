import imageUrlBuilder from '@sanity/image-url';
import type { SanityImageSource } from '@sanity/image-url/lib/types/types';
import { client } from '@/sanity/client';
import FeatureStrip from './FeatureStrip';

type MerchItem = {
  _id: string;
  title: string;
  slug?: { current: string };
  images?: SanityImageSource[];
  description?: string;
  stock?: number;
};

const MERCH_QUERY = `
  *[_type == "merch"] | order(_createdAt desc)
`;

const { projectId, dataset } = client.config();
const urlFor = (source: SanityImageSource) =>
  projectId && dataset
    ? imageUrlBuilder({ projectId, dataset }).image(source)
    : null;

function shortText(text: string) {
  if (text.length <= 100) return text;
  return `${text.slice(0, 97)}...`;
}

export default async function Merch() {
  const merchItems = await client.fetch<MerchItem[]>(
    MERCH_QUERY,
    {},
    { next: { revalidate: 30 } }
  );
  const items = merchItems.slice(0, 5);

  if (items.length === 0) {
    return (
      <section className="w-full max-w-6xl mx-auto px-6 py-10">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">Merch</h2>
        <p className="text-slate-700 dark:text-gray-300">
          Ingen merch enda, men det kommer snart.
        </p>
      </section>
    );
  }

  const [featured, ...rest] = items;
  const sideSlots = 2;
  const sideItems = rest.slice(0, sideSlots);
  const placeholders = Math.max(0, sideSlots - sideItems.length);

  const featuredImageUrl = featured.images?.[0]
    ? urlFor(featured.images[0])?.width(1200).height(675).url()
    : null;

  return (
    <FeatureStrip
      title="Merch"
      subtitle="Opplev indre swag."
      viewAllHref="/merch"
      viewAllLabel="Se alt"
      placeholderTitle="Ny merch publiseres her"
      placeholders={placeholders}
      featured={{
        id: featured._id,
        href: `/merch/${featured.slug?.current ?? ''}`,
        title: featured.title,
        imageUrl: featuredImageUrl,
        metaText: `Pa lager: ${featured.stock ?? 'Ukjent'}`,
        description: featured.description ? shortText(featured.description) : undefined,
      }}
      sideItems={sideItems.map((item) => ({
        id: item._id,
        href: `/merch/${item.slug?.current ?? ''}`,
        title: item.title,
        imageUrl: item.images?.[0] ? urlFor(item.images[0])?.width(700).height(420).url() : null,
        metaText: `Pa lager: ${item.stock ?? 'Ukjent'}`,
      }))}
      sideStyle="imageOverlay"
    />
  );
}

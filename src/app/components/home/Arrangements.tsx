import imageUrlBuilder from '@sanity/image-url';
import type { SanityImageSource } from '@sanity/image-url/lib/types/types';
import { client } from '@/sanity/client';
import FeatureStrip from './FeatureStrip';

type EventPost = {
  _id: string;
  title: string;
  slug?: { current: string };
  eventStart: string;
  eventEnd: string;
  body?: Array<{
    _type?: string;
    children?: Array<{
      _type?: string;
      text?: string;
    }>;
  }>;
  images?: SanityImageSource[];
};

const POST_QUERY = `
  *[_type == "post"] | order(eventStart asc)
`;

const { projectId, dataset } = client.config();
const urlFor = (source: SanityImageSource) =>
  projectId && dataset ? imageUrlBuilder({ projectId, dataset }).image(source) : null;

function toDisplayDate(dateString: string) {
  return new Date(dateString).toLocaleDateString('nb-NO', {
    day: '2-digit',
    month: 'short',
  });
}

function toDisplayTime(dateString: string) {
  return new Date(dateString).toLocaleTimeString('nb-NO', {
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'Europe/Oslo',
  });
}

function shorten(text: string) {
  if (text.length <= 180) return text;
  return `${text.slice(0, 177)}...`;
}

function portableTextToPlainText(body: EventPost['body']) {
  if (!body || body.length === 0) return '';
  return body
    .map((block) =>
      (block.children || [])
        .filter((child) => child._type === 'span' && typeof child.text === 'string')
        .map((child) => child.text)
        .join('')
    )
    .filter(Boolean)
    .join(' ')
    .trim();
}

export default async function Arrangements() {
  const posts = await client.fetch<EventPost[]>(POST_QUERY, {}, { next: { revalidate: 30 } });
  const now = Date.now();

  const events = posts
    .filter((post) => new Date(post.eventEnd).getTime() > now)
    .slice(0, 5)
    .map((post) => {
      const firstImage = post.images?.[0];
      const imageUrl = firstImage ? urlFor(firstImage)?.width(1200).height(675).url() : null;
      const bodyText = portableTextToPlainText(post.body);
      return { ...post, imageUrl, bodyText };
    });

  if (events.length === 0) {
    return (
      <section className="w-full max-w-6xl mx-auto px-6 py-12">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">Arrangementer</h2>
        <p className="text-slate-700 dark:text-gray-300">Ingen kommende arrangementer akkurat na.</p>
      </section>
    );
  }

  const [featured, ...rest] = events;
  const sideSlots = 2;
  const sideEvents = rest.slice(0, sideSlots);
  const placeholders = Math.max(0, sideSlots - sideEvents.length);

  return (
    <FeatureStrip
      title="Arrangementer"
      viewAllHref="/arrangementer"
      viewAllLabel="Se alle"
      placeholderTitle="Nytt arrangement publiseres her"
      scramblePlaceholderText
      placeholders={placeholders}
      featured={{
        id: featured._id,
        href: `/arrangementer/${featured.slug?.current ?? ''}`,
        title: featured.title,
        imageUrl: featured.imageUrl,
        metaText: `${toDisplayDate(featured.eventStart)} kl. ${toDisplayTime(featured.eventStart)}`,
        description: featured.bodyText ? shorten(featured.bodyText) : undefined,
      }}
      sideItems={sideEvents.map((event) => ({
        id: event._id,
        href: `/arrangementer/${event.slug?.current ?? ''}`,
        title: event.title,
        imageUrl: event.imageUrl,
        metaText: `${toDisplayDate(event.eventStart)} kl. ${toDisplayTime(event.eventStart)}`,
      }))}
      sideStyle="text"
    />
  );
}

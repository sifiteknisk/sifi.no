import imageUrlBuilder from '@sanity/image-url';
import type { SanityImageSource } from '@sanity/image-url/lib/types/types';
import { ArrowRight, CalendarDays } from 'lucide-react';
import Link from 'next/link';
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
  *[_type == "post" && eventEnd > now()] | order(eventStart asc)[0...5] {
    _id, title, slug, eventStart, eventEnd, body, "images": images[0...1]
  }
`;

const { projectId, dataset } = client.config();
const urlFor = (source: SanityImageSource) =>
  projectId && dataset
    ? imageUrlBuilder({ projectId, dataset }).image(source)
    : null;

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
        .filter(
          (child) => child._type === 'span' && typeof child.text === 'string'
        )
        .map((child) => child.text)
        .join('')
    )
    .filter(Boolean)
    .join(' ')
    .trim();
}

export default async function Arrangements() {
  const posts = await client.fetch<EventPost[]>(
    POST_QUERY,
    {},
    { next: { revalidate: 30 } }
  );
  const events = posts.map((post) => {
    const firstImage = post.images?.[0];
    const imageUrl = firstImage
      ? urlFor(firstImage)
          ?.width(1200)
          .height(675)
          .auto('format')
          .quality(80)
          .url()
      : null;
    const bodyText = portableTextToPlainText(post.body);
    return { ...post, imageUrl, bodyText };
  });

  if (events.length === 0) {
    return (
      <section className="w-full max-w-6xl mx-auto px-6 py-10">
        <div className="mb-6">
          <h2 className="site-heading text-2xl md:text-3xl">Arrangementer</h2>
        </div>

        <div className="surface-card-soft flex flex-col items-center px-6 py-10 text-center">
          <div className="mb-4 flex size-12 items-center justify-center rounded-full bg-blue-100 text-blue-700 dark:bg-blue-400/10 dark:text-blue-300">
            <CalendarDays aria-hidden="true" className="size-6" />
          </div>
          <p className="text-lg font-semibold">
            Ingen kommende arrangementer akkurat nå.
          </p>
          <p className="mt-1 text-sm text-slate-600 dark:text-gray-400">
            Nye arrangementer blir publisert her fortløpende.
          </p>
          <Link
            href="/arrangementer"
            className="group mt-6 inline-flex min-h-11 items-center gap-3 rounded-xl border border-blue-300/40 px-4 py-2 text-sm font-semibold text-[var(--foreground)] transition-colors hover:border-blue-500 hover:bg-blue-50 dark:border-blue-300/20 dark:hover:bg-blue-950/40"
          >
            <span>Se alle</span>
            <ArrowRight
              aria-hidden="true"
              className="h-4 w-4 text-blue-600 transition-transform group-hover:translate-x-1 dark:text-blue-300"
            />
          </Link>
        </div>
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

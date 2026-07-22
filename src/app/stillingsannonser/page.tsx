import Link from 'next/link';
import Image from '@/components/ui/skeleton-image';
import imageUrlBuilder from '@sanity/image-url';
import type { SanityImageSource } from '@sanity/image-url/lib/types/types';
import { client } from '@/sanity/client';

const ANNONSE_QUERY = `
  *[_type == "stillingsannonse" && eventEnd > now()] | order(eventStart desc) {
    _id, title, image, slug, eventStart
  }
`;

const { projectId, dataset } = client.config();
const urlFor = (source: SanityImageSource) =>
  projectId && dataset
    ? imageUrlBuilder({ projectId, dataset }).image(source)
    : null;

const options = { next: { revalidate: 30 } };

type Post = {
  _id: string;
  title: string;
  image?: SanityImageSource;
  slug?: { current: string };
  publishedAt: string;
  eventStart: string;
  eventEnd: string;
  body: string;
};

async function AnnonsePage() {
  const posts = await client.fetch<Post[]>(ANNONSE_QUERY, {}, options);

  if (!posts || posts.length === 0) {
    return (
      <section
        aria-labelledby="empty-jobs-heading"
        className="flex min-h-80 w-full flex-col items-center justify-center py-12 text-center md:min-h-96"
      >
        <h1
          id="empty-jobs-heading"
          className="site-heading flex flex-col items-center"
        >
          <span className="site-copy text-sm font-semibold uppercase tracking-[0.24em]">
            Her var det
          </span>
          <span className="mt-1 text-5xl font-black leading-none tracking-[-0.06em] sm:text-6xl">
            tomt gitt!
          </span>
        </h1>
        <p className="site-copy mt-5 max-w-md text-base leading-7">
          Følg med her for fremtidige stillingsannonser.
        </p>
      </section>
    );
  }

  return (
    <div className="w-full py-6 md:py-8">
      <div className="surface-panel p-6 md:p-8">
      <h1 className="site-heading mb-6 text-3xl md:text-4xl">Stillingsannonser</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => {
          const postImageUrl = post.image
            ? urlFor(post.image)?.width(550).height(310).url()
            : null;

          const page_id = post.slug?.current || '';

          return (
            <div key={post._id} className="p-4 surface-card">
              {postImageUrl && (
                <Link href={`/stillingsannonser/${page_id}`}>
                  <Image
                    src={postImageUrl}
                    alt={post.title}
                    className="aspect-video rounded-xl mb-3"
                    width="550"
                    height="310"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </Link>
              )}
              <Link href={`/stillingsannonser/${page_id}`}>
                <h2 className="mb-2 text-xl font-bold tracking-tight md:text-2xl">{post.title}</h2>
              </Link>

              <p className="site-copy text-sm">
                Søknadsfrist:{' '}
                {new Date(post.eventStart).toLocaleDateString('nb-NO', {
                  weekday: 'long',
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                  timeZone: 'Europe/Oslo',
                })}
              </p>
            </div>
          );
        })}
      </div>
      </div>
    </div>
  );
}

const Stillingsannonser = () => {
  return <AnnonsePage />;
};

export default Stillingsannonser;

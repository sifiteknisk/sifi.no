import Link from 'next/link';
import Image from 'next/image';
import { type SanityDocument } from 'next-sanity';
import imageUrlBuilder from '@sanity/image-url';
import type { SanityImageSource } from '@sanity/image-url/lib/types/types';
import { client } from '@/sanity/client';

const ANNONSE_QUERY = `
  *[_type == "stillingsannonse"] | order(eventStart desc)
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
  const posts = await client.fetch<SanityDocument>(ANNONSE_QUERY, {}, options);

  if (!posts || posts.length === 0) {
    return (
      <div className="w-full py-6 md:py-8">
        <div className="surface-panel p-7 md:p-10 text-center">
          <p className="text-2xl font-semibold">Her var det tomt gitt!</p>
          <p className="text-slate-700 dark:text-gray-300">
            Følg med her for fremtidige stillingsannonser.
          </p>
        </div>
      </div>
    );
  }

  const today = new Date();
  const filteredPosts =
    posts?.filter((post: Post) => {
      const eventEnd = new Date(post.eventEnd);
      return eventEnd.getTime() > today.getTime();
    }) || [];

  // Viser riktig info når sanity ikke er tomt, men filtered
  if (filteredPosts.length === 0) {
    return (
      <div className="w-full py-6 md:py-8">
        <div className="surface-panel p-7 md:p-10 text-center">
          <p className="text-2xl font-semibold">Her var det tomt gitt!</p>
          <p className="text-slate-700 dark:text-gray-300">
            Følg med her for fremtidige stillingsannonser.
          </p>
        </div>
      </div>
    );
  }
  return (
    <div className="w-full py-6 md:py-8">
      <div className="surface-panel p-6 md:p-8">
      <h1 className="text-3xl md:text-4xl font-bold mb-6">Stillingsannonser</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPosts.map((post: Post) => {
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
                  />
                </Link>
              )}
              <Link href={`/stillingsannonser/${page_id}`}>
                <h2 className="text-xl md:text-2xl font-bold mb-2">{post.title}</h2>
              </Link>

              <p className="text-sm text-gray-700 dark:text-gray-300">
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
  return (
    <div className="w-full">
      <AnnonsePage />
    </div>
  );
};

export default Stillingsannonser;

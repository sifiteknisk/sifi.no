import {
  PortableText,
  PortableTextReactComponents,
  QueryParams,
  type SanityDocument,
} from 'next-sanity';
import imageUrlBuilder from '@sanity/image-url';
import type { SanityImageSource } from '@sanity/image-url/lib/types/types';
import { client } from '@/sanity/client';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Image from '@/components/ui/skeleton-image';

const ANNONSE_QUERY = `*[_type == "stillingsannonse" && slug.current == $slug][0]`;

const { projectId, dataset } = client.config();
const urlFor = (source: SanityImageSource) =>
  projectId && dataset
    ? imageUrlBuilder({ projectId, dataset }).image(source)
    : null;
const options = { next: { revalidate: 30 } };
export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = await params;
  const post = await client.fetch<SanityDocument>(
    ANNONSE_QUERY,
    resolvedParams as QueryParams,
    options
  );
  if (post == null) {
    return notFound();
  }
  const postImageUrl = post.image
    ? urlFor(post.image)?.width(450).height(250).auto('format').url()
    : null;
  return (
    <main className="w-full py-6 md:py-8">
      <div className="w-full surface-panel p-6 md:p-8">
        <Link
          href="/stillingsannonser"
          className="site-link mb-4 inline-block"
        >
          ← Tilbake til stillingsannonser
        </Link>

        <div className="flex flex-col justify-center md:flex-row md:justify-center md:items-start gap-8 w-full mt-2">
          <div className="flex flex-col items-center w-full md:w-1/2 space-y-5">
            {postImageUrl && (
              <Image
                src={postImageUrl}
                alt={post.title}
                className="aspect-video rounded-xl border border-blue-300/35 dark:border-blue-300/20"
                width="550"
                height="310"
              />
            )}

            {post.applyButton?.url && (
              <a
                href={post.applyButton.url}
                target="_blank"
                rel="noopener noreferrer"
                className="cta-pill px-8 py-3 text-lg"
              >
                {post.applyButton.text || 'Søk her'}
              </a>
            )}

            <p className="site-copy text-sm italic">
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
          <div className="surface-card-soft prose dark:prose-invert p-5 md:p-6 text-left md:w-1/2">
            <h1 className="site-heading not-prose mb-6 text-3xl">{post.title}</h1>

            {Array.isArray(post.body) && (
              <PortableText
                value={post.body}
                components={
                  {
                    marks: {
                      link: ({ children, value }) => (
                        <a
                          href={value.href}
                          className="site-link"
                        >
                          {children}
                        </a>
                      ),
                    },
                    block: {
                      h2: ({ children }) => (
                        <h2 className="text-2xl font-bold">{children}</h2>
                      ),
                      normal: ({ children }) => (
                        <p className="whitespace-pre-line leading-tight">
                          {children
                            ? Array.isArray(children)
                              ? children.map((line: string, index: number) => (
                                  <span key={index}>
                                    {line}
                                    <br />
                                  </span>
                                ))
                              : children
                            : null}
                        </p>
                      ),
                    },
                  } as Partial<PortableTextReactComponents>
                }
              />
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

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
import Image from 'next/image';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

const POST_QUERY = `*[_type == "post" && slug.current == $slug][0]`;

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
    POST_QUERY,
    resolvedParams as QueryParams,
    options
  );
  if (!post) {
    return notFound();
  }

  const imageUrls =
    post.images?.map((image: SanityImageSource) =>
      urlFor(image)?.width(2600).height(900).auto('format').url()
    ) || [];

  return (
    <main className="w-full py-6 md:py-8">
      <div className="surface-panel p-6 md:p-8">
        <Link
          href="/arrangementer"
          className="inline-block mb-4 text-blue-700 dark:text-sky-300 hover:underline"
        >
          ← Tilbake til arrangementer
        </Link>

        {/* Banner picture */}
        <div className="w-full mb-6">
          <Carousel className="w-full">
            <CarouselContent>
              {Array.from({ length: imageUrls.length }).map((_, index) => (
                <CarouselItem key={index}>
                  <Image
                    src={imageUrls[index]}
                    alt={post.title}
                    width={2600}
                    height={900}
                    className="w-full h-auto rounded-xl"
                    unoptimized
                    priority
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-2" />
            <CarouselNext className="right-2" />
          </Carousel>
        </div>
        {/* Title and info */}
        <div className="mb-8 flex flex-col items-center text-center">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">{post.title}</h1>

          <div className="flex flex-col md:flex-row md:items-center md:justify-center gap-2 md:gap-4 mb-4 text-base md:text-lg">
            <p className="text-slate-700 dark:text-gray-300">
              Tidspunkt:{' '}
              {new Date(post.eventStart).toLocaleDateString('nb-NO', {
                weekday: 'long',
                day: 'numeric',
                month: 'long',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                timeZone: 'Europe/Oslo',
              })}
            </p>
            <p className="text-slate-700 dark:text-gray-300">Sted: {post.place}</p>
          </div>

          {post.registrationButton?.url && (
            <a
              href={post.registrationButton.url}
              target="_blank"
              rel="noopener noreferrer"
              className="cta-pill px-8 py-3 text-base md:text-lg"
            >
              {post.registrationButton.text || 'Meld deg på'}
            </a>
          )}
        </div>
        {/* Main description */}
        <div className="surface-card-soft p-5 md:p-6 prose prose-lg dark:prose-invert max-w-3xl mx-auto text-left">
          {Array.isArray(post.body) && (
            <PortableText
              value={post.body}
              components={
                {
                  marks: {
                    link: ({ children, value }) => (
                      <a
                        href={value.href}
                        className="text-blue-700 dark:text-sky-300 hover:underline"
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
    </main>
  );
}

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
    post.images
      ?.map((image: SanityImageSource) =>
        urlFor(image)?.width(2200).height(762).auto('format').quality(80).url()
      )
      .filter((imageUrl: string | undefined): imageUrl is string =>
        Boolean(imageUrl)
      ) || [];

  return (
    <main className="w-full py-6 md:py-8">
      <div className="px-1 py-2 sm:px-2">
        <Link href="/arrangementer" className="site-link mb-4 inline-block">
          ← Tilbake til arrangementer
        </Link>

        {/* Banner picture */}
        <div className="w-full mb-6">
          <Carousel className="w-full">
            <CarouselContent>
              {imageUrls.map((imageUrl: string, index: number) => (
                <CarouselItem key={index}>
                  <Image
                    src={imageUrl}
                    alt={post.title}
                    width={2200}
                    height={762}
                    sizes="(max-width: 1200px) calc(100vw - 48px), 1088px"
                    quality={80}
                    className="w-full h-auto rounded-xl"
                    priority={index === 0}
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
          <h1 className="site-heading mb-4 text-3xl md:text-5xl">
            {post.title}
          </h1>

          <div className="flex flex-col md:flex-row md:items-center md:justify-center gap-2 md:gap-4 mb-4 text-base md:text-lg">
            <p className="site-copy">
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
            <p className="site-copy">Sted: {post.place}</p>
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
        <div className="prose prose-lg mx-auto max-w-3xl border-t border-blue-200/60 px-1 pt-6 text-left dark:prose-invert dark:border-blue-300/15">
          {Array.isArray(post.body) && (
            <PortableText
              value={post.body}
              components={
                {
                  marks: {
                    link: ({ children, value }) => (
                      <a href={value.href} className="site-link">
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

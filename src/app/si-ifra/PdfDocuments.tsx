'use client';

import Image from 'next/image';
import { ArrowUpRight, X } from 'lucide-react';
import { createPortal } from 'react-dom';
import { useCallback, useEffect, useRef, useState } from 'react';
import IntegratedPdf, { type PdfPage } from './IntegratedPdf';

type PdfDocument = {
  title: string;
  description: string;
  file: string;
  pages: PdfPage[];
};

const documents: PdfDocument[] = [
  {
    title: 'Varslingsplakat',
    description: 'Informasjon om varsling i SIFI',
    file: '/Varslingsplakat_sifi.pdf',
    pages: [
      {
        src: '/images/si-ifra/varslingsplakat-1.png',
        alt: 'Varsling i SIFI - varslingsplakat',
      },
    ],
  },
  {
    title: 'Etiske retningslinjer',
    description: 'Vedtatt av styret i februar 2025',
    file: '/Etiske_retningslinjer_for_SIFI.pdf',
    pages: [
      {
        src: '/images/si-ifra/etiske-retningslinjer-1.png',
        alt: 'Etiske retningslinjer for SIFI - side 1',
      },
      {
        src: '/images/si-ifra/etiske-retningslinjer-2.png',
        alt: 'Etiske retningslinjer for SIFI - side 2',
      },
    ],
  },
];

export default function PdfDocuments() {
  const [activeDocument, setActiveDocument] = useState<PdfDocument | null>(
    null
  );
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);

  const closeDocument = useCallback(() => {
    setActiveDocument(null);
    window.requestAnimationFrame(() => triggerRef.current?.focus());
  }, []);

  useEffect(() => {
    if (!activeDocument) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeButtonRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeDocument();
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [activeDocument, closeDocument]);

  const openDocument = (document: PdfDocument, trigger: HTMLButtonElement) => {
    triggerRef.current = trigger;
    setActiveDocument(document);
  };

  return (
    <section
      className="border-t border-blue-200/60 pt-10 dark:border-blue-300/15 md:pt-14"
      aria-labelledby="dokumenter"
    >
      <div className="max-w-3xl">
        <p className="text-sm font-bold uppercase tracking-[0.14em] text-blue-700 dark:text-blue-300">
          Dokumenter
        </p>
        <h2 id="dokumenter" className="mt-2 text-3xl font-bold md:text-4xl">
          Les mer
        </h2>
      </div>

      <div className="mt-8 divide-y divide-blue-200/60 border-y border-blue-200/60 dark:divide-blue-300/15 dark:border-blue-300/15">
        {documents.map((document, index) => (
          <IntegratedPdf
            key={document.file}
            {...document}
            priority={index === 0}
            onOpen={(trigger) => openDocument(document, trigger)}
          />
        ))}
      </div>

      {activeDocument
        ? createPortal(
            <div
              className="fixed inset-0 z-[9999] flex bg-slate-950/85 backdrop-blur-md sm:p-4 md:p-8"
              onMouseDown={(event) => {
                if (event.target === event.currentTarget) closeDocument();
              }}
            >
              <div
                role="dialog"
                aria-modal="true"
                aria-labelledby="pdf-dialog-title"
                className="m-auto flex h-full w-full max-w-5xl flex-col overflow-hidden bg-slate-100 shadow-2xl dark:bg-[#070b14] sm:max-h-[calc(100vh-2rem)] sm:rounded-2xl sm:border sm:border-white/15 md:max-h-[calc(100vh-4rem)]"
              >
                <header className="z-10 flex shrink-0 items-center gap-3 border-b border-slate-200 bg-white/90 px-4 py-3 backdrop-blur-xl dark:border-slate-700 dark:bg-slate-950/90 sm:px-6">
                  <div className="min-w-0">
                    <h2
                      id="pdf-dialog-title"
                      className="truncate text-lg font-bold sm:text-xl"
                    >
                      {activeDocument.title}
                    </h2>
                    <p className="hidden text-sm text-slate-500 dark:text-slate-400 sm:block">
                      {activeDocument.description}
                    </p>
                  </div>
                  <a
                    href={activeDocument.file}
                    target="_blank"
                    rel="noreferrer"
                    className="ml-auto hidden min-h-10 items-center justify-center gap-2 rounded-full border border-blue-200/70 px-4 py-2 text-sm font-semibold text-blue-700 transition hover:bg-blue-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 dark:border-blue-300/20 dark:text-blue-200 dark:hover:bg-slate-900 sm:inline-flex"
                  >
                    Åpne original
                    <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                  </a>
                  <button
                    ref={closeButtonRef}
                    type="button"
                    onClick={closeDocument}
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 transition hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800 dark:focus-visible:ring-blue-300"
                    aria-label="Lukk dokument"
                  >
                    <X className="h-5 w-5" aria-hidden="true" />
                  </button>
                </header>

                <div className="min-h-0 flex-1 overflow-y-auto bg-slate-300/70 p-2 dark:bg-slate-950 sm:p-4 md:p-6">
                  <div className="mx-auto max-w-[900px] space-y-4 md:space-y-6">
                    {activeDocument.pages.map((page, index) => (
                      <figure key={page.src}>
                        {activeDocument.pages.length > 1 ? (
                          <figcaption className="mb-2 text-center text-xs font-bold uppercase tracking-[0.14em] text-slate-600 dark:text-slate-300">
                            Side {index + 1} av {activeDocument.pages.length}
                          </figcaption>
                        ) : null}
                        <div className="overflow-hidden rounded-sm bg-white shadow-2xl shadow-slate-950/20">
                          <Image
                            src={page.src}
                            alt={page.alt}
                            width={1240}
                            height={1754}
                            sizes="(max-width: 768px) calc(100vw - 16px), 900px"
                            className="h-auto w-full"
                            priority={index === 0}
                          />
                        </div>
                      </figure>
                    ))}
                  </div>
                </div>
              </div>
            </div>,
            document.body
          )
        : null}
    </section>
  );
}

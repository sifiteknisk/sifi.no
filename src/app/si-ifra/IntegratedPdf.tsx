'use client';

import Image from 'next/image';
import { FileText, Maximize2 } from 'lucide-react';

export type PdfPage = {
  src: string;
  alt: string;
};

type IntegratedPdfProps = {
  title: string;
  description: string;
  pages: PdfPage[];
  priority?: boolean;
  onOpen: (trigger: HTMLButtonElement) => void;
};

export default function IntegratedPdf({
  title,
  description,
  pages,
  priority = false,
  onOpen,
}: IntegratedPdfProps) {
  return (
    <button
      type="button"
      onClick={(event) => onOpen(event.currentTarget)}
      className="group w-full py-6 text-left transition-colors hover:bg-blue-50/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 dark:hover:bg-blue-300/5 dark:focus-visible:ring-blue-300 sm:grid sm:grid-cols-[8rem_1fr_auto] sm:items-center sm:gap-5 sm:px-3"
      aria-label={`Les ${title}`}
    >
      <span className="relative hidden aspect-[210/297] w-32 overflow-hidden bg-white shadow-md shadow-slate-900/10 sm:block">
        <Image
          src={pages[0].src}
          alt=""
          fill
          priority={priority}
          sizes="128px"
          className="object-contain object-top transition duration-300 group-hover:scale-[1.025]"
        />
      </span>

      <span className="flex min-w-0 items-start gap-4">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-blue-700 dark:bg-blue-300/10 dark:text-blue-300">
          <FileText className="h-5 w-5" aria-hidden="true" />
        </span>
        <span className="min-w-0">
          <span className="block text-lg font-bold md:text-xl">{title}</span>
          <span className="block text-sm text-slate-500 dark:text-slate-400">
            {description}
          </span>
          <span className="mt-3 block text-sm font-semibold text-blue-700 dark:text-blue-300">
            Les dokumentet ·{' '}
            {pages.length === 1 ? '1 side' : `${pages.length} sider`}
          </span>
        </span>
      </span>

      <Maximize2
        className="hidden h-5 w-5 shrink-0 text-slate-400 transition group-hover:scale-110 group-hover:text-blue-600 dark:group-hover:text-blue-300 sm:block"
        aria-hidden="true"
      />
    </button>
  );
}

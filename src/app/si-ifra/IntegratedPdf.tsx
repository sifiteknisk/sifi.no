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
      className="group surface-panel overflow-hidden text-left transition duration-200 hover:-translate-y-1 hover:border-blue-300/80 hover:shadow-blue-400/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 dark:hover:border-blue-300/30 dark:focus-visible:ring-blue-300"
      aria-label={`Les ${title}`}
    >
      <div className="flex items-center gap-3 border-b border-blue-200/50 px-5 py-5 dark:border-blue-300/10">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-blue-700 dark:bg-blue-300/10 dark:text-blue-300">
          <FileText className="h-5 w-5" aria-hidden="true" />
        </span>
        <span className="min-w-0">
          <span className="block text-lg font-bold md:text-xl">{title}</span>
          <span className="block text-sm text-slate-500 dark:text-slate-400">
            {description}
          </span>
        </span>
        <Maximize2
          className="ml-auto h-5 w-5 shrink-0 text-slate-400 transition group-hover:scale-110 group-hover:text-blue-600 dark:group-hover:text-blue-300"
          aria-hidden="true"
        />
      </div>

      <span className="relative block aspect-[210/248] overflow-hidden bg-slate-200/70 p-3 dark:bg-slate-950/65 sm:p-4">
        <span className="relative block h-full overflow-hidden rounded-sm bg-white shadow-xl shadow-slate-900/15 dark:shadow-black/35">
          <Image
            src={pages[0].src}
            alt=""
            fill
            priority={priority}
            sizes="(max-width: 768px) calc(100vw - 48px), 550px"
            className="object-cover object-top transition duration-300 group-hover:scale-[1.015]"
          />
          <span className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-slate-950/75 via-slate-950/25 to-transparent" />
          <span className="absolute inset-x-0 bottom-0 flex items-center justify-between p-4 text-white">
            <span className="text-sm font-bold">Klikk for å lese</span>
            <span className="rounded-full bg-white/15 px-2.5 py-1 text-xs font-semibold backdrop-blur-sm">
              {pages.length === 1 ? '1 side' : `${pages.length} sider`}
            </span>
          </span>
        </span>
      </span>
    </button>
  );
}

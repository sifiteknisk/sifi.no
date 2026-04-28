'use client';

import { usePathname } from 'next/navigation';
import type { ReactNode } from 'react';

type PageShellProps = {
  children: ReactNode;
};

export default function PageShell({ children }: PageShellProps) {
  const pathname = usePathname();
  const isHome = pathname === '/';

  if (isHome) {
    return <>{children}</>;
  }

  return (
    <div className="relative px-4 md:px-8 pt-8 md:pt-10 pb-14">
      <div className="pointer-events-none absolute inset-x-4 md:inset-x-8 top-2 h-56 rounded-[2.25rem] bg-gradient-to-b from-blue-500/14 via-sky-400/8 to-transparent dark:from-sky-400/12 dark:via-sky-300/6" />
      <div className="pointer-events-none absolute inset-x-4 md:inset-x-8 top-10 bottom-4 rounded-[2.25rem] border border-blue-200/30 dark:border-sky-300/10 bg-white/10 dark:bg-slate-900/10 backdrop-blur-[1px]" />
      <div className="relative max-w-6xl mx-auto">{children}</div>
    </div>
  );
}

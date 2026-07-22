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
    <div className="px-4 pb-16 pt-7 md:px-8 md:pb-20 md:pt-10">
      <div className="mx-auto max-w-6xl">{children}</div>
    </div>
  );
}

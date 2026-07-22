'use client';
import * as React from 'react';
import { cn } from '@/lib/utils';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';

type ModeToggleProps = {
  className?: string;
};

export default function ModeToggle({ className }: ModeToggleProps) {
  const { setTheme, resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';

  const toggleTheme = () => {
    setTheme(isDark ? 'light' : 'dark');
  };

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={cn(
        'inline-flex h-9 w-9 items-center justify-center rounded-lg text-slate-700 transition-colors hover:bg-blue-100 hover:text-blue-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 dark:text-slate-200 dark:hover:bg-slate-800 dark:hover:text-blue-200 dark:focus-visible:ring-blue-300 dark:focus-visible:ring-offset-[#06101f]',
        className
      )}
      aria-label={isDark ? 'Bruk lyst tema' : 'Bruk mørkt tema'}
      aria-pressed={isDark}
    >
      <Sun aria-hidden="true" className="h-[18px] w-[18px] dark:hidden" />
      <Moon
        aria-hidden="true"
        className="hidden h-[18px] w-[18px] dark:block"
      />
      <span className="sr-only">Bytt tema</span>
    </button>
  );
}

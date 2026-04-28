'use client';
import * as React from 'react';
import { Sun } from 'lucide-react';
import { useTheme } from 'next-themes';

export default function ModeToggle() {
  const { setTheme, resolvedTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(resolvedTheme === 'light' ? 'dark' : 'light');
  };

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="inline-flex h-9 items-center gap-1 rounded-xl px-2 text-slate-700 transition-colors hover:text-blue-800 dark:text-slate-200 dark:hover:text-sky-200"
      aria-label="Bytt tema"
    >
      <Sun className="h-4 w-4" />
      <span className="sr-only">Bytt tema</span>
    </button>
  );
}

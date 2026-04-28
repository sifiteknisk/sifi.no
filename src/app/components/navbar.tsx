'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Darkmode from './darkmode';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const toggleMenu = () => setIsOpen((open) => !open);
  const closeMenu = () => setIsOpen(false);

  const navItems = [
    { href: '/arrangementer', label: 'Arrangementer' },
    { href: '/stillingsannonser', label: 'Stillingsannonser' },
    { href: '/merch', label: 'Merch' },
    { href: '/about', label: 'Om oss' },
    { href: '/si-ifra', label: 'Si ifra' },
  ];

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`);
  const isHome = pathname === '/';

  const desktopLinkClass = (active: boolean) =>
    `whitespace-nowrap flex h-full w-full items-center justify-center text-center text-xs lg:text-sm font-semibold transition-colors ${
      active
        ? 'bg-blue-200/90 text-blue-900 dark:bg-slate-700/90 dark:text-sky-200'
        : 'text-slate-700 dark:text-slate-200 hover:bg-blue-100/90 hover:text-blue-800 dark:hover:bg-slate-800/90 dark:hover:text-sky-200'
    }`;

  const mobileLinkClass = (active: boolean) =>
    `whitespace-nowrap flex items-center justify-center gap-2 rounded-xl border px-3 py-2 text-center transition-all duration-200 ${
      active
        ? 'border-blue-400/60 bg-blue-100/90 text-blue-900 dark:border-sky-300/60 dark:bg-slate-800/90 dark:text-sky-200 shadow-sm'
        : 'border-transparent text-slate-700 dark:text-slate-200 hover:-translate-y-0.5 hover:border-blue-400/40 hover:bg-blue-50/80 hover:text-blue-800 dark:hover:border-sky-300/40 dark:hover:bg-slate-800/75 dark:hover:text-sky-200'
    }`;

  return (
    <header className="fixed top-0 md:top-3 left-0 right-0 z-50 md:px-4 lg:px-6">
      <div className="mx-auto max-w-7xl md:max-w-5xl border-b border-blue-300/40 bg-slate-100/90 dark:border-blue-300/20 dark:bg-[#030712]/85 backdrop-blur-md md:rounded-2xl md:border md:border-blue-300/30 md:dark:border-blue-300/25 md:shadow-[0_10px_30px_rgba(2,6,23,0.16)]">
        <div className="px-3 md:px-0 h-16">
          <div className="h-full flex items-center gap-2 md:gap-0">
            <Link
              href="/"
              className={`hidden md:flex shrink-0 h-full w-24 items-center justify-center rounded-l-xl transition-colors md:pl-0.5 ${
                isHome
                  ? 'bg-blue-200/90 dark:bg-slate-700/90'
                  : 'hover:bg-blue-100/90 dark:hover:bg-slate-800/90'
              }`}
              onClick={closeMenu}
            >
              <Image
                src="/images/logo_liten_utenbak.png"
                alt="SIFI"
                width={122}
                height={61}
                className="h-12 w-auto object-contain dark:hidden drop-shadow-[0_2px_10px_rgba(37,99,235,0.08)] transition-[filter] duration-200 hover:drop-shadow-[0_6px_16px_rgba(37,99,235,0.38)]"
              />
              <Image
                src="/images/logo_liten_utenbak_white.png"
                alt="SIFI"
                width={122}
                height={61}
                className="hidden h-12 w-auto object-contain dark:block drop-shadow-[0_2px_10px_rgba(125,211,252,0.08)] transition-[filter] duration-200 hover:drop-shadow-[0_6px_16px_rgba(125,211,252,0.38)]"
              />
            </Link>
            <Link
              href="/"
              className="md:hidden shrink-0 px-2 py-1 transition-transform duration-200 hover:scale-[1.02]"
              onClick={closeMenu}
            >
              <Image
                src="/images/logo_liten_utenbak.png"
                alt="SIFI"
                width={122}
                height={61}
                className="h-12 w-auto object-contain dark:hidden"
              />
              <Image
                src="/images/logo_liten_utenbak_white.png"
                alt="SIFI"
                width={122}
                height={61}
                className="hidden h-12 w-auto object-contain dark:block"
              />
            </Link>

            <nav className="hidden md:grid grid-cols-5 flex-1 h-full overflow-hidden">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={desktopLinkClass(isActive(item.href))}
                  onClick={closeMenu}
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <div className="ml-auto hidden md:flex h-full w-24 items-center justify-center rounded-r-xl hover:bg-blue-100/90 dark:hover:bg-slate-800/90 transition-colors">
              <Darkmode />
            </div>

            <div className="ml-auto flex items-center gap-2 md:hidden">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-blue-300/40 bg-blue-50/80 dark:border-slate-700 dark:bg-slate-800/90">
                <Darkmode />
              </div>
              <button
                onClick={toggleMenu}
                className={`md:hidden relative h-9 w-9 transition-all duration-200 flex items-center justify-center ${
                  isOpen
                    ? 'text-blue-900 dark:text-sky-200'
                    : 'text-slate-700 dark:text-slate-200 hover:text-blue-800 dark:hover:text-sky-200'
                }`}
                aria-label={isOpen ? 'Lukk meny' : 'Åpne meny'}
                aria-expanded={isOpen}
              >
                <span
                  className={`absolute w-5 h-0.5 bg-blue-700 dark:bg-sky-300 transition-all duration-200 ease-out ${
                    isOpen
                      ? 'top-1/2 -translate-y-1/2 rotate-45'
                      : 'top-2.5 rotate-0'
                  }`}
                />
                <span
                  className={`absolute top-1/2 -translate-y-1/2 w-5 h-0.5 bg-blue-700 dark:bg-sky-300 transition-all duration-200 ease-out ${
                    isOpen ? 'opacity-0 scale-x-0' : 'opacity-100 scale-x-100'
                  }`}
                />
                <span
                  className={`absolute w-5 h-0.5 bg-blue-700 dark:bg-sky-300 transition-all duration-200 ease-out ${
                    isOpen
                      ? 'top-1/2 -translate-y-1/2 -rotate-45'
                      : 'bottom-2.5 rotate-0'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        <div
          className={`md:hidden border-t border-blue-300/40 dark:border-blue-300/20 bg-slate-100/95 dark:bg-[#030712]/95 backdrop-blur-md transition-all duration-200 origin-top ${
            isOpen
              ? 'max-h-[28rem] opacity-100'
              : 'max-h-0 opacity-0 pointer-events-none'
          } overflow-hidden`}
        >
          <nav className="px-4 py-3 text-sm font-semibold space-y-1.5">
            <Link
              href="/"
              className={mobileLinkClass(pathname === '/')}
              onClick={closeMenu}
            >
              <span
                className={`h-1.5 w-1.5 rounded-full ${
                  pathname === '/'
                    ? 'bg-blue-600 dark:bg-sky-300'
                    : 'bg-slate-400/70 dark:bg-slate-500/80'
                }`}
              />
              <span>Hjem</span>
            </Link>
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={mobileLinkClass(isActive(item.href))}
                onClick={closeMenu}
              >
                <span
                  className={`h-1.5 w-1.5 rounded-full ${
                    isActive(item.href)
                      ? 'bg-blue-600 dark:bg-sky-300'
                      : 'bg-slate-400/70 dark:bg-slate-500/80'
                  }`}
                />
                <span>{item.label}</span>
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Navbar;

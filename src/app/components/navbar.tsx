'use client';
import React, { useEffect, useRef, useState } from 'react';
import Image from '@/components/ui/skeleton-image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronRight, Menu, X } from 'lucide-react';
import Darkmode from './darkmode';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const firstMobileLinkRef = useRef<HTMLAnchorElement>(null);

  const toggleMenu = () => setIsOpen((open) => !open);
  const closeMenu = () => setIsOpen(false);

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    const desktopQuery = window.matchMedia('(min-width: 768px)');

    document.body.style.overflow = 'hidden';
    firstMobileLinkRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    const handleDesktopChange = (event: MediaQueryListEvent) => {
      if (event.matches) setIsOpen(false);
    };

    document.addEventListener('keydown', handleKeyDown);
    desktopQuery.addEventListener('change', handleDesktopChange);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', handleKeyDown);
      desktopQuery.removeEventListener('change', handleDesktopChange);
    };
  }, [isOpen]);

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
        ? 'bg-blue-200/90 text-blue-900 dark:bg-blue-900/60 dark:text-blue-200'
        : 'text-slate-700 dark:text-slate-200 hover:bg-blue-100/90 hover:text-blue-800 dark:hover:bg-blue-950/50 dark:hover:text-blue-200'
    }`;

  const mobileLinkClass = (active: boolean) =>
    `group flex min-h-14 w-full items-center rounded-xl px-4 text-left text-base font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 dark:focus-visible:ring-blue-300 dark:focus-visible:ring-offset-[#070b14] ${
      active
        ? 'bg-blue-600 text-white shadow-sm shadow-blue-300/40 dark:bg-blue-600 dark:text-white dark:shadow-none'
        : 'text-slate-800 hover:bg-slate-100 hover:text-blue-800 dark:text-slate-100 dark:hover:bg-blue-950/40 dark:hover:text-blue-200'
    }`;

  return (
    <header className="fixed top-0 md:top-3 left-0 right-0 z-50 md:px-4 lg:px-6">
      <div className="mx-auto max-w-6xl border-b border-blue-300/35 bg-white/90 backdrop-blur-xl dark:border-blue-300/15 dark:bg-[#06101f]/90 md:rounded-2xl md:border md:shadow-[0_14px_36px_-20px_rgba(15,45,90,0.48)]">
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
                className="hidden h-12 w-auto object-contain dark:block drop-shadow-[0_2px_10px_rgba(96,165,250,0.08)] transition-[filter] duration-200 hover:drop-shadow-[0_6px_16px_rgba(96,165,250,0.38)]"
              />
            </Link>
            <Link
              href="/"
              className="md:hidden shrink-0 px-2 py-1"
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

            <div className="ml-auto hidden h-full w-24 shrink-0 md:flex">
              <Darkmode className="h-full w-full rounded-l-none rounded-r-xl hover:bg-blue-100/90 dark:hover:bg-slate-800/90" />
            </div>

            <div className="ml-auto flex items-center gap-2 md:hidden">
              <Darkmode />
              <button
                ref={menuButtonRef}
                type="button"
                onClick={toggleMenu}
                className={`inline-flex h-9 w-9 items-center justify-center rounded-lg text-slate-700 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 dark:text-slate-200 dark:focus-visible:ring-blue-300 dark:focus-visible:ring-offset-[#06101f] ${
                  isOpen
                    ? 'bg-blue-100 text-blue-800 dark:bg-slate-800 dark:text-blue-200'
                    : 'hover:bg-blue-100 hover:text-blue-800 dark:hover:bg-slate-800 dark:hover:text-blue-200'
                }`}
                aria-label={isOpen ? 'Lukk meny' : 'Åpne meny'}
                aria-expanded={isOpen}
                aria-controls="mobile-navigation"
              >
                {isOpen ? (
                  <X aria-hidden="true" className="h-[18px] w-[18px]" />
                ) : (
                  <Menu aria-hidden="true" className="h-[18px] w-[18px]" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div
        id="mobile-navigation"
        className={`fixed inset-x-0 bottom-0 top-16 z-40 md:hidden ${
          isOpen ? 'visible' : 'invisible pointer-events-none'
        }`}
        aria-hidden={!isOpen}
      >
        <button
          type="button"
          className={`absolute inset-0 h-full w-full bg-slate-950/40 transition-opacity duration-200 dark:bg-black/60 ${
            isOpen ? 'opacity-100' : 'opacity-0'
          }`}
          aria-label="Lukk meny"
          tabIndex={-1}
          onClick={closeMenu}
        />
        <div
          className={`relative max-h-full overflow-y-auto border-t border-blue-200 bg-white shadow-2xl transition duration-200 ease-out dark:border-slate-800 dark:bg-[#070b14] ${
            isOpen ? 'translate-y-0 opacity-100' : '-translate-y-2 opacity-0'
          }`}
        >
          <div className="px-4 pb-2 pt-5">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
              Meny
            </p>
          </div>
          <nav aria-label="Hovedmeny" className="space-y-1 px-3 pb-4">
            <Link
              ref={firstMobileLinkRef}
              href="/"
              className={mobileLinkClass(pathname === '/')}
              onClick={closeMenu}
              aria-current={pathname === '/' ? 'page' : undefined}
            >
              <span>Hjem</span>
              <ChevronRight
                aria-hidden="true"
                className="ml-auto h-4 w-4 opacity-50 transition-transform group-hover:translate-x-0.5 group-hover:opacity-100"
              />
            </Link>
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={mobileLinkClass(isActive(item.href))}
                onClick={closeMenu}
                aria-current={isActive(item.href) ? 'page' : undefined}
              >
                <span>{item.label}</span>
                <ChevronRight
                  aria-hidden="true"
                  className="ml-auto h-4 w-4 opacity-50 transition-transform group-hover:translate-x-0.5 group-hover:opacity-100"
                />
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Navbar;

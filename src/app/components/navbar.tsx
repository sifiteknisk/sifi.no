'use client';
import React, { useEffect, useRef, useState } from 'react';
import Image from '@/components/ui/skeleton-image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  BriefcaseBusiness,
  CalendarDays,
  ChevronRight,
  Home,
  Menu,
  MessageCircleWarning,
  Shirt,
  Users,
  X,
} from 'lucide-react';
import Darkmode from './darkmode';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const firstMobileLinkRef = useRef<HTMLAnchorElement>(null);

  const toggleMenu = () => setIsOpen((open) => !open);
  const closeMenu = () => setIsOpen(false);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

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
    { href: '/arrangementer', label: 'Arrangementer', icon: CalendarDays },
    {
      href: '/stillingsannonser',
      label: 'Stillingsannonser',
      icon: BriefcaseBusiness,
    },
    { href: '/merch', label: 'Merch', icon: Shirt },
    { href: '/about', label: 'Om oss', icon: Users },
    { href: '/si-ifra', label: 'Si ifra', icon: MessageCircleWarning },
  ];

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`);
  const isHome = pathname === '/';
  const isHomeButtonActive = isHome && !isOpen;

  const desktopLinkClass = (active: boolean) =>
    `whitespace-nowrap flex h-full w-full items-center justify-center text-center text-xs lg:text-sm font-semibold transition-colors ${
      active
        ? 'bg-blue-200/90 text-blue-900 dark:bg-blue-900/60 dark:text-blue-200'
        : 'text-slate-700 dark:text-slate-200 hover:bg-blue-100/90 hover:text-blue-800 dark:hover:bg-blue-950/50 dark:hover:text-blue-200'
    }`;

  const mobileLinkClass = (active: boolean) =>
    `group flex min-h-16 w-full items-center rounded-2xl border px-3.5 text-left text-[0.95rem] font-semibold transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 dark:focus-visible:ring-blue-300 dark:focus-visible:ring-offset-slate-950 ${
      active
        ? 'border-blue-600 bg-blue-600 text-white shadow-sm shadow-blue-600/20'
        : 'border-slate-200/70 bg-slate-50/80 text-slate-800 hover:border-blue-200 hover:bg-blue-50 hover:text-blue-800 dark:border-white/10 dark:bg-white/[0.04] dark:text-slate-100 dark:hover:border-blue-400/30 dark:hover:bg-blue-500/10 dark:hover:text-blue-200'
    }`;

  return (
    <header>
      <div className="fixed left-0 right-0 top-3 z-50 hidden px-4 md:block lg:px-6">
        <div className="mx-auto max-w-6xl overflow-hidden rounded-2xl border border-blue-300/35 bg-white/90 shadow-[0_14px_36px_-20px_rgba(15,45,90,0.48)] backdrop-blur-xl dark:border-blue-300/15 dark:bg-[#06101f]/90">
          <div className="h-16">
            <div className="h-full flex items-center gap-2 md:gap-0">
              <Link
                href="/"
                className={`flex h-full w-24 shrink-0 items-center justify-center pl-0.5 transition-colors ${
                  isHome
                    ? 'bg-blue-200/90 dark:bg-slate-700/90'
                    : 'hover:bg-blue-100/90 dark:hover:bg-slate-800/90'
                }`}
                onClick={closeMenu}
              >
                <Image
                  src="/images/logo_liten_utenbak.png"
                  alt="SIFI"
                  width={562}
                  height={810}
                  sizes="96px"
                  className="h-12 w-24 object-contain dark:hidden drop-shadow-[0_2px_10px_rgba(37,99,235,0.08)] transition-[filter] duration-200 hover:drop-shadow-[0_6px_16px_rgba(37,99,235,0.38)]"
                />
                <Image
                  src="/images/logo_liten_utenbak_white.png"
                  alt="SIFI"
                  width={562}
                  height={810}
                  sizes="96px"
                  className="hidden h-12 w-24 object-contain dark:block drop-shadow-[0_2px_10px_rgba(96,165,250,0.08)] transition-[filter] duration-200 hover:drop-shadow-[0_6px_16px_rgba(96,165,250,0.38)]"
                />
              </Link>
              <nav className="grid h-full flex-1 grid-cols-5 overflow-hidden">
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

              <div className="ml-auto flex h-full w-24 shrink-0">
                <Darkmode className="h-full w-full rounded-none hover:bg-blue-100/90 dark:hover:bg-slate-800/90" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        id="mobile-navigation"
        className={`fixed inset-0 z-40 md:hidden ${
          isOpen ? 'visible' : 'invisible pointer-events-none'
        }`}
        aria-hidden={!isOpen}
      >
        <button
          type="button"
          className={`absolute inset-0 h-full w-full bg-slate-950/35 backdrop-blur-[2px] transition-opacity duration-300 dark:bg-black/60 ${
            isOpen ? 'opacity-100' : 'opacity-0'
          }`}
          aria-label="Lukk meny"
          tabIndex={-1}
          onClick={closeMenu}
        />
        <div
          className={`absolute inset-x-3 bottom-[calc(5.5rem+env(safe-area-inset-bottom))] max-h-[min(72vh,34rem)] overflow-y-auto rounded-[1.75rem] border border-slate-200/80 bg-white/95 shadow-[0_24px_70px_-24px_rgba(15,23,42,0.55)] backdrop-blur-2xl transition duration-300 ease-out dark:border-slate-700/80 dark:bg-slate-950/95 dark:shadow-[0_24px_70px_-24px_rgba(0,0,0,0.95)] ${
            isOpen ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}
        >
          <div className="flex justify-center pb-2 pt-3">
            <span className="h-1 w-10 rounded-full bg-slate-300 dark:bg-slate-700" />
          </div>
          <nav aria-label="Hovedmeny" className="space-y-2 px-2.5 pb-3">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.href);

              return (
                <Link
                  key={item.href}
                  ref={item === navItems[0] ? firstMobileLinkRef : undefined}
                  href={item.href}
                  className={mobileLinkClass(active)}
                  onClick={active ? closeMenu : undefined}
                  aria-current={active ? 'page' : undefined}
                >
                  <span
                    className={`mr-3 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${
                      active
                        ? 'bg-white/15 text-white'
                        : 'bg-blue-100 text-blue-700 dark:bg-blue-500/15 dark:text-blue-200'
                    }`}
                  >
                    <Icon aria-hidden="true" className="h-[18px] w-[18px]" />
                  </span>
                  <span>{item.label}</span>
                  <ChevronRight
                    aria-hidden="true"
                    className="ml-auto h-4 w-4 opacity-40 transition-transform group-hover:translate-x-0.5 group-hover:opacity-80"
                  />
                </Link>
              );
            })}
          </nav>
        </div>
      </div>

      <nav
        aria-label="Mobilnavigasjon"
        className="fixed inset-x-5 bottom-[calc(0.75rem+env(safe-area-inset-bottom))] z-50 grid h-16 grid-cols-3 rounded-full border border-slate-200/80 bg-white/85 p-1.5 shadow-[0_14px_38px_-14px_rgba(15,23,42,0.5)] backdrop-blur-2xl md:hidden dark:border-slate-700/80 dark:bg-slate-950/85 dark:shadow-[0_14px_38px_-14px_rgba(0,0,0,0.95)]"
      >
        <Link
          href="/"
          onClick={closeMenu}
          aria-current={isHome ? 'page' : undefined}
          aria-label="Hjem"
          className={`flex min-w-0 items-center justify-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 dark:focus-visible:ring-blue-300 ${
            isHomeButtonActive
              ? 'bg-blue-600 text-white shadow-md shadow-blue-600/25'
              : 'text-slate-700 hover:bg-slate-100 hover:text-blue-700 dark:text-slate-200 dark:hover:bg-white/10 dark:hover:text-blue-200'
          }`}
        >
          <Home aria-hidden="true" className="h-6 w-6" strokeWidth={2.1} />
        </Link>

        <button
          ref={menuButtonRef}
          type="button"
          onClick={toggleMenu}
          className={`flex min-w-0 items-center justify-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 dark:focus-visible:ring-blue-300 ${
            isOpen
              ? 'bg-blue-600 text-white shadow-md shadow-blue-600/25'
              : 'text-slate-700 hover:bg-slate-100 hover:text-blue-700 dark:text-slate-200 dark:hover:bg-white/10 dark:hover:text-blue-200'
          }`}
          aria-label={isOpen ? 'Lukk meny' : 'Åpne meny'}
          aria-expanded={isOpen}
          aria-controls="mobile-navigation"
        >
          {isOpen ? (
            <X aria-hidden="true" className="h-6 w-6" strokeWidth={2.1} />
          ) : (
            <Menu aria-hidden="true" className="h-6 w-6" strokeWidth={2.1} />
          )}
        </button>

        <Darkmode className="h-full w-full rounded-full hover:bg-slate-100 dark:hover:bg-white/10 [&>svg]:h-6 [&>svg]:w-6" />
      </nav>
    </header>
  );
};

export default Navbar;

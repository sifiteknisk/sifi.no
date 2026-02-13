'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Darkmode from './darkmode';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const linkClass =
    'block py-3 px-4 hover:bg-sifiblue hover:text-white md:py-2 md:px-4 md:rounded-lg md:inline-block border-b border-slate-200 dark:border-gray-700 last:border-0 md:border-0 transition-colors';

  return (
    <div className="relative w-full bg-slate-100 dark:bg-gray-900 border-b-2 border-slate-200 md:border-slate-100">
      <div className="max-w-7xl mx-auto px-4 md:px-10 lg:px-16 py-3 md:py-4">
        <div className="flex flex-row items-center justify-between">
          <Link href="/" className="flex-shrink-0" onClick={() => setIsOpen(false)}>
            <picture className="w-32 md:w-auto h-20 md:h-auto px-2 block">
              <Image
                src={'/images/logo_liten_utenbak.png'}
                alt="SIFI"
                width={50}
                height={25}
                className="object-contain"
              />
            </picture>
          </Link>

          <div className="flex items-center gap-2 md:gap-8">
            <button
              onClick={toggleMenu}
              className="md:hidden relative w-10 h-10 rounded-lg hover:bg-slate-200 dark:hover:bg-gray-800 transition-colors flex items-center justify-center"
              aria-label={isOpen ? 'Lukk meny' : 'Åpne meny'}
              aria-expanded={isOpen}
            >
              <span
                className={`absolute w-6 h-0.5 left-1/2 -translate-x-1/2 bg-sifiblue transition-all duration-200 ease-out ${
                  isOpen ? 'top-1/2 -translate-y-1/2 rotate-45' : 'top-2 rotate-0'
                }`}
              />
              <span
                className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-0.5 bg-sifiblue transition-all duration-200 ease-out ${
                  isOpen ? 'opacity-0 scale-x-0' : 'opacity-100 scale-x-100'
                }`}
              />
              <span
                className={`absolute w-6 h-0.5 left-1/2 -translate-x-1/2 bg-sifiblue transition-all duration-200 ease-out ${
                  isOpen ? 'top-1/2 -translate-y-1/2 -rotate-45' : 'bottom-2 rotate-0'
                }`}
              />
            </button>

            <div
              className={`flex flex-col absolute top-full left-0 right-0 bg-slate-100 dark:bg-gray-900 border-b-2 border-slate-200 dark:border-gray-700 md:border-0 md:static md:flex md:flex-row md:items-center md:gap-8 text-lg md:text-xl font-semibold z-10 shadow-lg md:shadow-none origin-top transition-all duration-200 ease-out ${
                isOpen
                  ? 'translate-y-0 opacity-100'
                  : '-translate-y-2 opacity-0 pointer-events-none md:pointer-events-auto md:translate-y-0 md:opacity-100'
              }`}
            >
              <Link href="/" className={linkClass} onClick={toggleMenu}>
                Hjem
              </Link>
              <Link href="/arrangementer" className={linkClass} onClick={toggleMenu}>
                Arrangementer
              </Link>
              <Link href="/stillingsannonser" className={linkClass} onClick={toggleMenu}>
                Stillingsannonser
              </Link>
              <Link href="/merch" className={linkClass} onClick={toggleMenu}>
                Merch
              </Link>
              <Link href="/about" className={linkClass} onClick={toggleMenu}>
                Om oss
              </Link>
              <Link href="/si-ifra" className={linkClass} onClick={toggleMenu}>
                Si ifra
              </Link>
            </div>

            <Darkmode />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

'use client';

import { useEffect, useState } from 'react';

type ScrambledTextProps = {
  text: string;
  className?: string;
};

const CHARSET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&*?';
const TICK_MS = 420;
const CHANGES_PER_TICK = 2;

function mutateFew(current: string, target: string) {
  const chars = current.split('');
  const mutableIndices = target
    .split('')
    .map((char, index) => (char === ' ' ? -1 : index))
    .filter((index) => index >= 0);

  if (mutableIndices.length === 0) return target;

  for (let i = 0; i < CHANGES_PER_TICK; i += 1) {
    const pick = mutableIndices[Math.floor(Math.random() * mutableIndices.length)];
    chars[pick] = Math.random() < 0.6
      ? target[pick]
      : CHARSET[Math.floor(Math.random() * CHARSET.length)];
  }

  return chars.join('');
}

export default function ScrambledText({ text, className }: ScrambledTextProps) {
  const [value, setValue] = useState(text);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setValue((current) => mutateFew(current, text));
    }, TICK_MS);

    return () => window.clearInterval(interval);
  }, [text]);

  useEffect(() => {
    setValue(text);
  }, [text]);

  return <span className={className}>{value}</span>;
}

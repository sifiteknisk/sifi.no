'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import BackgroundPanel from './background-components/BackgroundPanel';

const panels = [
  { key: 'terminal-node', title: 'ssh://uio@sifi', className: 'left-[4%] top-[10%] h-44 w-72', factor: 0.06, terminalHeader: true, contentVariant: 'shell' as const },
  { key: 'network-monitor', title: 'graphana', className: 'right-[5%] top-[16%] h-52 w-80', factor: 0.11, denseGrid: true },
  { key: 'auth-log', title: 'vim /var/log', className: 'left-[4%] bottom-[10%] h-40 w-64', factor: -0.05, contentVariant: 'logs' as const },
  { key: 'packet-analyzer', title: 'wireshark', className: 'right-[4%] bottom-[28%] h-36 w-56', factor: -0.08, contentVariant: 'packets' as const },
  { key: 'secure-shell', title: 'metasploit', className: 'left-[4%] top-[50%] h-32 w-52', factor: -0.09, contentVariant: 'shell' as const },
];

export default function Background() {
  const pathname = usePathname();
  const panelsRef = useRef<HTMLDivElement>(null);
  const showPanels = pathname === '/';
  const gridColor = 'var(--background-grid-color)';
  const glowA = 'var(--background-glow-a)';
  const glowB = 'var(--background-glow-b)';

  useEffect(() => {
    const root = panelsRef.current;
    if (!showPanels || !root || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let frame = 0;
    const update = () => {
      frame = 0;
      const scrollY = window.scrollY;
      root.querySelectorAll<HTMLElement>('[data-parallax-factor]').forEach((layer) => {
        layer.style.transform = `translate3d(0, ${scrollY * Number(layer.dataset.parallaxFactor)}px, 0)`;
      });
    };
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [showPanels]);

  return (
    <div className="background-visuals absolute inset-0 z-0 pointer-events-none overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `linear-gradient(${gridColor} 1px, transparent 1px), linear-gradient(90deg, ${gridColor} 1px, transparent 1px)`,
          backgroundSize: '28px 28px',
          opacity: 'var(--background-grid-opacity)',
        }}
      />
      <div
        className="background-orb absolute -top-24 -left-24 h-[32rem] w-[32rem] rounded-full blur-3xl"
        style={{ backgroundColor: glowA }}
      />
      <div
        className="background-orb background-orb-reverse absolute -bottom-28 -right-20 h-[28rem] w-[28rem] rounded-full blur-3xl"
        style={{ backgroundColor: glowB, animationDelay: '800ms' }}
      />
      <div
        className="background-orb absolute top-[28%] -right-16 h-[18rem] w-[18rem] rounded-full blur-3xl"
        style={{ backgroundColor: glowA, animationDelay: '1400ms' }}
      />
      <div
        className="background-orb background-orb-reverse absolute bottom-[18%] left-[12%] h-[16rem] w-[16rem] rounded-full blur-3xl"
        style={{ backgroundColor: glowB, animationDelay: '2200ms' }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(255,255,255,0.08),transparent_36%),radial-gradient(circle_at_82%_62%,rgba(59,130,246,0.1),transparent_42%)]" />

      {showPanels && (
        <div ref={panelsRef} className="hidden md:block" aria-hidden="true">
          {panels.map((panel) => (
            <div
              key={panel.key}
              data-parallax-factor={panel.factor}
              className="absolute inset-0 will-change-transform"
            >
              <BackgroundPanel
                title={panel.title}
                className={panel.className}
                translateY={0}
                borderColor="var(--background-panel-border)"
                panelStyle={{
                  backgroundColor: 'var(--background-panel-color)',
                  borderColor: 'var(--background-panel-border)',
                }}
                lineColor="var(--background-line-color)"
                denseGrid={panel.denseGrid}
                terminalHeader={panel.terminalHeader}
                contentVariant={panel.contentVariant}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

'use client';

import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import BackgroundPanel, {
  type PanelStyle,
} from './background-components/BackgroundPanel';
import { usePathname } from 'next/navigation';

type PanelConfig = {
  key: string;
  title: string;
  className: string;
  translateFactor: number;
  denseGrid?: boolean;
  terminalHeader?: boolean;
  lineWidths?: string[];
  contentVariant?: 'bars' | 'logs' | 'packets' | 'shell';
};

export default function Background() {
  const { resolvedTheme } = useTheme();
  const pathname = usePathname();
  const isDark = resolvedTheme !== 'light';
  const showPanels = pathname === '/';
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const gridColor = isDark ? 'rgba(96,165,250,0.16)' : 'rgba(37,99,235,0.14)';
  const panelBg = isDark ? 'rgba(15,23,42,0.58)' : 'rgba(255,255,255,0.62)';
  const panelBorder = isDark ? 'rgba(96,165,250,0.24)' : 'rgba(37,99,235,0.28)';
  const lineColor = isDark ? 'rgba(125,211,252,0.42)' : 'rgba(37,99,235,0.32)';
  const glowA = isDark ? 'rgba(29,78,216,0.3)' : 'rgba(37,99,235,0.22)';
  const glowB = isDark ? 'rgba(14,165,233,0.24)' : 'rgba(14,116,144,0.2)';
  const panelStyle = {
    backgroundColor: panelBg,
    borderColor: panelBorder,
  };
  const panels: PanelConfig[] = [
    {
      key: 'terminal-node',
      title: 'ssh://uio@sifi',
      className: 'left-[4%] top-[10%] h-44 w-72',
      translateFactor: 0.06,
      terminalHeader: true,
      contentVariant: 'shell',
    },
    {
      key: 'network-monitor',
      title: 'graphana',
      className: 'right-[5%] top-[16%] h-52 w-80',
      translateFactor: 0.11,
      denseGrid: true,
    },
    {
      key: 'auth-log',
      title: 'vim /var/log',
      className: 'left-[4%] bottom-[10%] h-40 w-64',
      translateFactor: -0.05,
      contentVariant: 'logs',
    },
    {
      key: 'packet-analyzer',
      title: 'wireshark',
      className: 'right-[4%] bottom-[28%] h-36 w-56',
      translateFactor: -0.08,
      contentVariant: 'packets',
    },
    {
      key: 'secure-shell',
      title: 'metasploit',
      className: 'left-[4%] top-[50%] h-32 w-52',
      translateFactor: -0.09,
      contentVariant: 'shell',
    },
  ];

  return (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `linear-gradient(${gridColor} 1px, transparent 1px), linear-gradient(90deg, ${gridColor} 1px, transparent 1px)`,
          backgroundSize: '28px 28px',
          opacity: isDark ? 0.35 : 0.25,
        }}
      />
      <div
        className="absolute -top-24 -left-24 h-[32rem] w-[32rem] rounded-full blur-3xl animate-pulse"
        style={{ backgroundColor: glowA }}
      />
      <div
        className="absolute -bottom-28 -right-20 h-[28rem] w-[28rem] rounded-full blur-3xl animate-pulse"
        style={{ backgroundColor: glowB, animationDelay: '800ms' }}
      />
      <div
        className="absolute top-[28%] -right-16 h-[18rem] w-[18rem] rounded-full blur-3xl animate-pulse"
        style={{ backgroundColor: glowA, animationDelay: '1400ms' }}
      />
      <div
        className="absolute bottom-[18%] left-[12%] h-[16rem] w-[16rem] rounded-full blur-3xl animate-pulse"
        style={{ backgroundColor: glowB, animationDelay: '2200ms' }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(255,255,255,0.08),transparent_36%),radial-gradient(circle_at_82%_62%,rgba(59,130,246,0.1),transparent_42%)]" />

      {showPanels && (
        <div className="hidden md:block">
          {panels.map((panel) => (
            <BackgroundPanel
              key={panel.key}
              title={panel.title}
              className={panel.className}
              translateY={scrollY * panel.translateFactor}
              borderColor={panelBorder}
              panelStyle={panelStyle}
              lineColor={lineColor}
              denseGrid={panel.denseGrid}
              terminalHeader={panel.terminalHeader}
              lineWidths={panel.lineWidths}
              contentVariant={panel.contentVariant}
            />
          ))}
        </div>
      )}
    </div>
  );
}

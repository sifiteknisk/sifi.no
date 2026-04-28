'use client';

export type PanelStyle = {
  backgroundColor: string;
  borderColor: string;
};

export type BackgroundPanelProps = {
  title: string;
  className: string;
  translateY: number;
  borderColor: string;
  panelStyle: PanelStyle;
  lineColor: string;
  denseGrid?: boolean;
  terminalHeader?: boolean;
  lineWidths?: string[];
  contentVariant?: 'bars' | 'logs' | 'packets' | 'shell';
};

const BackgroundPanel = ({
  title,
  className,
  translateY,
  borderColor,
  panelStyle,
  lineColor,
  denseGrid = false,
  terminalHeader = false,
  lineWidths = ['w-5/6', 'w-4/6', 'w-3/6', 'w-2/6'],
  contentVariant = 'bars',
}: BackgroundPanelProps) => {
  return (
    <div
      className={`absolute rounded-xl border backdrop-blur-md transition-transform duration-200 ${className}`}
      style={{ ...panelStyle, transform: `translateY(${translateY}px)` }}
    >
      <div
        className={`border-b px-3 py-2 text-[11px] font-mono opacity-70 ${terminalHeader ? 'flex items-center gap-2' : ''}`}
        style={{ borderColor }}
      >
        {terminalHeader ? (
          <>
            <span className="h-2 w-2 rounded-full bg-red-400/80" />
            <span className="h-2 w-2 rounded-full bg-yellow-300/80" />
            <span className="h-2 w-2 rounded-full bg-emerald-400/80" />
            <span className="ml-2">{title}</span>
          </>
        ) : (
          title
        )}
      </div>

      {denseGrid ? (
        <div className="grid grid-cols-8 gap-1 p-3">
          {Array.from({ length: 40 }).map((_, index) => (
            <div
              key={`${title}-${index}`}
              className="h-3 rounded-sm border"
              style={{
                borderColor,
                backgroundColor: index % 3 === 0 ? lineColor : 'transparent',
              }}
            />
          ))}
        </div>
      ) : (
        <div className="px-3 py-3">
          {contentVariant === 'logs' && (
            <>
              <div className="mb-2 h-1.5 w-full rounded" style={{ backgroundColor: lineColor }} />
              <div className="mb-2 h-1.5 w-4/5 rounded" style={{ backgroundColor: lineColor }} />
              <div className="mb-2 h-1.5 w-2/3 rounded" style={{ backgroundColor: lineColor }} />
              <div className="mb-2 h-1.5 w-5/6 rounded" style={{ backgroundColor: lineColor }} />
              <div className="h-1.5 w-1/2 rounded" style={{ backgroundColor: lineColor }} />
            </>
          )}

          {contentVariant === 'packets' && (
            <>
              <div className="mb-2 flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: lineColor }} />
                <div className="h-1.5 w-3/4 rounded" style={{ backgroundColor: lineColor }} />
              </div>
              <div className="mb-2 flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: lineColor }} />
                <div className="h-1.5 w-2/3 rounded" style={{ backgroundColor: lineColor }} />
              </div>
              <div className="mb-2 flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: lineColor }} />
                <div className="h-1.5 w-5/6 rounded" style={{ backgroundColor: lineColor }} />
              </div>
              <div className="h-1.5 w-1/2 rounded" style={{ backgroundColor: lineColor }} />
            </>
          )}

          {contentVariant === 'shell' && (
            <>
              <div className="mb-2 h-1.5 w-2/5 rounded" style={{ backgroundColor: lineColor }} />
              <div className="mb-2 h-1.5 w-4/6 rounded" style={{ backgroundColor: lineColor }} />
              <div className="mb-2 h-1.5 w-3/6 rounded" style={{ backgroundColor: lineColor }} />
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: lineColor }} />
                <div className="h-1.5 w-2/3 rounded" style={{ backgroundColor: lineColor }} />
              </div>
            </>
          )}

          {contentVariant === 'bars' &&
            lineWidths.map((width, index) => (
              <div
                key={`${title}-line-${index}`}
                className={`${index < lineWidths.length - 1 ? 'mb-2' : ''} h-1.5 ${width} rounded`}
                style={{ backgroundColor: lineColor }}
              />
            ))}
        </div>
      )}
    </div>
  );
};

export default BackgroundPanel;

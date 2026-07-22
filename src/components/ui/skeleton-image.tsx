'use client';

import Image, { type ImageProps } from 'next/image';
import { useState } from 'react';

function getSourceKey(src: ImageProps['src']) {
  if (typeof src === 'string') {
    return src;
  }

  return 'default' in src ? src.default.src : src.src;
}

export default function SkeletonImage({
  alt,
  className,
  onLoad,
  onError,
  ...props
}: ImageProps) {
  const sourceKey = getSourceKey(props.src);
  const [loadedSource, setLoadedSource] = useState<string | null>(null);
  const [failedSource, setFailedSource] = useState<string | null>(null);
  const isLoading = loadedSource !== sourceKey && failedSource !== sourceKey;

  return (
    <Image
      {...props}
      alt={alt}
      className={['skeleton-image', className].filter(Boolean).join(' ')}
      data-loading={isLoading ? 'true' : 'false'}
      data-load-error={failedSource === sourceKey ? 'true' : 'false'}
      aria-busy={isLoading}
      onLoad={(event) => {
        setLoadedSource(sourceKey);
        setFailedSource(null);
        onLoad?.(event);
      }}
      onError={(event) => {
        setFailedSource(sourceKey);
        onError?.(event);
      }}
    />
  );
}

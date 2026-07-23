'use client';

import Image, { type ImageProps } from 'next/image';
import { useEffect, useState } from 'react';

const SKELETON_DELAY_MS = 150;

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
  const [skeletonSource, setSkeletonSource] = useState<string | null>(null);
  const [revealedSource, setRevealedSource] = useState<string | null>(null);
  const isLoading = loadedSource !== sourceKey && failedSource !== sourceKey;
  const showSkeleton = isLoading && skeletonSource === sourceKey;

  useEffect(() => {
    if (!isLoading) {
      setSkeletonSource(null);
      return;
    }

    const timeout = window.setTimeout(() => {
      setSkeletonSource(sourceKey);
    }, SKELETON_DELAY_MS);

    return () => window.clearTimeout(timeout);
  }, [isLoading, sourceKey]);

  return (
    <Image
      {...props}
      alt={alt}
      className={['skeleton-image', className].filter(Boolean).join(' ')}
      data-loading={showSkeleton ? 'true' : 'false'}
      data-load-error={failedSource === sourceKey ? 'true' : 'false'}
      data-reveal={revealedSource === sourceKey ? 'true' : 'false'}
      aria-busy={isLoading}
      onLoad={(event) => {
        setLoadedSource(sourceKey);
        setRevealedSource(showSkeleton ? sourceKey : null);
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

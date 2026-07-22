'use client';

import Image, { type ImageProps } from 'next/image';
import { useState } from 'react';

export default function SkeletonImage({
  alt,
  className,
  onLoad,
  onError,
  ...props
}: ImageProps) {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <Image
      {...props}
      alt={alt}
      className={className}
      data-loading={isLoading ? 'true' : 'false'}
      onLoad={(event) => {
        setIsLoading(false);
        onLoad?.(event);
      }}
      onError={(event) => {
        setIsLoading(false);
        onError?.(event);
      }}
    />
  );
}

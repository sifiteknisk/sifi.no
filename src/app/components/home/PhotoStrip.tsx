import FeatureStrip from './FeatureStrip';

const photos = [
  { src: '/images/PR/hacking.jpg', alt: 'SIFI PR bilde 1' },
  { src: '/images/PR/qr.jpg', alt: 'SIFI PR bilde 2' },
  { src: '/images/PR/scoreboard.jpg', alt: 'SIFI PR bilde 3' },
];

export default function PhotoStrip() {
  const [featured, ...rest] = photos;

  return (
    <FeatureStrip
      title="Styret"
      subtitle="Vi i styret vil styrke sikkerhetsentusiastiske miljøet for studenter ved UiO."
      viewAllHref="/about"
      viewAllLabel="Mer om oss"
      placeholderTitle="Flere bilder kommer"
      placeholders={0}
      featured={{
        id: 'styret-featured',
        href: '/about',
        title: 'SIFI PR',
        imageUrl: featured.src,
      }}
      sideItems={rest.slice(0, 2).map((photo, index) => ({
        id: `styret-side-${index}`,
        href: '/about',
        title: '',
        imageUrl: photo.src,
      }))}
      sideStyle="imageOverlay"
      hideImageText
    />
  );
}

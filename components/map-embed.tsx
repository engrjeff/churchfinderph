import { cn } from '@/lib/utils';

const MAP_EMBED_SRC = `https://www.google.com/maps/embed/v1/place?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&region=PH&q=LOCATION`;

export function MapEmbed({
  location,
  className,
}: {
  location: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        'aspect-video border rounded-md overflow-hidden',
        className
      )}
    >
      <iframe
        width="100%"
        height="100%"
        style={{ border: 0 }}
        loading="lazy"
        allowFullScreen
        referrerPolicy="no-referrer-when-downgrade"
        src={MAP_EMBED_SRC.replace('LOCATION', encodeURIComponent(location))}
      ></iframe>
    </div>
  );
}

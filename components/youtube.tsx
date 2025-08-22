import { cn } from '@/lib/utils';

export function YouTube({
  videoId,
  className,
}: {
  videoId: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        'aspect-video overflow-hidden rounded-xl shadow',
        className
      )}
    >
      <iframe
        src={`https://www.youtube.com/embed/${videoId}`}
        allow="autoplay; encrypted-media"
        title="Embedded YouTube video"
        allowFullScreen
        className="m-0 block size-full border-none object-contain p-0"
        loading="lazy"
      />
    </div>
  );
}

import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function arrayToMap<T>(
  arr: T[],
  keyProperty: keyof T,
  valueKey: keyof T
) {
  return new Map(arr.map((entry) => [entry[keyProperty], entry[valueKey]]));
}

export function getYouTubeVideoId(youtubeLinkUrl?: string) {
  if (!youtubeLinkUrl) return false;

  if (!youtubeLinkUrl.includes('youtube.com')) return false;

  const parsedUrl = new URL(youtubeLinkUrl);

  const domain = parsedUrl.hostname;

  if (!domain.includes('youtube.com')) return false;

  const videoId = parsedUrl.searchParams.get('v');

  if (!videoId) return false;

  return videoId;
}

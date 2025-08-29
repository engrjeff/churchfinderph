import { Church } from '@/app/generated/prisma';
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

export const formatTime = (timeStr: string) => {
  const parts = timeStr.split(':');
  let hours = parseInt(parts[0]);
  let minutes = parseInt(parts[1]);
  let ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12;
  const minutesStr = minutes.toString().padStart(2, '0');
  let strTime = hours + ':' + minutesStr + ' ' + ampm;
  return strTime;
};

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

export function getShortAddress(church: Church) {
  return [church.city, church.province].join(', ');
}

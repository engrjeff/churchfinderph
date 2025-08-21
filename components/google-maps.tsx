'use client';

import dynamic from 'next/dynamic';

const Map = dynamic(() => import('@/components/map'), {
  ssr: false,
});

const PlacesAutocomplete = dynamic(
  () => import('@/components/places-autocomplete'),
  {
    ssr: false,
  }
);

export function GoogleMaps() {
  return (
    <div>
      <PlacesAutocomplete />
      <Map />
    </div>
  );
}

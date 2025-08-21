// app/components/Map.tsx
'use client';

import { Loader } from '@googlemaps/js-api-loader';
import { useEffect, useRef } from 'react';

const defaultLocation = { lat: 14.5995, lng: 120.9842 }; // Manila

export default function Map() {
  const mapRef = useRef<HTMLDivElement>(null);
  const googleMap = useRef<google.maps.Map | null>(null);

  useEffect(() => {
    const initMap = async (location: google.maps.MapOptions['center']) => {
      const loader = new Loader({
        apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!, // Use env variable
        version: 'weekly',
      });

      const { Map } = await loader.importLibrary('maps');

      const map = new Map(mapRef.current as HTMLDivElement, {
        center: location,
        zoom: 17,
        mapId: 'next-app-map',
      });

      // marker
      const { AdvancedMarkerElement } = await loader.importLibrary('marker');

      new AdvancedMarkerElement({
        map,
        position: location,
      });

      googleMap.current = map;
    };

    if (window.navigator) {
      navigator.geolocation.getCurrentPosition(
        (loc) => {
          const userLocation = {
            lat: loc.coords.latitude,
            lng: loc.coords.longitude,
          };

          initMap(userLocation);
        },
        (error) => {
          console.error(`Could not get current location: `, error);
          initMap(defaultLocation);
        }
      );
    }

    // if (!mapRef.current) return;

    // const loader = new Loader({
    //   apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!, // Use env variable
    //   version: 'weekly',
    // });

    // loader.importLibrary('maps').then(({ Map }) => {
    //   // Get user's current location
    //   navigator.geolocation.getCurrentPosition(
    //     async (position) => {
    //       const userLocation = {
    //         lat: position.coords.latitude,
    //         lng: position.coords.longitude,
    //       };

    //       const mapInstance = new Map(mapRef.current as HTMLDivElement, {
    //         center: userLocation,
    //         zoom: 14,
    //         mapId: 'map-demo-id',
    //       });

    //       new google.maps.marker.AdvancedMarkerElement({
    //         position: userLocation,
    //         map: mapInstance,
    //         title: 'You are here',
    //       });

    //       googleMap.current = mapInstance;
    //     },
    //     async (error) => {
    //       console.error('Error getting user location:', error);
    //       const defaultLocation = { lat: 14.5995, lng: 120.9842 }; // Manila

    //       const mapInstance = new Map(mapRef.current as HTMLDivElement, {
    //         center: defaultLocation,
    //         zoom: 14,
    //         mapId: 'map-demo-id',
    //       });

    //       new google.maps.marker.AdvancedMarkerElement({
    //         position: defaultLocation,
    //         map: mapInstance,
    //         title: 'You are here',
    //       });

    //       googleMap.current = mapInstance;
    //     }
    //   );
    // });
  }, []);

  return <div ref={mapRef} className="w-1/2 h-screen rounded-md shadow" />;
}

// app/components/AutocompleteInput.tsx
'use client';

import { Loader } from '@googlemaps/js-api-loader';
import { useEffect, useRef } from 'react';

export default function AutocompleteInput() {
  const placesServiceRef = useRef<typeof google.maps.places.Place>(undefined);

  useEffect(() => {
    const initAutocomplete = async () => {
      const loader = new Loader({
        apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
        version: 'weekly',
      });

      const { Place } = await loader.importLibrary('places');

      placesServiceRef.current = Place;
    };

    initAutocomplete();
  }, []);

  return (
    <div className="w-full max-w-md">
      <label className="block text-sm font-medium mb-1">
        Search for an address
      </label>
      <input
        type="text"
        className="w-full border border-gray-300 px-3 py-2 rounded-md shadow-sm"
        placeholder="Start typing address..."
        onChange={async (e) => {
          if (!e.currentTarget.value) return;

          if (e.currentTarget.value.length < 3) return;

          if (!placesServiceRef.current) return;

          const results = await placesServiceRef.current.searchByText({
            textQuery: e.currentTarget.value,
            maxResultCount: 5,
            fields: [
              'displayName',
              'addressComponents',
              'formattedAddress',
              'googleMapsURI',
              'id',
              'location',
            ],
            region: 'PH',
          });

          const places: object[] = [];

          results.places.forEach((place) => places.push(place.toJSON()));

          console.log(places);
        }}
      />
    </div>
  );
}

// // app/components/AutocompleteInput.tsx
// 'use client';

// import { Loader } from '@googlemaps/js-api-loader';
// import { useEffect, useRef } from 'react';

// export default function AutocompleteInput() {
//   const placesServiceRef =
//     useRef<google.maps.places.AutocompleteService>(undefined);

//   useEffect(() => {
//     const initAutocomplete = async () => {
//       const loader = new Loader({
//         apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
//         version: 'weekly',
//       });

//       const { AutocompleteService } = (await loader.importLibrary(
//         'places'
//       )) as google.maps.PlacesLibrary;

//       const placesService = new AutocompleteService();

//       placesServiceRef.current = placesService;
//     };

//     initAutocomplete();
//   }, []);

//   return (
//     <div className="w-full max-w-md">
//       <label className="block text-sm font-medium mb-1">
//         Search for an address
//       </label>
//       <input
//         type="text"
//         className="w-full border border-gray-300 px-3 py-2 rounded-md shadow-sm"
//         placeholder="Start typing address..."
//         onChange={async (e) => {
//           if (!e.currentTarget.value) return;

//           if (e.currentTarget.value.length < 3) return;

//           if (!placesServiceRef.current) return;

//           placesServiceRef.current.getPlacePredictions(
//             {
//               input: e.currentTarget.value,
//               componentRestrictions: { country: 'ph' },
//             },
//             (results) => {
//               console.log(results);
//             }
//           );
//         }}
//       />
//     </div>
//   );
// }

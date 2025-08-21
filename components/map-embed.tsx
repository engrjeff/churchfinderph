export function MapEmbed() {
  // const lat = '14.515914782643838';
  // const lng = '121.23885384037133';

  return (
    <main>
      <iframe
        width="600"
        height="450"
        style={{ border: 0 }}
        loading="lazy"
        allowFullScreen
        referrerPolicy="no-referrer-when-downgrade"
        src={`https://www.google.com/maps/embed/v1/place?key=${
          process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
        }
    &q=${encodeURIComponent(
      'Sovereign Grace Church - Morong, Rizal'
    )}&region=PH`}
      ></iframe>
      {/* <iframe
        width="600"
        height="450"
        style={{ border: 0 }}
        loading="lazy"
        allowFullScreen
        referrerPolicy="no-referrer-when-downgrade"
        src={`https://www.google.com/maps/embed/v1/directions?key=aaa&origin=${encodeURIComponent(
          'Abide in the Vine PH'
        )}&center=${[lat, lng].join(',')}&destination=${encodeURIComponent(
          'Sulok Resort, Morong, Rizal'
        )}&zoom=15`}
      ></iframe> */}
      {/* <a
        href="https://www.google.com/maps/dir/?api=1&origin=14.6846,121.1519&destination=14.5149,121.2356"
        target="_blank"
      >
        Open Directions in Google Maps
      </a> */}

      <a href="https://maps.app.goo.gl/RfkfJRnU34LDq8cp6" target="_blank">
        Link to Map
      </a>
    </main>
  );
}

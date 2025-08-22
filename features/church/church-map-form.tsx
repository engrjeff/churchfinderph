'use client';
import { Church, ChurchMap } from '@/app/generated/prisma';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { SubmitButton } from '@/components/ui/submit-button';
import { Loader } from '@googlemaps/js-api-loader';
import { MapPinIcon } from 'lucide-react';
import { useAction } from 'next-safe-action/hooks';
import { useRef, useState } from 'react';
import { toast } from 'sonner';
import { setChurchMap } from './actions';
import { churchMapSchema } from './schema';

const MAP_EMBED_SRC = `https://www.google.com/maps/embed/v1/place?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&region=PH&q=LOCATION`;

export function ChurchMapForm({
  church,
  churchMap,
}: {
  church: Church;
  churchMap?: ChurchMap | null;
}) {
  const [address, setAddress] = useState(
    () => churchMap?.addressInMap ?? church.fullAddress
  );

  const [busy, setBusy] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);

  const setAction = useAction(setChurchMap, {
    onError: ({ error }) => {
      console.error(error);
      toast.error(`Error setting church map data`);
    },
  });

  const isPending = busy || setAction.isPending;

  async function getGeoCode(addressInput: string) {
    const loader = new Loader({
      apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!, // Use env variable
      version: 'weekly',
    });

    const { Geocoder } = await loader.importLibrary('geocoding');

    const geocoder = new Geocoder();

    const result = await geocoder.geocode({
      address: addressInput,
      region: 'PH',
    });

    if (result.results?.at(0)) {
      const location = result.results?.at(0)?.geometry.location;

      if (!location) return null;

      return { lat: location?.lat(), lng: location?.lng() };
    }

    return null;
  }

  async function saveMapDetails() {
    try {
      setBusy(true);

      let lat: number = churchMap?.latitude ?? 0;
      let lng: number = churchMap?.longitude ?? 0;

      if (churchMap?.addressInMap?.trim() !== address?.trim()) {
        // get geocode
        console.log('getting new GeoCode for ', address);
        const location = await getGeoCode(address);

        if (location) {
          lat = location.lat;
          lng = location.lng;
        }
      }

      const validatedData = churchMapSchema.safeParse({
        latitude: lat,
        longitude: lng,
        addressInMap: address,
        churchId: church.id,
      });

      if (!validatedData.success) {
        toast.error('Address the errors.');
        return;
      }

      const result = await setAction.executeAsync(validatedData.data);

      if (result.data?.churchMap?.id) {
        toast.success(`Church Map was saved successfully!`);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-xl font-bold">Map</h1>
        <p className="text-muted-foreground text-sm">
          Let people know how to easily find your church.
        </p>
      </div>
      <Separator />
      <fieldset
        disabled={isPending}
        className="flex items-center gap-3 relative disabled:opacity-90"
      >
        <MapPinIcon className="text-muted-foreground size-4 absolute top-3 left-3" />
        <Label htmlFor="address" className="sr-only">
          Address
        </Label>
        <Input
          ref={inputRef}
          id="address"
          name="address"
          className="pl-9"
          defaultValue={address}
        />
        <Button
          type="button"
          onClick={() =>
            setAddress(inputRef.current?.value?.trim() ?? church.fullAddress)
          }
        >
          Find In Map
        </Button>
      </fieldset>
      <div className="aspect-video border rounded-md overflow-hidden">
        <iframe
          width="100%"
          height="100%"
          style={{ border: 0 }}
          loading="lazy"
          allowFullScreen
          referrerPolicy="no-referrer-when-downgrade"
          src={MAP_EMBED_SRC.replace('LOCATION', encodeURIComponent(address))}
        ></iframe>
      </div>
      <div className="border rounded-md p-4 space-y-2">
        <p>Does this look right to you?</p>
        <SubmitButton
          type="button"
          loading={isPending}
          onClick={saveMapDetails}
          disabled={address.trim() === churchMap?.addressInMap?.trim()}
        >
          Yes, Save it.
        </SubmitButton>
      </div>
    </div>
  );
}

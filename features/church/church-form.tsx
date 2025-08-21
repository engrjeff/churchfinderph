'use client';

import { Autocomplete } from '@/components/ui/autocomplete';
import { AvatarPicker } from '@/components/ui/avatar-picker';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { SubmitButton } from '@/components/ui/submit-button';
import { Textarea } from '@/components/ui/textarea';
import {
  useBarangays,
  useCities,
  useProvinces,
  useRegions,
} from '@/hooks/use-addresses';
import { uploadLogo } from '@/lib/services';
import { arrayToMap } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAction } from 'next-safe-action/hooks';
import { useState } from 'react';
import { SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { createChurch } from './actions';
import { ChurchInputs, churchSchema } from './schema';

const DEFAULT_VALUES: ChurchInputs = {
  name: '',
  region: '',
  province: '',
  city: '',
  barangay: '',
  street: '',
  welcomeMessage: '',
  logo: '',
  fullAddress: '',
  zipCode: '',
};

export function ChurchForm() {
  const form = useForm<ChurchInputs>({
    resolver: zodResolver(churchSchema),
    defaultValues: DEFAULT_VALUES,
  });

  const [uploading, setUploading] = useState(false);

  const createAction = useAction(createChurch, {
    onError: ({ error }) => {
      console.error(error);
      toast.error(`Error creating church`);
    },
  });

  const isPending = createAction.isPending || uploading;

  const currentRegion = form.watch('region');
  const currentProvince = form.watch('province');
  const currentCity = form.watch('city');
  const currentBarangay = form.watch('barangay');
  const street = form.watch('street');

  // addresses
  const { data: regions = [] } = useRegions();
  const { data: provinces = [] } = useProvinces(currentRegion);
  const { data: cities = [] } = useCities(currentProvince);
  const { data: barangays = [] } = useBarangays(currentCity);

  const getFullAddress = () => {
    const regionName = arrayToMap(regions, 'region_code', 'region_name').get(
      currentRegion
    );
    const provinceName = arrayToMap(
      provinces,
      'province_code',
      'province_name'
    ).get(currentProvince);
    const cityName = arrayToMap(cities, 'city_code', 'city_name').get(
      currentCity
    );
    const barangayName = arrayToMap(barangays, 'brgy_code', 'brgy_name').get(
      currentBarangay
    );

    const fullAddress = [
      street,
      barangayName,
      cityName,
      provinceName,
      regionName,
    ].join(', ');

    return fullAddress;
  };

  const onFormError: SubmitErrorHandler<ChurchInputs> = (errors) => {
    console.log(`CHURCH FORM ERRORS: `, errors);
  };

  const onSubmit: SubmitHandler<ChurchInputs> = async (data) => {
    try {
      setUploading(true);

      let logoUrl: string | undefined = undefined;

      if (data.logo) {
        // upload
        logoUrl = await uploadLogo(data.logo, data.name);
      }

      const result = await createAction.executeAsync({
        ...data,
        logo: logoUrl,
        fullAddress: getFullAddress(),
      });

      if (result.data?.church.id) {
        toast.success('Church created successfully!', {
          description: 'Added to your listing.',
        });
        form.reset(DEFAULT_VALUES);

        window.location.replace(
          `/my-listing/${result.data.church.id}?step=profile`
        );
      }
    } catch (error) {
    } finally {
      setUploading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit, onFormError)}>
        <fieldset
          disabled={isPending}
          className="space-y-4 disabled:opacity-90"
        >
          <FormField
            control={form.control}
            name="logo"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <AvatarPicker
                    src={form.watch('logo')}
                    label="Church Logo"
                    desc="Upload a church logo"
                    onChange={(file, src) => {
                      field.onChange(src);
                    }}
                    onDelete={() => {
                      field.onChange(undefined);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>What is your church called?</FormLabel>
                <FormControl>
                  <Input
                    autoFocus
                    placeholder="Enter your church's name"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="street"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Where is church located?</FormLabel>
                <FormControl>
                  <Textarea
                    rows={2}
                    placeholder="Enter your church's street address"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="region"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Region</FormLabel>
                  <FormControl>
                    <Autocomplete
                      searchText="Search region..."
                      placeholderText="Select a region"
                      value={field.value}
                      onChange={(value) => {
                        field.onChange(value);
                        form.setValue('province', '');
                        form.setValue('city', '');
                        form.setValue('barangay', '');
                      }}
                      options={
                        regions?.map((i) => ({
                          value: i.region_code,
                          label: i.region_name,
                        })) ?? []
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="province"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Province</FormLabel>
                  <FormControl>
                    <Autocomplete
                      searchText="Search province..."
                      placeholderText="Select a province"
                      value={field.value}
                      onChange={(value) => {
                        field.onChange(value);
                        form.setValue('city', '');
                        form.setValue('barangay', '');
                      }}
                      options={provinces.map((i) => ({
                        value: i.province_code,
                        label: i.province_name,
                      }))}
                      disabled={!currentRegion}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Town/City</FormLabel>
                  <FormControl>
                    <Autocomplete
                      searchText="Search town/city..."
                      placeholderText="Select a town/city"
                      value={field.value}
                      onChange={(value) => {
                        field.onChange(value);
                        form.setValue('barangay', '');
                      }}
                      options={cities.map((i) => ({
                        value: i.city_code,
                        label: i.city_name,
                      }))}
                      disabled={!currentProvince}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="barangay"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Town/City</FormLabel>
                  <FormControl>
                    <Autocomplete
                      searchText="Search barangay..."
                      placeholderText="Select a barangay"
                      value={field.value}
                      onChange={field.onChange}
                      options={barangays.map((i) => ({
                        value: i.brgy_code,
                        label: i.brgy_name,
                      }))}
                      disabled={!currentCity}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="zipCode"
            render={({ field }) => (
              <FormItem>
                <FormLabel>ZIP Code</FormLabel>
                <FormControl>
                  <Input placeholder="Enter ZIP code" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="welcomeMessage"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Welcome Message</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Welcome to our church"
                    rows={4}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-end pt-6">
            <SubmitButton loading={isPending}>Save Church</SubmitButton>
          </div>
        </fieldset>
      </form>
    </Form>
  );
}

{
  /* <CldUploadWidget
            uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!}
            signatureEndpoint="/api/sign-cloudinary-params"
            options={{
              sources: ['local', 'url'],
              maxFiles: 1,
              folder: 'churchfinderphdev/churches/logos',
              singleUploadAutoClose: false,
            }}
            onSuccess={(result) => {
              if (
                typeof result.info === 'object' &&
                'secure_url' in result.info
              ) {
                console.log(result.info.secure_url);
                form.setValue('logo', result.info.secure_url);
              }
            }}
            onError={(error) => {
              console.error('Upload error:', error);
              toast.error('Failed to upload image');
            }}
          >
            {({ open }) => {
              return (
                <Button type="button" onClick={() => open()}>
                  Upload an Image
                </Button>
              );
            }}
          </CldUploadWidget> */
}

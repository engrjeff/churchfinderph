'use client';

import { ChurchContact, ContactInfo, SocialLink } from '@/app/generated/prisma';
import { FaviconImage } from '@/components/favicon-image';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { SelectNative } from '@/components/ui/select-native';
import { Separator } from '@/components/ui/separator';
import { SubmitButton } from '@/components/ui/submit-button';
import { SOCIAL_PLATFORM_OPTIONS } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { MinusCircleIcon, PlusCircleIcon } from 'lucide-react';
import { useAction } from 'next-safe-action/hooks';
import {
  SubmitErrorHandler,
  SubmitHandler,
  useFieldArray,
  useForm,
} from 'react-hook-form';
import { toast } from 'sonner';
import { setChurchContactAndSocialLinks } from './actions';
import {
  ChurchContactAndSocialsInputs,
  churchContactAndSocialsSchema,
} from './schema';

export function ChurchContactForm({
  churchId,
  contactInfo,
  phoneNumbers,
  socialLinks,
}: {
  churchId: string;
  contactInfo: ChurchContact | null;
  phoneNumbers: ContactInfo[];
  socialLinks: SocialLink[];
}) {
  const defaultValues: ChurchContactAndSocialsInputs = {
    churchId,
    contactInfo: {
      email: contactInfo?.email ?? '',
      website: contactInfo?.website ?? '',
    },
    phoneNumbers: phoneNumbers?.length
      ? phoneNumbers.map((p) => ({ value: p.value }))
      : [{ value: '', isPrimary: true }],
    socialLinks: socialLinks?.length
      ? socialLinks.map((s) => ({ url: s.url, platform: s.platform }))
      : [{ url: '', platform: '' }],
  };

  const form = useForm<ChurchContactAndSocialsInputs>({
    resolver: zodResolver(churchContactAndSocialsSchema),
    defaultValues,
  });

  const phoneNumberFields = useFieldArray({
    control: form.control,
    name: 'phoneNumbers',
  });

  const socialLinkFields = useFieldArray({
    control: form.control,
    name: 'socialLinks',
  });

  const createAction = useAction(setChurchContactAndSocialLinks, {
    onError: ({ error }) => {
      console.error(error);
      toast.error(`Error setting church contact details`);
    },
  });

  const isBusy = createAction.isPending;

  const onFormError: SubmitErrorHandler<ChurchContactAndSocialsInputs> = (
    errors
  ) => {
    console.log(`CHURCH CONTACT DETAILS FORM ERRORS: `, errors);
  };

  const onSubmit: SubmitHandler<ChurchContactAndSocialsInputs> = async (
    data
  ) => {
    try {
      const result = await createAction.executeAsync(data);

      if (result.data?.church?.id) {
        toast.success('Church contact details were set successfully!');

        window.location.reload();
      }
    } catch (error) {
    } finally {
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit, onFormError)}
        className="space-y-4"
      >
        <div>
          <h1 className="text-xl font-bold">Contact Details</h1>
          <p className="text-muted-foreground text-sm">
            Let people know how to connect to your church.
          </p>
        </div>
        <Separator />
        <fieldset className="space-y-4 disabled:opacity-90" disabled={isBusy}>
          <p className="font-semibold">Email & Website</p>
          <FormField
            control={form.control}
            name="contactInfo.email"
            render={({ field }) => (
              <FormItem>
                <FormDescription>Email</FormDescription>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="info@mychurch.com"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="contactInfo.website"
            render={({ field }) => (
              <FormItem>
                <FormDescription>Website (Optional)</FormDescription>
                <FormControl>
                  <Input
                    type="url"
                    inputMode="url"
                    placeholder="https://www.mychurch.com"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <Separator />
          <p className="font-semibold">Contact Numbers</p>
          {phoneNumberFields.fields.map((field, index) => (
            <div key={field.id} className="flex items-end gap-4">
              <FormField
                control={form.control}
                name={`phoneNumbers.${index}.value`}
                render={({ field }) => (
                  <FormItem className="w-[200px]">
                    <FormDescription className={cn(index !== 0 && 'sr-only')}>
                      Number
                    </FormDescription>
                    <FormControl>
                      <Input placeholder="+639XXXXXXXXX" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <Button
                aria-label="delete phone number"
                variant="outline"
                size="icon"
                type="button"
                disabled={phoneNumberFields.fields.length <= 1}
                onClick={() => phoneNumberFields.remove(index)}
              >
                <MinusCircleIcon />
              </Button>
            </div>
          ))}
          <Button
            type="button"
            variant="secondary"
            size="sm"
            onClick={() => phoneNumberFields.append({ value: '' })}
          >
            <PlusCircleIcon /> Add Phone Number
          </Button>
          <Separator />
          <p className="font-semibold">Social Links</p>
          {socialLinkFields.fields.map((field, index) => (
            <div
              key={field.id}
              className="grid grid-cols-[1fr_150px_auto] items-end gap-4"
            >
              <FormField
                control={form.control}
                name={`socialLinks.${index}.url`}
                render={({ field }) => (
                  <FormItem>
                    <FormDescription className={cn(index !== 0 && 'sr-only')}>
                      URL
                    </FormDescription>
                    <div className="relative">
                      <span className="absolute top-1/2 -translate-y-1/2 left-2">
                        <FaviconImage url={field.value} size={18} />
                      </span>
                      <FormControl>
                        <Input
                          type="url"
                          inputMode="url"
                          placeholder="https://youtube.com/mychurch"
                          className="pl-8"
                          {...field}
                        />
                      </FormControl>
                    </div>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`socialLinks.${index}.platform`}
                render={({ field }) => (
                  <FormItem>
                    <FormDescription className={cn(index !== 0 && 'sr-only')}>
                      Platform
                    </FormDescription>
                    <FormControl>
                      <FormControl>
                        <SelectNative {...field}>
                          <option value="">Select social platform</option>
                          {SOCIAL_PLATFORM_OPTIONS.map((option) => (
                            <option key={option.value} value={option.value}>
                              {option.value}
                            </option>
                          ))}
                        </SelectNative>
                      </FormControl>
                    </FormControl>
                  </FormItem>
                )}
              />
              <Button
                aria-label="delete social link"
                variant="outline"
                size="icon"
                type="button"
                disabled={socialLinkFields.fields.length <= 1}
                onClick={() => socialLinkFields.remove(index)}
              >
                <MinusCircleIcon />
              </Button>
            </div>
          ))}
          <Button
            type="button"
            variant="secondary"
            size="sm"
            onClick={() => socialLinkFields.append({ url: '', platform: '' })}
          >
            <PlusCircleIcon /> Add Social Link
          </Button>

          <div className="flex items-center justify-end gap-3 pt-6">
            <SubmitButton disabled={!form.formState.isDirty} loading={isBusy}>
              Save Contact Details
            </SubmitButton>
          </div>
        </fieldset>
      </form>
    </Form>
  );
}

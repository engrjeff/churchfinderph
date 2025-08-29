'use client';

import { ChurchProfile } from '@/app/generated/prisma';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { SelectNative } from '@/components/ui/select-native';
import { Separator } from '@/components/ui/separator';
import { SubmitButton } from '@/components/ui/submit-button';
import { Textarea } from '@/components/ui/textarea';
import {
  CHURCH_SIZE_OPTIONS,
  COMMUNION_FREQUENCY_OPTIONS,
} from '@/lib/constants';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAction } from 'next-safe-action/hooks';
import { useRouter } from 'next/navigation';
import { SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { createChurchProfile, updateChurchProfile } from './actions';
import { ChurchProfileInputs, churchProfileSchema } from './schema';

function ChurchProfileForm({
  churchId,
  churchProfile,
}: {
  churchId: string;
  churchProfile?: ChurchProfile | null;
}) {
  const isEditing = Boolean(churchProfile);

  const DEFAULT_VALUES: ChurchProfileInputs = {
    churchId,
    mission: '',
    vision: '',
    churchSize: '',
    communionFrequency: 'Weekly',
  };

  const churchProfileDefaultValues: ChurchProfileInputs = churchProfile
    ? {
        churchId: churchProfile.churchId,
        mission: churchProfile.mission || '',
        vision: churchProfile.vision || '',
        churchSize: churchProfile.churchSize || '',
        communionFrequency: churchProfile.communionFrequency || 'Weekly',
      }
    : DEFAULT_VALUES;

  const form = useForm<ChurchProfileInputs>({
    defaultValues: churchProfileDefaultValues,
    resolver: zodResolver(churchProfileSchema),
  });

  const router = useRouter();

  const createAction = useAction(createChurchProfile, {
    onError: ({ error }) => {
      console.error(error);
      toast.error(`Error creating church profile`);
    },
  });

  const updateAction = useAction(updateChurchProfile, {
    onError: ({ error }) => {
      console.error(error);
      toast.error(`Error updating church profile`);
    },
  });

  const isBusy = createAction.isPending || updateAction.isPending;

  const onFormError: SubmitErrorHandler<ChurchProfileInputs> = (errors) => {
    console.log(`CHURCH PROFILE FORM ERRORS: `, errors);
  };

  const onSubmit: SubmitHandler<ChurchProfileInputs> = async (data) => {
    try {
      if (isEditing) {
        const result = await updateAction.executeAsync({
          ...data,
          id: churchProfile?.id || '',
        });

        if (result.data?.churchProfile.id) {
          toast.success('Church profile updated successfully!');
        }

        router.refresh();

        return;
      }

      const result = await createAction.executeAsync(data);

      if (result.data?.churchProfile.id) {
        toast.success('Church profile created successfully!');
        form.reset(DEFAULT_VALUES);

        router.replace(
          `/my-listing/${result.data.churchProfile.churchId}?step=services`
        );
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
          <h1 className="text-xl font-bold">Church Profile</h1>
          <p className="text-muted-foreground text-sm">
            Let people know more about your Church.
          </p>
        </div>
        <Separator />
        <fieldset className="space-y-4 disabled:opacity-90" disabled={isBusy}>
          <input
            type="hidden"
            hidden
            defaultValue={churchId}
            {...form.register('churchId')}
          />
          <FormField
            control={form.control}
            name="mission"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Mission</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Your church's mission statement"
                    {...field}
                    value={field.value === null ? '' : field.value}
                    rows={4}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="vision"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Vision</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Your church's vision statement"
                    {...field}
                    value={field.value === null ? '' : field.value}
                    rows={4}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="churchSize"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Church Size</FormLabel>

                  <FormControl>
                    <SelectNative {...field}>
                      <option value="">Select church size</option>
                      {CHURCH_SIZE_OPTIONS?.map((option) => (
                        <option key={option.label} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </SelectNative>
                  </FormControl>
                  <FormDescription>
                    An estimate of how many attend your church.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="communionFrequency"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Communion Frequency</FormLabel>

                  <FormControl>
                    <SelectNative {...field}>
                      <option value="">Select church size</option>
                      {COMMUNION_FREQUENCY_OPTIONS?.map((option) => (
                        <option key={option.label} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </SelectNative>
                  </FormControl>
                  <FormDescription>
                    How often do you conduct the Lord&apos;s Supper?
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-6">
            {isEditing ? (
              <Button
                type="button"
                variant="secondary"
                onClick={() => form.reset(churchProfileDefaultValues)}
              >
                Reset
              </Button>
            ) : null}
            <SubmitButton disabled={!form.formState.isDirty} loading={isBusy}>
              {isEditing ? 'Save Changes' : 'Save Church Profile'}
            </SubmitButton>
          </div>
        </fieldset>
      </form>
    </Form>
  );
}

export default ChurchProfileForm;

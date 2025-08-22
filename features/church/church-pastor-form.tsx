'use client';

import { Pastor } from '@/app/generated/prisma';
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
import { Separator } from '@/components/ui/separator';
import { SubmitButton } from '@/components/ui/submit-button';
import { Textarea } from '@/components/ui/textarea';
import { uploadImage } from '@/lib/services';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAction } from 'next-safe-action/hooks';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { createChurchPastor, updateChurchPastor } from './actions';
import { ChurchPastorInputs, churchPastorSchema } from './schema';

export function ChurchPastorForm({
  churchId,
  churchName,
  pastorDetails,
}: {
  churchId: string;
  churchName: string;
  pastorDetails: Pastor | null;
}) {
  const defaultValues: ChurchPastorInputs = {
    churchId,
    name: pastorDetails?.name ?? '',
    bio: pastorDetails?.bio ?? '',
    photoUrl: pastorDetails?.photoUrl ?? '',
  };

  const isEditing = Boolean(pastorDetails);

  const form = useForm<ChurchPastorInputs>({
    resolver: zodResolver(churchPastorSchema),
    defaultValues,
  });

  const [uploading, setUploading] = useState(false);

  const router = useRouter();

  const createAction = useAction(createChurchPastor, {
    onError: ({ error }) => {
      console.error(error);
      toast.error(`Error creating church pastor`);
    },
  });

  const updateAction = useAction(updateChurchPastor, {
    onError: ({ error }) => {
      console.error(error);
      toast.error(`Error updating church pastor`);
    },
  });

  const isBusy = createAction.isPending || updateAction.isPending || uploading;

  const onFormError: SubmitErrorHandler<ChurchPastorInputs> = (errors) => {
    console.log('CHURCH PASTOR FORM ERRORS: ', errors);
  };

  const onSubmit: SubmitHandler<ChurchPastorInputs> = async (data) => {
    try {
      setUploading(true);

      let photoUrl: string | undefined = undefined;

      if (data.photoUrl) {
        if (isEditing && data.photoUrl === pastorDetails?.photoUrl) {
        } else {
          // upload
          const uploadResult = await uploadImage(
            data.photoUrl,
            churchName,
            'pastor'
          );

          if (uploadResult.error) {
            return;
          }

          photoUrl = uploadResult.url as string;
        }
      }

      if (isEditing && pastorDetails) {
        const result = await updateAction.executeAsync({
          id: pastorDetails?.id,
          ...data,
          photoUrl,
        });

        if (result.data?.pastor?.id) {
          toast.success('Church pastor was saved successfully!');
          router.refresh();
        }

        return;
      }

      const result = await createAction.executeAsync({
        ...data,
        photoUrl,
      });

      if (result.data?.pastor?.id) {
        toast.success('Church pastor was created successfully!');
        router.refresh();
      }
    } catch (error) {
    } finally {
      setUploading(false);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit, onFormError)}
        className="space-y-4"
      >
        <div>
          <h1 className="text-xl font-bold">Pastor Details</h1>
          <p className="text-muted-foreground text-sm">
            Let people know a bit about your Pastor.
          </p>
        </div>
        <Separator />
        <fieldset className="space-y-4 disabled:opacity-90" disabled={isBusy}>
          <FormField
            control={form.control}
            name="photoUrl"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <AvatarPicker
                    src={form.watch('photoUrl')}
                    label="Pastor's Photo"
                    desc="Upload a photo"
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
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="John Smith" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="bio"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Bio</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="A bit of information about your pastor..."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="pt-6 flex justify-end">
            <SubmitButton disabled={!form.formState.isDirty} loading={isBusy}>
              Save Details
            </SubmitButton>
          </div>
        </fieldset>
      </form>
    </Form>
  );
}

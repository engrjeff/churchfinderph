'use client';

import { ChurchMedia } from '@/app/generated/prisma';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
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
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { SubmitButton } from '@/components/ui/submit-button';
import { YouTube } from '@/components/youtube';
import { uploadGalleryImages } from '@/lib/services';
import { getYouTubeVideoId } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { ImagePlusIcon, XIcon } from 'lucide-react';
import { useAction } from 'next-safe-action/hooks';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import {
  SubmitErrorHandler,
  SubmitHandler,
  useFieldArray,
  useForm,
} from 'react-hook-form';
import { toast } from 'sonner';
import { setChurchMedia } from './actions';
import { ChurchMediaInputs, churchMediaSchema } from './schema';

const MAX_COUNT = 5;

export function ChurchMediaForm({
  churchId,
  churchName,
  churchMedia,
}: {
  churchId: string;
  churchName: string;
  churchMedia?: ChurchMedia | null;
}) {
  const defaultValues: ChurchMediaInputs = {
    churchId,
    gallery: churchMedia?.gallery?.map((g) => ({ url: g })) ?? [],
    introVideoLink: churchMedia?.introVideoLink ?? '',
  };

  const form = useForm<ChurchMediaInputs>({
    resolver: zodResolver(churchMediaSchema),
    defaultValues,
  });

  const galleryFields = useFieldArray({
    control: form.control,
    name: 'gallery',
  });

  useEffect(() => {
    if (uploading) {
    }
  }, []);

  const [uploading, setUploading] = useState(false);

  const introVideoLink = form.watch('introVideoLink');

  const youtubeVideoId = getYouTubeVideoId(introVideoLink);

  const setAction = useAction(setChurchMedia, {
    onError: ({ error }) => {
      console.error(error);
      toast.error(`Error setting church media`);
    },
  });

  const fileInputRef = useRef<HTMLInputElement>(null);

  const isBusy = setAction.isPending || uploading;

  function handleFileInputChange(e: ChangeEvent<HTMLInputElement>) {
    const files = e.currentTarget.files;

    form.clearErrors('gallery');

    if (!files) return;

    const remainingAllowedCount = MAX_COUNT - galleryFields.fields.length;

    if (files && files.length > remainingAllowedCount) {
      form.setError('gallery', {
        message: `Only a maximum of ${MAX_COUNT} images are allowed.`,
      });
      return;
    }

    Array.from(files).forEach((file) => {
      const reader = new FileReader();

      reader.onabort = () => console.log('file reading was aborted');
      reader.onerror = () => console.log('file reading has failed');
      reader.onload = () => {
        // Do whatever you want with the file contents
        const dataUrl = reader.result;

        if (galleryFields.fields.some((f) => f.url === dataUrl)) {
          return;
        }

        galleryFields.append({ url: dataUrl as string });
      };
      reader.readAsDataURL(file);
    });
  }

  const onFormError: SubmitErrorHandler<ChurchMediaInputs> = (errors) => {
    console.log('CHURCH MEDIA FORM ERRORS: ', errors);
  };

  const onSubmit: SubmitHandler<ChurchMediaInputs> = async (data) => {
    try {
      // only upload the ones that start with data:image
      const filesToRetain = data.gallery.filter(
        (g) => !g.url.startsWith('data:image')
      );

      const filesToUpload = data.gallery
        .filter((g) => g.url.startsWith('data:image'))
        .map((i) => i.url);

      let galleryImageUrls = filesToRetain;

      if (filesToUpload.length > 0) {
        setUploading(true);
        // do upload
        const urls = await uploadGalleryImages(filesToUpload, churchName);

        galleryImageUrls = galleryImageUrls.concat(urls);
      }

      // set media
      const result = await setAction.executeAsync({
        churchId,
        gallery: galleryImageUrls,
        introVideoLink: data.introVideoLink,
      });

      if (result.data?.church?.id) {
        toast.success('Church media were saved successfully!');
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
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
          <h1 className="text-xl font-bold">Media</h1>
          <p className="text-muted-foreground text-sm">
            Let people have a glimpse of your church.
          </p>
        </div>
        <Separator />
        <fieldset className="space-y-4 disabled:opacity-90" disabled={isBusy}>
          <div className="flex items-center justify-between">
            <p className="font-semibold">
              Gallery{' '}
              <Badge variant="secondary">
                {galleryFields.fields.length} of {MAX_COUNT} uploaded
              </Badge>
            </p>

            {galleryFields.fields.length > 0 ? (
              <Button
                type="button"
                size="sm"
                variant="outline"
                onClick={() => galleryFields.remove()}
              >
                Clear
              </Button>
            ) : null}
          </div>
          {form.formState.errors.gallery ? (
            <Alert variant="destructive">
              <AlertTitle>Heads up!</AlertTitle>
              <AlertDescription>
                {form.formState.errors.gallery?.message}
              </AlertDescription>
            </Alert>
          ) : null}
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
            {galleryFields.fields.map((galleryItem, galleryItemIndex) => (
              <div
                key={galleryItem.id}
                className="relative border rounded bg-background w-full aspect-square flex items-center justify-center"
              >
                <Button
                  size="icon"
                  variant="secondary"
                  type="button"
                  onClick={() => galleryFields.remove(galleryItemIndex)}
                  className="rounded-full size-7 absolute top-2 right-2 bg-secondary/80 hover:text-destructive"
                >
                  <XIcon />
                </Button>
                <img src={galleryItem.url} className="object-contain" />
              </div>
            ))}
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="border border-dashed rounded disabled:cursor-not-allowed disabled:text-muted-foreground bg-background hover:not-disabled:bg-accent w-full aspect-square flex items-center justify-center"
              aria-label="Upload images"
              disabled={MAX_COUNT === galleryFields.fields.length}
            >
              <ImagePlusIcon className="size-6" />
            </button>
          </div>
          <input
            ref={fileInputRef}
            multiple
            max={MAX_COUNT}
            type="file"
            name="gallery"
            hidden
            accept="image/*"
            onChange={handleFileInputChange}
          />
          <Separator />
          <FormField
            control={form.control}
            name="introVideoLink"
            render={({ field }) => (
              <FormItem>
                <FormLabel>YouTube Video Link</FormLabel>
                <FormDescription>
                  A welcome video for potential guests.
                </FormDescription>
                <FormControl>
                  <Input
                    type="url"
                    inputMode="url"
                    placeholder="https://youtube.com?v=123abc"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {youtubeVideoId ? <YouTube videoId={youtubeVideoId} /> : null}

          <div className="flex items-center justify-end gap-3 pt-6">
            <SubmitButton disabled={!form.formState.isDirty} loading={isBusy}>
              Save Media
            </SubmitButton>
          </div>
        </fieldset>
      </form>
    </Form>
  );
}

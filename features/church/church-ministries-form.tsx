'use client';

import { Ministry, PublicService } from '@/app/generated/prisma';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { SubmitButton } from '@/components/ui/submit-button';
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
import { setChurchMinistriesAndPublicServices } from './actions';
import {
  ChurchMinistriesAndPublicServicesInputs,
  churchMinistriesAndPublicServicessSchema,
} from './schema';

export function ChurchMinistriesForm({
  churchId,
  ministries,
  publicServices,
}: {
  churchId: string;
  ministries?: Ministry[];
  publicServices?: PublicService[];
}) {
  const defaultValues: ChurchMinistriesAndPublicServicesInputs = {
    churchId,
    ministries: ministries?.length
      ? ministries.map((m) => ({ title: m.title }))
      : [
          { title: 'Worship Ministry' },
          { title: 'Youth Ministry' },
          { title: 'Missions Ministry' },
          { title: 'Prayer & Intercession Ministry' },
          { title: "Children's Ministry" },
        ],
    publicServices: publicServices?.length
      ? publicServices.map((p) => ({ title: p.title }))
      : [
          { title: 'Wedding' },
          { title: 'Child Dedication' },
          { title: 'Baptism' },
        ],
  };

  const form = useForm<ChurchMinistriesAndPublicServicesInputs>({
    resolver: zodResolver(churchMinistriesAndPublicServicessSchema),
    defaultValues,
  });

  const ministriesFields = useFieldArray({
    control: form.control,
    name: 'ministries',
  });

  const publicServicesFields = useFieldArray({
    control: form.control,
    name: 'publicServices',
  });

  const createAction = useAction(setChurchMinistriesAndPublicServices, {
    onError: ({ error }) => {
      console.error(error);
      toast.error(`Error creating church ministries and public services`);
    },
  });

  const isBusy = createAction.isPending;

  const onFormError: SubmitErrorHandler<
    ChurchMinistriesAndPublicServicesInputs
  > = (errors) => {
    console.log(`CHURCH MINISTRIES AND PUBLIC SERVICES FORM ERRORS: `, errors);
  };

  const onSubmit: SubmitHandler<
    ChurchMinistriesAndPublicServicesInputs
  > = async (data) => {
    try {
      const result = await createAction.executeAsync(data);

      if (result.data?.ok) {
        toast.success(
          'Church ministries and public services were set successfully!'
        );

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
          <h1 className="text-xl font-bold">Ministries & Public Services</h1>
          <p className="text-muted-foreground text-sm">
            Let people know about Church ministries and public services.
          </p>
        </div>
        <Separator />
        <fieldset className="space-y-4 disabled:opacity-90" disabled={isBusy}>
          <p className="font-semibold">Ministries</p>
          {ministriesFields.fields.map((field, index) => (
            <div
              key={field.id}
              className="grid grid-cols-[1fr_auto] items-end gap-4"
            >
              <FormField
                control={form.control}
                name={`ministries.${index}.title`}
                render={({ field }) => (
                  <FormItem>
                    <FormDescription className={cn(index !== 0 && 'sr-only')}>
                      Title
                    </FormDescription>
                    <FormControl>
                      <Input placeholder="e.g. Worship" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <Button
                aria-label="delete ministry"
                variant="outline"
                size="icon"
                type="button"
                disabled={ministriesFields.fields.length <= 1}
                onClick={() => ministriesFields.remove(index)}
              >
                <MinusCircleIcon />
              </Button>
            </div>
          ))}
          <Button
            type="button"
            variant="secondary"
            size="sm"
            onClick={() => ministriesFields.append({ title: '' })}
          >
            <PlusCircleIcon /> Add Ministry
          </Button>

          <Separator />

          <p className="font-semibold">Public Services</p>

          {publicServicesFields.fields.map((field, index) => (
            <div
              key={field.id}
              className="grid grid-cols-[1fr_auto] items-end gap-4"
            >
              <FormField
                control={form.control}
                name={`publicServices.${index}.title`}
                render={({ field }) => (
                  <FormItem>
                    <FormDescription className={cn(index !== 0 && 'sr-only')}>
                      Title
                    </FormDescription>
                    <FormControl>
                      <Input
                        placeholder="e.g. Wedding, Child Dedication, Baptism"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <Button
                aria-label="delete public service"
                variant="outline"
                size="icon"
                type="button"
                disabled={publicServicesFields.fields.length <= 1}
                onClick={() => publicServicesFields.remove(index)}
              >
                <MinusCircleIcon />
              </Button>
            </div>
          ))}
          <Button
            type="button"
            variant="secondary"
            size="sm"
            onClick={() => publicServicesFields.append({ title: '' })}
          >
            <PlusCircleIcon /> Add Service
          </Button>

          <div className="pt-6 flex justify-end">
            <SubmitButton disabled={!form.formState.isDirty} loading={isBusy}>
              Save Ministries
            </SubmitButton>
          </div>
        </fieldset>
      </form>
    </Form>
  );
}

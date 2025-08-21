'use client';

import { ChurchService } from '@/app/generated/prisma';
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
import { setChurchServices } from './actions';
import { ChurchServicesInputs, churchServicesSchema } from './schema';

export function ChurchServicesForm({
  churchId,
  services,
}: {
  churchId: string;
  services?: ChurchService[];
}) {
  const churchServicesDefaultValues: Array<
    Pick<ChurchService, 'title' | 'day' | 'time'>
  > =
    services && services.length > 0
      ? services?.map((s) => ({ title: s.title, day: s.day, time: s.time }))
      : [
          { title: 'Sunday Service', day: 'Sunday', time: '08:00' },
          { title: 'Sunday Service', day: 'Sunday', time: '10:00' },
          { title: 'Sunday Service', day: 'Sunday', time: '13:00' },
        ];

  const form = useForm<ChurchServicesInputs>({
    resolver: zodResolver(churchServicesSchema),
    defaultValues: {
      churchId,
      services: churchServicesDefaultValues,
    },
  });

  const servicesFields = useFieldArray({
    control: form.control,
    name: 'services',
  });

  const createAction = useAction(setChurchServices, {
    onError: ({ error }) => {
      console.error(error);
      toast.error(`Error creating church services`);
    },
  });

  const isBusy = createAction.isPending;

  const onFormError: SubmitErrorHandler<ChurchServicesInputs> = (errors) => {
    console.log(`CHURCH SERVICES FORM ERRORS: `, errors);
  };

  const onSubmit: SubmitHandler<ChurchServicesInputs> = async (data) => {
    try {
      const result = await createAction.executeAsync(data);

      if (result.data?.services.count) {
        toast.success('Church services were set successfully!');

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
          <h1 className="text-xl font-bold">Service Schedules</h1>
          <p className="text-muted-foreground text-sm">
            Let people know when your Church conducts a service.
          </p>
        </div>
        <Separator />
        <fieldset className="space-y-4 disabled:opacity-90" disabled={isBusy}>
          {servicesFields.fields.map((field, index) => (
            <div
              key={field.id}
              className="grid grid-cols-[1fr_1fr_auto_auto] items-end gap-4"
            >
              <FormField
                control={form.control}
                name={`services.${index}.title`}
                render={({ field }) => (
                  <FormItem>
                    <FormDescription className={cn(index !== 0 && 'sr-only')}>
                      Service Title
                    </FormDescription>
                    <FormControl>
                      <Input placeholder="e.g. Sunday Service" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`services.${index}.day`}
                render={({ field }) => (
                  <FormItem>
                    <FormDescription className={cn(index !== 0 && 'sr-only')}>
                      Day
                    </FormDescription>
                    <FormControl>
                      <SelectNative {...field}>
                        <option value="">Select day</option>
                        {[
                          'Sunday',
                          'Monday',
                          'Tuesday',
                          'Wednesday',
                          'Thursday',
                          'Friday',
                          'Saturday',
                        ].map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </SelectNative>
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`services.${index}.time`}
                render={({ field }) => (
                  <FormItem>
                    <FormDescription className={cn(index !== 0 && 'sr-only')}>
                      Time
                    </FormDescription>
                    <FormControl>
                      <Input
                        type="time"
                        placeholder="e.g. 8:00 AM"
                        className="w-[150px]"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <Button
                aria-label="delete service"
                variant="outline"
                size="icon"
                type="button"
                disabled={servicesFields.fields.length <= 1}
                onClick={() => servicesFields.remove(index)}
              >
                <MinusCircleIcon />
              </Button>
            </div>
          ))}
          <Button
            type="button"
            variant="secondary"
            size="sm"
            onClick={() =>
              servicesFields.append({ title: '', day: '', time: '' })
            }
          >
            <PlusCircleIcon /> Add Schedule
          </Button>

          <div className="pt-6 flex justify-end">
            <SubmitButton disabled={!form.formState.isDirty} loading={isBusy}>
              Save Services
            </SubmitButton>
          </div>
        </fieldset>
      </form>
    </Form>
  );
}

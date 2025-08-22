'use client';

import { PublishStatus } from '@/app/generated/prisma';
import { Button } from '@/components/ui/button';
import { CheckIcon, Loader2Icon } from 'lucide-react';
import { useAction } from 'next-safe-action/hooks';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { publishChurch } from './actions';

export function ChurchPublishButton({ churchId }: { churchId: string }) {
  const router = useRouter();

  const publishAction = useAction(publishChurch, {
    onError: ({ error }) => {
      console.error(error);
      toast.error(`An error occurred when publishing your church`);
    },
  });

  const isPending = publishAction.isPending;

  const handlePublish = async () => {
    try {
      const result = await publishAction.executeAsync({ churchId });

      if (result.data?.church?.status === PublishStatus.PUBLISHED) {
        toast.success('Your church has been published!');

        router.refresh();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Button
      type="button"
      size="sm"
      disabled={isPending}
      onClick={handlePublish}
    >
      {isPending ? 'Publishing' : 'Publish'}{' '}
      {isPending ? <Loader2Icon className="animate-spin" /> : <CheckIcon />}
    </Button>
  );
}

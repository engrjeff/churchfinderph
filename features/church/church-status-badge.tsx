import { PublishStatus } from '@/app/generated/prisma';
import { Badge } from '@/components/ui/badge';
import { CheckIcon, CircleDashed, XCircleIcon } from 'lucide-react';

export function ChurchStatusBadge({
  churchStatus,
}: {
  churchStatus: PublishStatus;
}) {
  if (churchStatus === PublishStatus.DRAFT) {
    return (
      <Badge
        variant="secondary"
        className="bg-amber-100 text-amber-800 dark:bg-amber-900/20 dark:text-amber-400"
      >
        <CircleDashed /> Draft
      </Badge>
    );
  }

  if (churchStatus === PublishStatus.PUBLISHED) {
    return (
      <Badge
        variant="secondary"
        className="bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400"
      >
        <CheckIcon /> Published
      </Badge>
    );
  }

  if (churchStatus === PublishStatus.INACTIVE) {
    return (
      <Badge
        variant="secondary"
        className="bg-red-100 text-red-800 dark:bg-red-900/20 dark:red-green-400"
      >
        <XCircleIcon /> Inactive
      </Badge>
    );
  }

  return null;
}

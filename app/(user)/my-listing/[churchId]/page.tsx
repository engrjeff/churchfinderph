import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ChurchDetailsSteps } from '@/features/church/church-details-steps';
import { ChurchFormSwitch } from '@/features/church/church-form-switch';
import { getUserChurchById } from '@/features/church/queries';
import { ForwardIcon, Share2Icon } from 'lucide-react';
import { type Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'My Church',
};

async function MyChurchPage({
  params,
}: {
  params: Promise<{ churchId: string }>;
}) {
  const { churchId } = await params;

  const church = await getUserChurchById({ churchId });

  if (!church) return notFound();

  return (
    <div className="space-y-6 mx-auto px-4 py-10 max-w-6xl">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/my-listing">My Listing</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{church.name}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="flex items-center gap-4">
        <Avatar className="rounded-full size-12">
          {church.logo ? (
            <AvatarImage
              src={church.logo}
              alt={church.name}
              className="object-cover"
            />
          ) : null}
          <AvatarFallback></AvatarFallback>
        </Avatar>
        <div className="space-y-1">
          <h1 className="text-xl font-bold">{church.name}</h1>
          <p className="text-muted-foreground text-sm">{church.fullAddress}</p>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <Button asChild>
            <Link href={`/churches/${churchId}`}>
              <ForwardIcon /> Preview
            </Link>
          </Button>
          <Button variant="secondary">
            <Share2Icon /> Share Link
          </Button>
        </div>
      </div>
      <Separator />
      <div className="flex gap-6">
        <Suspense>
          <ChurchDetailsSteps />
          <div className="max-w-2xl w-full mx-auto">
            <ChurchFormSwitch church={church} />
          </div>
        </Suspense>
      </div>
    </div>
  );
}

export default MyChurchPage;

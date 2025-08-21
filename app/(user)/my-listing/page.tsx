import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { getUserChurchListing } from '@/features/church/queries';
import { MoreHorizontalIcon } from 'lucide-react';
import { type Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'My Listing',
};

async function MyListingPage() {
  const churchListing = await getUserChurchListing();

  return (
    <div className="container space-y-6 mx-auto px-4 py-10 max-w-2xl">
      <div>
        <h1 className="text-center text-2xl font-bold">My Church Listing</h1>
        <p className="text-muted-foreground text-center">
          List of local churches that you have listed.
        </p>
      </div>
      <Separator />
      {churchListing.length > 0 ? (
        <ul className="space-y-4">
          {churchListing.map((church) => (
            <li key={church.id}>
              <Card>
                <CardHeader className="flex flex-row gap-4 items-center">
                  <Avatar className="rounded-full size-12 mb-2">
                    {church.logo ? (
                      <AvatarImage
                        src={church.logo}
                        alt={church.name}
                        className="object-cover"
                      />
                    ) : null}
                    <AvatarFallback></AvatarFallback>
                  </Avatar>
                  <div className="space-y-2">
                    <CardTitle>{church.name}</CardTitle>
                    <CardDescription className="line-clamp-1">
                      {church.fullAddress}
                    </CardDescription>
                  </div>
                  <CardAction>
                    <Button size="icon" variant="ghost">
                      <MoreHorizontalIcon />
                    </Button>
                  </CardAction>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-end">
                    <Button asChild>
                      <Link href={`/my-listing/${church.id}`}>
                        View Details
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </li>
          ))}
        </ul>
      ) : (
        <div className="p-6 border flex flex-col items-center justify-center gap-4 border-dashed">
          <p className="text-sm text-muted-foreground">
            No church listing yet. Add one now.
          </p>
          <Button asChild>
            <Link href="/add-church">Add a Church</Link>
          </Button>
        </div>
      )}
    </div>
  );
}

export default MyListingPage;

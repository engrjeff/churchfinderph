import { Church } from '@/app/generated/prisma';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { MoreHorizontalIcon } from 'lucide-react';
import Link from 'next/link';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export function ChurchListingItem({ church }: { church: Church }) {
  return (
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
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size="icon" variant="ghost">
                <MoreHorizontalIcon />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href={`/my-listing/${church.id}`}>Edit</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href={`/churches/${church.id}`} target="_blank">
                  Preview
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>Share Link</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </CardAction>
      </CardHeader>
      <CardContent>
        <Badge
          variant="secondary"
          className="bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400"
        >
          {church.stepsCompleted.length} of 5 details completed
        </Badge>
      </CardContent>
      <CardFooter>
        <Button asChild>
          <Link href={`/my-listing/${church.id}`}>View Details</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}

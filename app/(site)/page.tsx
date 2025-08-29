import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { getChurches } from '@/features/church/queries';
import { getShortAddress } from '@/lib/utils';
import { SignedIn, SignedOut } from '@clerk/nextjs';
import {
  CalendarIcon,
  ChurchIcon,
  CrossIcon,
  DotIcon,
  HeartIcon,
  MapPinIcon,
  SearchIcon,
  Users2Icon,
} from 'lucide-react';
import Link from 'next/link';

async function HomePage() {
  const { churches } = await getChurches({});

  return (
    <div className="min-h-screen">
      {/* Hero Section with Search */}
      <section className="relative min-h-[70vh] flex items-center justify-center">
        <div className="absolute inset-0 bg-secondary dark:bg-background" />
        <div className="relative z-20 text-center px-4 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Find your church, find your home
          </h1>
          <p className="text-lg md:text-xl mb-8 text-muted-foreground">
            Discover Bible-believing churches across the Philippines
          </p>

          {/* Search Bar */}
          <div className="flex-1 flex items-center relative">
            <MapPinIcon className="size-4 text-muted-foreground absolute top-1/2 left-4 -translate-y-1/2" />
            <Input
              placeholder="Search for churches"
              className="h-14 rounded-full pl-10 bg-background"
            />
            <Button className="shrink-0 rounded-full  absolute top-1/2 right-2 -translate-y-1/2">
              Search <SearchIcon />
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Churches */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-semibold mb-8">Featured churches</h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {churches.map((church) => (
              <li key={church.id}>
                <div className="relative">
                  <Button
                    size="icon"
                    variant="ghost"
                    className="size-7 absolute top-3 right-3"
                  >
                    <HeartIcon />
                  </Button>
                  <Card className="py-4 gap-4 hover:border-primary">
                    <Link href={`/churches/${church.id}`} className="space-y-4">
                      <div className="px-4 flex items-center gap-4">
                        <Avatar className="size-12 rounded-md">
                          <AvatarImage src={church.logo!} alt={church.name} />
                          <AvatarFallback>
                            <ChurchIcon />
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-semibold">{church.name}</h3>
                          <p className="text-sm text-muted-foreground">
                            {getShortAddress(church)}
                          </p>
                        </div>
                      </div>
                      <CardContent className="px-0">
                        <img
                          src={church.churchMedia?.gallery.at(0)}
                          alt={church.name}
                          className="aspect-video w-full object-cover"
                        />
                      </CardContent>

                      <CardFooter className="px-4 justify-center flex-wrap">
                        <div className="flex items-center gap-2">
                          <CalendarIcon className="size-3" />
                          <p className="text-muted-foreground text-xs">
                            {church.services.length} Services
                          </p>
                        </div>
                        <DotIcon />
                        <div className="flex items-center gap-2">
                          <CrossIcon className="size-3" />
                          <p className="text-muted-foreground text-xs">
                            {church.profile?.communionFrequency} Communion
                          </p>
                        </div>
                        <DotIcon />
                        <div className="flex items-center gap-2">
                          <Users2Icon className="size-3" />
                          <p className="text-muted-foreground text-xs">
                            {church.profile?.churchSize} members
                          </p>
                        </div>
                      </CardFooter>
                    </Link>

                    <div className="px-4">
                      <Button size="sm" asChild className="w-full">
                        <a
                          href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                            church.churchMap?.addressInMap!
                          )}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          View Location
                        </a>
                      </Button>
                    </div>
                  </Card>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to find your church home?
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Join thousands of believers who have found their spiritual community
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <SignedOut>
              <Button size="lg" asChild>
                <Link href="/sign-up">Get started</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/sign-in">Sign in</Link>
              </Button>
            </SignedOut>
            <SignedIn>
              <Button size="lg" asChild>
                <Link href="/add-church">
                  <ChurchIcon className="mr-2 h-5 w-5" />
                  List your church
                </Link>
              </Button>
            </SignedIn>
          </div>
        </div>
      </section>
    </div>
  );
}

export default HomePage;

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { SignedIn, SignedOut } from '@clerk/nextjs';
import {
  ChurchIcon,
  HeartIcon,
  MapPinIcon,
  SearchIcon,
  StarIcon,
  UsersIcon,
} from 'lucide-react';
import Link from 'next/link';

function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary/10 via-primary/5 to-background py-20 lg:py-32">
        <div className="container mx-auto px-4 text-center">
          <div className="mx-auto max-w-4xl">
            <Badge variant="secondary" className="mb-6 px-4 py-2">
              Your Church, Your Home
            </Badge>
            <h1 className="mb-6 text-4xl font-bold tracking-tight lg:text-6xl">
              Find a Church in the{' '}
              <span className="text-primary">Philippines</span>
            </h1>
            <p className="mb-8 text-lg text-muted-foreground lg:text-xl">
              Discover biblical, local Christian churches near you, connect with
              Bible-believing communities, and find a place where you can know
              God deeply.
            </p>

            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <SignedOut>
                <Button size="lg" asChild className="text-lg px-8 py-6">
                  <Link href="/sign-up">
                    <SearchIcon className="mr-2 h-5 w-5" />
                    Start Finding Churches
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  asChild
                  className="text-lg px-8 py-6"
                >
                  <Link href="/sign-in">Sign In</Link>
                </Button>
              </SignedOut>
              <SignedIn>
                <Button size="lg" asChild className="text-lg px-8 py-6">
                  <Link href="/add-church">
                    <ChurchIcon className="mr-2 h-5 w-5" />
                    Add Your Church
                  </Link>
                </Button>
              </SignedIn>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 lg:py-32">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="mb-4 text-3xl font-bold lg:text-4xl">
              Why Choose ChurchFinder PH?
            </h2>
            <p className="text-lg text-muted-foreground">
              We make it easy to discover and connect with Born Again Christian
              communities across the Philippines.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <Card className="border-0 shadow-lg">
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  <MapPinIcon className="h-8 w-8 text-primary" />
                </div>
                <CardTitle>Location-Based Search</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">
                  Find biblical churches in your area with our interactive map
                  and location-based search across all regions of the
                  Philippines.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  <ChurchIcon className="h-8 w-8 text-primary" />
                </div>
                <CardTitle>Detailed Church Profiles</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">
                  Comprehensive information about services, ministries, pastors,
                  and church activities to help you find the right
                  Bible-believing community.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  <UsersIcon className="h-8 w-8 text-primary" />
                </div>
                <CardTitle>Community Connection</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">
                  Connect with vibrant Christian communities and discover
                  ministries that align with your spiritual journey in Christ.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  <HeartIcon className="h-8 w-8 text-primary" />
                </div>
                <CardTitle>Bible-Centered Churches</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">
                  Find churches that prioritize Biblical teaching, the Gospel of
                  the Lord Jesus Christ, and true Christian service and
                  ministry.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  <StarIcon className="h-8 w-8 text-primary" />
                </div>
                <CardTitle>Service Times & Info</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">
                  Get up-to-date information about worship services, Bible
                  studies, prayer meetings, and special Christian events.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  <SearchIcon className="h-8 w-8 text-primary" />
                </div>
                <CardTitle>Easy Discovery</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">
                  User-friendly search filters by location, church size, and
                  specific ministries or Christian programs.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary/5 py-20 lg:py-32">
        <div className="container mx-auto px-4 text-center">
          <div className="mx-auto max-w-2xl">
            <h2 className="mb-4 text-3xl font-bold lg:text-4xl">
              Ready to Find Your Church Home?
            </h2>
            <p className="mb-8 text-lg text-muted-foreground">
              Join thousands of believers who have already found their spiritual
              community through ChurchFinder PH.
            </p>

            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <SignedOut>
                <Button size="lg" asChild className="text-lg px-8 py-6">
                  <Link href="/sign-up">Get Started Free</Link>
                </Button>
              </SignedOut>
              <SignedIn>
                <Button size="lg" asChild className="text-lg px-8 py-6">
                  <Link href="/add-church">
                    <ChurchIcon className="mr-2 h-5 w-5" />
                    List Your Church
                  </Link>
                </Button>
              </SignedIn>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 lg:py-32">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 md:grid-cols-3 text-center">
            <div>
              <div className="mb-2 text-4xl font-bold text-primary lg:text-5xl">
                500+
              </div>
              <div className="text-lg text-muted-foreground">
                Local Churches
              </div>
            </div>
            <div>
              <div className="mb-2 text-4xl font-bold text-primary lg:text-5xl">
                81
              </div>
              <div className="text-lg text-muted-foreground">
                Provinces Covered
              </div>
            </div>
            <div>
              <div className="mb-2 text-4xl font-bold text-primary lg:text-5xl">
                10+
              </div>
              <div className="text-lg text-muted-foreground">
                Christian Denominations
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default HomePage;

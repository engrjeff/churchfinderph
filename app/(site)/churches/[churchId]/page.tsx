import { Button } from '@/components/ui/button';
import { getChurchDetails } from '@/features/church/queries';
import {
  CalendarCheck,
  ExternalLinkIcon,
  FlameIcon,
  HeartIcon,
  HelpingHandIcon,
  LinkIcon,
  MailIcon,
  MapPinIcon,
  PhoneIcon,
  ShareIcon,
  ShieldIcon,
} from 'lucide-react';
import { type Metadata } from 'next';

import { FaviconImage } from '@/components/favicon-image';
import { MapEmbed } from '@/components/map-embed';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { YouTube } from '@/components/youtube';
import { MessageForm } from '@/features/church/message-form';
import { formatTime, getShortAddress, getYouTubeVideoId } from '@/lib/utils';
import Link from 'next/link';
import { cache } from 'react';

const cachedChurchDetails = cache(getChurchDetails);

interface PageProps {
  params: Promise<{ churchId: string }>;
}

export const generateMetadata = async ({
  params,
}: PageProps): Promise<Metadata> => {
  const { churchId } = await params;

  const { church } = await cachedChurchDetails({ churchId });

  return { title: church?.name };
};

async function ChurchDetailPage({ params }: PageProps) {
  const { churchId } = await params;

  const { church } = await cachedChurchDetails({ churchId });

  if (!church) {
    return <div>Church not found</div>;
  }

  const youtubeVideoId = getYouTubeVideoId(church.churchMedia?.introVideoLink!);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <Breadcrumb className="mb-6">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/">Home</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{church.name}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <Separator />
      <div className="flex flex-col lg:flex-row lg:items-center gap-3 mt-6">
        <div className="flex items-center gap-4">
          {church.logo ? (
            <img
              src={church.logo}
              alt={church.name}
              className="size-12 rounded-lg object-contain"
            />
          ) : null}
          <div>
            <h1 className="text-lg lg:text-2xl font-bold">{church.name}</h1>
            <p className="text-muted-foreground flex items-center gap-2">
              <MapPinIcon className="size-4" /> {getShortAddress(church)}
            </p>
          </div>
        </div>
        <div className="flex items-center lg:ml-auto">
          <Button size="sm" variant="ghost">
            <ShareIcon /> Share
          </Button>
          <Button size="sm" variant="ghost">
            <HeartIcon /> Save
          </Button>
        </div>
      </div>
      <section className="grid grid-cols-4 my-4 rounded-lg border overflow-hidden gap-2 grid-rows-2">
        <div className="row-span-2 col-span-4 lg:col-span-2">
          <img
            src={church.churchMedia?.gallery?.at(0)!}
            alt={church.name}
            className="size-full object-cover hover:scale-90 transition-transform"
          />
        </div>
        {church.churchMedia?.gallery.slice(1).map((imageUrl) => (
          <div
            key={`${church.name}-${imageUrl}`}
            className="col-span-2 lg:col-span-1"
          >
            <img
              src={imageUrl}
              alt={church.name}
              className="size-full object-cover hover:scale-90 transition-transform"
            />
          </div>
        ))}
      </section>

      <section className="my-6">
        <Card className="shadow-none">
          <CardContent className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <p className="font-semibold">Church Size</p>
              <p className="text-sm text-muted-foreground">
                {church.profile?.churchSize} members
              </p>
            </div>
            <div className="text-center">
              <p className="font-semibold">Communion</p>
              <p className="text-sm text-muted-foreground">
                {church.profile?.communionFrequency}
              </p>
            </div>
            <div className="text-center">
              <p className="font-semibold">Services</p>
              <p className="text-sm text-muted-foreground">
                {church.services?.length} services
              </p>
            </div>
          </CardContent>
        </Card>
      </section>

      <section className="lg:hidden my-6">
        <MessageForm
          churchName={church.name}
          churchEmail={church.contactDetails?.email!}
          hideSubtitle
        />
      </section>

      <section className="flex flex-col lg:flex-row gap-6 mb-6">
        <div className="flex-2 shrink-0 space-y-6">
          <Card className="shadow-none py-3 gap-3">
            <CardHeader className="border-b [.border-b]:pb-3 items-center gap-0">
              <CardTitle className="text-lg flex items-center gap-3">
                <CalendarCheck className="size-4 text-muted-foreground" />{' '}
                Worship Service Schedules
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                {church.services.map((service) => (
                  <li key={service.id}>
                    <div>
                      <p className="font-semibold">{service.title}</p>
                      <time className="text-sm text-muted-foreground">
                        {service.day}, {formatTime(service.time)}
                      </time>
                    </div>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card className="shadow-none py-3 gap-3">
            <CardHeader className="border-b [.border-b]:pb-3 items-center gap-0">
              <CardTitle className="text-lg flex items-center gap-3">
                <FlameIcon className="size-4 text-muted-foreground" />{' '}
                Ministries
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                {church.ministries.map((ministry) => (
                  <li key={ministry.id}>
                    <div>
                      <p className="font-semibold">{ministry.title}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card className="shadow-none py-3 gap-3">
            <CardHeader className="border-b [.border-b]:pb-3 items-center gap-0">
              <CardTitle className="text-lg flex items-center gap-3">
                <HelpingHandIcon className="size-4 text-muted-foreground" />{' '}
                Public Services
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                {church.publicServices.map((publicService) => (
                  <li key={publicService.id}>
                    <div>
                      <p className="font-semibold">{publicService.title}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {church.churchMap?.addressInMap ? (
            <div className="space-y-6 mb-6">
              <h2 className="text-xl font-semibold">Church Map</h2>
              <MapEmbed location={church.churchMap?.addressInMap} />
            </div>
          ) : null}

          {youtubeVideoId ? (
            <div className="space-y-6 mb-6">
              <h2 className="text-xl font-semibold">Church Intro Video</h2>
              <YouTube videoId={youtubeVideoId} />
            </div>
          ) : null}
        </div>

        <div className="flex-1 shrink-0 space-y-6">
          <div className="hidden lg:block">
            <MessageForm
              churchName={church.name}
              churchEmail={church.contactDetails?.email!}
              hideSubtitle
            />
          </div>
          <Card className="shadow-none py-3 gap-3">
            <CardHeader className="border-b [.border-b]:pb-3 items-center gap-0">
              <CardTitle className="text-lg flex items-center gap-3">
                <MailIcon className="size-4 text-muted-foreground" /> Email &
                Website
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex items-center gap-2">
                <MailIcon className="size-4" />
                <a
                  className="text-muted-foreground"
                  href={`mailto:${church.contactDetails?.email}`}
                >
                  {church.contactDetails?.email}
                </a>
              </div>
              {church.contactDetails?.website ? (
                <div className="flex items-center gap-2">
                  <FaviconImage url={church.contactDetails.website} />
                  <a
                    href={church.contactDetails?.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground"
                  >
                    {church.contactDetails?.website}
                  </a>
                </div>
              ) : null}
            </CardContent>
          </Card>

          <Card className="shadow-none py-3 gap-3">
            <CardHeader className="border-b [.border-b]:pb-3 items-center gap-0">
              <CardTitle className="text-lg flex items-center gap-3">
                <PhoneIcon className="size-4 text-muted-foreground" /> Contact
                Info
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                {church.contactInfo.map((contact) => (
                  <li key={contact.id}>
                    <div className="flex items-center gap-2">
                      <PhoneIcon className="size-4" />
                      <a
                        href={`tel:+${contact.value}`}
                        className="text-muted-foreground"
                      >
                        {contact.value}
                      </a>
                    </div>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card className="shadow-none py-3 gap-3">
            <CardHeader className="border-b [.border-b]:pb-3 items-center gap-0">
              <CardTitle className="text-lg flex items-center gap-3">
                <LinkIcon className="size-4 text-muted-foreground" /> Social
                Links
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                {church.socialLinks.map((socialLink) => (
                  <li key={socialLink.id}>
                    <a
                      href={socialLink.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 hover:underline"
                    >
                      <FaviconImage url={socialLink.url} size={20} />
                      <span>{socialLink.platform}</span>
                      <ExternalLinkIcon className="text-muted-foreground size-4 ml-auto" />
                    </a>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card className="shadow-none py-3 gap-3">
            <CardHeader className="border-b [.border-b]:pb-3 items-center gap-0">
              <CardTitle className="text-lg flex items-center gap-3">
                <ShieldIcon className="size-4 text-muted-foreground" /> Pastor
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {church.pastorDetails?.photoUrl ? (
                <img
                  src={church.pastorDetails?.photoUrl}
                  alt={church.pastorDetails.name}
                  className="size-10 rounded-full object-contain"
                />
              ) : null}
              <p className="font-semibold">{church.pastorDetails?.name}</p>
              <p className="font-semibold">Bio</p>
              <p>{church.pastorDetails?.bio}</p>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="my-6 max-w-xl mx-auto space-y-4">
        <MessageForm
          churchName={church.name}
          churchEmail={church.contactDetails?.email!}
        />
      </section>
    </div>
  );
}

export default ChurchDetailPage;

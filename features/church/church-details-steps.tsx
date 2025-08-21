'use client';

import { Button } from '@/components/ui/button';
import {
  CalendarCheckIcon,
  FlameIcon,
  ImagesIcon,
  InfoIcon,
  MapIcon,
  PhoneIcon,
  StarIcon,
  UserIcon,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { type ReactNode } from 'react';
import { type ChurchStep } from './church.types';

const CHURCH_FORM_STEPS: Array<{
  label: string;
  icon: ReactNode;
  step: ChurchStep;
}> = [
  {
    label: 'Basic',
    icon: <StarIcon />,
    step: 'basic',
  },
  {
    label: 'Profile',
    icon: <InfoIcon />,
    step: 'profile',
  },
  {
    label: 'Service Schedules',
    icon: <CalendarCheckIcon />,
    step: 'services',
  },
  {
    label: 'Ministries',
    icon: <FlameIcon />,
    step: 'ministries',
  },
  {
    label: 'Contact Details',
    icon: <PhoneIcon />,
    step: 'contact_details',
  },
  {
    label: 'Pastor Details',
    icon: <UserIcon />,
    step: 'pastor_details',
  },
  {
    label: 'Church Map',
    icon: <MapIcon />,
    step: 'church_map',
  },
  {
    label: 'Church Media',
    icon: <ImagesIcon />,
    step: 'church_media',
  },
];

export function ChurchDetailsSteps() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const stepQuery = (searchParams.get('step') as ChurchStep) ?? 'basic';

  return (
    <div className="w-[200px] pr-6 border-r">
      <h2 className="mb-2 ml-3.5 text-sm font-semibold">Church Details</h2>
      <ul className="space-y-1">
        {CHURCH_FORM_STEPS.map((step) => (
          <li key={step.step}>
            <Button
              asChild
              size="sm"
              variant={stepQuery === step.step ? 'default' : 'ghost'}
              className="justify-start w-full"
            >
              <Link href={{ pathname, query: { step: step.step } }}>
                <span
                  className={
                    stepQuery === step.step ? '' : 'text-muted-foreground/40'
                  }
                >
                  {step.icon}
                </span>{' '}
                {step.label}
              </Link>
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
}

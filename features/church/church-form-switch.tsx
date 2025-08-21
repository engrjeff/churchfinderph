'use client';

import { Church } from '@/app/generated/prisma';
import { useSearchParams } from 'next/navigation';
import { ChurchForm } from './church-form';
import { ChurchStep } from './church.types';

export function ChurchFormSwitch({ church }: { church: Church }) {
  const searchParams = useSearchParams();

  const stepQuery = (searchParams.get('step') as ChurchStep) ?? 'basic';

  if (stepQuery === 'basic') {
    return <ChurchForm church={church} />;
  }

  if (stepQuery === 'profile') {
    return <p>Church Profile form</p>;
  }

  if (stepQuery === 'contact_details') {
    return <p>Church Contact Details form</p>;
  }

  if (stepQuery === 'pastor_details') {
    return <p>Church Pastor Details form</p>;
  }

  if (stepQuery === 'church_map') {
    return <p>Church Map form</p>;
  }

  if (stepQuery === 'church_media') {
    return <p>Church Media form</p>;
  }

  return <p>Unknown step</p>;
}

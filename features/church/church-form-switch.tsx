'use client';

import { useSearchParams } from 'next/navigation';
import { ChurchForm } from './church-form';
import ChurchProfileForm from './church-profile-form';
import { ChurchStep, DetailedChurch } from './church.types';

export function ChurchFormSwitch({ church }: { church: DetailedChurch }) {
  const searchParams = useSearchParams();

  const stepQuery = (searchParams.get('step') as ChurchStep) ?? 'basic';

  if (stepQuery === 'basic') {
    return <ChurchForm church={church} />;
  }

  if (stepQuery === 'profile') {
    return (
      <ChurchProfileForm churchId={church.id} churchProfile={church.profile} />
    );
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

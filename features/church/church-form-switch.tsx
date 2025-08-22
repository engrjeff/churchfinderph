'use client';

import { useSearchParams } from 'next/navigation';
import { ChurchContactForm } from './church-contact-form';
import { ChurchForm } from './church-form';
import { ChurchMinistriesForm } from './church-ministries-form';
import { ChurchPastorForm } from './church-pastor-form';
import ChurchProfileForm from './church-profile-form';
import { ChurchServicesForm } from './church-services-form';
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

  if (stepQuery === 'services') {
    return (
      <ChurchServicesForm churchId={church.id} services={church.services} />
    );
  }

  if (stepQuery === 'ministries') {
    return (
      <ChurchMinistriesForm
        churchId={church.id}
        ministries={church.ministries}
        publicServices={church.publicServices}
      />
    );
  }

  if (stepQuery === 'contact_details') {
    return (
      <ChurchContactForm
        churchId={church.id}
        contactInfo={church.contactDetails}
        phoneNumbers={church.contactInfo}
        socialLinks={church.socialLinks}
      />
    );
  }

  if (stepQuery === 'pastor_details') {
    return (
      <ChurchPastorForm
        churchId={church.id}
        churchName={church.name}
        pastorDetails={church.pastorDetails}
      />
    );
  }

  if (stepQuery === 'church_map') {
    return <p>Church Map form</p>;
  }

  if (stepQuery === 'church_media') {
    return <p>Church Media form</p>;
  }

  return <p>Unknown step</p>;
}

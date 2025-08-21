import {
  Church,
  ChurchContact,
  ChurchMap,
  ChurchMedia,
  ChurchProfile,
  ChurchService,
  Ministry,
  Pastor,
  PublicService,
} from '@/app/generated/prisma';

export type ChurchStep =
  | 'basic'
  | 'profile'
  | 'services'
  | 'ministries'
  | 'contact_details'
  | 'pastor_details'
  | 'church_map'
  | 'church_media';

export interface DetailedChurch extends Church {
  profile: ChurchProfile | null;
  contactDetails: ChurchContact | null;
  pastorDetails: Pastor | null;
  churchMedia: ChurchMedia | null;
  churchMap: ChurchMap | null;
  services: ChurchService[];
  ministries: Ministry[];
  publicServices: PublicService[];
}

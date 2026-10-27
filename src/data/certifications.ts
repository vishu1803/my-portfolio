export interface Certification {
  id: string;
  title: string;
  issuer: string;
  date?: string;
  url?: string;
}
// Add only owner-supplied, verified records. The reference portfolio's credentials are not this owner's facts.
export const CERTIFICATIONS: Certification[] = [];

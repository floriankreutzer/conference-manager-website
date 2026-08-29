export const demoRequestLimits = {
  firstName: 80,
  lastName: 80,
  email: 254,
  company: 160,
  message: 2000,
} as const;

export const companySizeValues = [
  '1-49',
  '50-249',
  '250-999',
  '1000-4999',
  '5000-9999',
  '10000+',
] as const;

export type CompanySize = (typeof companySizeValues)[number];

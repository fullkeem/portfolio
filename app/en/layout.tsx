import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    default: 'Kim Choongman · Fullkeem',
    template: '%s · Kim Choongman · Fullkeem',
  },
  description: 'Freelance frontend development and project execution mentoring by Kim Choongman.',
  openGraph: {
    locale: 'en_US',
    siteName: 'Kim Choongman · Fullkeem',
  },
};

export default function EnglishLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}

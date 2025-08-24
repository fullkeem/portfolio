export const mainNavigation = [
  { name: 'Home', href: '/' },
  { name: 'Portfolio', href: '/portfolio' },
  { name: 'Blog', href: '/blog' },
] as const;

export const footerNavigation = {
  main: [
    { name: 'Portfolio', href: '/portfolio' },
    { name: 'Blog', href: '/blog' },
  ],
  social: [
    { name: 'GitHub', href: process.env.NEXT_PUBLIC_GITHUB_URL || '#' },
    { name: 'LinkedIn', href: process.env.NEXT_PUBLIC_LINKEDIN_URL || '#' },
    { name: 'Email', href: `mailto:${process.env.NEXT_PUBLIC_EMAIL || ''}` },
  ],
} as const;

export const mainNavigation = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Portfolio', href: '/portfolio' },
  { name: 'Blog', href: '/blog' },
  { name: 'Contact', href: '/contact' },
] as const;

export const footerNavigation = {
  main: [
    { name: 'About', href: '/about' },
    { name: 'Portfolio', href: '/portfolio' },
    { name: 'Blog', href: '/blog' },
    { name: 'Contact', href: '/contact' },
  ],
  social: [
    { name: 'GitHub', href: process.env.NEXT_PUBLIC_GITHUB_URL || '#' },
    { name: 'LinkedIn', href: process.env.NEXT_PUBLIC_LINKEDIN_URL || '#' },
    { name: 'Email', href: `mailto:${process.env.NEXT_PUBLIC_EMAIL || ''}` },
  ],
} as const;

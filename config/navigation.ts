export const mainNavigation = [
  { name: 'Index', href: '/' },
  { name: 'Work', href: '/work' },
  { name: 'Resume', href: '/resume' },
  { name: 'Writing', href: '/writing' },
] as const;

export const footerNavigation = {
  main: [
    { name: 'Work', href: '/work' },
    { name: 'Resume', href: '/resume' },
    { name: 'Writing', href: '/writing' },
  ],
  social: [
    { name: 'GitHub', href: process.env.NEXT_PUBLIC_GITHUB_URL || 'https://github.com/fullkeem' },
    {
      name: 'LinkedIn',
      href:
        process.env.NEXT_PUBLIC_LINKEDIN_URL ||
        'https://www.linkedin.com/in/%EC%B6%A9%EB%A7%8C-%EA%B9%80-11b378305/',
    },
    { name: 'Email', href: `mailto:${process.env.NEXT_PUBLIC_EMAIL || 'cm7307@kakao.com'}` },
  ],
} as const;

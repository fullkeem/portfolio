import Link from 'next/link';
import { footerNavigation } from '@/config/navigation';

const footerLinks = footerNavigation;

export function Footer() {
  return (
    <footer className="border-t">
      <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="flex flex-col items-center gap-4 md:flex-row md:gap-8">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Fullkeem. All rights reserved.
            </p>
            <nav className="flex gap-6">
              {footerLinks.main.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  {link.name}
                </Link>
              ))}
            </nav>
          </div>
          <div className="flex gap-6">
            {footerLinks.social.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

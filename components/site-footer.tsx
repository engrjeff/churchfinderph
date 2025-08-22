import { ChurchIcon, HeartIcon, MailIcon, MapPinIcon } from 'lucide-react';
import Link from 'next/link';

export function SiteFooter() {
  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <ChurchIcon className="h-6 w-6 text-primary" />
              <span className="text-lg font-bold">ChurchFinder PH</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Connecting believers with biblical churches across the
              Philippines. Find your spiritual home and grow in your faith
              journey.
            </p>
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <MapPinIcon className="h-4 w-4" />
              <span>Philippines</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold">Quick Links</h3>
            <nav className="flex flex-col space-y-2">
              <Link
                href="/sign-up"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Find Churches
              </Link>
              <Link
                href="/add-church"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Add Your Church
              </Link>
              <Link
                href="/sign-in"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Sign In
              </Link>
            </nav>
          </div>

          {/* Resources */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold">Resources</h3>
            <nav className="flex flex-col space-y-2">
              <Link
                href="/about"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                About Us
              </Link>
              <Link
                href="/contact"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Contact
              </Link>
              <Link
                href="/help"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Help & Support
              </Link>
              <Link
                href="/privacy"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Privacy Policy
              </Link>
            </nav>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold">Get In Touch</h3>
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <MailIcon className="h-4 w-4" />
                <span>hello@churchfinderph.com</span>
              </div>
            </div>
            <p className="text-xs text-muted-foreground">
              Have a church to add or need help? We&apos;d love to hear from
              you.
            </p>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-8 pt-8 border-t">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm text-muted-foreground">
              © 2025 ChurchFinder PH. All rights reserved.
            </div>
            <div className="flex items-center space-x-1 text-sm text-muted-foreground">
              <span>Made with</span>
              <HeartIcon className="h-4 w-4 text-red-500 fill-current" />
              <span>for the Filipino Christian community</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

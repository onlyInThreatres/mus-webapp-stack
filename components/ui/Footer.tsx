import Link from 'next/link'
import { Facebook, Twitter, Github, Linkedin, Mail, Instagram, Globe } from 'lucide-react'

/**
 * Social media and contact links
 * @IPLINK tags indicate placeholder links that need to be replaced with actual URLs
 */
const socialLinks = [
  { name: 'GitHub', icon: Github, href: '@IPLINK:GITHUB' },
  { name: 'LinkedIn', icon: Linkedin, href: '@IPLINK:LINKEDIN' },
  { name: 'Twitter', icon: Twitter, href: '@IPLINK:TWITTER' },
  { name: 'Facebook', icon: Facebook, href: '@IPLINK:FACEBOOK' },
  { name: 'Instagram', icon: Instagram, href: '@IPLINK:INSTAGRAM' },
  { name: 'Website', icon: Globe, href: '@IPLINK:WEBSITE' },
  { name: 'Email', icon: Mail, href: 'mailto:@IPLINK:EMAIL' },
]

export default function Footer() {
  return (
    <footer className="bg-background">
      <div className="w-full border-t">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          {/* Social Links Section */}
          <div className="md:flex md:items-center md:justify-between">
            <div className="flex justify-center space-x-6 md:order-2">
              {socialLinks.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-muted-foreground hover:text-primary transition-colors duration-200"
                >
                  <span className="sr-only">{item.name}</span>
                  <item.icon className="h-6 w-6" aria-hidden="true" />
                </Link>
              ))}
            </div>
            
            {/* Copyright Section */}
            <div className="mt-4 md:mt-0 md:order-1">
              <p className="text-sm text-muted-foreground text-center md:text-left">
                &copy; {new Date().getFullYear()} WanderMindHub, Inc. All rights reserved.
              </p>
            </div>
          </div>

          {/* Links Section */}
          <div className="mt-4 pt-4 border-t border-border">
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm">
              <Link href="@IPLINK:ABOUT" className="text-muted-foreground hover:text-primary transition-colors">
                About Us
              </Link>
              <Link href="@IPLINK:CONTACT" className="text-muted-foreground hover:text-primary transition-colors">
                Contact
              </Link>
              <Link href="@IPLINK:PRIVACY" className="text-muted-foreground hover:text-primary transition-colors">
                Privacy Policy
              </Link>
              <Link href="@IPLINK:TERMS" className="text-muted-foreground hover:text-primary transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
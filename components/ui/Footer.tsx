import Link from 'next/link'
import { Facebook, Twitter, GitlabIcon as GitHub } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-background">
      <div className="w-full border-t">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
          <div className="md:flex md:items-center md:justify-between">
            <div className="md:order-2">
              <p className="text-center text-base text-muted-foreground">
                &copy; {new Date().getFullYear()} WanderMindHub, Inc. All rights reserved.
              </p>
            </div>
            
            <div className="mt-8 md:mt-0 md:order-1 flex justify-center space-x-6">
              <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <span className="sr-only">Facebook</span>
                <Facebook className="h-6 w-6" aria-hidden="true" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <span className="sr-only">Twitter</span>
                <Twitter className="h-6 w-6" aria-hidden="true" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <span className="sr-only">GitHub</span>
                <GitHub className="h-6 w-6" aria-hidden="true" />
              </Link>
            </div>
          </div>

          <div className="mt-8 border-t border-border pt-8">
            <div className="flex flex-wrap justify-center gap-x-8 gap-y-4">
              <Link href="#" className="text-base text-muted-foreground hover:text-foreground transition-colors">
                About Us
              </Link>
              <Link href="#" className="text-base text-muted-foreground hover:text-foreground transition-colors">
                Contact
              </Link>
              <Link href="#" className="text-base text-muted-foreground hover:text-foreground transition-colors">
                Privacy Policy
              </Link>
              <Link href="#" className="text-base text-muted-foreground hover:text-foreground transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
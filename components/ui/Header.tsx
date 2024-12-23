import Link from 'next/link'
import { Button } from "@/components/ui/button"

export default function Header() {
  return (
    <header className="w-full bg-background border-b">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex justify-between items-center py-4 md:py-6">
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center">
              <span className="sr-only">WandermindHub</span>
              <svg className="h-8 w-auto sm:h-10 text-primary" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
          </div>
          
          <nav className="hidden md:flex space-x-10 items-center">
            <Button variant="ghost" asChild className="text-base">
              <Link href="#features" className="text-muted-foreground hover:text-foreground">
                Features
              </Link>
            </Button>
            <Button variant="ghost" asChild>
              <Link href="#" className="text-muted-foreground hover:text-foreground">
                About
              </Link>
            </Button>
            <Button variant="ghost" asChild>
              <Link href="#" className="text-muted-foreground hover:text-foreground">
                Contact
              </Link>
            </Button>
          </nav>
          
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="outline" className="text-base">
              Sign In
            </Button>
            <Button className="text-base">
              Get Started
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
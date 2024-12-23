import { Button } from "@/components/ui/button"

export default function Hero() {
  return (
    <div className="relative bg-background overflow-hidden w-full min-h-[calc(100vh-4rem)]">
      <div className="w-full h-full">
        <div className="relative z-10 pb-8 bg-background sm:pb-16 md:pb-20 lg:w-1/2 lg:pb-28">
          <main className="mx-auto w-full px-4 sm:px-6 lg:px-8 pt-8 sm:pt-10 md:pt-12 lg:pt-16">
            <div className="sm:text-center lg:text-left">
              <h1 className="text-[3rem] sm:text-[3.5rem] md:text-[4rem] lg:text-[4.5rem] tracking-tight font-extrabold text-foreground leading-tight">
                <span className="block xl:inline">Transform your</span>{' '}
                <span className="block text-primary xl:inline">knowledge chaos</span>
              </h1>
              <p className="mt-6 text-lg sm:text-xl md:text-2xl text-muted-foreground sm:mt-8 sm:max-w-xl sm:mx-auto md:mt-8 lg:mx-0">
                WanderMindHub - the AI-powered knowledge management system that doesn&apos;t just store your content, it amplifies it.
              </p>
              <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row sm:gap-4">
                <Button size="lg" className="text-base">
                  Get started
                </Button>
                <Button size="lg" variant="outline" className="mt-3 sm:mt-0 text-base">
                  Learn more
                </Button>
              </div>
            </div>
          </main>
        </div>
      </div>
      <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
        <img
          className="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full"
          src="https://images.unsplash.com/photo-1557426272-fc759fdf7a8d?q=80&w=2070&auto=format&fit=crop"
          alt="WanderMindHub visualization"
        />
      </div>
    </div>
  )
}
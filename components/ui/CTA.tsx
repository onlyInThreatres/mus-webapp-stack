import { Button } from "@/components/ui/button"

export default function CTA() {
  return (
    <div className="w-full bg-primary">
      <div className="w-full max-w-4xl mx-auto text-center py-24 px-4 sm:py-32 sm:px-6">
        <h2 className="text-[2.75rem] sm:text-[3.25rem] md:text-[3.75rem] font-extrabold text-primary-foreground leading-tight">
          <span className="block">Ready to dive in?</span>
          <span className="block">Start your free trial today.</span>
        </h2>
        <p className="mt-6 text-xl sm:text-2xl md:text-3xl text-primary-foreground/80 max-w-2xl mx-auto">
          Join the knowledge revolution and transform how you manage, access, and share your professional expertise.
        </p>
        <Button 
          size="lg" 
          variant="secondary" 
          className="mt-12 w-full sm:w-auto text-lg px-12 py-6 h-auto"
        >
          Get started
        </Button>
      </div>
    </div>
  )
}
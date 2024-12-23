import { Brain, Zap, Users, Puzzle } from 'lucide-react'

const features = [
  {
    name: 'Intelligent Organization',
    description: 'Automatically categorizes and connects your content, creating a dynamic knowledge graph.',
    icon: Brain,
  },
  {
    name: 'Adaptive Content',
    description: 'Transform technical documentation into client-ready presentations with one click.',
    icon: Users,
  },
  {
    name: 'AI-Powered Amplification',
    description: 'Turn quick notes into structured knowledge and extract actionable insights automatically.',
    icon: Zap,
  },
  {
    name: 'Seamless Integration',
    description: 'Quick capture through voice, text, or image with rich editing capabilities.',
    icon: Puzzle,
  },
]

export default function Features() {
  return (
    <div className="py-16 md:py-20 bg-background min-h-screen flex items-center" id="features">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-lg text-primary font-semibold tracking-wide uppercase">FEATURES</h2>
          <p className="mt-4 text-[2.5rem] sm:text-[3rem] md:text-[3.5rem] font-extrabold text-foreground leading-tight">
            A better way to manage knowledge
          </p>
          <p className="mt-6 text-lg sm:text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
            WanderMindHub revolutionizes how you organize, access, and share your professional expertise.
          </p>
        </div>

        <div className="mt-16">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12">
            {features.map((feature) => (
              <div key={feature.name} className="flex">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-14 w-14 rounded-lg bg-primary text-primary-foreground">
                    <feature.icon className="h-7 w-7" aria-hidden="true" />
                  </div>
                </div>
                <div className="ml-6">
                  <h3 className="text-xl font-medium text-foreground">{feature.name}</h3>
                  <p className="mt-3 text-lg text-muted-foreground">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
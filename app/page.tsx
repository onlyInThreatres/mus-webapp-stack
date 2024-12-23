import Header from '../components/ui/Header'
import Hero from '../components/ui/Hero'
import Features from '../components/ui/Features'
import CTA from '../components/ui/CTA'
import Footer from '../components/ui/Footer'

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <Hero />
        <Features />
        <CTA />
      </main>
      <Footer />
    </div>
  )
}

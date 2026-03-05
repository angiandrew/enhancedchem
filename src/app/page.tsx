import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { HeroSection, FeaturesStrip } from '@/components/HeroSection'
import { FeaturedProducts } from '@/components/FeaturedProducts'
import { WhyChooseUs } from '@/components/WhyChooseUs'
import { CTASection } from '@/components/CTASection'

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <FeaturesStrip />
        <FeaturedProducts />
        <WhyChooseUs />
        <CTASection />
      </main>
      <Footer />
    </div>
  )
}

import { Pricing } from './components/Pricing'
import { Stats } from './components/Stats'
import { FeatureSection } from './components/FeatureSection'
import { HeroSection } from './components/HeroSection'

export const HomePage = () => {
  return (
    <main>
      <HeroSection />

      <FeatureSection />

      <Stats />

      <Pricing />

      {/*<CTASection />*/}
    </main>
  )
}

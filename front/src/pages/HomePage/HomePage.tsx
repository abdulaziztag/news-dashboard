import { CTASection } from './components/CTASection'
import { BlogSection } from './components/BlogSection'
import { TestimonialSection } from './components/TestimonialSection'
import { FeatureSection } from './components/FeatureSection'
import { ScreenshotSection } from './components/ScreenshotSection'
import { HeadSection } from './components/HeadSection'

export const HomePage = () => {
  return (
    <main>
      <HeadSection />

      <ScreenshotSection />

      <FeatureSection />

      <TestimonialSection />

      <BlogSection />

      <CTASection />
    </main>
  )
}

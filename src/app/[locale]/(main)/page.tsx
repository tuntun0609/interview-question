import AdvantagesSection from '@/components/advantages-section'
import HeroSection from '@/components/hero-section'
import HowItWorksSection from '@/components/how-it-works-section'
import QuestionTypesSection from '@/components/question-types-section'
import StatsSection from '@/components/stats-section'

export default function Home() {
  return (
    <>
      <HeroSection />
      <QuestionTypesSection />
      <HowItWorksSection />
      <AdvantagesSection />
      <StatsSection />
    </>
  )
}

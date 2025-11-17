import { HeroSection } from '@/components/home/HeroSection';
import { FeaturesGrid } from '@/components/home/FeaturesGrid';
import { PreCheckInShowcase } from '@/components/home/PreCheckInShowcase';
import { AIAssistantShowcase } from '@/components/home/AIAssistantShowcase';
import { TestimonialsCarousel } from '@/components/home/TestimonialsCarousel';
import { NewsletterSection } from '@/components/home/NewsletterSection';

export const HomePage = () => {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <FeaturesGrid />
      <PreCheckInShowcase />
      <AIAssistantShowcase />
      <TestimonialsCarousel />
      <NewsletterSection />
    </div>
  );
};

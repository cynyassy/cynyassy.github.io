import { LoadingScreen } from './components/LoadingScreen';
import { Navigation } from './components/Navigation';
import { ScrollToTop } from './components/ScrollToTop';
import { HeroSection } from './components/HeroSection';
import { SystemsDefinition } from './components/SystemsDefinition';
import { AboutSection } from './components/AboutSection';
import { WhyMeSection } from './components/WhyMeSection';
import { AIWorkflowSection } from './components/AIWorkflowSection';
import { ClientsCarousel } from './components/ClientsCarousel';
import { FeaturedWork } from './components/FeaturedWork';
import { SkillsNetwork } from './components/SkillsNetwork';
import { ToolsStrip } from './components/ToolsStrip';
import { QualificationsSection } from './components/QualificationsSection';
import { OtherProjects } from './components/OtherProjects';
import { ContactSection } from './components/ContactSection';

export default function App() {
  return (
    <>
      {/* Loading screen */}
      <LoadingScreen />

      <div className="min-h-screen bg-white text-black overflow-x-hidden">
        {/* Navigation */}
        <Navigation />
        
        {/* Scroll to top button */}
        <ScrollToTop />
        
        {/* Main content */}
        <HeroSection />
        <SystemsDefinition />
        <AboutSection />
        <WhyMeSection />
        <AIWorkflowSection />
        <div id="featured-work">
          <FeaturedWork />
        </div>
        <SkillsNetwork />
        <ToolsStrip />
        <QualificationsSection />
        <ClientsCarousel />
        <OtherProjects />
        <div id="contact">
          <ContactSection />
        </div>
      </div>
    </>
  );
}

import { LoadingScreen } from './components/LoadingScreen';
import { CustomCursor } from './components/CustomCursor';
import { Navigation } from './components/Navigation';
import { ScrollToTop } from './components/ScrollToTop';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { ClientsCarousel } from './components/ClientsCarousel';
import { FeaturedWork } from './components/FeaturedWork';
import { SkillsNetwork } from './components/SkillsNetwork';
import { ToolsStrip } from './components/ToolsStrip';
import { QualificationsSection } from './components/QualificationsSection';
import { OtherProjects } from './components/OtherProjects';
import { CurrentFocus } from './components/CurrentFocus';
import { ContactSection } from './components/ContactSection';

export default function App() {
  return (
    <>
      {/* Loading screen */}
      <LoadingScreen />
      
      {/* Custom cursor */}
      <CustomCursor />
      
      <div className="min-h-screen bg-white text-black overflow-x-hidden">
        {/* Navigation */}
        <Navigation />
        
        {/* Scroll to top button */}
        <ScrollToTop />
        
        {/* Main content */}
        <HeroSection />
        <AboutSection />
        <div id="featured-work">
          <FeaturedWork />
        </div>
        <SkillsNetwork />
        <ToolsStrip />
        <QualificationsSection />
        <ClientsCarousel />
        <OtherProjects />
        <CurrentFocus />
        <div id="contact">
          <ContactSection />
        </div>
      </div>
    </>
  );
}

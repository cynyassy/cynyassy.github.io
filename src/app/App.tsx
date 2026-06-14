import { Navigation } from './components/Navigation';
import { ScrollToTop } from './components/ScrollToTop';
import { HeroSection } from './components/HeroSection';
import { QuickFacts } from './components/QuickFacts';
import { SystemsDefinition } from './components/SystemsDefinition';
import { ClientsCarousel } from './components/ClientsCarousel';
import { FeaturedWork } from './components/FeaturedWork';
import { ToolsStrip } from './components/ToolsStrip';
import { QualificationsSection } from './components/QualificationsSection';
import { OtherProjects } from './components/OtherProjects';
import { ContactSection } from './components/ContactSection';

export default function App() {
  return (
    <>
      <div className="min-h-screen bg-white text-black overflow-x-hidden">
        {/* Navigation */}
        <Navigation />
        
        {/* Scroll to top button */}
        <ScrollToTop />
        
        {/* Main content */}
        <HeroSection />
        <QuickFacts />
        <div id="featured-work">
          <FeaturedWork />
        </div>
        <SystemsDefinition />
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

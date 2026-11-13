import { SoundToggle } from '../audio/SoundToggle';
import './portfolio-frame.css';

export function PortfolioHeader({sectionBase='/'}:{sectionBase?:string}={}) {
  return (
    <header className="portfolio-header">
      <div className="portfolio-header-inner">
        <a className="portfolio-brand" href="/" aria-label="Cynyassy home">cynyassy<sup>®</sup></a>
        <nav aria-label="Portfolio">
          <a href={`${sectionBase}#projects`}>Work</a>
          <a href={`${sectionBase}#about`}>About</a>
          <a href={`${sectionBase}#contact`}>Contact</a>
        </nav>
        <SoundToggle />
      </div>
    </header>
  );
}

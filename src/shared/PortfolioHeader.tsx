import { SoundToggle } from '../audio/SoundToggle';
import './portfolio-frame.css';

export function PortfolioHeader() {
  return (
    <header className="portfolio-header">
      <div className="portfolio-header-inner">
        <a className="portfolio-brand" href="/" aria-label="Cynyassy home">cynyassy<sup>®</sup></a>
        <nav aria-label="Portfolio">
          <a href="/#projects">Work</a>
          <a href="/#about">About</a>
          <a href="/#contact">Contact</a>
        </nav>
        <SoundToggle />
      </div>
    </header>
  );
}

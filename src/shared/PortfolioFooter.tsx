import './portfolio-frame.css';

interface PortfolioFooterProps {
  href: string;
  project: string;
  connection: string;
}

export function PortfolioFooter({ href, project, connection }: PortfolioFooterProps) {
  return (
    <footer className="portfolio-footer">
      <div>
        <p className="portfolio-footer-label">Keep exploring</p>
        <a className="portfolio-related" href={href}>{project} <span aria-hidden="true">↗</span></a>
        <p className="portfolio-connection">{connection}</p>
      </div>
      <nav aria-label="Continue exploring">
        <a href="/#projects">All work</a>
        <a href="/#contact">Contact</a>
      </nav>
    </footer>
  );
}

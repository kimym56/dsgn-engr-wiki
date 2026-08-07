interface SiteFooterProps {
  description: string;
}

export function SiteFooter({ description }: SiteFooterProps) {
  return (
    <footer className="site-footer">
      <div className="shell site-footer__inner">
        <strong>DSGN ENGR Wiki</strong>
        <p>{description}</p>
      </div>
    </footer>
  );
}

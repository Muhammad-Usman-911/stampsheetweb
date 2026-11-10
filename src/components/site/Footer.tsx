import { Logo } from './Header';
import { Container } from './Section';

export function Footer() {
  return (
    <footer className="border-t py-9">
      <Container className="flex flex-wrap items-center justify-between gap-x-6 gap-y-3 text-sm text-muted-foreground">
        <Logo size={24} />
        <p>CCTV footage to Excel, automatically.</p>
        <p>© {new Date().getFullYear()} StampSheet. All rights reserved.</p>
      </Container>
    </footer>
  );
}

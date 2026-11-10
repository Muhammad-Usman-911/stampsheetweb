import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import { Container } from './Section';

const LINKS = [
  ['#how', 'How it works'],
  ['#features', 'Features'],
  ['#mega', 'MEGA'],
  ['#names', 'Names'],
  ['#faq', 'FAQ'],
] as const;

export function Logo({ size = 32 }: { size?: number }) {
  return (
    <a href="#top" className="inline-flex items-center gap-2.5 text-lg font-bold tracking-tight text-foreground">
      <img src="icon.svg" alt="" width={size} height={size} />
      StampSheet
    </a>
  );
}

export function Header() {
  const { resolvedTheme, setTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  const dark = resolvedTheme === 'dark';

  return (
    <header
      id="top"
      className={cn(
        'sticky top-0 z-50 border-b border-transparent bg-background/80 backdrop-blur-md backdrop-saturate-150 transition-colors',
        scrolled && 'border-border',
      )}
    >
      <Container className="flex h-16 items-center justify-between gap-4">
        <Logo />
        <nav aria-label="Main" className="hidden gap-1 lg:flex">
          {LINKS.map(([href, label]) => (
            <a key={href} href={href} className="rounded-md px-3 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground">
              {label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline" size="icon" aria-label="Switch light or dark theme" onClick={() => setTheme(dark ? 'light' : 'dark')}>
                {dark ? <Moon /> : <Sun />}
              </Button>
            </TooltipTrigger>
            <TooltipContent>{dark ? 'Dark theme' : 'Light theme'}</TooltipContent>
          </Tooltip>
          <Button asChild className="shadow-[0_8px_24px_-10px_var(--primary)]">
            <a href="#download">Download</a>
          </Button>
        </div>
      </Container>
    </header>
  );
}

import { Card } from '@/components/ui/card';
import { Container, Reveal } from './Section';

const STATS = [
  ['50/50', 'values read correctly on the 25 test videos'],
  ['~1 s', 'per video, several read at the same time'],
  ['~6 MB', 'read from MEGA per 1 GB video. Nothing is downloaded.'],
  ['0', 'accounts needed. Your videos stay on your computer.'],
] as const;

export function Stats() {
  return (
    <section aria-label="Key numbers">
    <Container className="grid grid-cols-2 gap-3 pt-2 pb-6 lg:grid-cols-4 lg:gap-4">
      {STATS.map(([value, text], i) => (
        <Reveal key={value} delay={i * 0.05}>
          <Card className="h-full gap-1 p-[18px] shadow-soft">
            <b className="text-[1.6rem] font-extrabold tracking-tight text-primary tabular-nums sm:text-[2.1rem]">{value}</b>
            <span className="text-sm leading-snug text-muted-foreground">{text}</span>
          </Card>
        </Reveal>
      ))}
    </Container>
    </section>
  );
}

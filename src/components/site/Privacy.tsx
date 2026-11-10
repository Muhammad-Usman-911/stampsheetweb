import { Card } from '@/components/ui/card';
import { Reveal, Section, SectionHead } from './Section';

const ITEMS = [
  ['Videos', 'Never uploaded. MEGA videos are read piece by piece and never saved to disk.'],
  ['Clock reading', 'Done fully offline on your computer. No internet needed for local videos.'],
  ['MEGA login', 'Only a session key is kept, encrypted by Windows or Linux. Your password is never stored.'],
  ['History', 'A small file on this computer only. Clear it any time from the History window.'],
] as const;

export function Privacy() {
  return (
    <Section id="privacy" alt>
      <SectionHead eyebrow="Privacy" title="Your footage stays yours">
        No account, no cloud server of ours, no tracking. Everything runs on your computer.
      </SectionHead>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {ITEMS.map(([title, text], i) => (
          <Reveal key={title} delay={i * 0.05}>
            <Card className="h-full gap-1.5 rounded-2xl p-[22px] shadow-none">
              <h3 className="font-bold">{title}</h3>
              <p className="text-[0.92rem] text-muted-foreground">{text}</p>
            </Card>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

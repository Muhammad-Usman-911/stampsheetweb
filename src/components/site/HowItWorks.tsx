import type { ReactNode } from 'react';
import { ArrowRight } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { ClockFrame } from './ClockFrame';
import { Code, Reveal, Section, SectionHead } from './Section';

const FACTS: [string, ReactNode, boolean?][] = [
  ['Date', <>11-05-2026 <small className="ml-1 font-sans font-semibold text-success">Thu ✓</small></>],
  ['Start time', '05:07:25 AM'],
  ['Video length', '+ 01:12:40'],
  ['End time', '06:20:05 AM', true],
];

const STEPS = [
  ['Add videos', <>Drop videos or whole folders on the window, use <em>Choose folder</em>, or pick a folder from your MEGA drive.</>],
  ['Check', <>Click any value to edit it. Orange rows need a quick look, and the note tells you why.</>],
  ['Export', <><em>Export to new Excel</em> or <em>Append to existing Excel</em>. Done.</>],
] as const;

function FlowCard({ step, children, note }: { step: string; children: ReactNode; note: ReactNode }) {
  return (
    <Card className="h-full min-w-0 gap-3.5 p-[18px] shadow-soft">
      <span className="text-xs font-bold tracking-[0.06em] text-muted-foreground uppercase">{step}</span>
      {children}
      <p className="mt-auto text-sm text-muted-foreground">{note}</p>
    </Card>
  );
}

function Arrow() {
  return (
    <div aria-hidden className="grid place-items-center text-muted-foreground">
      <ArrowRight className="size-6 rotate-90 lg:rotate-0" />
    </div>
  );
}

export function HowItWorks() {
  return (
    <Section id="how">
      <SectionHead eyebrow="How it works" title="From the camera clock to an Excel row">
        Your NVR prints a clock in the corner of every video. StampSheet reads it, checks it, and does the maths.
      </SectionHead>

      <Reveal className="grid gap-4 lg:grid-cols-[1fr_auto_1fr_auto_1fr] lg:gap-3">
        <FlowCard step="1 · Read" note={<>The clock is drawn <b className="text-foreground">black or white</b> depending on the wall behind it, often both in one line. StampSheet's reader handles that and checks several frames.</>}>
          <ClockFrame />
        </FlowCard>
        <Arrow />
        <FlowCard step="2 · Work out" note="The date is checked against the weekday. Start time is confirmed by later frames. End time = start + length.">
          <dl className="grid gap-2">
            {FACTS.map(([k, v, hl]) => (
              <div key={k} className={cn('flex items-baseline justify-between gap-3 rounded-lg bg-muted px-3 py-2.5', hl && 'bg-success-soft')}>
                <dt className="text-sm text-muted-foreground">{k}</dt>
                <dd className={cn('font-mono text-[0.92rem] font-bold tabular-nums', hl && 'text-success')}>{v}</dd>
              </div>
            ))}
          </dl>
        </FlowCard>
        <Arrow />
        <FlowCard step="3 · Export" note={<>Save a new <Code>.xlsx</Code> or add rows to your existing sheet. Dates and times are real Excel values.</>}>
          <div className="overflow-hidden rounded-lg border text-[11px] tabular-nums">
            {[
              ['A', 'B', 'C'],
              ['video_name', 'date', 'start_time'],
              ['Camera 2_0105.mp4', '2026-11-05', '5:07:25 AM'],
              ['Camera 2_0106.mp4', '2026-11-05', '6:20:06 AM'],
            ].map((row, r) => (
              <div key={r} className="grid grid-cols-[minmax(0,1.45fr)_minmax(0,1fr)_minmax(0,1fr)]">
                {row.map((c) => (
                  <span key={c} className={cn(
                    'truncate border-r px-1.5 py-[7px] last:border-r-0',
                    r === 0 ? 'bg-muted py-0.5 text-center text-[10px] text-muted-foreground' : 'border-t',
                    r === 1 && 'bg-emerald-600/12 font-bold',
                  )}>{c}</span>
                ))}
              </div>
            ))}
          </div>
        </FlowCard>
      </Reveal>

      <ol className="mt-14 grid gap-4 md:grid-cols-3 md:gap-6">
        {STEPS.map(([title, text], i) => (
          <Reveal key={title} delay={i * 0.06}>
            <li className="list-none">
              <span className="mb-3 grid size-9 place-items-center rounded-lg bg-accent font-extrabold text-accent-foreground">{i + 1}</span>
              <h3 className="mb-1.5 text-lg font-bold">{title}</h3>
              <p className="text-muted-foreground">{text}</p>
            </li>
          </Reveal>
        ))}
      </ol>
    </Section>
  );
}

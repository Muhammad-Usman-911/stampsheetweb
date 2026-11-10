import type { ReactNode } from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Code, Reveal, Section, SectionHead } from './Section';

const B = ({ children }: { children: ReactNode }) => <b className="font-semibold text-foreground">{children}</b>;

const QUESTIONS: [string, ReactNode][] = [
  ['Windows says “Windows protected your PC”. Is it safe?',
    <>This message appears for new apps that Windows does not know yet. Click <B>More info</B>, then <B>Run anyway</B>. You only need to do this once.</>],
  ['How do I open the Linux AppImage?',
    <>Right-click the file → <B>Properties</B> → <B>Permissions</B> → tick <B>Allow executing file as program</B>, then double-click it. Or in a terminal: <Code>chmod +x StampSheet-*.AppImage</Code> and run it.</>],
  ['What happens when the clock can’t be read for sure?',
    <>The cell is left empty and the row turns orange with a short note. A wrong time is worse than an empty one, so StampSheet never guesses. Type the value yourself and click the warning icon to mark the row as checked.</>],
  ['Which cameras does it work with?',
    <>NVR / DVR / CCTV videos with a date and time printed in the top-left corner, like <Code>11-05-2026 Thu 05:07:25</Code>. You can choose the date order (day-month or month-day) in Settings.</>],
  ['Does it download my MEGA videos?',
    <>No. It reads only a few small pieces of each video (about 6 MB from a 1 GB file), decrypts them in memory and throws them away.</>],
  ['How do updates work?',
    <>The app checks for a new version when it starts and every few hours. It downloads in the background and shows <B>Restart to update</B> when ready. You can also check in <B>Settings → Check for updates</B>.</>],
  ['What does “Usefullness” mean?',
    <>Every video starts as <B>Yes</B>. Click it in the table to switch to <B>No</B> for videos that aren’t needed. The column is exported with your rows.</>],
];

export function Faq() {
  return (
    <Section id="faq" alt>
      <div className="mx-auto max-w-[780px]">
        <SectionHead eyebrow="FAQ" title="Questions" />
        <Reveal>
          <Accordion type="single" collapsible className="grid gap-2.5">
            {QUESTIONS.map(([q, a], i) => (
              <AccordionItem key={i} value={`q${i}`} className="rounded-xl border bg-card px-5 last:border-b data-[state=open]:shadow-soft">
                <AccordionTrigger className="text-base font-semibold hover:no-underline">{q}</AccordionTrigger>
                <AccordionContent className="text-[0.95rem] leading-relaxed text-muted-foreground">{a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </div>
    </Section>
  );
}

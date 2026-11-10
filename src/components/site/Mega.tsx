import { Check, ChevronRight, Folder } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { Eyebrow, Reveal, Section } from './Section';

const POINTS = [
  ['Log in once.', 'The login is remembered, encrypted by your computer. Your password is never saved.'],
  ['Browse your folders', 'like in MEGA, with a video count per folder.'],
  ['Nothing written to disk.', 'Video pieces are decrypted in memory only.'],
  ['Log out', 'any time. It removes the saved login.'],
] as const;

const FOLDERS = [['Unit-6 Camera-1', 48], ['Unit-6 Camera-2', 51], ['Unit-6 Camera-3', 47], ['Unit-6 Camera-4', 50]] as const;

export function Mega() {
  return (
    <Section id="mega">
      <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <Reveal>
          <Eyebrow>MEGA</Eyebrow>
          <h2 className="mt-2.5 mb-3.5 text-3xl font-extrabold sm:text-4xl">Read your MEGA drive without downloading it</h2>
          <p className="text-muted-foreground">
            Terabytes of footage in the cloud? StampSheet logs in to your MEGA account and reads only the few pieces of each video it needs, then forgets them.
          </p>
          <ul className="mt-6 grid gap-3">
            {POINTS.map(([b, t]) => (
              <li key={b} className="flex gap-3 text-muted-foreground">
                <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-success-soft text-success">
                  <Check className="size-3" strokeWidth={3.2} />
                </span>
                <span><b className="font-semibold text-foreground">{b}</b> {t}</span>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={0.1}>
          <Card aria-hidden className="gap-0 rounded-2xl p-[18px] text-sm shadow-big">
            <div className="flex items-center gap-2.5 font-bold">
              <span className="grid size-7 place-items-center rounded-full bg-[#d9272e] text-sm font-extrabold text-white">M</span>
              Choose a MEGA folder
            </div>
            <div className="my-3 flex items-center gap-1 text-[0.85rem] text-muted-foreground">
              Cloud drive <ChevronRight className="size-3.5" /> Footage Nov-9
            </div>
            <ul className="overflow-hidden rounded-xl border">
              {FOLDERS.map(([name, n], i) => {
                const sel = i === 1;
                return (
                  <li key={name} className={cn('flex items-center gap-2.5 border-t px-3 py-2.5 font-medium first:border-t-0', sel && 'bg-accent')}>
                    <Folder className="size-[18px] shrink-0 fill-amber-400 text-amber-500" />
                    {name}
                    <em className="text-[0.82rem] font-normal text-muted-foreground not-italic">{n} videos</em>
                    <b className={cn('ml-auto rounded-md px-2.5 py-0.5 text-xs font-semibold', sel ? 'bg-primary text-primary-foreground' : 'bg-secondary')}>Add</b>
                  </li>
                );
              })}
            </ul>
            <div className="mt-4 grid gap-1.5 text-[0.85rem]">
              <Meter label="Video size" value="1 GB" width="100%" className="bg-input" />
              <Meter label="Read by StampSheet" value="≈ 6 MB" width="1.5%" className="min-w-1.5 bg-success" />
            </div>
          </Card>
        </Reveal>
      </div>
    </Section>
  );
}

function Meter({ label, value, width, className }: { label: string; value: string; width: string; className: string }) {
  return (
    <>
      <div className="flex justify-between text-muted-foreground">
        <span>{label}</span>
        <b className="font-semibold text-foreground tabular-nums">{value}</b>
      </div>
      <div className="mb-1.5 h-2 overflow-hidden rounded-full bg-muted">
        <i className={cn('block h-full rounded-full', className)} style={{ width }} />
      </div>
    </>
  );
}

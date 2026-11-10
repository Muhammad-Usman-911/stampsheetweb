import { Check, Download as DownloadIcon } from 'lucide-react';
import { motion } from 'motion/react';
import { Button } from '@/components/ui/button';
import { detectOS, type Release } from '@/lib/release';
import { AppPreview } from './AppPreview';
import { Container } from './Section';

const POINTS = ['About 1 second per video', 'Works offline', 'Reads from MEGA without downloading'];

export function Hero({ release }: { release: Release }) {
  const os = detectOS();
  const asset = os === 'windows' ? release.windows : os === 'linux' ? release.linux : undefined;
  const label = os === 'windows' ? 'Download for Windows' : os === 'linux' ? 'Download for Linux' : 'Download StampSheet';

  return (
    <section className="relative overflow-hidden pt-12 pb-10 lg:pt-20 lg:pb-16">
      <div aria-hidden className="hero-glow pointer-events-none absolute inset-x-[-10%] top-[-20%] h-[720px]" />
      <Container className="relative grid items-center gap-12 lg:grid-cols-[0.95fr_1.15fr]">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: 'easeOut' }}>
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-accent px-3 py-1.5 text-[0.8rem] font-semibold text-accent-foreground">
            <span className="size-[7px] rounded-full bg-success ring-3 ring-success/25" />
            Free desktop app for Windows &amp; Linux
          </span>
          <h1 className="mt-5 mb-4 text-[2.1rem] leading-[1.08] font-extrabold tracking-[-0.035em] sm:text-5xl lg:text-[3.25rem]">
            Turn CCTV footage into a clean <span className="text-gradient">Excel log</span>, automatically.
          </h1>
          <p className="max-w-xl text-lg text-muted-foreground">
            StampSheet reads the date and time printed in the corner of your camera videos and fills in{' '}
            <b className="font-semibold text-foreground">video name, date, start time, end time and duration</b> for you. No more
            opening every video and typing by hand.
          </p>
          <div className="mt-7 mb-6 flex flex-wrap gap-3">
            <Button asChild size="lg" className="h-12 px-6 text-base shadow-[0_8px_24px_-10px_var(--primary)] transition-transform hover:-translate-y-px">
              <a href={asset?.url ?? '#download'}>
                <DownloadIcon className="size-[18px]" /> {label}
              </a>
            </Button>
            <Button asChild size="lg" variant="outline" className="h-12 px-6 text-base">
              <a href="#how">See how it works</a>
            </Button>
          </div>
          <ul className="flex flex-wrap gap-x-5 gap-y-2.5 text-sm text-muted-foreground">
            {POINTS.map((p) => (
              <li key={p} className="inline-flex items-center gap-1.5">
                <Check className="size-4 text-success" strokeWidth={2.6} /> {p}
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.7, ease: 'easeOut', delay: 0.1 }}
          className="min-w-0"
        >
          <AppPreview />
        </motion.div>
      </Container>
    </section>
  );
}

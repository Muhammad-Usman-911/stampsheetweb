import type { ReactNode } from 'react';
import { motion } from 'motion/react';
import { Clock, CloudDownload, FileSpreadsheet, Folder, History, Moon, RefreshCw, Zap, type LucideIcon } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { Section, SectionHead } from './Section';

const TONES = {
  blue: 'bg-accent text-primary',
  green: 'bg-success-soft text-success',
  amber: 'bg-warning-soft text-warning',
  red: 'bg-destructive/12 text-destructive',
};

const FEATURES: [LucideIcon, keyof typeof TONES, string, ReactNode][] = [
  [Clock, 'blue', 'Accurate clock reading', <>Several views of each frame vote on the answer, and later frames must agree. If it is not sure, it leaves the cell <b className="text-foreground">empty with a note</b> instead of guessing.</>],
  [Zap, 'green', 'Fast', 'About one second per video. Several videos are read at once, so a folder of 25 is done in under half a minute.'],
  [Folder, 'amber', 'Whole folders', 'Drop a folder and every video inside it (sub-folders too) is added. The camera name comes from the folder name.'],
  [CloudDownload, 'red', 'Straight from MEGA', 'Log in once and browse your drive. Only the small parts needed to read the clock are fetched. Videos are never downloaded.'],
  [FileSpreadsheet, 'blue', 'Excel, your way', 'Create a new file or append to the register you already keep. Columns stay the same every time.'],
  [History, 'green', 'History', 'See every video read and every Excel file saved on this computer. Open old rows and export them again.'],
  [RefreshCw, 'amber', 'Updates itself', <>New versions download in the background. Click <em>Restart to update</em> when it suits you.</>],
  [Moon, 'red', 'Light & dark', <>A clean, calm screen in light or dark mode. <kbd className="rounded border border-b-2 bg-card px-1 font-mono text-xs">Ctrl</kbd>+<kbd className="rounded border border-b-2 bg-card px-1 font-mono text-xs">O</kbd> opens videos.</>],
];

export function Features() {
  return (
    <Section id="features" alt>
      <SectionHead eyebrow="Features" title="Built for real factory footage">
        Made with real NVR videos where the clock is hard to read: poles, doors, cables and changing light.
      </SectionHead>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {FEATURES.map(([Icon, tone, title, text], i) => (
          <motion.div
            key={title}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '0px 0px -8% 0px' }}
            transition={{ duration: 0.5, delay: (i % 4) * 0.06 }}
            whileHover={{ y: -3 }}
          >
            <Card className="h-full gap-0 rounded-2xl p-[22px] shadow-soft transition-shadow hover:shadow-big">
              <span className={cn('grid size-[42px] place-items-center rounded-xl', TONES[tone])}>
                <Icon className="size-[21px]" />
              </span>
              <h3 className="mt-3.5 mb-2 text-[1.05rem] font-bold">{title}</h3>
              <p className="text-[0.92rem] text-muted-foreground">{text}</p>
            </Card>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

import type { ReactNode } from 'react';
import { Card } from '@/components/ui/card';
import { Code, Reveal, Section, SectionHead } from './Section';

type Example = { from: ReactNode; fromNote?: string; to: ReactNode; toNote?: string };

const EXAMPLES: Example[] = [
  { from: <Code>Camera 2/00000105.mp4</Code>, to: <Code>Camera 2_00000105.mp4</Code> },
  { from: <Code>Footage Nov-9/Unit-6 Camera-3/x.mp4</Code>, to: <Code>Camera 3_x.mp4</Code> },
  { from: <Code>Factory/CAM_03/Day 1/clip.mp4</Code>, to: <Code>Camera 3_clip.mp4</Code>, toNote: 'closest camera folder wins' },
  { from: <span className="flex flex-wrap gap-1.5"><Code>camera_02/</Code><Code>Cam2/</Code><Code>IPCam 2/</Code></span>, to: <Code>Camera 2_…</Code> },
  { from: <Code>Videos/clip.mp4</Code>, fromNote: 'no camera folder', to: <Code>Camera 1_clip.mp4</Code>, toNote: 'default name from Settings' },
];

const Note = ({ children }: { children?: string }) =>
  children ? <small className="mt-1 block text-xs text-muted-foreground">{children}</small> : null;

export function Names() {
  return (
    <Section id="names" alt>
      <SectionHead eyebrow="How names work" title="The camera name comes from your folders">
        <Code>video_name</Code> = <b className="text-foreground">camera name</b> + <Code>_</Code> + <b className="text-foreground">file name</b>.
        The closest folder with “camera” or “cam” and a number gives the camera name.
      </SectionHead>
      <Reveal>
        <Card className="mx-auto max-w-[860px] gap-0 overflow-hidden rounded-2xl py-0 shadow-soft">
          <div className="hidden grid-cols-2 bg-muted px-4 py-3 text-[0.82rem] font-semibold text-muted-foreground sm:grid">
            <span>Where the video is</span>
            <span>video_name in Excel</span>
          </div>
          {EXAMPLES.map((e, i) => (
            <div key={i} className="grid gap-1 border-t px-4 py-3 text-sm first:border-t-0 sm:grid-cols-2 sm:gap-4 sm:first:border-t">
              <div className="break-all">{e.from}<Note>{e.fromNote}</Note></div>
              <div className="break-all"><span className="mr-1 text-muted-foreground sm:hidden">→</span>{e.to}<Note>{e.toNote}</Note></div>
            </div>
          ))}
        </Card>
      </Reveal>
      <Reveal>
        <p className="mt-5 text-center text-sm text-muted-foreground">
          Not counted as camera folders: <Code>Webcam5</Code>, <Code>Scam 1</Code>, <Code>Cameras</Code>, <Code>Footage 2026</Code>.
          You can turn folder names off in Settings.
        </p>
      </Reveal>
    </Section>
  );
}

import type { ReactNode } from 'react';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { detectOS, LATEST_URL, megabytes, RELEASES_URL, type Asset, type Release } from '@/lib/release';
import { Reveal, Section } from './Section';

const WindowsLogo = () => (
  <svg viewBox="0 0 24 24" className="size-7 shrink-0" fill="currentColor" aria-hidden>
    <path d="M3 5.5 10 4.5v7H3zM11 4.3 21 3v8.5H11zM3 12.5h7v7l-7-1zM11 12.5h10V21l-10-1.4z" />
  </svg>
);
const LinuxLogo = () => (
  <svg viewBox="0 0 24 24" className="size-7 shrink-0" fill="currentColor" aria-hidden>
    <path d="M12 2c-2 0-3.2 1.7-3.2 4.2 0 1.6-.6 2.6-1.6 4C5.8 12 5 13.8 5 15.6c0 .6.1 1.2.3 1.7-.7.4-1.3.9-1.3 1.6 0 1.2 1.8 1.4 3.4 2 1 .4 1.8 1.1 2.8 1.1.9 0 1.5-.5 1.8-1 .3.5.9 1 1.8 1 1 0 1.8-.7 2.8-1.1 1.6-.6 3.4-.8 3.4-2 0-.7-.6-1.2-1.3-1.6.2-.5.3-1.1.3-1.7 0-1.8-.8-3.6-2.2-5.4-1-1.4-1.6-2.4-1.6-4C15.2 3.7 14 2 12 2Z" />
  </svg>
);

function DownloadCard({ icon, title, base, asset, ready, primary }: {
  icon: ReactNode; title: string; base: string; asset?: Asset; ready: boolean; primary: boolean;
}) {
  const note = asset ? `${base} · ${megabytes(asset.size)}` : ready ? 'Coming soon · see all releases' : base;
  return (
    <a
      href={asset?.url ?? LATEST_URL}
      className={cn(
        'flex items-center gap-3.5 rounded-xl border bg-background px-[18px] py-4 text-left text-foreground transition-all hover:-translate-y-0.5 hover:border-primary hover:shadow-[0_10px_28px_-14px_var(--primary)]',
        primary && 'border-primary bg-primary text-primary-foreground',
      )}
    >
      {icon}
      <span>
        <b className="block text-[1.05rem] font-semibold">{title}</b>
        <small className={cn('block text-[0.82rem]', primary ? 'text-primary-foreground/80' : 'text-muted-foreground')}>{note}</small>
      </span>
    </a>
  );
}

export function Download({ release }: { release: Release }) {
  const os = detectOS();
  const ready = release.state === 'ready';
  const version = release.state === 'loading' ? 'checking…' : release.version ?? 'see GitHub Releases';

  return (
    <Section id="download">
      <Reveal>
        <Card
          className="relative items-center gap-0 overflow-hidden rounded-3xl px-5 py-12 text-center shadow-big"
          style={{ background: 'radial-gradient(70% 90% at 50% 0%, var(--glow), transparent 70%), var(--card)' }}
        >
          <img src="icon.svg" alt="" width={72} height={72} className="mb-4 drop-shadow-[0_12px_24px_oklch(0.5_0.2_262/35%)]" />
          <h2 className="mb-2 text-3xl font-extrabold sm:text-[2.6rem]">Download StampSheet</h2>
          <p className="text-muted-foreground">Latest version: <b className="text-foreground">{version}</b></p>
          <div className="mx-auto mt-7 mb-5 grid w-full max-w-[620px] gap-3 sm:grid-cols-2">
            <DownloadCard icon={<WindowsLogo />} title="Windows" base="Windows 10 / 11 · .exe" asset={release.windows} ready={ready} primary={os === 'windows'} />
            <DownloadCard icon={<LinuxLogo />} title="Linux" base="64-bit · .AppImage" asset={release.linux} ready={ready} primary={os === 'linux'} />
          </div>
          <p className="text-sm text-muted-foreground">
            All versions and release notes are on <a className="text-primary hover:underline" href={RELEASES_URL}>GitHub Releases</a>. Installed apps update themselves.
          </p>
        </Card>
      </Reveal>
    </Section>
  );
}

import { useEffect, useRef, useState } from 'react';
import { useInView, useReducedMotion } from 'motion/react';
import { Check, CircleDashed, Folder, Loader2, TriangleAlert } from 'lucide-react';
import { cn } from '@/lib/utils';

type Row = { n: string; d: string; s: string; e: string; t: string; warn?: boolean };
type State = 'wait' | 'reading' | 'done';

// End time = start + duration on every row.
const ROWS: Row[] = [
  { n: 'Camera 2_0105.mp4', d: '11-05-2026', s: '5:07:25 AM', e: '6:20:05 AM', t: '01:12:40' },
  { n: 'Camera 2_0106.mp4', d: '11-05-2026', s: '6:20:06 AM', e: '7:31:44 AM', t: '01:11:38' },
  { n: 'Camera 2_0107.mp4', d: '11-05-2026', s: '', e: '', t: '01:10:02', warn: true },
  { n: 'Camera 2_0108.mp4', d: '11-05-2026', s: '8:41:47 AM', e: '9:55:12 AM', t: '01:13:25' },
  { n: 'Camera 2_0109.mp4', d: '11-05-2026', s: '9:55:13 AM', e: '11:06:30 AM', t: '01:11:17' },
  { n: 'Camera 2_0110.mp4', d: '11-05-2026', s: '11:06:31 AM', e: '12:18:02 PM', t: '01:11:31' },
];
const PARALLEL = 3;

// On phones: name, start time, useful. Wider: every column.
const GRID =
  'grid grid-cols-[16px_minmax(0,1fr)_80px_40px] sm:grid-cols-[16px_minmax(0,1fr)_86px_80px_80px_62px_40px] items-center gap-1.5 px-2.5';
const WIDE = 'hidden sm:block';

/** Animated copy of the app window: videos are read 3 at a time, one needs a check. */
export function AppPreview() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });
  const [states, setStates] = useState<State[]>(() => ROWS.map(() => (reduce ? 'done' : 'wait')));
  const [cycle, setCycle] = useState(0);

  useEffect(() => {
    if (reduce || !inView) return;
    const timers: number[] = [];
    const set = (i: number, s: State) => setStates((prev) => prev.map((v, j) => (j === i ? s : v)));
    setStates(ROWS.map(() => 'wait'));
    let finished = 0;
    ROWS.forEach((r, i) => {
      const begin = 500 + Math.floor(i / PARALLEL) * 1300 + (i % PARALLEL) * 180;
      const dur = 900 + (i % 3) * 220 + (r.warn ? 500 : 0);
      timers.push(window.setTimeout(() => set(i, 'reading'), begin));
      timers.push(window.setTimeout(() => {
        set(i, 'done');
        if (++finished === ROWS.length) timers.push(window.setTimeout(() => setCycle((c) => c + 1), 5200));
      }, begin + dur));
    });
    return () => timers.forEach(clearTimeout);
  }, [inView, reduce, cycle]);

  const done = states.filter((s) => s === 'done').length;

  return (
    <div
      ref={ref}
      role="img"
      aria-label="Preview of the StampSheet window reading six videos"
      className="overflow-hidden rounded-2xl border bg-card text-[12.5px] shadow-big"
    >
      {/* title bar */}
      <div className="flex h-[38px] items-center gap-3 border-b bg-muted px-3.5">
        <span className="flex gap-1.5">
          <i className="size-[11px] rounded-full bg-red-400" />
          <i className="size-[11px] rounded-full bg-amber-400" />
          <i className="size-[11px] rounded-full bg-emerald-400" />
        </span>
        <span className="mx-auto inline-flex -translate-x-6 items-center gap-1.5 font-semibold text-muted-foreground">
          <img src="icon.svg" alt="" width={16} height={16} /> StampSheet
        </span>
      </div>

      {/* tabs + header buttons */}
      <div className="flex flex-wrap items-center justify-between gap-2.5 px-3.5 pt-3">
        <div className="inline-flex gap-0.5 rounded-lg bg-muted p-[3px]">
          <span className="rounded-md bg-card px-2.5 py-1 font-medium shadow-xs">From this computer</span>
          <span className="px-2.5 py-1 font-medium text-muted-foreground">From MEGA</span>
        </div>
        <div className="hidden gap-1.5 text-muted-foreground sm:flex">
          {['History', 'How names work', 'Settings'].map((t) => (
            <span key={t} className="rounded-md border px-2 py-1">{t}</span>
          ))}
        </div>
      </div>

      {/* source row */}
      <div className="mx-3.5 my-3 flex items-center gap-2.5 rounded-lg border-[1.5px] border-dashed border-input px-3 py-2 text-muted-foreground">
        <Folder className="size-4 shrink-0 text-primary" />
        <span><b className="font-semibold text-foreground">Unit-6 Camera-2</b> · 6 videos</span>
        <span className="ml-auto rounded-md bg-secondary px-2 py-0.5 font-medium whitespace-nowrap text-foreground">Choose folder</span>
      </div>

      {/* table */}
      <div className="mx-3.5 overflow-hidden rounded-lg border tabular-nums">
        <div className={cn(GRID, 'h-[30px] bg-muted text-[11.5px] font-semibold text-muted-foreground')}>
          <span />
          <span>Video name</span>
          <span className={WIDE}>Date</span>
          <span>Start time</span>
          <span className={WIDE}>End time</span>
          <span className={WIDE}>Duration</span>
          <span>Useful</span>
        </div>
        {ROWS.map((r, i) => (
          <PreviewRow key={r.n} row={r} state={states[i]} />
        ))}
      </div>

      {/* footer */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-3.5 pt-3 pb-3.5">
        <div className="flex min-w-[150px] flex-1 items-center gap-2.5 text-muted-foreground">
          <span>{done < ROWS.length ? `Reading videos… ${done} / ${ROWS.length}` : `${ROWS.length} read · 1 to check`}</span>
          <div className="h-1.5 max-w-[140px] flex-1 overflow-hidden rounded-full bg-muted">
            <i className="block h-full rounded-full bg-primary transition-[width] duration-500" style={{ width: `${(done / ROWS.length) * 100}%` }} />
          </div>
        </div>
        <div className="flex gap-1.5 font-semibold">
          <span className="hidden rounded-lg border px-2.5 py-1.5 whitespace-nowrap sm:inline">Append to existing Excel</span>
          <span className="rounded-lg bg-primary px-2.5 py-1.5 whitespace-nowrap text-primary-foreground">Export to new Excel</span>
        </div>
      </div>
    </div>
  );
}

function PreviewRow({ row, state }: { row: Row; state: State }) {
  const done = state === 'done';
  const warn = done && row.warn;
  const cell = (v: string, wide = false) => (
    <span className={cn('truncate', wide && WIDE)}>
      {done && v ? (
        <span className="inline-block duration-300 animate-in fade-in slide-in-from-bottom-1">{v}</span>
      ) : (
        <span className="inline-block h-2 w-[70%] rounded bg-muted align-middle" />
      )}
    </span>
  );
  return (
    <div
      title={warn ? 'Camera time not certain. Please check.' : undefined}
      className={cn(GRID, 'relative h-[34px] overflow-hidden border-t transition-colors duration-500', warn && 'bg-warning-soft')}
    >
      {state === 'reading' && (
        <span aria-hidden className="animate-shimmer pointer-events-none absolute inset-0 bg-linear-to-r from-transparent via-primary/10 to-transparent" />
      )}
      <StatusIcon state={state} warn={!!row.warn} />
      <span className="truncate font-medium">{row.n}</span>
      {cell(row.d, true)}
      {cell(row.s)}
      {cell(row.e, true)}
      {cell(row.t, true)}
      <span><span className="rounded-full bg-success-soft px-2 py-px text-[11px] font-semibold text-success">Yes</span></span>
    </div>
  );
}

function StatusIcon({ state, warn }: { state: State; warn: boolean }) {
  if (state === 'wait') return <CircleDashed className="size-4 text-input" />;
  if (state === 'reading') return <Loader2 className="size-4 animate-spin text-primary" />;
  return (
    <span className={cn('grid size-4 place-items-center rounded-full text-white duration-300 animate-in zoom-in-50', warn ? 'bg-warning' : 'bg-success')}>
      {warn ? <TriangleAlert className="size-2.5" strokeWidth={3} /> : <Check className="size-2.5" strokeWidth={3.5} />}
    </span>
  );
}

import { useLayoutEffect, useRef, useState } from 'react';

const TEXT = '11-05-2026 Thu 05:07:25';
// Wall bands as [start %, light?]. Same stops as .camera-wall in index.css.
const WALL: [number, boolean][] = [[0, true], [18, false], [31, true], [47, false], [53, true], [72, false]];

/**
 * A video corner with the burned-in camera clock. Like real NVR cameras, each character is drawn
 * black on a light wall and white on a dark wall, so one line mixes both colours.
 */
export function ClockFrame() {
  const frame = useRef<HTMLDivElement>(null);
  const [light, setLight] = useState<boolean[]>(() => TEXT.split('').map(() => true));

  useLayoutEffect(() => {
    const el = frame.current;
    if (!el) return;
    const paint = () => {
      const w = el.clientWidth || 1;
      const box = el.getBoundingClientRect();
      const spans = el.querySelectorAll<HTMLSpanElement>('[data-ch]');
      setLight(Array.from(spans, (s) => {
        const r = s.getBoundingClientRect();
        const x = ((r.left + r.width / 2 - box.left) / w) * 100;
        let l = true;
        for (const [start, isLight] of WALL) if (x >= start) l = isLight;
        return l;
      }));
    };
    paint();
    const ro = new ResizeObserver(paint);
    ro.observe(el);
    document.fonts?.ready.then(paint);
    return () => ro.disconnect();
  }, []);

  return (
    <div ref={frame} className="camera-wall relative h-[150px] overflow-hidden rounded-lg" aria-label="Video frame with the camera clock in the top-left corner" role="img">
      <div aria-hidden className="absolute top-3 right-2.5 left-2.5 font-mono text-[clamp(13px,1.55vw,17px)] font-bold whitespace-nowrap">
        {TEXT.split('').map((c, i) => (
          <span key={i} data-ch className={light[i] ? 'text-black' : 'text-white [text-shadow:0_0_1px_#fff]'}>{c}</span>
        ))}
      </div>
      <div aria-hidden className="animate-scan absolute top-2 h-[30px] rounded-md border-2 border-emerald-400 shadow-[0_0_0_4px_rgba(52,211,153,.18),0_0_24px_rgba(52,211,153,.5)]" />
    </div>
  );
}

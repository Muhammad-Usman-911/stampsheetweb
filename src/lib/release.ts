import { useEffect, useState } from 'react';

export const REPO = 'Muhammad-Usman-911/StampSheet-ElectronApp-VideotoExcel';
export const RELEASES_URL = `https://github.com/${REPO}/releases`;
export const LATEST_URL = `${RELEASES_URL}/latest`;

export type Asset = { url: string; size: number; name: string };
export type Release = {
  /** 'loading' until GitHub answers, 'error' if it can't be reached (links then open the Releases page). */
  state: 'loading' | 'ready' | 'error';
  version?: string;
  windows?: Asset;
  linux?: Asset;
};
export type OS = 'windows' | 'linux' | null;

type GhAsset = { name: string; size: number; browser_download_url: string };

/** Latest GitHub release: version + direct links to the .exe and .AppImage. */
export function useLatestRelease(): Release {
  const [release, setRelease] = useState<Release>({ state: 'loading' });
  useEffect(() => {
    const ctrl = new AbortController();
    fetch(`https://api.github.com/repos/${REPO}/releases/latest`, {
      headers: { Accept: 'application/vnd.github+json' },
      signal: ctrl.signal,
    })
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error(String(r.status)))))
      .then((rel: { tag_name?: string; assets?: GhAsset[] }) => {
        const pick = (re: RegExp): Asset | undefined => {
          const a = (rel.assets ?? []).find((x) => re.test(x.name));
          return a && { url: a.browser_download_url, size: a.size, name: a.name };
        };
        setRelease({
          state: 'ready',
          version: rel.tag_name?.replace(/^v/, ''),
          windows: pick(/\.exe$/i),
          linux: pick(/\.AppImage$/i),
        });
      })
      .catch((e) => { if (e?.name !== 'AbortError') setRelease({ state: 'error' }); });
    return () => ctrl.abort();
  }, []);
  return release;
}

export function detectOS(): OS {
  const ua = typeof navigator === 'undefined' ? '' : navigator.userAgent;
  if (/Windows/i.test(ua)) return 'windows';
  if (/Linux/i.test(ua) && !/Android/i.test(ua)) return 'linux';
  return null;
}

export const megabytes = (bytes: number) => `${Math.round(bytes / 1048576)} MB`;

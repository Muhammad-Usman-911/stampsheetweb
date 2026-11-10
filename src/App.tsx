import { Header } from '@/components/site/Header';
import { Hero } from '@/components/site/Hero';
import { Stats } from '@/components/site/Stats';
import { HowItWorks } from '@/components/site/HowItWorks';
import { Features } from '@/components/site/Features';
import { Mega } from '@/components/site/Mega';
import { Names } from '@/components/site/Names';
import { ExcelSample } from '@/components/site/ExcelSample';
import { Privacy } from '@/components/site/Privacy';
import { Download } from '@/components/site/Download';
import { Faq } from '@/components/site/Faq';
import { Footer } from '@/components/site/Footer';
import { useLatestRelease } from '@/lib/release';

export default function App() {
  const release = useLatestRelease();
  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[100] focus:rounded-md focus:bg-primary focus:px-3 focus:py-2 focus:text-primary-foreground">
        Skip to content
      </a>
      <Header />
      <main id="main">
        <Hero release={release} />
        <Stats />
        <HowItWorks />
        <Features />
        <Mega />
        <Names />
        <ExcelSample />
        <Privacy />
        <Download release={release} />
        <Faq />
      </main>
      <Footer />
    </>
  );
}

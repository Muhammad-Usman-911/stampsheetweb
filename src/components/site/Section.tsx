import type { ReactNode } from 'react';
import { motion } from 'motion/react';
import { cn } from '@/lib/utils';

/** Fades and lifts its content in once it scrolls into view. */
export function Reveal({ children, className, delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -8% 0px' }}
      transition={{ duration: 0.55, ease: 'easeOut', delay }}
    >
      {children}
    </motion.div>
  );
}

export function Container({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn('mx-auto w-full max-w-[1180px] px-4 sm:px-7', className)}>{children}</div>;
}

export function Section({ id, alt, children, className }: { id?: string; alt?: boolean; children: ReactNode; className?: string }) {
  return (
    <section id={id} className={cn('py-18 md:py-26', alt && 'border-y bg-alt', className)}>
      <Container>{children}</Container>
    </section>
  );
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return <span className="text-xs font-bold tracking-[0.08em] text-primary uppercase">{children}</span>;
}

export function SectionHead({ eyebrow, title, children }: { eyebrow: string; title: ReactNode; children?: ReactNode }) {
  return (
    <Reveal className="mx-auto mb-12 max-w-2xl text-center">
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 className="mt-2.5 mb-3.5 text-3xl font-extrabold sm:text-4xl md:text-[2.5rem] md:leading-tight">{title}</h2>
      {children && <p className="text-[1.05rem] text-muted-foreground">{children}</p>}
    </Reveal>
  );
}

/** Small inline code, like file and folder names. */
export function Code({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <code className={cn('rounded-md border bg-muted px-1.5 py-0.5 font-mono text-[0.84em]', className)}>{children}</code>
  );
}

import { Card } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Reveal, Section, SectionHead } from './Section';

const COLUMNS = ['video_name', 'date', 'start_time', 'end_time', 'duration_hh:mm:ss', 'Usefullness'];
// end_time = start_time + duration on every row.
const ROWS = [
  ['Camera 2_00000000105000000.mp4', '2026-11-01', '5:56:25 AM', '8:49:55 AM', '02:53:30', true],
  ['Camera 2_00000000106000000.mp4', '2026-11-01', '8:49:56 AM', '11:42:10 AM', '02:52:14', true],
  ['Camera 3_00000000211000000.mp4', '2026-11-01', '6:01:12 AM', '7:15:40 AM', '01:14:28', false],
] as const;

export function ExcelSample() {
  return (
    <Section id="excel">
      <SectionHead eyebrow="Your Excel file" title="Same columns, every time">
        Ready to sort, filter and add up. Dates and times are real Excel values, not text.
      </SectionHead>
      <Reveal>
        <Card className="gap-0 overflow-hidden rounded-2xl py-0 shadow-soft">
          <Table className="tabular-nums">
            <TableHeader>
              <TableRow className="bg-emerald-600/12 hover:bg-emerald-600/12">
                {COLUMNS.map((c) => <TableHead key={c} className="px-4 font-mono text-xs">{c}</TableHead>)}
              </TableRow>
            </TableHeader>
            <TableBody>
              {ROWS.map(([name, date, start, end, dur, useful]) => (
                <TableRow key={name}>
                  <TableCell className="px-4 py-3">{name}</TableCell>
                  <TableCell className="px-4">{date}</TableCell>
                  <TableCell className="px-4">{start}</TableCell>
                  <TableCell className="px-4">{end}</TableCell>
                  <TableCell className="px-4">{dur}</TableCell>
                  <TableCell className="px-4">
                    <span className={useful ? 'rounded-full bg-success-soft px-2.5 py-0.5 text-xs font-semibold text-success' : 'rounded-full bg-muted px-2.5 py-0.5 text-xs font-semibold text-muted-foreground'}>
                      {useful ? 'Yes' : 'No'}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      </Reveal>
    </Section>
  );
}

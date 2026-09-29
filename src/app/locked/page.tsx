import { Lock } from 'lucide-react';

export const metadata: { title: string; description: string } = {
  title: 'Website Temporarily Locked',
  description: 'This website is temporarily locked.',
};

const HEADLINE = 'Website Temporarily Locked';
const LINES = [
  'This website has been locked by the developer.',
  'All work was completed and delivered in full.',
  'The site will be restored immediately once the outstanding balance is settled.',
];

export default function LockedPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-navy px-4 py-16">
      <div className="w-full max-w-lg text-center">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-volt/15 ring-1 ring-volt/30">
          <Lock size={36} className="text-volt" />
        </div>

        <h1 className="mt-8 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
          {HEADLINE}
        </h1>

        <div className="mt-6 space-y-3">
          {LINES.map((line) => (
            <p key={line} className="text-base leading-relaxed text-navy-100">
              {line}
            </p>
          ))}
        </div>

        <p className="mt-10 inline-block rounded-md bg-volt/15 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-volt">
          Energy Man Batteries
        </p>
      </div>
    </main>
  );
}

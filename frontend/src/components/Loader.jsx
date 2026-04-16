import { Loader2 } from 'lucide-react';

export default function Loader({ text = 'Loading...' }) {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <Loader2 size={36} className="animate-spin text-indigo-500" />
      <p className="mt-3 text-sm font-medium text-slate-400">{text}</p>
    </div>
  );
}

export function SkeletonCard() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6">
      <div className="skeleton mb-4 h-5 w-3/4 rounded-lg" />
      <div className="skeleton mb-2 h-4 w-1/2 rounded-lg" />
      <div className="skeleton h-4 w-2/3 rounded-lg" />
    </div>
  );
}

export function SkeletonTable({ rows = 5 }) {
  return (
    <div className="space-y-3">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="skeleton h-12 w-full rounded-xl" />
      ))}
    </div>
  );
}

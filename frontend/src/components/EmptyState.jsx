import { Inbox } from 'lucide-react';

export default function EmptyState({ title = 'No data found', description = 'There are no items to display.' }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-slate-50/50 py-16">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100">
        <Inbox size={28} className="text-slate-400" />
      </div>
      <h3 className="mt-4 text-base font-semibold text-slate-700">{title}</h3>
      <p className="mt-1 text-sm text-slate-400">{description}</p>
    </div>
  );
}

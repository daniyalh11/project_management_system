export default function StatsCard({ icon: Icon, label, value, color = 'indigo' }) {
  const colorMap = {
    indigo: 'from-indigo-500 to-blue-600 shadow-indigo-200 bg-indigo-50 text-indigo-600',
    emerald: 'from-emerald-500 to-teal-600 shadow-emerald-200 bg-emerald-50 text-emerald-600',
    amber: 'from-amber-500 to-orange-600 shadow-amber-200 bg-amber-50 text-amber-600',
    rose: 'from-rose-500 to-pink-600 shadow-rose-200 bg-rose-50 text-rose-600',
  };

  const colors = colorMap[color] || colorMap.indigo;
  const [gradientFrom, , , bgColor, textColor] = colors.split(' ');

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:shadow-md">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500">{label}</p>
          <p className="mt-1 text-3xl font-bold tracking-tight text-slate-900">{value}</p>
        </div>
        <div
          className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${colors.split(' ').slice(0, 2).join(' ')} text-white shadow-md ${colors.split(' ')[2]}`}
        >
          <Icon size={22} />
        </div>
      </div>
    </div>
  );
}

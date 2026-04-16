import { MapPin, Calendar, ArrowRight } from 'lucide-react';

export default function ProjectCard({ project, onRequestAccess, isClient }) {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-indigo-100/50">
      {/* Gradient accent */}
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-indigo-500 to-blue-500" />

      <div className="mb-4 flex items-start justify-between">
        <h3 className="text-lg font-semibold text-slate-900 group-hover:text-indigo-600 transition-colors">
          {project.name}
        </h3>
        <span className="inline-flex items-center rounded-lg bg-indigo-50 px-2.5 py-1 text-xs font-medium text-indigo-600">
          Active
        </span>
      </div>

      <div className="space-y-3 text-sm text-slate-500">
        <div className="flex items-center gap-2">
          <MapPin size={14} className="text-slate-400" />
          <span>{project.location || 'No location'}</span>
        </div>
        <div className="flex items-center gap-2">
          <Calendar size={14} className="text-slate-400" />
          <span>
            {project.startDate || '—'} → {project.endDate || '—'}
          </span>
        </div>
      </div>

      {isClient && onRequestAccess && (
        <button
          onClick={() => onRequestAccess(project.id)}
          className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 to-blue-600 px-4 py-2.5 text-sm font-medium text-white shadow-md shadow-indigo-200 transition-all hover:shadow-lg hover:shadow-indigo-300 active:scale-[0.98]"
        >
          Request Access
          <ArrowRight size={14} />
        </button>
      )}
    </div>
  );
}

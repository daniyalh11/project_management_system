import { useState, useEffect } from 'react';
import { getProjects } from '../services/api';
import { SkeletonCard } from '../components/Loader';
import EmptyState from '../components/EmptyState';
import toast from 'react-hot-toast';
import {
  FileBarChart,
  MapPin,
  Calendar,
  Mail,
  Phone,
} from 'lucide-react';

export default function Reports() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await getProjects();
        setProjects(data);
      } catch {
        toast.error('Failed to load reports');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="animate-fade-in space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-blue-600 text-white shadow-md shadow-indigo-200">
          <FileBarChart size={22} />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Reports</h1>
          <p className="text-sm text-slate-500">Project data overview and insights</p>
        </div>
      </div>

      {/* Summary Bar */}
      {!loading && projects.length > 0 && (
        <div className="flex flex-wrap gap-4">
          <div className="rounded-xl bg-indigo-50 px-4 py-2 text-sm font-medium text-indigo-700">
            {projects.length} project{projects.length !== 1 && 's'} total
          </div>
          <div className="rounded-xl bg-emerald-50 px-4 py-2 text-sm font-medium text-emerald-700">
            {projects.filter((p) => p.location).length} with locations
          </div>
          <div className="rounded-xl bg-amber-50 px-4 py-2 text-sm font-medium text-amber-700">
            {projects.filter((p) => p.startDate).length} with dates
          </div>
        </div>
      )}

      {/* Loading skeletons */}
      {loading && (
        <div className="space-y-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      )}

      {/* Report items */}
      {!loading && projects.length === 0 && (
        <EmptyState title="No report data" description="There are no projects to generate reports from." />
      )}

      {!loading && projects.length > 0 && (
        <div className="max-h-[calc(100dvh-280px)] space-y-4 overflow-y-auto pr-1 sm:pr-2">
          {projects.map((project, index) => (
            <div
              key={project.id}
              className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:shadow-md"
              style={{ animationDelay: `${index * 80}ms` }}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100 text-xs font-bold text-slate-500">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <h3 className="text-base font-semibold text-slate-900">{project.name}</h3>
                  </div>
                </div>
                <span className="inline-flex items-center rounded-lg bg-indigo-50 px-2.5 py-1 text-xs font-medium text-indigo-600">
                  Active
                </span>
              </div>

              <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
                <div className="flex items-center gap-2 text-sm text-slate-500">
                  <MapPin size={14} className="text-slate-400" />
                  <span>{project.location || '—'}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-500">
                  <Calendar size={14} className="text-slate-400" />
                  <span>{project.startDate || '—'} → {project.endDate || '—'}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-500">
                  <Mail size={14} className="text-slate-400" />
                  <span>{project.email || '—'}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-500">
                  <Phone size={14} className="text-slate-400" />
                  <span>{project.phone || '—'}</span>
                </div>
              </div>

              {project.createdBy && (
                <p className="mt-3 text-xs text-slate-400">
                  Created by: <span className="font-mono">{project.createdBy}</span>
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

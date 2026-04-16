import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  LayoutDashboard,
  FolderPlus,
  FileBarChart,
  Hexagon,
  X,
} from 'lucide-react';

const navItems = [
  { to: '/projects', label: 'Projects', icon: LayoutDashboard, roles: ['admin', 'client'] },
  { to: '/create-project', label: 'Create Project', icon: FolderPlus, roles: ['admin'] },
  { to: '/reports', label: 'Reports', icon: FileBarChart, roles: ['admin', 'client'] },
];

export default function Sidebar({ open, onClose }) {
  const { user } = useAuth();

  return (
    <>
      {/* Mobile backdrop */}
      {open && (
        <div
          className="fixed inset-0 z-30 bg-black/40 backdrop-blur-sm lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed left-0 top-0 z-40 flex h-screen w-64 flex-col border-r border-slate-200 bg-white transition-transform duration-300
          ${open ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0`}
      >
        {/* Logo */}
        <div className="flex h-16 items-center justify-between border-b border-slate-100 px-5">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-blue-600 text-white shadow-md shadow-indigo-200">
              <Hexagon size={20} />
            </div>
            <div>
              <h1 className="text-base font-bold tracking-tight text-slate-900">Ubiquitous</h1>
              <p className="text-[10px] font-medium uppercase tracking-widest text-slate-400">Pvt. Ltd.</p>
            </div>
          </div>
          {/* Close button – mobile only */}
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600 lg:hidden"
          >
            <X size={18} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 px-3 py-4">
          {navItems
            .filter((item) => item.roles.includes(user?.role))
            .map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={onClose}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? 'bg-gradient-to-r from-indigo-50 to-blue-50 text-indigo-700 shadow-sm'
                      : 'text-slate-500 hover:bg-slate-50 hover:text-slate-700'
                  }`
                }
              >
                <item.icon size={18} />
                {item.label}
              </NavLink>
            ))}
        </nav>

        {/* Footer */}
        <div className="border-t border-slate-100 px-4 py-4">
          <p className="text-center text-xs text-slate-400">&copy; 2026 Ubiquitous</p>
        </div>
      </aside>
    </>
  );
}

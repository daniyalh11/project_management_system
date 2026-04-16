import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  LayoutDashboard,
  FolderPlus,
  FileBarChart,
  Hexagon,
} from 'lucide-react';

const navItems = [
  { to: '/projects', label: 'Projects', icon: LayoutDashboard, roles: ['admin', 'client'] },
  { to: '/create-project', label: 'Create Project', icon: FolderPlus, roles: ['admin'] },
  { to: '/reports', label: 'Reports', icon: FileBarChart, roles: ['admin', 'client'] },
];

export default function Sidebar() {
  const { user } = useAuth();

  return (
    <aside className="fixed left-0 top-0 z-40 flex h-screen w-64 flex-col border-r border-slate-200 bg-white">
      {/* Logo */}
      <div className="flex h-16 items-center gap-3 border-b border-slate-100 px-6">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-blue-600 text-white shadow-md shadow-indigo-200">
          <Hexagon size={20} />
        </div>
        <div>
          <h1 className="text-base font-bold tracking-tight text-slate-900">Ubiquitous</h1>
          <p className="text-[10px] font-medium uppercase tracking-widest text-slate-400">Pvt. Ltd.</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 px-3 py-4">
        {navItems
          .filter((item) => item.roles.includes(user?.role))
          .map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium transition-all duration-200 ${
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
        <p className="text-xs text-slate-400 text-center">&copy; 2026 Ubiquitous</p>
      </div>
    </aside>
  );
}

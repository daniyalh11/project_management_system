import { useAuth } from '../context/AuthContext';
import { LogOut, User, Menu } from 'lucide-react';

export default function Navbar({ onMenuClick }) {
  const { user, logout } = useAuth();

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-slate-200 bg-white/80 px-4 backdrop-blur-lg sm:px-6">
      <div className="flex items-center gap-3">
        {/* Hamburger – mobile only */}
        <button
          onClick={onMenuClick}
          className="rounded-xl p-2 text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-700 lg:hidden"
          aria-label="Open menu"
        >
          <Menu size={20} />
        </button>
        <h2 className="text-sm font-semibold text-slate-800 sm:text-base">
          Welcome, <span className="text-indigo-600">{user?.username}</span>
        </h2>
      </div>

      <div className="flex items-center gap-2 sm:gap-4">
        {/* Role Badge */}
        <span
          className={`hidden items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold sm:inline-flex ${
            user?.role === 'admin'
              ? 'bg-indigo-100 text-indigo-700'
              : 'bg-emerald-100 text-emerald-700'
          }`}
        >
          <User size={12} />
          {user?.role?.charAt(0).toUpperCase() + user?.role?.slice(1)}
        </span>

        {/* Avatar */}
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 text-sm font-bold text-white shadow-md shadow-indigo-200">
          {user?.username?.charAt(0).toUpperCase()}
        </div>

        {/* Logout – icon on mobile, icon+text on desktop */}
        <button
          onClick={logout}
          className="flex items-center gap-2 rounded-xl px-2 py-2 text-sm font-medium text-slate-500 transition-all hover:bg-red-50 hover:text-red-600 sm:px-3"
          aria-label="Logout"
        >
          <LogOut size={16} />
          <span className="hidden sm:inline">Logout</span>
        </button>
      </div>
    </header>
  );
}

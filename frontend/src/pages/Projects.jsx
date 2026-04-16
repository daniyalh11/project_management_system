import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { getProjects, getRequests, getUsers, requestAccess, approveRequest, denyRequest } from '../services/api';
import ProjectCard from '../components/ProjectCard';
import StatsCard from '../components/StatsCard';
import EmptyState from '../components/EmptyState';
import Loader, { SkeletonCard, SkeletonTable } from '../components/Loader';
import toast from 'react-hot-toast';
import {
  FolderKanban,
  Users,
  Clock,
  CheckCircle2,
  XCircle,
  Send,
} from 'lucide-react';

export default function Projects() {
  const { user } = useAuth();
  const isAdmin = user?.role === 'admin';

  const [projects, setProjects] = useState([]);
  const [users, setUsers] = useState([]);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(null);
  const [requestProjectId, setRequestProjectId] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [projectsRes] = await Promise.all([getProjects()]);
      setProjects(projectsRes.data);

      if (isAdmin) {
        const [usersRes, requestsRes] = await Promise.all([getUsers(), getRequests()]);
        setUsers(usersRes.data);
        setRequests(requestsRes.data);
      }
    } catch (err) {
      toast.error('Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  const handleRequestAccess = async (projectId) => {
    setActionLoading(projectId);
    try {
      await requestAccess(projectId);
      toast.success('Access request sent!');
    } catch (err) {
      toast.error(err.response?.data?.error || 'Request failed');
    } finally {
      setActionLoading(null);
    }
  };

  const handleManualRequest = async (e) => {
    e.preventDefault();
    if (!requestProjectId.trim()) return;
    await handleRequestAccess(requestProjectId.trim());
    setRequestProjectId('');
  };

  const handleApprove = async (requestId) => {
    setActionLoading(requestId);
    try {
      await approveRequest(requestId);
      toast.success('Request approved');
      setRequests((prev) => prev.filter((r) => r.id !== requestId));
    } catch (err) {
      toast.error('Failed to approve');
    } finally {
      setActionLoading(null);
    }
  };

  const handleDeny = async (requestId) => {
    setActionLoading(requestId);
    try {
      await denyRequest(requestId);
      toast.success('Request denied');
      setRequests((prev) => prev.filter((r) => r.id !== requestId));
    } catch (err) {
      toast.error('Failed to deny');
    } finally {
      setActionLoading(null);
    }
  };

  if (loading) return <Loader text="Loading dashboard..." />;

  return (
    <div className="animate-fade-in space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900">
          {isAdmin ? 'Dashboard Overview' : 'My Projects'}
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          {isAdmin ? 'Manage projects, users, and requests' : 'View your assigned projects'}
        </p>
      </div>

      {/* Admin Stats */}
      {isAdmin && (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <StatsCard icon={FolderKanban} label="Total Projects" value={projects.length} color="indigo" />
          <StatsCard icon={Users} label="Total Users" value={users.length} color="emerald" />
          <StatsCard
            icon={Clock}
            label="Pending Requests"
            value={requests.filter((r) => r.status === 'pending').length}
            color="amber"
          />
        </div>
      )}

      {/* Projects Grid */}
      <section>
        <h2 className="mb-4 text-lg font-semibold text-slate-800">
          {isAdmin ? 'All Projects' : 'Assigned Projects'}
        </h2>
        {projects.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} isClient={!isAdmin} />
            ))}
          </div>
        ) : (
          <EmptyState
            title="No projects yet"
            description={isAdmin ? 'Create your first project to get started.' : 'You haven\'t been assigned to any projects yet.'}
          />
        )}
      </section>

      {/* Client: Request Access */}
      {!isAdmin && (
        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-lg font-semibold text-slate-800">Request Project Access</h2>
          <p className="mb-4 text-sm text-slate-500">Enter a Project ID to request access from the admin.</p>
          <form onSubmit={handleManualRequest} className="flex gap-3">
            <input
              type="text"
              value={requestProjectId}
              onChange={(e) => setRequestProjectId(e.target.value)}
              placeholder="Enter project ID"
              className="flex-1 rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-700 transition-all focus:border-indigo-300 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-100"
            />
            <button
              type="submit"
              disabled={actionLoading || !requestProjectId.trim()}
              className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 to-blue-600 px-5 py-2.5 text-sm font-medium text-white shadow-md shadow-indigo-200 transition-all hover:shadow-lg active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
            >
              <Send size={14} />
              Request
            </button>
          </form>
        </section>
      )}

      {/* Admin: Users Table */}
      {isAdmin && users.length > 0 && (
        <section>
          <h2 className="mb-4 text-lg font-semibold text-slate-800">Users</h2>
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50/50">
                  <th className="px-6 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">Username</th>
                  <th className="px-6 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">Role</th>
                  <th className="px-6 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">ID</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {users.map((u, i) => (
                  <tr key={u.id} className={`transition-colors hover:bg-slate-50 ${i % 2 === 0 ? 'bg-white' : 'bg-slate-50/30'}`}>
                    <td className="px-6 py-4 text-sm font-medium text-slate-800">{u.username}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                          u.role === 'admin' ? 'bg-indigo-100 text-indigo-700' : 'bg-emerald-100 text-emerald-700'
                        }`}
                      >
                        {u.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-xs font-mono text-slate-400">{u.id}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* Admin: Access Requests */}
      {isAdmin && (
        <section>
          <h2 className="mb-4 text-lg font-semibold text-slate-800">Access Requests</h2>
          {requests.length > 0 ? (
            <div className="space-y-3">
              {requests.map((req) => (
                <div
                  key={req.id}
                  className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:shadow-md"
                >
                  <div>
                    <p className="text-sm font-medium text-slate-800">
                      User: <span className="font-mono text-xs text-slate-500">{req.userId}</span>
                    </p>
                    <p className="mt-0.5 text-sm text-slate-500">
                      Project: <span className="font-mono text-xs">{req.projectId}</span>
                    </p>
                    <span
                      className={`mt-2 inline-flex rounded-full px-2 py-0.5 text-xs font-semibold ${
                        req.status === 'pending'
                          ? 'bg-amber-100 text-amber-700'
                          : req.status === 'approved'
                          ? 'bg-emerald-100 text-emerald-700'
                          : 'bg-red-100 text-red-700'
                      }`}
                    >
                      {req.status}
                    </span>
                  </div>
                  {req.status === 'pending' && (
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleApprove(req.id)}
                        disabled={actionLoading === req.id}
                        className="flex items-center gap-1.5 rounded-xl bg-emerald-50 px-4 py-2 text-sm font-medium text-emerald-700 transition-all hover:bg-emerald-100 active:scale-[0.98] disabled:opacity-60"
                      >
                        <CheckCircle2 size={14} />
                        Approve
                      </button>
                      <button
                        onClick={() => handleDeny(req.id)}
                        disabled={actionLoading === req.id}
                        className="flex items-center gap-1.5 rounded-xl bg-red-50 px-4 py-2 text-sm font-medium text-red-700 transition-all hover:bg-red-100 active:scale-[0.98] disabled:opacity-60"
                      >
                        <XCircle size={14} />
                        Deny
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <EmptyState title="No requests" description="No access requests to review." />
          )}
        </section>
      )}
    </div>
  );
}

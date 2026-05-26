import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar({ taskCount = 0 }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="sticky top-0 z-50 h-14 bg-background/80 backdrop-blur-xl border-b border-border">
      <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-6 lg:px-8">
        <div className="flex items-center">
          <div className="h-[28px] w-[28px] bg-accent rounded-lg flex items-center justify-center">
            <span className="text-white font-medium mono text-sm">F</span>
          </div>
          <span className="ml-3 font-semibold text-sm text-primary">Flowspace</span>
          <div className="border-l border-border h-4 mx-3" />
          <div className="mono bg-surface2 border border-border text-xs text-muted px-2 py-0.5 rounded-full">
            {taskCount} {taskCount === 1 ? 'task' : 'tasks'}
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full flex items-center justify-center font-semibold text-xs text-white" style={{ background: 'linear-gradient(135deg, #7c3aed, #3b82f6)' }}>
              {user?.email?.[0]?.toUpperCase() || 'U'}
            </div>
            <span className="text-xs text-muted hidden sm:block truncate max-w-32">{user?.email}</span>
          </div>
          <button
            type="button"
            onClick={handleLogout}
            className="rounded-lg border border-transparent px-3 py-1.5 text-xs text-muted transition-all duration-200 hover:border-border hover:text-red-400 focus:outline-none focus:ring-2 focus:ring-accentLight/50 focus:ring-offset-2 focus:ring-offset-background"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
}

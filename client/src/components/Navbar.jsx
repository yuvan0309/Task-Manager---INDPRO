import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="border-b border-gray-800 bg-gray-950/80 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <div>
          <h1 className="text-lg font-extrabold tracking-tight text-white sm:text-xl">Task Manager</h1>
          <p className="text-xs text-gray-400">Organize work with drag and drop</p>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden text-right sm:block">
            <p className="text-sm font-medium text-white">{user?.email}</p>
            <p className="text-xs text-gray-500">Signed in</p>
          </div>
          <button
            type="button"
            onClick={handleLogout}
            className="rounded-xl border border-gray-800 bg-gray-900 px-4 py-2 text-sm font-semibold text-gray-200 transition hover:border-gray-700 hover:bg-gray-800 hover:text-white focus:outline-none focus:ring-2 focus:ring-violet-500"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
}

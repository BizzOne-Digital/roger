import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { RoseApertureIcon } from '../../components/icons/Icons';

const links = [
  { to: '/admin/dashboard', label: 'Dashboard' },
  { to: '/admin/products', label: 'Products' },
  { to: '/admin/services', label: 'Services' },
  { to: '/admin/orders', label: 'Orders' },
  { to: '/admin/testimonials', label: 'Testimonials' },
];

export default function AdminSidebar() {
  const { admin, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/admin/login');
  };

  return (
    <aside className="w-64 bg-roseNoir border-r border-antiqueGold/20 flex flex-col shrink-0">
      <div className="p-6 border-b border-antiqueGold/20">
        <div className="flex items-center gap-2">
          <RoseApertureIcon className="w-8 h-8 text-antiqueGold" />
          <span className="font-display text-warmIvory text-lg">Admin</span>
        </div>
        <p className="text-warmIvory/50 text-xs mt-2">{admin?.email}</p>
      </div>

      <nav className="flex-1 p-4 space-y-1" aria-label="Admin navigation">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) =>
              `admin-sidebar-link ${isActive ? 'active' : ''}`
            }
          >
            {link.label}
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t border-antiqueGold/20 space-y-2">
        <a href="/" className="admin-sidebar-link text-sm" target="_blank" rel="noopener noreferrer">
          View Site
        </a>
        <button onClick={handleLogout} className="admin-sidebar-link w-full text-sm text-velvetRed">
          Logout
        </button>
      </div>
    </aside>
  );
}

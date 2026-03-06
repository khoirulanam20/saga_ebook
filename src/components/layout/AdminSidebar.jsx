import { NavLink, Link, useNavigate } from 'react-router-dom';
import {
    LayoutDashboard, Package, BoxSelect, Receipt, Users,
    MessageSquare, FileEdit, CreditCard, Bot, LogOut, ChevronRight, Menu
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import './AdminSidebar.css';

const menuItems = [
    { to: '/admin', icon: LayoutDashboard, label: 'Dashboard', end: true },
    { to: '/admin/products', icon: Package, label: 'Produk' },
    { to: '/admin/categories', icon: BoxSelect, label: 'Kategori' },
    { to: '/admin/transactions', icon: Receipt, label: 'Transaksi' },
    { to: '/admin/users', icon: Users, label: 'Pengguna' },
    { to: '/admin/testimonials', icon: MessageSquare, label: 'Testimoni (Soon)' },
    { to: '/admin/content', icon: FileEdit, label: 'Konten' },
    { to: '/admin/payment', icon: CreditCard, label: 'Pembayaran' },
    { to: '/admin/chatbot', icon: Bot, label: 'Chatbot AI' },
];

export default function AdminSidebar({ isCollapsed, toggleSidebar }) {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <aside className={`admin-sidebar ${isCollapsed ? 'collapsed' : ''}`}>
            <div className="admin-sidebar__header">
                <Link to="/" className="admin-sidebar__brand">
                    <span className="brand-logo">SAGA</span>
                    {!isCollapsed && <span className="brand-sub">Admin</span>}
                </Link>
                <button className="admin-sidebar__toggle" onClick={toggleSidebar}>
                    <Menu size={20} />
                </button>
            </div>

            <nav className="admin-sidebar__nav">
                {!isCollapsed && <p className="admin-sidebar__section-label">Menu Utama</p>}
                {menuItems.map(({ to, icon: Icon, label, end }) => (
                    <NavLink
                        key={to}
                        to={to}
                        end={end}
                        className={({ isActive }) => `admin-sidebar__link ${isActive ? 'active' : ''}`}
                        title={isCollapsed ? label : undefined}
                    >
                        <Icon size={18} />
                        {!isCollapsed && <span>{label}</span>}
                        {!isCollapsed && <ChevronRight size={14} className="chevron" />}
                    </NavLink>
                ))}
            </nav>

            <div className="admin-sidebar__footer">
                <div className="admin-sidebar__user">
                    <div className="user-avatar">{user?.name?.[0] || 'A'}</div>
                    {!isCollapsed && (
                        <div className="user-info">
                            <p className="user-name">{user?.name || 'Admin'}</p>
                            <p className="user-role">Administrator</p>
                        </div>
                    )}
                </div>
                {!isCollapsed && (
                    <button className="admin-sidebar__logout" onClick={handleLogout} title="Keluar">
                        <LogOut size={16} />
                    </button>
                )}
            </div>
        </aside>
    );
}

import { NavLink, Link, useNavigate } from 'react-router-dom';
import {
    LayoutDashboard, Package, BoxSelect, Receipt, Users,
    MessageSquare, FileEdit, CreditCard, Bot, LogOut, ChevronRight
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import './AdminSidebar.css';

const menuItems = [
    { to: '/admin', icon: LayoutDashboard, label: 'Dashboard', end: true },
    { to: '/admin/products', icon: Package, label: 'Produk' },
    { to: '/admin/packages', icon: BoxSelect, label: 'Paket' },
    { to: '/admin/transactions', icon: Receipt, label: 'Transaksi' },
    { to: '/admin/users', icon: Users, label: 'Pengguna' },
    { to: '/admin/testimonials', icon: MessageSquare, label: 'Testimoni' },
    { to: '/admin/content', icon: FileEdit, label: 'Konten' },
    { to: '/admin/payment', icon: CreditCard, label: 'Pembayaran' },
    { to: '/admin/chatbot', icon: Bot, label: 'Chatbot AI' },
];

export default function AdminSidebar() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <aside className="admin-sidebar">
            <div className="admin-sidebar__header">
                <Link to="/" className="admin-sidebar__brand">
                    <span className="brand-logo">SAGA</span>
                    <span className="brand-sub">Admin</span>
                </Link>
            </div>

            <nav className="admin-sidebar__nav">
                <p className="admin-sidebar__section-label">Menu Utama</p>
                {menuItems.map(({ to, icon: Icon, label, end }) => (
                    <NavLink
                        key={to}
                        to={to}
                        end={end}
                        className={({ isActive }) => `admin-sidebar__link ${isActive ? 'active' : ''}`}
                    >
                        <Icon size={18} />
                        <span>{label}</span>
                        <ChevronRight size={14} className="chevron" />
                    </NavLink>
                ))}
            </nav>

            <div className="admin-sidebar__footer">
                <div className="admin-sidebar__user">
                    <div className="user-avatar">{user?.name?.[0] || 'A'}</div>
                    <div className="user-info">
                        <p className="user-name">{user?.name || 'Admin'}</p>
                        <p className="user-role">Administrator</p>
                    </div>
                </div>
                <button className="admin-sidebar__logout" onClick={handleLogout}>
                    <LogOut size={16} />
                </button>
            </div>
        </aside>
    );
}

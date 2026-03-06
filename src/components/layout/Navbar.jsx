import { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { ShoppingCart, Menu, X, User, LogOut, LayoutDashboard, Shield } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import './Navbar.css';

export default function Navbar() {
    const { user, logout, isAdmin } = useAuth();
    const { count } = useCart();
    const navigate = useNavigate();
    const [mobileOpen, setMobileOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);

    useEffect(() => {
        const handler = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handler);
        return () => window.removeEventListener('scroll', handler);
    }, []);

    const handleLogout = () => {
        logout();
        navigate('/');
        setDropdownOpen(false);
    };

    const navLinks = [
        { to: '/', label: 'Beranda' },
        { to: '/products', label: 'Produk' },
        { to: '/about', label: 'Tentang Kami' },
        { to: '/contact', label: 'Kontak' },
    ];

    return (
        <nav className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
            <div className="navbar__inner container">
                <Link to="/" className="navbar__brand">
                    <span className="navbar__logo">SAGA</span>
                    <span className="navbar__tagline">Academy</span>
                </Link>

                <ul className="navbar__links">
                    {navLinks.map(link => (
                        <li key={link.to}>
                            <NavLink to={link.to} end={link.to === '/'} className={({ isActive }) => `navbar__link ${isActive ? 'navbar__link--active' : ''}`}>
                                {link.label}
                            </NavLink>
                        </li>
                    ))}
                </ul>

                <div className="navbar__actions">
                    {user && (
                        <Link to="/checkout" className="navbar__cart">
                            <ShoppingCart size={20} />
                            {count > 0 && <span className="navbar__cart-badge">{count}</span>}
                        </Link>
                    )}

                    {user ? (
                        <div className="navbar__user">
                            <button className="navbar__avatar" onClick={() => setDropdownOpen(!dropdownOpen)}>
                                <div className="avatar-circle">{user.name[0]}</div>
                            </button>
                            {dropdownOpen && (
                                <div className="navbar__dropdown">
                                    <div className="navbar__dropdown-header">
                                        <p className="dropdown-name">{user.name}</p>
                                        <p className="dropdown-email">{user.email}</p>
                                    </div>
                                    <div className="navbar__dropdown-divider" />
                                    {isAdmin ? (
                                        <Link to="/admin" className="navbar__dropdown-item" onClick={() => setDropdownOpen(false)}>
                                            <Shield size={15} /> Dashboard Admin
                                        </Link>
                                    ) : (
                                        <Link to="/dashboard" className="navbar__dropdown-item" onClick={() => setDropdownOpen(false)}>
                                            <LayoutDashboard size={15} /> Dashboard Saya
                                        </Link>
                                    )}
                                    <Link to="/dashboard/edit-profile" className="navbar__dropdown-item" onClick={() => setDropdownOpen(false)}>
                                        <User size={15} /> Edit Profil
                                    </Link>
                                    <button className="navbar__dropdown-item navbar__dropdown-item--danger" onClick={handleLogout}>
                                        <LogOut size={15} /> Keluar
                                    </button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="navbar__auth">
                            <Link to="/login" className="btn-ghost-sm">Masuk</Link>
                            <Link to="/register" className="btn-primary-sm">Daftar</Link>
                        </div>
                    )}

                    <button className="navbar__mobile-toggle" onClick={() => setMobileOpen(!mobileOpen)}>
                        {mobileOpen ? <X size={22} /> : <Menu size={22} />}
                    </button>
                </div>
            </div>

            {mobileOpen && (
                <div className="navbar__mobile">
                    {navLinks.map(link => (
                        <NavLink key={link.to} to={link.to} end={link.to === '/'} className={({ isActive }) => `navbar__mobile-link ${isActive ? 'active' : ''}`} onClick={() => setMobileOpen(false)}>
                            {link.label}
                        </NavLink>
                    ))}
                    {!user && (
                        <div className="navbar__mobile-auth">
                            <Link to="/login" className="btn-ghost-sm" onClick={() => setMobileOpen(false)}>Masuk</Link>
                            <Link to="/register" className="btn-primary-sm" onClick={() => setMobileOpen(false)}>Daftar</Link>
                        </div>
                    )}
                </div>
            )}
        </nav>
    );
}

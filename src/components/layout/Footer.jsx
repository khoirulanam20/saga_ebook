import { Link } from 'react-router-dom';
import { Instagram, Youtube, Twitter, Mail, Phone, MapPin, ArrowRight, Zap } from 'lucide-react';
import './Footer.css';

const productLinks = [
    { label: 'Ebook Digital', to: '/products', state: { category: 'ebook' } },
    { label: 'Video Kelas', to: '/products', state: { category: 'video' } },
    { label: 'Webinar Live', to: '/products', state: { category: 'webinar' } },
    { label: 'Kelas Offline', to: '/products', state: { category: 'offline' } },
];

const companyLinks = [
    { label: 'Tentang Kami', to: '/about' },
    { label: 'Testimoni', to: '/testimonials' },
    { label: 'Kontak', to: '/contact' },
];

const socialLinks = [
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Youtube, href: '#', label: 'YouTube' },
    { icon: Twitter, href: '#', label: 'Twitter/X' },
];

const contactItems = [
    { icon: Mail, text: 'hello@sagaacademy.id' },
    { icon: Phone, text: '+62 812-3456-7890' },
    { icon: MapPin, text: 'Jakarta Selatan, Indonesia' },
];

export default function Footer() {
    return (
        <footer className="footer">
            {/* Red accent bar at top */}
            <div className="footer__accent-bar" />

            <div className="container">
                {/* Main grid */}
                <div className="footer__grid">
                    {/* Brand column */}
                    <div className="footer__brand">
                        <Link to="/" className="footer__logo">
                            <span className="footer-logo-saga">SAGA</span>
                            <span className="footer-logo-academy">Academy</span>
                        </Link>
                        <p className="footer__tagline">
                            Platform pembelajaran digital terpercaya untuk akselerasi karir dan bisnis Anda di era modern.
                        </p>

                        {/* Newsletter mini */}
                        <div className="footer__newsletter">
                            <p className="newsletter-label">Dapatkan tips gratis setiap minggu</p>
                            <div className="newsletter-row">
                                <input type="email" placeholder="Email kamu..." className="newsletter-input" />
                                <button className="newsletter-btn"><ArrowRight size={16} /></button>
                            </div>
                        </div>

                        {/* Socials */}
                        <div className="footer__socials">
                            {socialLinks.map(({ icon: Icon, href, label }) => (
                                <a key={label} href={href} className="footer-social" aria-label={label} target="_blank" rel="noreferrer">
                                    <Icon size={17} />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Produk */}
                    <div className="footer__col">
                        <h4 className="footer__col-title">Produk</h4>
                        <ul className="footer__col-links">
                            {productLinks.map(({ label, to, state }) => (
                                <li key={label}>
                                    <Link to={to} state={state}>{label}</Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Perusahaan */}
                    <div className="footer__col">
                        <h4 className="footer__col-title">Perusahaan</h4>
                        <ul className="footer__col-links">
                            {companyLinks.map(({ label, to }) => (
                                <li key={label}>
                                    <Link to={to}>{label}</Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Kontak */}
                    <div className="footer__col">
                        <h4 className="footer__col-title">Kontak</h4>
                        <ul className="footer__contact-list">
                            {contactItems.map(({ icon: Icon, text }) => (
                                <li key={text}>
                                    <Icon size={14} className="contact-icon" />
                                    <span>{text}</span>
                                </li>
                            ))}
                        </ul>
                        <Link to="/products" className="footer__cta-btn">
                            <Zap size={14} /> Mulai Belajar Sekarang
                        </Link>
                    </div>
                </div>

                {/* Bottom bar */}
                <div className="footer__bottom">
                    <p>© 2025 SAGA Academy. All rights reserved. Made with ❤️ in Indonesia.</p>
                    <div className="footer__legal">
                        <a href="#">Kebijakan Privasi</a>
                        <span className="footer-divider-dot">·</span>
                        <a href="#">Syarat & Ketentuan</a>
                        <span className="footer-divider-dot">·</span>
                        <a href="#">Cookie</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}

import { useState } from 'react';
import { Mail, Phone, MapPin, MessageCircle, Send } from 'lucide-react';
import toast from 'react-hot-toast';
import { useContent } from '../../context/ContentContext';
import './Contact.css';

export default function Contact() {
    const { content } = useContent();
    const { contact } = content;
    const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });

    const handleSubmit = (e) => {
        e.preventDefault();
        toast.success('Pesan berhasil dikirim! Kami akan menghubungi Anda segera.');
        setForm({ name: '', email: '', subject: '', message: '' });
    };

    return (
        <div className="contact-page">
            <div className="contact-header">
                <div className="container">
                    <p className="section-label">Hubungi Kami</p>
                    <h1 className="contact-title">{contact.title}</h1>
                    <p className="contact-subtitle">{contact.subtitle}</p>
                </div>
            </div>

            <div className="container contact-main">
                <div className="contact-layout">
                    {/* Info */}
                    <div className="contact-info">
                        <h2 className="info-title">Informasi Kontak</h2>
                        <div className="contact-cards">
                            {[
                                { icon: Mail, label: 'Email', value: contact.email, href: `mailto:${contact.email}` },
                                { icon: Phone, label: 'Telepon / WhatsApp', value: contact.phone, href: `https://wa.me/${contact.phone.replace(/[^0-9]/g, '')}` },
                                { icon: MapPin, label: 'Alamat', value: contact.address, href: null },
                            ].map(({ icon: Icon, label, value, href }) => (
                                <div key={label} className="contact-info-card">
                                    <div className="contact-icon"><Icon size={20} /></div>
                                    <div>
                                        <p className="contact-label">{label}</p>
                                        {href ? (
                                            <a href={href} className="contact-value-link" target="_blank" rel="noreferrer">{value}</a>
                                        ) : (
                                            <p className="contact-value">{value}</p>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>

                        <a href={`https://wa.me/${contact.phone.replace(/[^0-9]/g, '')}`} className="whatsapp-btn" target="_blank" rel="noreferrer">
                            <MessageCircle size={20} />
                            Chat di WhatsApp Sekarang
                        </a>
                    </div>

                    {/* Form */}
                    <div className="contact-form-wrap">
                        <h2 className="info-title">Kirim Pesan</h2>
                        <form className="contact-form" onSubmit={handleSubmit}>
                            <div className="form-row">
                                <div className="form-group">
                                    <label>Nama Lengkap</label>
                                    <input className="form-input" placeholder="Nama Anda" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required />
                                </div>
                                <div className="form-group">
                                    <label>Email</label>
                                    <input className="form-input" type="email" placeholder="email@example.com" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} required />
                                </div>
                            </div>
                            <div className="form-group">
                                <label>Subjek</label>
                                <input className="form-input" placeholder="Tentang apa pesan Anda?" value={form.subject} onChange={e => setForm({ ...form, subject: e.target.value })} required />
                            </div>
                            <div className="form-group">
                                <label>Pesan</label>
                                <textarea className="form-input form-textarea" rows={5} placeholder="Tuliskan pesan Anda di sini..." value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} required />
                                <button type="submit" className="btn-hero-primary" style={{ alignSelf: 'flex-start', marginTop: 'var(--space-4)' }}>
                                    <Send size={17} /> Kirim Pesan
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

import { useState } from 'react';
import { Mail, Phone, MapPin, MessageCircle, Send } from 'lucide-react';
import toast from 'react-hot-toast';
import './Contact.css';

export default function Contact() {
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
                    <h1 className="contact-title">Ada Pertanyaan? <span className="text-gradient">Kami Siap Membantu</span></h1>
                    <p className="contact-subtitle">Tim kami selalu siap membantu Anda 24/7. Jangan ragu untuk menghubungi kami.</p>
                </div>
            </div>

            <div className="container contact-main">
                <div className="contact-layout">
                    {/* Info */}
                    <div className="contact-info">
                        <h2 className="info-title">Informasi Kontak</h2>
                        <div className="contact-cards">
                            {[
                                { icon: Mail, label: 'Email', value: 'hello@sagaacademy.id', href: 'mailto:hello@sagaacademy.id' },
                                { icon: Phone, label: 'WhatsApp', value: '+62 812-3456-7890', href: 'https://wa.me/628123456789' },
                                { icon: MapPin, label: 'Alamat', value: 'Jl. Sudirman No. 123, Jakarta Selatan, DKI Jakarta 12190', href: null },
                            ].map(({ icon: Icon, label, value, href }) => (
                                <div key={label} className="contact-info-card">
                                    <div className="contact-icon"><Icon size={20} /></div>
                                    <div>
                                        <p className="contact-label">{label}</p>
                                        {href ? (
                                            <a href={href} className="contact-value-link">{value}</a>
                                        ) : (
                                            <p className="contact-value">{value}</p>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>

                        <a href="https://wa.me/628123456789" className="whatsapp-btn" target="_blank" rel="noreferrer">
                            <MessageCircle size={20} />
                            Chat di WhatsApp Sekarang
                        </a>

                        {/* Map placeholder */}
                        <div className="map-placeholder">
                            <div className="map-content">
                                <MapPin size={40} />
                                <p>Jakarta Selatan, Indonesia</p>
                                <a href="https://maps.google.com" target="_blank" rel="noreferrer" className="map-link">Buka di Google Maps →</a>
                            </div>
                        </div>
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
                            </div>
                            <button type="submit" className="btn-hero-primary" style={{ alignSelf: 'flex-start' }}>
                                <Send size={17} /> Kirim Pesan
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

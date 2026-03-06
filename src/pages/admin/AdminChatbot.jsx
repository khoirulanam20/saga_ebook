import { Bot, Clock } from 'lucide-react';
import './Admin.css';

export default function AdminChatbot() {
    return (
        <div className="admin-page">
            <div className="admin-page-header">
                <h1>Manajemen Chatbot AI</h1>
                <p className="admin-page-subtitle">Konfigurasi respons dan monitor percakapan chatbot</p>
            </div>

            <div className="admin-table-card" style={{ padding: 'var(--space-12) var(--space-6)', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '50vh' }}>
                <div style={{ padding: 'var(--space-5)', borderRadius: '50%', background: 'var(--color-accent)10', marginBottom: 'var(--space-6)', display: 'inline-flex' }}>
                    <Bot size={56} color="var(--color-accent)" />
                </div>

                <h2 style={{ fontSize: 'var(--text-2xl)', fontWeight: 700, marginBottom: 'var(--space-3)', color: 'var(--color-text)' }}>
                    Segera Hadir
                </h2>

                <p style={{ fontSize: 'var(--text-lg)', color: 'var(--color-text-secondary)', maxWidth: 600, lineHeight: 1.6, marginBottom: 'var(--space-8)' }}>
                    Fitur manajemen cerdas Asisten AI SAGA Academy saat ini sedang dalam tahap pengembangan intensif. Nantinya, Anda dapat mengatur respons otomatis dan memonitor seluruh percakapan pelanggan di sini.
                </p>

                <div style={{ display: 'inline-flex', alignItems: 'center', gap: 'var(--space-2)', padding: 'var(--space-3) var(--space-6)', background: 'var(--color-bg-card)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-full)', color: 'var(--color-text-muted)', fontWeight: 500 }}>
                    <Clock size={18} />
                    <span>Nantikan pembaruan berikutnya! 🚀</span>
                </div>
            </div>
        </div>
    );
}

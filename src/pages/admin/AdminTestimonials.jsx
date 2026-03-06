import { Hammer } from 'lucide-react';
import './Admin.css';

export default function AdminTestimonials() {
    return (
        <div className="admin-page" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '70vh', textAlign: 'center' }}>
            <div style={{ background: 'var(--color-bg-secondary)', padding: 'var(--space-6)', borderRadius: '50%', marginBottom: 'var(--space-6)' }}>
                <Hammer size={64} color="var(--color-text-muted)" />
            </div>
            <h1 style={{ fontSize: 'var(--text-3xl)', marginBottom: 'var(--space-3)' }}>Coming Soon</h1>
            <p style={{ color: 'var(--color-text-secondary)', maxWidth: 400, lineHeight: 1.6 }}>Fitur Manajemen Testimoni saat ini sedang dalam tahap pengembangan dan akan segera hadir.</p>
        </div>
    );
}

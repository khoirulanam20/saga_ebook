import { useState } from 'react';
import { Save, Bot, MessageSquare, Plus, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';
import './Admin.css';

const defaultResponses = [
    { id: 1, trigger: 'produk', response: 'Kami memiliki Ebook, Video Kelas, Webinar, dan Kelas Offline.' },
    { id: 2, trigger: 'harga', response: 'Harga produk mulai dari Rp99.000. Ada juga paket bundling yang lebih hemat!' },
    { id: 3, trigger: 'beli', response: 'Pilih produk → klik Beli → pilih pembayaran → akses langsung tersedia!' },
    { id: 4, trigger: 'kontak', response: 'Email: hello@sagaacademy.id | WA: 0812-3456-7890' },
];

const chatLogs = [
    { id: 1, user: 'Anonim', message: 'Berapa harga ebook strategi bisnis?', time: '10:24', reply: 'Harga produk mulai dari Rp99.000...' },
    { id: 2, user: 'Budi S.', message: 'Ada promo tidak?', time: '10:30', reply: 'Saat ini ada diskon hingga 50% untuk semua paket...' },
    { id: 3, user: 'Anonim', message: 'Cara beli video kelas', time: '11:05', reply: 'Pilih produk → klik Beli → pilih pembayaran...' },
];

export default function AdminChatbot() {
    const [responses, setResponses] = useState(defaultResponses);
    const [activeTab, setActiveTab] = useState('responses');
    const [newTrigger, setNewTrigger] = useState('');
    const [newResponse, setNewResponse] = useState('');

    const addResponse = () => {
        if (!newTrigger || !newResponse) return;
        setResponses(prev => [...prev, { id: Date.now(), trigger: newTrigger, response: newResponse }]);
        setNewTrigger('');
        setNewResponse('');
        toast.success('Respons ditambahkan');
    };

    return (
        <div className="admin-page">
            <div className="admin-page-header">
                <h1>Manajemen Chatbot AI</h1>
                <p className="admin-page-subtitle">Konfigurasi respons dan monitor percakapan chatbot</p>
            </div>

            <div style={{ display: 'flex', gap: 'var(--space-2)', marginBottom: 'var(--space-4)' }}>
                {['responses', 'logs'].map(tab => (
                    <button key={tab} onClick={() => setActiveTab(tab)} style={{ padding: 'var(--space-2) var(--space-5)', borderRadius: 'var(--radius-full)', fontSize: 'var(--text-sm)', fontWeight: 600, background: activeTab === tab ? 'var(--gradient-accent)' : 'var(--color-bg-card)', color: activeTab === tab ? 'white' : 'var(--color-text-secondary)', border: '1px solid var(--color-border)', cursor: 'pointer', transition: 'all 0.2s' }}>
                        {tab === 'responses' ? '🤖 Respons' : '💬 Log Percakapan'}
                    </button>
                ))}
            </div>

            {activeTab === 'responses' && (
                <>
                    <div className="admin-table-card">
                        <div className="admin-table-header">
                            <h3>Konfigurasi Respons Otomatis</h3>
                        </div>
                        <div className="admin-table-wrap">
                            <table className="admin-table">
                                <thead><tr><th>Trigger Kata</th><th>Respons Bot</th><th>Aksi</th></tr></thead>
                                <tbody>
                                    {responses.map(r => (
                                        <tr key={r.id}>
                                            <td><span className="badge badge-accent">{r.trigger}</span></td>
                                            <td style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)', maxWidth: 400 }}>{r.response}</td>
                                            <td><button className="btn-icon delete" onClick={() => setResponses(prev => prev.filter(x => x.id !== r.id))}><Trash2 size={15} /></button></td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="admin-table-card" style={{ padding: 'var(--space-5)' }}>
                        <h3 style={{ fontWeight: 600, marginBottom: 'var(--space-4)' }}>Tambah Respons Baru</h3>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr auto', gap: 'var(--space-3)', alignItems: 'flex-start' }}>
                            <div>
                                <label style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', display: 'block', marginBottom: 6 }}>Trigger Kata Kunci</label>
                                <input value={newTrigger} onChange={e => setNewTrigger(e.target.value)} placeholder="contoh: promo, sertifikat" style={{ width: '100%', padding: 'var(--space-3) var(--space-4)', background: 'var(--color-bg)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', color: 'var(--color-text-primary)', fontSize: 'var(--text-sm)', outline: 'none' }} />
                            </div>
                            <div>
                                <label style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', display: 'block', marginBottom: 6 }}>Respons Bot</label>
                                <input value={newResponse} onChange={e => setNewResponse(e.target.value)} placeholder="Tulis respons chatbot di sini..." style={{ width: '100%', padding: 'var(--space-3) var(--space-4)', background: 'var(--color-bg)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', color: 'var(--color-text-primary)', fontSize: 'var(--text-sm)', outline: 'none' }} />
                            </div>
                            <div style={{ paddingTop: 22 }}>
                                <button className="btn-admin-primary" onClick={addResponse}><Plus size={15} /> Tambah</button>
                            </div>
                        </div>
                    </div>
                </>
            )}

            {activeTab === 'logs' && (
                <div className="admin-table-card">
                    <div className="admin-table-header"><h3>Riwayat Percakapan</h3></div>
                    <div className="admin-table-wrap">
                        <table className="admin-table">
                            <thead><tr><th>Pengguna</th><th>Pesan</th><th>Balasan Bot</th><th>Waktu</th></tr></thead>
                            <tbody>
                                {chatLogs.map(log => (
                                    <tr key={log.id}>
                                        <td style={{ fontWeight: 500 }}>{log.user}</td>
                                        <td style={{ fontSize: 'var(--text-sm)' }}>{log.message}</td>
                                        <td style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)', maxWidth: 300 }}>{log.reply}</td>
                                        <td className="text-muted">{log.time}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
}

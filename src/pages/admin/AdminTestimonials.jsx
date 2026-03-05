import { useState } from 'react';
import { Plus, Pencil, Trash2, Eye, EyeOff, X } from 'lucide-react';
import { testimonials as initialTestis } from '../../data/testimonials';
import './Admin.css';

export default function AdminTestimonials() {
    const [items, setItems] = useState(initialTestis.map(t => ({ ...t, visible: true })));
    const [modal, setModal] = useState(false);
    const [form, setForm] = useState({ name: '', role: '', text: '', rating: 5 });

    const handleAdd = () => {
        if (!form.name || !form.text) return;
        setItems(prev => [...prev, { ...form, id: Date.now(), verified: false, visible: true, date: new Date().toISOString().split('T')[0] }]);
        setModal(false);
        setForm({ name: '', role: '', text: '', rating: 5 });
    };

    const toggleVisible = (id) => setItems(prev => prev.map(t => t.id === id ? { ...t, visible: !t.visible } : t));
    const handleDelete = (id) => setItems(prev => prev.filter(t => t.id !== id));

    return (
        <div className="admin-page">
            <div className="admin-page-header">
                <h1>Manajemen Testimoni</h1>
                <p className="admin-page-subtitle">Kelola testimoni yang tampil di website</p>
            </div>
            <div className="admin-controls">
                <div />
                <button className="btn-admin-primary" onClick={() => setModal(true)}><Plus size={16} /> Tambah Testimoni</button>
            </div>
            <div className="admin-table-card">
                <div className="admin-table-wrap">
                    <table className="admin-table">
                        <thead><tr><th>Pelanggan</th><th>Ulasan</th><th>Rating</th><th>Tanggal</th><th>Ditampilkan</th><th>Aksi</th></tr></thead>
                        <tbody>
                            {items.map(t => (
                                <tr key={t.id}>
                                    <td>
                                        <div>
                                            <p style={{ fontWeight: 500 }}>{t.name}</p>
                                            <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)' }}>{t.role}</p>
                                        </div>
                                    </td>
                                    <td style={{ maxWidth: 280 }}><p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)', overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>{t.text}</p></td>
                                    <td>{'⭐'.repeat(t.rating)}</td>
                                    <td className="text-muted">{t.date}</td>
                                    <td><span className={`status-badge ${t.visible ? 'success' : 'error'}`}>{t.visible ? 'Tampil' : 'Disembunyi'}</span></td>
                                    <td>
                                        <div className="actions-col">
                                            <button className="btn-icon" onClick={() => toggleVisible(t.id)}>{t.visible ? <EyeOff size={15} /> : <Eye size={15} />}</button>
                                            <button className="btn-icon delete" onClick={() => handleDelete(t.id)}><Trash2 size={15} /></button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            {modal && (
                <div className="modal-overlay" onClick={() => setModal(false)}>
                    <div className="modal" onClick={e => e.stopPropagation()}>
                        <div className="modal-header">
                            <h3 className="modal-title">Tambah Testimoni</h3>
                            <button className="btn-icon" onClick={() => setModal(false)}><X size={18} /></button>
                        </div>
                        <div className="modal-form">
                            <div className="form-group"><label>Nama</label><input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Nama pelanggan" /></div>
                            <div className="form-group"><label>Role</label><input value={form.role} onChange={e => setForm({ ...form, role: e.target.value })} placeholder="contoh: Freelancer, CEO" /></div>
                            <div className="form-group"><label>Rating</label>
                                <select value={form.rating} onChange={e => setForm({ ...form, rating: Number(e.target.value) })}>
                                    {[5, 4, 3, 2, 1].map(r => <option key={r} value={r}>{r} ⭐</option>)}
                                </select>
                            </div>
                            <div className="form-group"><label>Ulasan</label><textarea value={form.text} onChange={e => setForm({ ...form, text: e.target.value })} placeholder="Tulis ulasan..." /></div>
                        </div>
                        <div className="modal-actions">
                            <button className="btn-modal-cancel" onClick={() => setModal(false)}>Batal</button>
                            <button className="btn-modal-save" onClick={handleAdd}>Simpan</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

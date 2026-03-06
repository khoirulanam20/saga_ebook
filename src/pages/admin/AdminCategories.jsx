import { useState } from 'react';
import { Plus, Search, Pencil, Trash2, FolderOpen } from 'lucide-react';
import { categoriesData } from '../../data/categories';
import toast from 'react-hot-toast';
import './Admin.css';

export default function AdminCategories() {
    const [items, setItems] = useState(categoriesData);
    const [search, setSearch] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [deleteConfirm, setDeleteConfirm] = useState(null);
    const [editingItem, setEditingItem] = useState(null);

    // Form state
    const [form, setForm] = useState({ id: '', label: '', desc: '', image: '' });

    const filtered = items.filter(c => c.label.toLowerCase().includes(search.toLowerCase()) || c.id.toLowerCase().includes(search.toLowerCase()));

    const openAdd = () => {
        setEditingItem(null);
        setForm({ id: '', label: '', desc: '', image: '' });
        setIsModalOpen(true);
    };

    const openEdit = (c) => {
        setEditingItem(c);
        setForm({ id: c.id, label: c.label, desc: c.desc, image: c.image });
        setIsModalOpen(true);
    };

    const confirmDelete = (id) => setDeleteConfirm(id);
    const handleDelete = () => {
        setItems(prev => prev.filter(c => c.id !== deleteConfirm));
        setDeleteConfirm(null);
        toast.success('Kategori dihapus');
    };

    const handleSave = (e) => {
        e.preventDefault();
        if (!form.id || !form.label || !form.desc || !form.image) {
            toast.error('Semua kolom harus diisi');
            return;
        }

        if (editingItem) {
            setItems(prev => prev.map(c => c.id === editingItem.id ? form : c));
            toast.success('Kategori berhasil diperbarui');
        } else {
            // Check if ID already exists
            if (items.some(c => c.id === form.id)) {
                toast.error('ID Kategori sudah digunakan');
                return;
            }
            setItems(prev => [...prev, form]);
            toast.success('Kategori berhasil ditambahkan');
        }
        setIsModalOpen(false);
    };

    return (
        <div className="admin-page">
            <div className="admin-page-header">
                <h1>Master Kategori</h1>
                <p className="admin-page-subtitle">Kelola kategori produk dan tampilan konten kategori</p>
            </div>

            <div className="admin-controls">
                <div className="admin-search-wrap">
                    <Search size={15} className="admin-search-icon" />
                    <input placeholder="Cari kategori..." value={search} onChange={e => setSearch(e.target.value)} />
                </div>
                <button className="btn-admin-primary" onClick={openAdd}><Plus size={16} /> Tambah Kategori</button>
            </div>

            <div className="admin-table-card">
                <div className="admin-table-wrap">
                    <table className="admin-table">
                        <thead>
                            <tr>
                                <th>Kategori</th>
                                <th>ID Slug</th>
                                <th>Deskripsi</th>
                                <th>Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filtered.map(c => (
                                <tr key={c.id}>
                                    <td>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                                            <div style={{ width: 48, height: 48, borderRadius: 8, overflow: 'hidden', flexShrink: 0, background: 'var(--color-bg-secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                {c.image ? (
                                                    <img src={c.image} alt={c.label} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                                ) : (
                                                    <FolderOpen size={20} color="var(--color-text-muted)" />
                                                )}
                                            </div>
                                            <span style={{ fontWeight: 500 }}>{c.label}</span>
                                        </div>
                                    </td>
                                    <td><span className="badge-cat" style={{ background: 'var(--color-bg-secondary)', color: 'var(--color-text-secondary)' }}>{c.id}</span></td>
                                    <td style={{ maxWidth: 300 }}>
                                        <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                            {c.desc}
                                        </p>
                                    </td>
                                    <td>
                                        <div className="actions-col">
                                            <button className="btn-icon edit" onClick={() => openEdit(c)} title="Edit"><Pencil size={15} /></button>
                                            <button className="btn-icon delete" onClick={() => confirmDelete(c.id)} title="Hapus"><Trash2 size={15} /></button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div style={{ padding: 'var(--space-4) var(--space-6)', borderTop: '1px solid var(--color-border)', fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)' }}>
                    {filtered.length} kategori ditampilkan
                </div>
            </div>

            {/* Modal Form */}
            {isModalOpen && (
                <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
                    <div className="modal" style={{ maxWidth: 500 }} onClick={e => e.stopPropagation()}>
                        <div className="modal-header">
                            <h3 className="modal-title">{editingItem ? 'Edit Kategori' : 'Tambah Kategori'}</h3>
                            <button className="modal-close" onClick={() => setIsModalOpen(false)}>&times;</button>
                        </div>
                        <form onSubmit={handleSave}>
                            <div className="modal-body" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
                                <div className="form-group">
                                    <label>ID Kategori (Slug)</label>
                                    <input
                                        type="text"
                                        className="form-input"
                                        value={form.id}
                                        onChange={e => setForm({ ...form, id: e.target.value })}
                                        placeholder="cth: ebook"
                                        disabled={!!editingItem} // ID can't be changed when editing
                                        required
                                    />
                                    <span style={{ fontSize: '12px', color: 'var(--color-text-muted)' }}>Huruf kecil, tanpa spasi. Digunakan untuk filter URL.</span>
                                </div>
                                <div className="form-group">
                                    <label>Judul Kategori</label>
                                    <input
                                        type="text"
                                        className="form-input"
                                        value={form.label}
                                        onChange={e => setForm({ ...form, label: e.target.value })}
                                        placeholder="cth: Ebook & Modul"
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Deskripsi Singkat</label>
                                    <textarea
                                        className="form-input"
                                        value={form.desc}
                                        onChange={e => setForm({ ...form, desc: e.target.value })}
                                        placeholder="Deskripsi singkat yang muncul di card"
                                        rows={3}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>URL Gambar Kategori</label>
                                    <input
                                        type="url"
                                        className="form-input"
                                        value={form.image}
                                        onChange={e => setForm({ ...form, image: e.target.value })}
                                        placeholder="https://..."
                                        required
                                    />
                                    {form.image && (
                                        <div style={{ marginTop: 'var(--space-3)', width: 100, height: 75, borderRadius: 'var(--radius-md)', overflow: 'hidden', border: '1px solid var(--color-border)' }}>
                                            <img src={form.image} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={(e) => { e.target.style.display = 'none'; }} />
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="modal-actions">
                                <button type="button" className="btn-modal-cancel" onClick={() => setIsModalOpen(false)}>Batal</button>
                                <button type="submit" className="btn-modal-save">Simpan Kategori</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Delete Confirm */}
            {deleteConfirm && (
                <div className="modal-overlay" onClick={() => setDeleteConfirm(null)}>
                    <div className="modal" style={{ maxWidth: 400 }} onClick={e => e.stopPropagation()}>
                        <div className="delete-confirm-icon">🗑️</div>
                        <h3 className="modal-title" style={{ textAlign: 'center' }}>Hapus Kategori?</h3>
                        <p style={{ textAlign: 'center', color: 'var(--color-text-secondary)', fontSize: 'var(--text-sm)', marginTop: 'var(--space-2)' }}>
                            Tindakan ini tidak dapat dibatalkan. Kategori ini akan terhapus dari opsi pemilihan produk.
                        </p>
                        <div className="modal-actions" style={{ justifyContent: 'center', marginTop: 'var(--space-4)' }}>
                            <button className="btn-modal-cancel" onClick={() => setDeleteConfirm(null)}>Batal</button>
                            <button className="btn-modal-save" style={{ background: 'var(--color-error)' }} onClick={handleDelete}>Ya, Hapus</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

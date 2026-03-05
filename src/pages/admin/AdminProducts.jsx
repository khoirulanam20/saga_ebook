import { useState, useRef } from 'react';
import { Plus, Search, Pencil, Trash2, X, Upload, ImageIcon } from 'lucide-react';
import { products as initialProducts } from '../../data/products';
import { formatCurrency, getCategoryLabel } from '../../utils/helpers';
import toast from 'react-hot-toast';
import './Admin.css';

const emptyForm = { title: '', category: 'ebook', price: '', originalPrice: '', description: '', badge: '', imageUrl: '', imageFile: null, imagePreview: '' };

export default function AdminProducts() {
    const [items, setItems] = useState(initialProducts);
    const [search, setSearch] = useState('');
    const [modal, setModal] = useState(false);
    const [form, setForm] = useState(emptyForm);
    const [editId, setEditId] = useState(null);
    const [deleteConfirm, setDeleteConfirm] = useState(null);
    const [dragOver, setDragOver] = useState(false);
    const fileInputRef = useRef(null);

    const filtered = items.filter(p => p.title.toLowerCase().includes(search.toLowerCase()));

    const openAdd = () => { setForm(emptyForm); setEditId(null); setModal(true); };
    const openEdit = (p) => {
        setForm({ title: p.title, category: p.category, price: p.price, originalPrice: p.originalPrice, description: p.description, badge: p.badge || '', imageUrl: p.thumbnail, imageFile: null, imagePreview: p.thumbnail });
        setEditId(p.id);
        setModal(true);
    };

    const handleImageFile = (file) => {
        if (!file) return;
        if (!file.type.startsWith('image/')) return toast.error('File harus berupa gambar');
        if (file.size > 2 * 1024 * 1024) return toast.error('Ukuran file maks 2MB');
        const preview = URL.createObjectURL(file);
        setForm(prev => ({ ...prev, imageFile: file, imagePreview: preview }));
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setDragOver(false);
        handleImageFile(e.dataTransfer.files[0]);
    };

    const handleSave = () => {
        if (!form.title || !form.price) return toast.error('Lengkapi data produk');
        const thumbnail = form.imagePreview || form.imageUrl || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&q=80';
        if (editId) {
            setItems(prev => prev.map(p => p.id === editId ? { ...p, ...form, price: Number(form.price), originalPrice: Number(form.originalPrice), thumbnail } : p));
            toast.success('Produk diperbarui');
        } else {
            setItems(prev => [...prev, { ...form, id: Date.now(), price: Number(form.price), originalPrice: Number(form.originalPrice), thumbnail, rating: 0, totalRatings: 0, sold: 0, featured: false, tags: [] }]);
            toast.success('Produk ditambahkan');
        }
        setModal(false);
    };

    const confirmDelete = (id) => setDeleteConfirm(id);
    const handleDelete = () => {
        setItems(prev => prev.filter(p => p.id !== deleteConfirm));
        setDeleteConfirm(null);
        toast.success('Produk dihapus');
    };

    return (
        <div className="admin-page">
            <div className="admin-page-header">
                <h1>Manajemen Produk</h1>
                <p className="admin-page-subtitle">Kelola semua produk yang tersedia di platform</p>
            </div>

            <div className="admin-controls">
                <div className="admin-search-wrap">
                    <Search size={15} className="admin-search-icon" />
                    <input placeholder="Cari produk..." value={search} onChange={e => setSearch(e.target.value)} />
                </div>
                <button className="btn-admin-primary" onClick={openAdd}><Plus size={16} /> Tambah Produk</button>
            </div>

            <div className="admin-table-card">
                <div className="admin-table-wrap">
                    <table className="admin-table">
                        <thead>
                            <tr><th>Produk</th><th>Kategori</th><th>Harga</th><th>Terjual</th><th>Rating</th><th>Aksi</th></tr>
                        </thead>
                        <tbody>
                            {filtered.map(p => (
                                <tr key={p.id}>
                                    <td>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                                            <div style={{ width: 48, height: 36, borderRadius: 8, overflow: 'hidden', flexShrink: 0, background: 'var(--color-bg-secondary)' }}>
                                                <img src={p.thumbnail} alt={p.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                            </div>
                                            <span style={{ fontWeight: 500 }}>{p.title}</span>
                                        </div>
                                    </td>
                                    <td><span className="badge-cat">{getCategoryLabel(p.category)}</span></td>
                                    <td>{formatCurrency(p.price)}</td>
                                    <td>{p.sold}</td>
                                    <td>⭐ {p.rating}</td>
                                    <td>
                                        <div className="actions-col">
                                            <button className="btn-icon edit" onClick={() => openEdit(p)} title="Edit"><Pencil size={15} /></button>
                                            <button className="btn-icon delete" onClick={() => confirmDelete(p.id)} title="Hapus"><Trash2 size={15} /></button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div style={{ padding: 'var(--space-4) var(--space-6)', borderTop: '1px solid var(--color-border)', fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)' }}>
                    {filtered.length} produk ditampilkan
                </div>
            </div>

            {/* Add/Edit Modal */}
            {modal && (
                <div className="modal-overlay" onClick={() => setModal(false)}>
                    <div className="modal modal-wide" onClick={e => e.stopPropagation()}>
                        <div className="modal-header">
                            <h3 className="modal-title">{editId ? 'Edit Produk' : 'Tambah Produk Baru'}</h3>
                            <button className="btn-icon" onClick={() => setModal(false)}><X size={18} /></button>
                        </div>

                        {/* Image upload zone */}
                        <div
                            className={`image-upload-zone ${dragOver ? 'drag-over' : ''}`}
                            onDragOver={e => { e.preventDefault(); setDragOver(true); }}
                            onDragLeave={() => setDragOver(false)}
                            onDrop={handleDrop}
                            onClick={() => fileInputRef.current?.click()}
                        >
                            {form.imagePreview ? (
                                <div className="image-preview-wrap">
                                    <img src={form.imagePreview} alt="Preview" className="image-preview" />
                                    <button className="image-remove-btn" onClick={e => { e.stopPropagation(); setForm(prev => ({ ...prev, imageFile: null, imagePreview: '', imageUrl: '' })); }}>
                                        <X size={14} />
                                    </button>
                                </div>
                            ) : (
                                <div className="upload-placeholder">
                                    <Upload size={28} />
                                    <p>Drag & drop atau <span>klik untuk upload</span> gambar produk</p>
                                    <p className="upload-hint">PNG, JPG, WebP · Maks 2MB · Rasio 16:9 direkomendasikan</p>
                                </div>
                            )}
                            <input ref={fileInputRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={e => handleImageFile(e.target.files[0])} />
                        </div>

                        {!form.imagePreview && (
                            <div className="modal-form" style={{ marginTop: 0 }}>
                                <div className="form-group">
                                    <label>Atau masukkan URL Gambar</label>
                                    <input
                                        value={form.imageUrl}
                                        onChange={e => setForm({ ...form, imageUrl: e.target.value, imagePreview: e.target.value })}
                                        placeholder="https://contoh.com/gambar.jpg"
                                    />
                                </div>
                            </div>
                        )}

                        <div className="modal-form">
                            <div className="form-group"><label>Judul Produk *</label><input value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} placeholder="Nama produk" /></div>
                            <div className="form-group"><label>Kategori</label>
                                <select value={form.category} onChange={e => setForm({ ...form, category: e.target.value })}>
                                    {['ebook', 'video', 'webinar', 'offline'].map(c => <option key={c} value={c}>{getCategoryLabel(c)}</option>)}
                                </select>
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-3)' }}>
                                <div className="form-group"><label>Harga Jual *</label><input type="number" value={form.price} onChange={e => setForm({ ...form, price: e.target.value })} placeholder="Rp" /></div>
                                <div className="form-group"><label>Harga Normal (coret)</label><input type="number" value={form.originalPrice} onChange={e => setForm({ ...form, originalPrice: e.target.value })} placeholder="Rp" /></div>
                            </div>
                            <div className="form-group"><label>Deskripsi</label><textarea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} placeholder="Deskripsi singkat produk" /></div>
                            <div className="form-group"><label>Badge (opsional)</label><input value={form.badge} onChange={e => setForm({ ...form, badge: e.target.value })} placeholder="Contoh: New, Bestseller, Hot" /></div>
                        </div>
                        <div className="modal-actions">
                            <button className="btn-modal-cancel" onClick={() => setModal(false)}>Batal</button>
                            <button className="btn-modal-save" onClick={handleSave}>{editId ? 'Simpan Perubahan' : 'Tambah Produk'}</button>
                        </div>
                    </div>
                </div>
            )}

            {/* Delete Confirm */}
            {deleteConfirm && (
                <div className="modal-overlay" onClick={() => setDeleteConfirm(null)}>
                    <div className="modal" style={{ maxWidth: 400 }} onClick={e => e.stopPropagation()}>
                        <div className="delete-confirm-icon">🗑️</div>
                        <h3 className="modal-title" style={{ textAlign: 'center' }}>Hapus Produk?</h3>
                        <p style={{ textAlign: 'center', color: 'var(--color-text-secondary)', fontSize: 'var(--text-sm)', marginTop: 'var(--space-2)' }}>
                            Tindakan ini tidak dapat dibatalkan. Produk akan dihapus permanen.
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

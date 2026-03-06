import { useState } from 'react';
import { Plus, Pencil, Trash2, X, Check } from 'lucide-react';
import { packages as initialPackages } from '../../data/packages';
import { formatCurrency } from '../../utils/helpers';
import { products } from '../../data/products';
import toast from 'react-hot-toast';
import './Admin.css';

const emptyForm = {
    title: '',
    subtitle: '',
    price: '',
    originalPrice: '',
    badge: '',
    productNames: [],
    benefits: [],
    slug: '',
};

export default function AdminPackages() {
    const [items, setItems] = useState(initialPackages);
    const [modal, setModal] = useState(false);
    const [form, setForm] = useState(emptyForm);
    const [editId, setEditId] = useState(null);
    const [deleteConfirm, setDeleteConfirm] = useState(null);
    const [newBenefit, setNewBenefit] = useState('');
    const [newProduct, setNewProduct] = useState('');

    const openAdd = () => { setForm(emptyForm); setEditId(null); setModal(true); };
    const openEdit = (pkg) => {
        setForm({ title: pkg.title, subtitle: pkg.subtitle, price: pkg.price, originalPrice: pkg.originalPrice, badge: pkg.badge || '', productNames: [...pkg.productNames], benefits: [...pkg.benefits], slug: pkg.slug });
        setEditId(pkg.id);
        setModal(true);
    };

    const handleSave = () => {
        if (!form.title || !form.price) return toast.error('Lengkapi data paket');
        const pkg = {
            ...form,
            price: Number(form.price),
            originalPrice: Number(form.originalPrice),
            slug: form.slug || form.title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''),
        };
        if (editId) {
            setItems(prev => prev.map(p => p.id === editId ? { ...p, ...pkg } : p));
            toast.success('Paket diperbarui');
        } else {
            setItems(prev => [...prev, { ...pkg, id: Date.now() }]);
            toast.success('Paket ditambahkan');
        }
        setModal(false);
    };

    const handleDelete = () => {
        setItems(prev => prev.filter(p => p.id !== deleteConfirm));
        setDeleteConfirm(null);
        toast.success('Paket dihapus');
    };

    const addBenefit = () => {
        if (!newBenefit.trim()) return;
        setForm(prev => ({ ...prev, benefits: [...prev.benefits, newBenefit.trim()] }));
        setNewBenefit('');
    };

    const addProduct = () => {
        if (!newProduct.trim() || form.productNames.includes(newProduct.trim())) return;
        setForm(prev => ({ ...prev, productNames: [...prev.productNames, newProduct.trim()] }));
        setNewProduct('');
    };

    const discount = form.price && form.originalPrice ? Math.round((1 - Number(form.price) / Number(form.originalPrice)) * 100) : 0;

    return (
        <div className="admin-page">
            <div className="admin-page-header">
                <h1>Manajemen Paket</h1>
                <p className="admin-page-subtitle">Kelola paket bundling produk</p>
            </div>
            <div className="admin-controls">
                <div />
                <button className="btn-admin-primary" onClick={openAdd}><Plus size={16} /> Tambah Paket</button>
            </div>

            <div className="pkg-admin-grid">
                {items.map(pkg => (
                    <div key={pkg.id} className="pkg-admin-card admin-table-card">
                        <div style={{ padding: 'var(--space-6)' }}>
                            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 'var(--space-4)' }}>
                                <div style={{ flex: 1 }}>
                                    {pkg.badge && <span className="status-badge success" style={{ marginBottom: 8, display: 'inline-block' }}>{pkg.badge}</span>}
                                    <h3 style={{ fontWeight: 700, fontSize: 'var(--text-lg)' }}>{pkg.title}</h3>
                                    <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)', marginTop: 4 }}>{pkg.subtitle}</p>
                                </div>
                                <div className="actions-col">
                                    <button className="btn-icon edit" onClick={() => openEdit(pkg)} title="Edit"><Pencil size={15} /></button>
                                    <button className="btn-icon delete" onClick={() => setDeleteConfirm(pkg.id)} title="Hapus"><Trash2 size={15} /></button>
                                </div>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', marginBottom: 'var(--space-4)' }}>
                                <span style={{ fontSize: 'var(--text-2xl)', fontWeight: 800 }}>{formatCurrency(pkg.price)}</span>
                                <del style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-muted)' }}>{formatCurrency(pkg.originalPrice)}</del>
                                <span className="status-badge warning">{Math.round((1 - pkg.price / pkg.originalPrice) * 100)}% off</span>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-1)' }}>
                                {pkg.productNames.map(name => (
                                    <div key={name} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)', padding: 'var(--space-2) var(--space-3)', background: 'var(--color-bg)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)' }}>
                                        <Check size={13} color="var(--color-success)" /> {name}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Create / Edit Modal */}
            {modal && (
                <div className="modal-overlay" onClick={() => setModal(false)}>
                    <div className="modal modal-wide" onClick={e => e.stopPropagation()} style={{ maxWidth: 600 }}>
                        <div className="modal-header">
                            <h3 className="modal-title">{editId ? 'Edit Paket' : 'Tambah Paket Baru'}</h3>
                            <button className="btn-icon" onClick={() => setModal(false)}><X size={18} /></button>
                        </div>
                        <div className="modal-form">
                            <div className="form-group"><label>Nama Paket *</label><input value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} placeholder="contoh: Growth Pack" /></div>
                            <div className="form-group"><label>Subtitle</label><input value={form.subtitle} onChange={e => setForm({ ...form, subtitle: e.target.value })} placeholder="Deskripsi singkat paket" /></div>
                            <div className="form-group"><label>URL Slug</label><input value={form.slug} onChange={e => setForm({ ...form, slug: e.target.value })} placeholder="contoh: growth-pack (otomatis jika kosong)" /></div>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-3)' }}>
                                <div className="form-group">
                                    <label>Harga Jual *</label>
                                    <input type="number" value={form.price} onChange={e => setForm({ ...form, price: e.target.value })} placeholder="Rp" />
                                </div>
                                <div className="form-group">
                                    <label>Harga Normal (coret)</label>
                                    <input type="number" value={form.originalPrice} onChange={e => setForm({ ...form, originalPrice: e.target.value })} placeholder="Rp" />
                                </div>
                            </div>
                            {discount > 0 && (
                                <div style={{ padding: 'var(--space-3)', background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.2)', borderRadius: 'var(--radius-md)', fontSize: 'var(--text-sm)', color: 'var(--color-success)' }}>
                                    ✓ Diskon: {discount}% · Hemat {formatCurrency(Number(form.originalPrice) - Number(form.price))}
                                </div>
                            )}
                            <div className="form-group"><label>Badge (opsional)</label><input value={form.badge} onChange={e => setForm({ ...form, badge: e.target.value })} placeholder="contoh: Paling Populer, Best Value" /></div>

                            {/* Product names */}
                            <div className="form-group">
                                <label>Produk yang Termasuk</label>
                                <div style={{ display: 'flex', gap: 8 }}>
                                    <select value={newProduct} onChange={e => setNewProduct(e.target.value)} style={{ flex: 1, padding: 'var(--space-2)' }}>
                                        <option value="">Pilih produk...</option>
                                        {products.map(p => (
                                            <option key={p.id} value={p.title}>{p.title}</option>
                                        ))}
                                    </select>
                                    <button type="button" className="btn-modal-save" style={{ padding: 'var(--space-2) var(--space-4)', fontSize: 'var(--text-sm)', opacity: newProduct ? 1 : 0.5 }} onClick={addProduct} disabled={!newProduct}>+ Tambah</button>
                                </div>
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 8 }}>
                                    {form.productNames.map((name, i) => (
                                        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '4px 10px', background: 'var(--color-bg)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-full)', fontSize: 'var(--text-xs)' }}>
                                            {name}
                                            <button onClick={() => setForm(prev => ({ ...prev, productNames: prev.productNames.filter((_, idx) => idx !== i) }))} style={{ color: 'var(--color-error)', lineHeight: 1 }}>×</button>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Benefits */}
                            <div className="form-group">
                                <label>Benefit Paket</label>
                                <div style={{ display: 'flex', gap: 8 }}>
                                    <input value={newBenefit} onChange={e => setNewBenefit(e.target.value)} placeholder="Tambah benefit..." onKeyDown={e => e.key === 'Enter' && addBenefit()} style={{ flex: 1 }} />
                                    <button type="button" className="btn-modal-save" style={{ padding: 'var(--space-2) var(--space-4)', fontSize: 'var(--text-sm)' }} onClick={addBenefit}>+ Tambah</button>
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginTop: 8 }}>
                                    {form.benefits.map((b, i) => (
                                        <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '6px 10px', background: 'var(--color-bg)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', fontSize: 'var(--text-sm)' }}>
                                            ✓ {b}
                                            <button onClick={() => setForm(prev => ({ ...prev, benefits: prev.benefits.filter((_, idx) => idx !== i) }))} style={{ color: 'var(--color-error)' }}>×</button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="modal-actions">
                            <button className="btn-modal-cancel" onClick={() => setModal(false)}>Batal</button>
                            <button className="btn-modal-save" onClick={handleSave}>{editId ? 'Simpan Perubahan' : 'Buat Paket'}</button>
                        </div>
                    </div>
                </div>
            )}

            {/* Delete Confirm */}
            {deleteConfirm && (
                <div className="modal-overlay" onClick={() => setDeleteConfirm(null)}>
                    <div className="modal" style={{ maxWidth: 380 }} onClick={e => e.stopPropagation()}>
                        <div className="delete-confirm-icon">🗑️</div>
                        <h3 className="modal-title" style={{ textAlign: 'center' }}>Hapus Paket?</h3>
                        <p style={{ textAlign: 'center', color: 'var(--color-text-secondary)', fontSize: 'var(--text-sm)', marginTop: 'var(--space-2)' }}>Paket akan dihapus secara permanen.</p>
                        <div className="modal-actions" style={{ justifyContent: 'center', marginTop: 'var(--space-4)' }}>
                            <button className="btn-modal-cancel" onClick={() => setDeleteConfirm(null)}>Batal</button>
                            <button className="btn-modal-save" style={{ background: 'var(--color-error)' }} onClick={handleDelete}>Hapus</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

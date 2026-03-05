import { useState, useRef, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Upload, X, ArrowLeft, Plus, Trash2, FileText, Video, Link as LinkIcon } from 'lucide-react';
import { products as initialProducts } from '../../data/products';
import { getCategoryLabel } from '../../utils/helpers';
import toast from 'react-hot-toast';
import './Admin.css';

const emptyForm = {
    title: '', category: 'ebook', price: '', originalPrice: '',
    description: '', longDescription: '', badge: '',
    imageUrl: '', imageFile: null, imagePreview: '',
    benefits: [], materials: [], materialFiles: []
};

export default function AdminProductForm() {
    const navigate = useNavigate();
    const { id } = useParams();
    const isEdit = Boolean(id);

    const [form, setForm] = useState(emptyForm);
    const [dragOver, setDragOver] = useState(false);
    const [newBenefit, setNewBenefit] = useState('');
    const [newMaterialTitle, setNewMaterialTitle] = useState('');
    const [newMaterialMeta, setNewMaterialMeta] = useState('');

    const fileInputRef = useRef(null);
    const materialFileInputRef = useRef(null);

    useEffect(() => {
        if (isEdit) {
            const p = initialProducts.find(x => x.id === Number(id));
            if (p) {
                setForm({
                    title: p.title || '', category: p.category || 'ebook',
                    price: p.price || '', originalPrice: p.originalPrice || '',
                    description: p.description || '', longDescription: p.longDescription || '',
                    badge: p.badge || '', imageUrl: p.thumbnail || '',
                    imageFile: null, imagePreview: p.thumbnail || '',
                    benefits: p.benefits ? [...p.benefits] : [],
                    materials: p.materials ? [...p.materials] : [],
                    materialFiles: [] // holds newly uploaded files mapped to materials
                });
            }
        }
    }, [id, isEdit]);

    const handleImageFile = (file) => {
        if (!file) return;
        if (!file.type.startsWith('image/')) return toast.error('File harus berupa gambar');
        if (file.size > 2 * 1024 * 1024) return toast.error('Ukuran file maksimal 2MB');
        const preview = URL.createObjectURL(file);
        setForm(prev => ({ ...prev, imageFile: file, imagePreview: preview }));
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setDragOver(false);
        handleImageFile(e.dataTransfer.files[0]);
    };

    const addBenefit = () => {
        if (!newBenefit.trim()) return;
        setForm(prev => ({ ...prev, benefits: [...prev.benefits, newBenefit.trim()] }));
        setNewBenefit('');
    };

    const addMaterial = (file = null) => {
        if (!newMaterialTitle.trim() && !file) return;

        const title = file ? file.name : newMaterialTitle.trim();
        const duration = file ? (file.size / 1024 / 1024).toFixed(2) + ' MB' : (newMaterialMeta.trim() || 'N/A');

        setForm(prev => ({
            ...prev,
            materials: [...prev.materials, { title, duration, fileAttached: !!file }],
            materialFiles: file ? [...prev.materialFiles, { index: prev.materials.length, file }] : prev.materialFiles
        }));

        setNewMaterialTitle('');
        setNewMaterialMeta('');
    };

    const handleMaterialFile = (e) => {
        const file = e.target.files[0];
        if (file) addMaterial(file);
    };

    const handleSave = () => {
        if (!form.title || !form.price) return toast.error('Lengkapi data wajib produk (Judul & Harga)');

        // Mock save action
        toast.success(isEdit ? 'Produk berhasil diperbarui' : 'Produk baru berhasil ditambahkan');
        navigate('/admin/products');
    };

    return (
        <div className="admin-page">
            <div className="admin-page-header">
                <button className="btn-icon" onClick={() => navigate('/admin/products')} style={{ marginBottom: 'var(--space-3)', display: 'inline-flex', gap: 6, alignItems: 'center', width: 'fit-content' }}>
                    <ArrowLeft size={16} /> Kembali
                </button>
                <h1>{isEdit ? 'Edit Produk' : 'Tambah Produk Baru'}</h1>
                <p className="admin-page-subtitle">Lengkapi formulir di bawah ini untuk mengelola detail produk dan materi pembelajaran.</p>
            </div>

            <div className="admin-card" style={{ padding: 'var(--space-6)', background: 'var(--color-bg)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-xl)' }}>
                {/* ─── GAMBAR PRODUK ─── */}
                <h3 style={{ fontSize: 'var(--text-lg)', marginBottom: 'var(--space-3)' }}>1. Visual Produk</h3>
                <div
                    className={`image-upload-zone ${dragOver ? 'drag-over' : ''}`}
                    onDragOver={e => { e.preventDefault(); setDragOver(true); }}
                    onDragLeave={() => setDragOver(false)}
                    onDrop={handleDrop}
                    onClick={() => fileInputRef.current?.click()}
                    style={{ marginBottom: 'var(--space-4)' }}
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
                            <p>Drag & drop atau <span>klik untuk upload</span> gambar cover produk</p>
                            <p className="upload-hint">PNG, JPG, WebP · Maks 2MB · Rasio 16:9 disarankan</p>
                        </div>
                    )}
                    <input ref={fileInputRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={e => handleImageFile(e.target.files[0])} />
                </div>

                {!form.imagePreview && (
                    <div className="form-group" style={{ marginBottom: 'var(--space-6)' }}>
                        <label>Atau gunakan URL Gambar</label>
                        <div style={{ display: 'flex', gap: 8 }}>
                            <LinkIcon size={18} style={{ color: 'var(--color-text-muted)', alignSelf: 'center' }} />
                            <input
                                value={form.imageUrl}
                                onChange={e => setForm({ ...form, imageUrl: e.target.value, imagePreview: e.target.value })}
                                placeholder="https://contoh.com/gambar.jpg"
                                style={{ flex: 1 }}
                            />
                        </div>
                    </div>
                )}

                <hr style={{ border: 'none', borderTop: '1px solid var(--color-border)', margin: 'var(--space-8) 0' }} />

                {/* ─── INFO DASAR ─── */}
                <h3 style={{ fontSize: 'var(--text-lg)', marginBottom: 'var(--space-4)' }}>2. Informasi Dasar</h3>
                <div className="modal-form" style={{ marginTop: 0, paddingBottom: 0 }}>
                    <div className="form-group">
                        <label>Judul Produk *</label>
                        <input value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} placeholder="Masukkan nama produk" />
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }}>
                        <div className="form-group">
                            <label>Kategori</label>
                            <select value={form.category} onChange={e => setForm({ ...form, category: e.target.value })}>
                                {['ebook', 'video', 'webinar', 'offline'].map(c => <option key={c} value={c}>{getCategoryLabel(c)}</option>)}
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Badge Label (Opsional)</label>
                            <input value={form.badge} onChange={e => setForm({ ...form, badge: e.target.value })} placeholder="Contoh: Bestseller, Baru" />
                        </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }}>
                        <div className="form-group">
                            <label>Harga Jual *</label>
                            <div style={{ position: 'relative' }}>
                                <span style={{ position: 'absolute', left: 12, top: 12, color: 'var(--color-text-muted)' }}>Rp</span>
                                <input type="number" style={{ paddingLeft: 40 }} value={form.price} onChange={e => setForm({ ...form, price: e.target.value })} placeholder="0" />
                            </div>
                        </div>
                        <div className="form-group">
                            <label>Harga Normal (Membentuk diskon coret)</label>
                            <div style={{ position: 'relative' }}>
                                <span style={{ position: 'absolute', left: 12, top: 12, color: 'var(--color-text-muted)' }}>Rp</span>
                                <input type="number" style={{ paddingLeft: 40 }} value={form.originalPrice} onChange={e => setForm({ ...form, originalPrice: e.target.value })} placeholder="0" />
                            </div>
                        </div>
                    </div>

                    <div className="form-group">
                        <label>Deskripsi Singkat (Tampil di Katalog/Card)</label>
                        <textarea rows="2" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} placeholder="Ringkasan produk..." />
                    </div>

                    <div className="form-group">
                        <label>Deskripsi Lengkap (Tampil di Halaman Penjualan)</label>
                        <textarea rows="5" value={form.longDescription} onChange={e => setForm({ ...form, longDescription: e.target.value })} placeholder="Penjelasan detail tentang produk yang meyakinkan pembeli..." />
                    </div>
                </div>

                <hr style={{ border: 'none', borderTop: '1px solid var(--color-border)', margin: 'var(--space-8) 0' }} />

                {/* ─── SALES FUNNEL & MATERI ─── */}
                <h3 style={{ fontSize: 'var(--text-lg)', marginBottom: 'var(--space-4)' }}>3. Konten Funnel & Materi Belajar</h3>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 'var(--space-6)' }}>
                    {/* Benefits */}
                    <div className="form-group" style={{ padding: 'var(--space-4)', background: 'var(--color-bg-secondary)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)' }}>
                        <label style={{ fontSize: 'var(--text-base)', color: 'var(--color-text-primary)' }}>Benefit / Apa yang didapat</label>
                        <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', marginBottom: 'var(--space-3)' }}>Tambahkan poin-poin keuntungan membeli produk ini.</p>
                        <div style={{ display: 'flex', gap: 8 }}>
                            <input value={newBenefit} onChange={e => setNewBenefit(e.target.value)} placeholder="Contoh: Akses grup alumni premium..." onKeyDown={e => e.key === 'Enter' && addBenefit()} style={{ flex: 1 }} />
                            <button type="button" className="btn-modal-save" style={{ padding: 'var(--space-2) var(--space-4)', fontSize: 'var(--text-sm)' }} onClick={addBenefit}>+ Tambah</button>
                        </div>
                        {form.benefits.length > 0 && (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginTop: 12 }}>
                                {form.benefits.map((b, i) => (
                                    <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 12px', background: 'var(--color-bg)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', fontSize: 'var(--text-sm)' }}>
                                        <span>✓ {b}</span>
                                        <button type="button" onClick={() => setForm(prev => ({ ...prev, benefits: prev.benefits.filter((_, idx) => idx !== i) }))} style={{ color: 'var(--color-error)' }}><Trash2 size={14} /></button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Pembelajaran / Silabus */}
                    <div className="form-group" style={{ padding: 'var(--space-4)', background: 'var(--color-bg-secondary)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)' }}>
                        <label style={{ fontSize: 'var(--text-base)', color: 'var(--color-text-primary)' }}>Materi Pembelajaran / Silabus</label>
                        <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', marginBottom: 'var(--space-3)' }}>Upload file materi secara langsung sesuai kategori (PDF, MP4) atau tulis manual untuk webinar/offline.</p>

                        {/* File Upload Button directly integrated */}
                        <div style={{ display: 'flex', gap: 8, marginBottom: 'var(--space-3)' }}>
                            <button
                                type="button"
                                className="btn-modal-save"
                                style={{ background: 'var(--color-accent-dim)', color: 'var(--color-accent-light)', border: '1px solid rgba(220, 38, 38, 0.4)', flex: 1, display: 'flex', justifyContent: 'center', gap: 8 }}
                                onClick={() => materialFileInputRef.current?.click()}
                            >
                                {form.category === 'video' ? <Video size={16} /> : <FileText size={16} />}
                                Upload File Materi ({getCategoryLabel(form.category)})
                            </button>
                            <input ref={materialFileInputRef} type="file" multiple={false} accept={form.category === 'video' ? "video/*" : ".pdf,.doc,.docx"} style={{ display: 'none' }} onChange={handleMaterialFile} />
                        </div>

                        <div style={{ display: 'flex', gap: 8 }}>
                            <input value={newMaterialTitle} onChange={e => setNewMaterialTitle(e.target.value)} placeholder="Atau tulis manual judul baba/materi..." style={{ flex: 2 }} onKeyDown={e => e.key === 'Enter' && addMaterial()} />
                            <input value={newMaterialMeta} onChange={e => setNewMaterialMeta(e.target.value)} placeholder="Durasi/Meta (opsional)" style={{ flex: 1 }} onKeyDown={e => e.key === 'Enter' && addMaterial()} />
                            <button type="button" className="btn-modal-save" style={{ padding: 'var(--space-2) var(--space-4)', fontSize: 'var(--text-sm)' }} onClick={() => addMaterial(null)}>+ Tambah</button>
                        </div>

                        {form.materials.length > 0 && (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginTop: 12 }}>
                                {form.materials.map((m, i) => (
                                    <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 12px', background: 'var(--color-bg)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', fontSize: 'var(--text-sm)' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                                            <span style={{ fontWeight: 600, color: 'var(--color-text-muted)' }}>{String(i + 1).padStart(2, '0')}</span>
                                            {m.fileAttached && (form.category === 'video' ? <Video size={14} color="var(--color-success)" /> : <FileText size={14} color="var(--color-success)" />)}
                                            <span>{m.title}</span>
                                            <span style={{ color: 'var(--color-accent)', fontSize: '11px', padding: '2px 6px', background: 'var(--color-accent-dim)', borderRadius: 4 }}>{m.duration || m.pages || m.videos}</span>
                                        </div>
                                        <button type="button" onClick={() => setForm(prev => ({
                                            ...prev,
                                            materials: prev.materials.filter((_, idx) => idx !== i),
                                            materialFiles: prev.materialFiles.filter(f => f.index !== i)
                                        }))} style={{ color: 'var(--color-error)' }}><Trash2 size={14} /></button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 'var(--space-3)', marginTop: 'var(--space-8)', paddingTop: 'var(--space-6)', borderTop: '1px solid var(--color-border)' }}>
                    <button className="btn-modal-cancel" onClick={() => navigate('/admin/products')}>Batal</button>
                    <button className="btn-modal-save" style={{ padding: 'var(--space-3) var(--space-6)' }} onClick={handleSave}>
                        {isEdit ? 'Simpan Perubahan' : 'Buat Produk Baru'}
                    </button>
                </div>
            </div>
        </div>
    );
}

import { useState } from 'react';
import { Save, Megaphone, PanelLeftClose, PanelLeftOpen, PackagePlus, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { useContent } from '../../context/ContentContext';
import { products } from '../../data/products';
import AdsPreview from '../guest/Ads';
import './Admin.css';

export default function AdminAds() {
    const { content, updateContent } = useContent();
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    const adsContent = content?.ads || {
        heroTitle: '',
        heroSubtitle: '',
        videoUrl: '',
        selectedProductIds: []
    };

    const handleChange = (key, value) => {
        updateContent('ads', key, value);
    };

    const handleSave = () => {
        toast.success('Perubahan Ads Page berhasil disimpan secara permanen!');
    };

    const addProduct = (productId) => {
        if (!productId) return;
        const numId = Number(productId);
        const currentIds = adsContent.selectedProductIds || [];
        if (currentIds.includes(numId)) {
            return toast.error('Produk sudah dipilih');
        }
        handleChange('selectedProductIds', [...currentIds, numId]);
    };

    const removeProduct = (productId) => {
        const currentIds = adsContent.selectedProductIds || [];
        handleChange(
            'selectedProductIds',
            currentIds.filter(id => id !== productId)
        );
    };

    const selectedProducts = (adsContent.selectedProductIds || []).map(id => products.find(p => p.id === id)).filter(Boolean);
    const unselectedProducts = products.filter(p => !(adsContent.selectedProductIds || []).includes(p.id));

    return (
        <div className="admin-cms-layout">
            {/* LEFT: EDITOR SIDEBAR */}
            <div className={`cms-sidebar ${!isSidebarOpen ? 'collapsed' : ''}`}>
                <div className="cms-sidebar-header">
                    <h2>Ads Page Builder</h2>
                    <p>Edit landing page promo (Minimalist)</p>
                </div>

                <div className="cms-tabs" style={{ marginBottom: 15 }}>
                    <button className="cms-tab-btn active" style={{ cursor: 'default' }}>
                        <Megaphone size={16} /> Pengaturan Konten
                    </button>
                </div>

                <div className="cms-editor-fields">
                    <div className="cms-form-group">
                        <label>Judul Promosi Utama</label>
                        <textarea rows={2} value={adsContent.heroTitle} onChange={e => handleChange('heroTitle', e.target.value)} />

                        <label>Subjudul / Penjelasan Singkat</label>
                        <textarea rows={3} value={adsContent.heroSubtitle} onChange={e => handleChange('heroSubtitle', e.target.value)} />

                        <label>URL Video YouTube (Embed)</label>
                        <input value={adsContent.videoUrl} onChange={e => handleChange('videoUrl', e.target.value)} placeholder="https://www.youtube.com/embed/..." />

                        <hr style={{ borderTop: '1px solid var(--color-border)', margin: '20px 0' }} />

                        <label style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#10b981' }}>
                            <PackagePlus size={16} /> Produk yang Ditawarkan
                        </label>
                        <p style={{ fontSize: '11px', color: 'var(--color-text-muted)', marginBottom: 8 }}>
                            Pilih produk dari database untuk ditampilkan di landing page promo ini.
                        </p>

                        <select
                            onChange={(e) => addProduct(e.target.value)}
                            value=""
                            className="form-input"
                            style={{ marginBottom: 15 }}
                        >
                            <option value="" disabled>-- Tambah Produk ke Ads --</option>
                            {unselectedProducts.map(p => (
                                <option key={p.id} value={p.id}>{p.title} - Rp{p.price.toLocaleString()}</option>
                            ))}
                        </select>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                            {selectedProducts.map(p => (
                                <div key={p.id} style={{
                                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                                    padding: '10px 12px', background: 'var(--color-bg)', border: '1px solid var(--color-border)',
                                    borderRadius: 'var(--radius-md)'
                                }}>
                                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                                        <span style={{ fontSize: '13px', fontWeight: 600 }}>{p.title}</span>
                                        <span style={{ fontSize: '11px', color: 'var(--color-success)' }}>Rp {p.price.toLocaleString('id-ID')}</span>
                                    </div>
                                    <button onClick={() => removeProduct(p.id)} style={{ color: 'var(--color-error)', background: 'none', border: 'none', cursor: 'pointer', padding: 4 }}>
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            ))}
                            {selectedProducts.length === 0 && (
                                <div style={{ textAlign: 'center', padding: 20, fontSize: 13, color: 'var(--color-text-muted)', border: '1px dashed var(--color-border)', borderRadius: 'var(--radius-md)' }}>
                                    Belum ada produk yang dipilih
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="cms-sidebar-footer">
                    <button className="btn-admin-primary" style={{ width: '100%' }} onClick={handleSave}>
                        <Save size={16} /> Simpan Perubahan
                    </button>
                    <p style={{ fontSize: '11px', textAlign: 'center', color: 'var(--color-text-muted)', marginTop: 8 }}>
                        Perubahan otomatis terupdate pada live preview di sebelah kanan.
                    </p>
                </div>
            </div>

            {/* RIGHT: LIVE PREVIEW CONTAINER */}
            <div className="cms-preview-area">
                <div className="cms-preview-wrapper">
                    <div className="cms-preview-header">
                        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                            <div style={{ display: 'flex', gap: 6 }}>
                                <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#ff5f56' }} />
                                <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#ffbd2e' }} />
                                <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#27c93f' }} />
                            </div>
                            <button
                                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                                className="cms-toggle-btn"
                                title={isSidebarOpen ? "Sembunyikan Sidebar" : "Tampilkan Sidebar"}
                            >
                                {isSidebarOpen ? <PanelLeftClose size={18} /> : <PanelLeftOpen size={18} />}
                            </button>
                        </div>
                        <div className="cms-url-bar">saga-academy.com/ads</div>
                        <div className="cms-preview-badge">✨ Live Preview</div>
                    </div>

                    <div className="cms-preview-frame" style={{ background: '#f8f9fa' }}>
                        <div className="cms-preview-content" style={{ padding: 0 }}>
                            <AdsPreview previewMode={true} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

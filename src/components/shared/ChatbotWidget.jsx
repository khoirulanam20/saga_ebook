import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, MinimizeIcon } from 'lucide-react';
import './ChatbotWidget.css';

const RESPONSES = {
    produk: 'Kami memiliki berbagai produk digital: 📚 Ebook, 🎬 Video Kelas, 🎙️ Webinar, dan 🏫 Kelas Offline. Mau lihat semua produk? Coba kunjungi halaman Produk!',
    paket: 'SAGA Academy menyediakan 3 paket bundling: Starter Pack (Rp399rb), Growth Pack (Rp799rb - paling populer!), dan Ultimate Pack (Rp1.999rb). Semua paket sudah diskon besar!',
    harga: 'Harga produk SAGA mulai dari Rp99.000 hingga Rp1.500.000. Ada juga paket bundling yang lebih hemat! Mau saya rekomendasikan yang sesuai budget kamu?',
    beli: 'Cara beli di SAGA sangat mudah! Pilih produk → klik Beli → pilih metode pembayaran (Transfer Bank, QRIS, E-wallet) → selesai! Akses produk langsung tersedia setelah pembayaran.',
    kontak: 'Butuh bantuan lebih lanjut? Hubungi kami di:\n📧 hello@sagaacademy.id\n📱 WhatsApp: 0812-3456-7890\nAtau isi form di halaman Kontak!',
    sertifikat: 'Beberapa produk kami menyediakan sertifikat kelulusan, terutama Video Kelas dan Kelas Offline. Sertifikat dapat digunakan untuk portofolio profesional!',
    default: 'Halo! Saya asisten SAGA Academy 👋 Saya bisa bantu kamu temukan produk yang tepat, info harga, atau cara pembelian. Apa yang ingin kamu ketahui?',
};

function getResponse(text) {
    const lower = text.toLowerCase();
    if (lower.includes('produk') || lower.includes('kelas') || lower.includes('ebook') || lower.includes('webinar')) return RESPONSES.produk;
    if (lower.includes('paket') || lower.includes('bundl')) return RESPONSES.paket;
    if (lower.includes('harga') || lower.includes('biaya') || lower.includes('bayar')) return RESPONSES.harga;
    if (lower.includes('beli') || lower.includes('cara') || lower.includes('proses')) return RESPONSES.beli;
    if (lower.includes('kontak') || lower.includes('hubungi') || lower.includes('whatsapp')) return RESPONSES.kontak;
    if (lower.includes('sertifikat') || lower.includes('certificate')) return RESPONSES.sertifikat;
    return RESPONSES.default;
}

export default function ChatbotWidget() {
    const [open, setOpen] = useState(false);
    const [messages, setMessages] = useState([
        { id: 1, from: 'bot', text: 'Halo! Saya asisten SAGA Academy 👋 Ada yang bisa saya bantu?', time: new Date() },
    ]);
    const [input, setInput] = useState('');
    const [typing, setTyping] = useState(false);
    const endRef = useRef(null);

    useEffect(() => {
        endRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, typing]);

    const sendMessage = () => {
        const text = input.trim();
        if (!text) return;
        const userMsg = { id: Date.now(), from: 'user', text, time: new Date() };
        setMessages(prev => [...prev, userMsg]);
        setInput('');
        setTyping(true);
        setTimeout(() => {
            setTyping(false);
            setMessages(prev => [...prev, { id: Date.now() + 1, from: 'bot', text: getResponse(text), time: new Date() }]);
        }, 1200);
    };

    return (
        <div className="chatbot-widget">
            {open && (
                <div className="chatbot-window">
                    <div className="chatbot-header">
                        <div className="chatbot-header-info">
                            <div className="chatbot-avatar"><Bot size={18} /></div>
                            <div>
                                <p className="chatbot-name">SAGA Assistant</p>
                                <p className="chatbot-status"><span className="online-dot" />Online</p>
                            </div>
                        </div>
                        <button className="chatbot-close" onClick={() => setOpen(false)}><X size={18} /></button>
                    </div>

                    <div className="chatbot-messages">
                        {messages.map(msg => (
                            <div key={msg.id} className={`chatbot-msg chatbot-msg--${msg.from}`}>
                                {msg.from === 'bot' && <div className="msg-avatar"><Bot size={13} /></div>}
                                <div className="msg-bubble">{msg.text}</div>
                            </div>
                        ))}
                        {typing && (
                            <div className="chatbot-msg chatbot-msg--bot">
                                <div className="msg-avatar"><Bot size={13} /></div>
                                <div className="msg-bubble typing">
                                    <span /><span /><span />
                                </div>
                            </div>
                        )}
                        <div ref={endRef} />
                    </div>

                    <div className="chatbot-quick">
                        {['Info Produk', 'Lihat Paket', 'Cara Beli'].map(q => (
                            <button key={q} className="quick-btn" onClick={() => { setInput(q); }}>
                                {q}
                            </button>
                        ))}
                    </div>

                    <div className="chatbot-input">
                        <input
                            value={input}
                            onChange={e => setInput(e.target.value)}
                            onKeyDown={e => e.key === 'Enter' && sendMessage()}
                            placeholder="Ketik pesan..."
                            className="chatbot-text-input"
                        />
                        <button className="chatbot-send" onClick={sendMessage} disabled={!input.trim()}>
                            <Send size={16} />
                        </button>
                    </div>
                </div>
            )}

            <button className={`chatbot-toggle ${open ? 'open' : ''}`} onClick={() => setOpen(!open)}>
                {open ? <X size={22} /> : <MessageCircle size={22} />}
                {!open && <span className="chatbot-notif">1</span>}
            </button>
        </div>
    );
}

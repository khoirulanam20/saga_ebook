import { MessageCircle } from 'lucide-react';
import './ChatbotWidget.css';

export default function ChatbotWidget() {
    const waNumber = '6281234567890';
    const waMessage = encodeURIComponent('Halo MinSaga! Saya butuh bantuan dari SAGA Academy 🚀');
    const waUrl = `https://wa.me/${waNumber}?text=${waMessage}`;

    return (
        <a href={waUrl} target="_blank" rel="noopener noreferrer" className="chatbot-widget" style={{ textDecoration: 'none' }}>
            <button className="chatbot-toggle" style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <MessageCircle size={24} />
            </button>
        </a>
    );
}

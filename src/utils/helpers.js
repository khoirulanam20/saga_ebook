export const formatCurrency = (amount) => {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(amount);
};

export const formatNumber = (num) => {
    if (num >= 1000) return `${(num / 1000).toFixed(1)}k`;
    return num.toString();
};

export const getCategoryIcon = (category) => {
    const icons = {
        ebook: '📚',
        video: '🎬',
        webinar: '🎙️',
        offline: '🏫',
    };
    return icons[category] || '📦';
};

export const getCategoryLabel = (category) => {
    const labels = {
        ebook: 'Ebook',
        video: 'Video Kelas',
        webinar: 'Webinar',
        offline: 'Kelas Offline',
    };
    return labels[category] || category;
};

export const generateStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => i < Math.floor(rating) ? 'full' : i < rating ? 'half' : 'empty');
};

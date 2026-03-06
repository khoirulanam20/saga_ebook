import { createContext, useContext, useState, useEffect } from 'react';

const defaultContent = {
    home: {
        heroBadge: 'Platform Digital Learning #1 Indonesia',
        heroTitleLine1: 'Kuasai Skill Digital,',
        heroTitleLine2: 'Akselerasi Karir Anda',
        heroSubtitle: 'Pelajari keterampilan digital terbaru dari para mentor berpengalaman. Ebook, Video Kelas, Webinar, dan Kelas Offline tersedia untuk membantu perjalanan sukses Anda.',
        ctaPrimary: 'Jelajahi Produk',
        ctaSecondary: 'Lihat Paket Bundling'
    },
    about: {
        heroTitle: 'Demokratisasi Pendidikan Digital',
        heroDesc: 'SAGA Academy lahir dari keyakinan bahwa setiap orang berhak mendapatkan akses ke pendidikan berkualitas tinggi untuk mengembangkan skill digital mereka.',
        storyTitle: 'Cerita SAGA Academy',
        storyP1: 'Berdiri pada tahun 2021, SAGA Academy dimulai dari sebuah visi sederhana: membantu masyarakat Indonesia untuk bisa bersaing di era digital global. Nama SAGA sendiri merupakan singkatan dari Skill, Action, Growth, Achievement.',
        storyP2: 'Kami percaya bahwa transformasi karir dimulai dari satu langkah kecil — mengambil ilmu dari mereka yang telah sukses dan menerapkannya dalam kehidupan nyata. Itulah mengapa setiap produk yang kami hadirkan dirancang untuk memberikan dampak nyata, bukan sekadar teori.'
    },
    contact: {
        title: 'Hubungi Kami',
        subtitle: 'Tim dukungan kami siap membantu Anda dengan pertanyaan terkait produk atau platform SAGA Academy.',
        email: 'hello@saga-academy.com',
        phone: '+62 812 3456 7890',
        address: 'Jl. Digital Valley No. 8, Jakarta Selatan 12345, Indonesia'
    }
};

const ContentContext = createContext();

export function ContentProvider({ children }) {
    const [content, setContent] = useState(() => {
        const saved = localStorage.getItem('saga_content');
        return saved ? JSON.parse(saved) : defaultContent;
    });

    useEffect(() => {
        localStorage.setItem('saga_content', JSON.stringify(content));
    }, [content]);

    const updateContent = (page, key, value) => {
        setContent(prev => ({
            ...prev,
            [page]: { ...prev[page], [key]: value }
        }));
    };

    return (
        <ContentContext.Provider value={{ content, updateContent }}>
            {children}
        </ContentContext.Provider>
    );
}

export const useContent = () => useContext(ContentContext);

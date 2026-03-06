import { Users, Target, Eye, Award, Star, BookOpen } from 'lucide-react';
import { useContent } from '../../context/ContentContext';
import './About.css';

const team = [
    { name: 'Ahmad Fauzi', role: 'CEO & Founder', avatar: 'A', bio: 'Entrepreneur digital dengan 10+ tahun pengalaman.' },
    { name: 'Rina Wulandari', role: 'Head of Content', avatar: 'R', bio: 'Content strategist berpengalaman di e-learning.' },
    { name: 'Doni Pratama', role: 'Lead Instructor', avatar: 'D', bio: 'Digital marketing expert dengan 500+ jam mengajar.' },
    { name: 'Sarah Kusuma', role: 'Head of Tech', avatar: 'S', bio: 'Full-stack developer yang passionate tentang edtech.' },
];

const achievements = [
    { icon: Users, value: '10.000+', label: 'Alumni Sukses' },
    // { icon: Star, value: '4.9/5', label: 'Rating Platform' },
    { icon: BookOpen, value: '50+', label: 'Produk Digital' },
    { icon: Target, value: '98%', label: 'Tingkat Kepuasan' },
];

export default function About() {
    const { content } = useContent();
    const { about } = content;

    return (
        <div className="about-page">
            <div className="about-hero">
                <div className="about-hero__glow" />
                <div className="container about-hero__content">
                    <p className="section-label">Tentang Kami</p>
                    <h1 className="about-title">Misi Kami: <span className="text-gradient">{about.heroTitle}</span></h1>
                    <p className="about-desc">{about.heroDesc}</p>
                </div>
            </div>

            <div className="container about-main">
                {/* Story */}
                <section className="about-section story-section">
                    <div className="story-text">
                        <h2 className="about-section-title">{about.storyTitle}</h2>
                        <p>{about.storyP1}</p>
                        <p>{about.storyP2}</p>
                    </div>
                    <div className="story-visual">
                        <div className="story-card">
                            <div className="story-card__year">2021</div>
                            <p>SAGA Academy berdiri dengan 3 produk pertama</p>
                        </div>
                        <div className="story-card">
                            <div className="story-card__year">2022</div>
                            <p>Meraih 1.000 pelajar aktif pertama</p>
                        </div>
                        <div className="story-card">
                            <div className="story-card__year">2023</div>
                            <p>Ekspansi ke kelas offline dan webinar live</p>
                        </div>
                        <div className="story-card">
                            <div className="story-card__year">2024</div>
                            <p>5.200+ pelajar aktif, 50+ produk tersedia</p>
                        </div>
                    </div>
                </section>

                {/* Vision & Mission */}
                <section className="about-section vm-section">
                    <div className="vm-card">
                        <div className="vm-icon"><Eye size={28} /></div>
                        <h3>Visi</h3>
                        <p>Menjadi platform pembelajaran digital terdepan di Indonesia yang melahirkan generasi profesional kompeten dan siap bersaing di era global.</p>
                    </div>
                    <div className="vm-card">
                        <div className="vm-icon"><Target size={28} /></div>
                        <h3>Misi</h3>
                        <ul>
                            <li>Menyediakan konten pembelajaran berkualitas tinggi yang praktis dan langsung dapat diterapkan</li>
                            <li>Membangun ekosistem pelajar yang saling mendukung dan mendorong pertumbuhan</li>
                            <li>Berkolaborasi dengan para profesional terbaik sebagai mentor</li>
                            <li>Terus berinovasi dalam metode pembelajaran digital</li>
                        </ul>
                    </div>
                </section>

                {/* Achievements */}
                <section className="about-section">
                    <h2 className="about-section-title text-center">SAGA dalam Angka</h2>
                    <div className="achievements-grid">
                        {achievements.map(({ icon: Icon, value, label }) => (
                            <div key={label} className="achievement-card">
                                <div className="achievement-icon"><Icon size={24} /></div>
                                <div className="achievement-value">{value}</div>
                                <div className="achievement-label">{label}</div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Team */}
                <section className="about-section">
                    <h2 className="about-section-title">Tim Kami</h2>
                    <div className="team-grid">
                        {team.map(member => (
                            <div key={member.name} className="team-card">
                                <div className="team-avatar">{member.avatar}</div>
                                <h3 className="team-name">{member.name}</h3>
                                <p className="team-role">{member.role}</p>
                                <p className="team-bio">{member.bio}</p>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
}

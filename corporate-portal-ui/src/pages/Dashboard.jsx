import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Phone,
    Utensils,
    CalendarCheck,
    Users,
    Building2,
    Bell,
    FileText,
    ChevronLeft,
    ChevronRight,
    Landmark,
    Headphones,
    X,
    UtensilsCrossed,
    Calendar,
    DoorOpen
} from 'lucide-react';
import RightWidget from '../components/RightWidget';
import MiniCalendarWidget from '../components/MiniCalendarWidget';
import QuickPollWidget from '../components/QuickPollWidget';
import CelebrationWidget from '../components/CelebrationWidget';
import ShuttleServiceWidget from '../components/ShuttleServiceWidget';

const slides = [
    {
        id: 1,
        tag: 'AYRICALIK',
        tagColor: 'bg-emerald-600',
        title: 'Tüm Beltur Kafe ve Restoranlarda Personele %20 İndirim !',
        description: 'İstanbul genelindeki tüm Beltur işletmelerinde kurumsal personel kimlik kartınızı göstererek indirimli hizmet alabilirsiniz.',
        image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1200&q=80',
        path: '/duyurular'
    },
    {
        id: 2,
        tag: 'EĞİTİM',
        tagColor: 'bg-blue-600',
        title: '2026-2027 Hizmet İçi Eğitim Başvuruları Başladı',
        description: 'Tüm birimler için kişisel gelişim, yapay zeka ve liderlik akademisi eğitimleri için kayıtlar açılmıştır.',
        image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=1200&q=80',
        path: '/duyurular'
    },
    {
        id: 3,
        tag: 'KÜLTÜR & SANAT',
        tagColor: 'bg-amber-600',
        title: 'Şehir Tiyatroları Yeni Sezon Biletleri Satışta',
        description: 'İBB personeline özel indirimli tiyatro biletlerinizi portal üzerinden anında temin edebilirsiniz.',
        image: 'https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?auto=format&fit=crop&w=1200&q=80',
        path: '/duyurular'
    }
];

export default function Dashboard() {
    const navigate = useNavigate();
    const [currentSlide, setCurrentSlide] = useState(0);

    // Modal State'leri
    const [isFoodModalOpen, setIsFoodModalOpen] = useState(false);
    const [foodMenu, setFoodMenu] = useState(null);
    const [foodLoading, setFoodLoading] = useState(false);

    const [infoModal, setInfoModal] = useState({
        isOpen: false,
        title: '',
        content: ''
    });

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 6000);
        return () => clearInterval(timer);
    }, []);

    const prevSlide = (e) => {
        e.stopPropagation();
        setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    };

    const nextSlide = (e) => {
        e.stopPropagation();
        setCurrentSlide((prev) => (prev + 1) % slides.length);
    };

    // Yemek Menüsünü Backend'den Çekme
    const fetchTodayMenu = async () => {
        setIsFoodModalOpen(true);
        setFoodLoading(true);
        try {
            const token = localStorage.getItem('token');
            const res = await fetch('http://localhost:8080/api/food-menus/today', {
                headers: {
                    ...(token && { Authorization: `Bearer ${token}` })
                }
            });
            if (res.ok) {
                const data = await res.json();
                setFoodMenu(data);
            } else {
                setFoodMenu(null);
            }
        } catch (err) {
            console.error('Yemek menüsü çekilemedi:', err);
            setFoodMenu(null);
        } finally {
            setFoodLoading(false);
        }
    };

    const services = [
        {
            icon: Phone,
            title: 'Telefon Rehberi',
            path: '/rehber',
            badge: 'İç Hatlar'
        },
        {
            icon: DoorOpen,
            title: 'Toplantı Salonu',
            path: '/rezervasyon',
            badge: 'Rezervasyon'
        },
        {
            icon: Landmark,
            title: 'Kurumsal Bilgiler',
            badge: 'Hakkımızda',
            action: () => setInfoModal({
                isOpen: true,
                title: 'Kurumsal Bilgiler',
                content: 'Kurumsal Portalımız; çalışanlarımızın iç iletişimini güçlendirmek, iş akışlarını dijitalleştirmek ve kurumsal kaynaklara tek merkezden erişim sağlamak amacıyla geliştirilmiştir.\n\nVizyonumuz: Yenilikçi, şeffaf ve sürdürülebilir kamu yönetimi anlayışıyla dijital dönüşüme öncülük etmek.'
            })
        },
        {
            icon: Headphones,
            title: 'İletişim & Destek',
            badge: 'Destek Hattı',
            action: () => setInfoModal({
                isOpen: true,
                title: 'Bilgi İşlem & Kurumsal Destek',
                content: 'Portal veya sistemlerle ilgili her türlü sorun için bize ulaşabilirsiniz:\n\n• Dahili Hat: 1000 / 1002\n• E-Posta: portal-destek@ibb.gov.tr\n• Çalışma Saatleri: Hafta içi 08:30 - 17:30'
            })
        },
        {
            icon: Utensils,
            title: 'Yemek Menüsü',
            badge: 'Günün Menüsü',
            action: fetchTodayMenu
        },
        {
            icon: CalendarCheck,
            title: 'İzin Taleplerim',
            path: '/talepler',
            badge: 'Talep & İzin'
        },
        {
            icon: Users,
            title: 'Personel Listesi',
            path: '/kullanicilar',
            badge: 'Kullanıcılar'
        },
        {
            icon: Building2,
            title: 'Departmanlar',
            path: '/departmanlar',
            badge: 'Birimler'
        },
        {
            icon: Bell,
            title: 'Kurumsal Duyurular',
            path: '/duyurular',
            badge: 'Güncel'
        },
        {
            icon: FileText,
            title: 'DAYSİS Belge Takip',
            url: 'https://daysis.ibb.gov.tr',
            isExternal: true,
            badge: 'Dış Bağlantı'
        }
    ];

    const handleServiceClick = (item) => {
        if (item.action) {
            item.action();
        } else if (item.isExternal) {
            window.open(item.url, '_blank', 'noopener,noreferrer');
        } else if (item.path) {
            navigate(item.path);
        }
    };

    const activeItem = slides[currentSlide];

    return (
        <div className="flex gap-6 p-6">
            {/* Orta Kolon */}
            <div className="flex-1 flex flex-col gap-6 min-w-0">
                {/* Gündem Slider */}
                <section>
                    <div className="flex items-center justify-between mb-3">
                        <h2 className="text-sm font-bold text-slate-700 tracking-wide uppercase">Gündem</h2>
                        <span className="text-[11px] font-semibold text-slate-400">
                            {currentSlide + 1} / {slides.length}
                        </span>
                    </div>

                    <div
                        onClick={() => navigate(activeItem.path)}
                        className="relative h-72 rounded-2xl overflow-hidden shadow-lg border border-slate-200 cursor-pointer group select-none"
                    >
                        <img
                            src={activeItem.image}
                            alt={activeItem.title}
                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                        />

                        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/45 to-transparent" />

                        <button
                            onClick={prevSlide}
                            aria-label="Önceki Slayt"
                            className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/40 hover:bg-black/75 text-white flex items-center justify-center backdrop-blur-sm transition-all duration-200 z-20 cursor-pointer hover:scale-110"
                        >
                            <ChevronLeft className="w-5 h-5" />
                        </button>

                        <button
                            onClick={nextSlide}
                            aria-label="Sonraki Slayt"
                            className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/40 hover:bg-black/75 text-white flex items-center justify-center backdrop-blur-sm transition-all duration-200 z-20 cursor-pointer hover:scale-110"
                        >
                            <ChevronRight className="w-5 h-5" />
                        </button>

                        <div className="relative z-10 p-6 flex flex-col justify-end h-full text-white">
                            <span className={`w-fit ${activeItem.tagColor} text-white text-[10px] font-bold px-2.5 py-1 rounded-md tracking-wider uppercase mb-2 shadow-sm`}>
                                {activeItem.tag}
                            </span>
                            <h3 className="text-2xl font-bold leading-tight group-hover:text-emerald-300 transition-colors">
                                {activeItem.title}
                            </h3>
                            <p className="text-xs text-slate-200 mt-1.5 max-w-2xl leading-relaxed">
                                {activeItem.description}
                            </p>

                            <div className="flex gap-1.5 mt-4">
                                {slides.map((_, idx) => (
                                    <button
                                        key={idx}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setCurrentSlide(idx);
                                        }}
                                        className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                                            idx === currentSlide
                                                ? 'w-6 bg-white'
                                                : 'w-2 bg-white/40 hover:bg-white/70'
                                        }`}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Hizmetler Grid */}
                <section>
                    <h2 className="text-sm font-bold text-slate-700 mb-3 tracking-wide uppercase">Hızlı İşlemler & Hizmetler</h2>
                    <div className="grid grid-cols-3 gap-4">
                        {services.map((item, idx) => {
                            const Icon = item.icon;
                            return (
                                <div
                                    key={idx}
                                    onClick={() => handleServiceClick(item)}
                                    className="bg-white border border-slate-200 rounded-xl p-4 flex items-center gap-4 shadow-sm hover:shadow-md hover:border-[#003366]/40 cursor-pointer transition-all duration-200 group hover:-translate-y-0.5"
                                >
                                    <div className="p-3 rounded-xl bg-slate-50 text-[#003366] group-hover:bg-[#003366] group-hover:text-white transition-colors duration-200 shrink-0">
                                        <Icon className="w-6 h-6" />
                                    </div>
                                    <div className="flex flex-col text-left">
                                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                                            {item.badge}
                                        </span>
                                        <span className="text-sm font-semibold text-slate-700 group-hover:text-[#003366] transition-colors">
                                            {item.title}
                                        </span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </section>

                {/* Kurumsal Modüller & Etkileşim Alanı */}
                <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <MiniCalendarWidget />
                    <QuickPollWidget />
                    <CelebrationWidget />
                    <ShuttleServiceWidget />
                </section>
            </div>

            {/* Sağ Kolon */}
            <RightWidget />

            {/* YEMEK MENÜSÜ MODAL */}
            {isFoodModalOpen && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 relative border border-slate-100">
                        <button
                            onClick={() => setIsFoodModalOpen(false)}
                            className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
                        >
                            <X className="w-5 h-5" />
                        </button>

                        <div className="flex items-center gap-3 mb-5">
                            <div className="p-3 bg-amber-50 text-amber-600 rounded-xl border border-amber-100">
                                <UtensilsCrossed className="w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-slate-800">Günün Yemek Menüsü</h3>
                                <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-0.5">
                                    <Calendar className="w-3.5 h-3.5" />
                                    <span>{foodMenu?.menuDate || 'Bugün'}</span>
                                </div>
                            </div>
                        </div>

                        {foodLoading ? (
                            <div className="py-8 text-center text-slate-500 text-sm">Menü yükleniyor...</div>
                        ) : foodMenu ? (
                            <div className="space-y-3">
                                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-between">
                                    <span className="text-xs font-semibold text-slate-400 uppercase">Çorba</span>
                                    <span className="text-sm font-bold text-slate-700">{foodMenu.soup}</span>
                                </div>
                                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-between">
                                    <span className="text-xs font-semibold text-slate-400 uppercase">Ana Yemek</span>
                                    <span className="text-sm font-bold text-[#003366]">{foodMenu.mainCourse}</span>
                                </div>
                                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-between">
                                    <span className="text-xs font-semibold text-slate-400 uppercase">Yardımcı Yemek</span>
                                    <span className="text-sm font-bold text-slate-700">{foodMenu.sideDish}</span>
                                </div>
                                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-between">
                                    <span className="text-xs font-semibold text-slate-400 uppercase">Tatlı / İçecek</span>
                                    <span className="text-sm font-bold text-slate-700">{foodMenu.dessertOrDrink}</span>
                                </div>
                            </div>
                        ) : (
                            <div className="p-4 bg-amber-50 text-amber-800 rounded-xl text-center text-sm border border-amber-200">
                                Bugün için henüz yemek menüsü yayınlanmamış.
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* KURUMSAL BİLGİ & DESTEK MODAL */}
            {infoModal.isOpen && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 relative border border-slate-100">
                        <button
                            onClick={() => setInfoModal({ isOpen: false, title: '', content: '' })}
                            className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
                        >
                            <X className="w-5 h-5" />
                        </button>
                        <h3 className="text-lg font-bold text-[#003366] mb-3">{infoModal.title}</h3>
                        <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 text-sm text-slate-600 whitespace-pre-line leading-relaxed">
                            {infoModal.content}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
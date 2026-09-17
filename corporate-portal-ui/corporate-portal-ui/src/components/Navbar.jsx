import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';

const navLinks = [
    { title: 'Kurumsal', path: '/departmanlar' },
    { title: 'Haberler', path: '/duyurular' },
    { title: 'Duyurular', path: '/duyurular' },
    {
        title: 'Hizmet İçi Eğitim',
        url: 'https://enstitu.ibb.istanbul',
        isExternal: true
    },
    {
        title: 'İş Sağlığı ve Güvenliği',
        url: 'https://isg.ibb.istanbul',
        isExternal: true
    },
    { title: 'İletişim', path: '/kullanicilar' }, // Personel rehberi / iletişim
];

export default function Navbar() {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = (e) => {
        if (e.key === 'Enter' && searchTerm.trim()) {
            // Aramayı duyurular sayfasına parametre olarak iletir
            navigate(`/duyurular?search=${encodeURIComponent(searchTerm.trim())}`);
        }
    };

    const handleClick = (item) => {
        if (item.isExternal) {
            window.open(item.url, '_blank', 'noopener,noreferrer');
        } else if (item.path) {
            navigate(item.path);
        }
    };

    return (
        <header className="h-16 bg-white border-b border-slate-200 px-8 flex items-center justify-between shadow-sm">
            {/* Arama Kutusu */}
            <div className="relative w-80">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyDown={handleSearch}
                    placeholder="Aradığınız Kelimeyi Giriniz..."
                    className="w-full pl-10 pr-4 py-2 text-xs bg-slate-50 border border-slate-200 rounded-full focus:outline-none focus:border-[#003366] focus:bg-white text-slate-700 transition-all placeholder:text-slate-400"
                />
            </div>

            {/* Navigasyon Linkleri */}
            <nav className="flex items-center gap-6">
                {navLinks.map((item, idx) => (
                    <button
                        key={idx}
                        onClick={() => handleClick(item)}
                        className="text-xs font-semibold text-slate-600 hover:text-[#003366] transition-colors cursor-pointer"
                    >
                        {item.title}
                    </button>
                ))}
            </nav>
        </header>
    );
}
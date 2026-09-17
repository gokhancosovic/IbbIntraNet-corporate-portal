import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

const links = [
    {
        title: 'Talep Yönetim Sistemi',
        url: '/talepler',
        isExternal: false
    },
    {
        title: 'DAYSİS',
        url: 'https://daysis.ibb.gov.tr',
        isExternal: true
    },
    {
        title: 'Uygulamalar',
        url: 'https://uygulamalar.ibb.gov.tr',
        isExternal: true
    },
    {
        title: 'Dokümanlar',
        url: '/talepler', // veya dokümanlar için ayrı rota açılana kadar talepler/içerik sayfası
        isExternal: false
    },
    {
        title: 'İstanbul Bülteni',
        url: '/duyurular',
        isExternal: false
    },
    {
        title: 'Telefon Rehberi',
        url: '/kullanicilar', // Backend'deki kullanıcıları listelediğimiz rehber/personel sayfası
        isExternal: false
    },
    {
        title: 'Bizden Haberler',
        url: '/duyurular',
        isExternal: false
    },
];

export default function RightWidget() {
    const navigate = useNavigate();

    const handleClick = (item) => {
        if (item.isExternal) {
            window.open(item.url, '_blank', 'noopener,noreferrer');
        } else if (item.url) {
            navigate(item.url);
        }
    };

    return (
        <div className="w-80 flex flex-col gap-4 shrink-0">
            {/* Koyu Mavi Buton Listesi */}
            <div className="flex flex-col gap-1.5">
                {links.map((item, idx) => (
                    <button
                        key={idx}
                        onClick={() => handleClick(item)}
                        className="w-full flex items-center justify-between px-4 py-3 bg-[#003366] hover:bg-[#002244] text-white text-xs font-semibold rounded-lg shadow-sm transition-all duration-150 cursor-pointer group"
                    >
                        <span className="group-hover:translate-x-0.5 transition-transform">{item.title}</span>
                        <ChevronRight className="w-4 h-4 opacity-70 group-hover:opacity-100 transition-opacity" />
                    </button>
                ))}
            </div>
        </div>
    );
}
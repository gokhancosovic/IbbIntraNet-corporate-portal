import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
    BarChart2,
    Navigation,
    Tv,
    UtensilsCrossed,
    Bus
} from 'lucide-react';

const menuItems = [
    {
        icon: BarChart2,
        title: 'Sayılarla İstanbul',
        url: 'https://istatistik.istanbul/',
        isExternal: true
    },
    {
        icon: Navigation,
        title: 'Harita İstanbul',
        url: 'https://sehirharitasi.ibb.gov.tr/',
        isExternal: true
    },
    {
        icon: Tv,
        title: 'İBB TV',
        url: 'https://tv.ibb.istanbul/',
        isExternal: true
    },
    {
        icon: UtensilsCrossed,
        title: 'Sosyal Tesisler',
        url: 'https://tesislerimiz.ibb.istanbul/',
        isExternal: true
    },
    {
        icon: Bus,
        title: 'Toplu Ulaşım',
        url: 'https://iett.istanbul/',
        isExternal: true
    },
];

export default function Sidebar() {
    const navigate = useNavigate();

    const handleNav = (item) => {
        if (item.isExternal) {
            window.open(item.url, '_blank', 'noopener,noreferrer');
        } else if (item.url) {
            navigate(item.url);
        }
    };

    return (
        <aside className="w-56 bg-[#003366] text-white flex flex-col items-center py-6 px-3 select-none shrink-0 min-h-screen">
            {/* Logo Alanı */}
            <div
                onClick={() => navigate('/')}
                className="cursor-pointer mb-8 flex flex-col items-center hover:opacity-90 transition-opacity"
            >
                <span className="text-xl font-bold tracking-tight">PORTAL</span>
                <span className="text-[10px] tracking-widest text-slate-300 uppercase">Intranet</span>
            </div>

            {/* Menü Linkleri */}
            <nav className="w-full flex flex-col gap-2">
                {menuItems.map((item, idx) => {
                    const Icon = item.icon;
                    return (
                        <button
                            key={idx}
                            onClick={() => handleNav(item)}
                            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-medium text-slate-100 hover:bg-white/10 transition-colors cursor-pointer text-left"
                        >
                            <Icon className="w-5 h-5 shrink-0" />
                            <span>{item.title}</span>
                        </button>
                    );
                })}
            </nav>
        </aside>
    );
}
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

export default function RightWidget() {
    const navigate = useNavigate();

    const quickLinks = [
        { label: 'Talep Yönetim Sistemi', path: '/talepler' },
        { label: 'DAYSİS Belge Takip', url: 'https://daysis.ibb.gov.tr' },
        { label: 'Telefon Rehberi', path: '/rehber' },
        { label: 'Kurumsal Bilgiler', path: '/kurumsal' },
        { label: 'İletişim & Destek', path: '/iletisim' }
    ];

    const handleClick = (item) => {
        if (item.url) {
            window.open(item.url, '_blank');
        } else if (item.path) {
            navigate(item.path);
        }
    };

    return (
        <div className="w-72 flex flex-col gap-4 shrink-0">
            {/* Hava Durumu & Döviz Kartı */}
            <div className="bg-white rounded-lg border border-slate-200 p-4 shadow-sm text-xs">
                <div className="flex justify-between items-start border-b border-slate-100 pb-3">
                    <div>
                        <h4 className="font-bold text-slate-700 text-sm">Hava Durumu</h4>
                        <p className="text-slate-500 mt-1">18.09.2026</p>
                        <p className="text-slate-400 text-[11px]">Cuma</p>
                    </div>
                    <div className="text-right">
                        <span className="text-2xl font-bold text-slate-800">22.0 °C</span>
                        <p className="text-[10px] text-slate-400">Çok Bulutlu</p>
                    </div>
                </div>

                <div className="mt-3">
                    <h4 className="font-bold text-slate-700 mb-2">Döviz Kuru</h4>
                    <div className="grid grid-cols-4 gap-1 text-center text-[10px]">
                        <div className="bg-slate-50 p-1.5 rounded">
                            <span className="block text-slate-400 font-medium">ALTIN</span>
                            <span className="font-bold text-slate-700 mt-0.5 block">6772.68</span>
                        </div>
                        <div className="bg-slate-50 p-1.5 rounded">
                            <span className="block text-slate-400 font-medium">DOLAR</span>
                            <span className="font-bold text-slate-700 mt-0.5 block">48.87</span>
                        </div>
                        <div className="bg-slate-50 p-1.5 rounded">
                            <span className="block text-slate-400 font-medium">EURO</span>
                            <span className="font-bold text-slate-700 mt-0.5 block">56.00</span>
                        </div>
                        <div className="bg-slate-50 p-1.5 rounded">
                            <span className="block text-slate-400 font-medium">STERLİN</span>
                            <span className="font-bold text-slate-700 mt-0.5 block">65.33</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mavi Link Menüsü */}
            <div className="bg-[#003366] text-white rounded-lg overflow-hidden shadow-sm">
                {quickLinks.map((item, idx) => (
                    <button
                        key={idx}
                        onClick={() => handleClick(item)}
                        className="w-full flex items-center justify-between px-4 py-2.5 text-xs font-medium hover:bg-white/10 border-b border-[#0b437e] last:border-none transition text-left cursor-pointer"
                    >
                        <span>{item.label}</span>
                        <ChevronRight className="w-3.5 h-3.5 opacity-60" />
                    </button>
                ))}
            </div>
        </div>
    );
}
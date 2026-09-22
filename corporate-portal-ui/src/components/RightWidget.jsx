import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

export default function RightWidget() {
    const navigate = useNavigate();

    // Tarih bilgileri (Sistem saatinden anlık)
    const today = new Date();
    const formattedDate = today.toLocaleDateString('tr-TR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    });
    const dayName = today.toLocaleDateString('tr-TR', { weekday: 'long' });

    // Dinamik state'ler
    const [weather, setWeather] = useState({
        temperature: '--',
        description: 'Yükleniyor...'
    });
    const [rates, setRates] = useState({
        usd: '--',
        eur: '--'
    });

    useEffect(() => {
        // Hava durumu verisi
        fetch('http://localhost:8080/api/widgets/weather')
            .then(res => res.json())
            .then(data => {
                if (data) {
                    setWeather({
                        temperature: data.temperature ?? '--',
                        description: data.description || 'Açık'
                    });
                }
            })
            .catch(err => console.error('Hava durumu hatası:', err));

        // Döviz kurları verisi (Sadece USD ve EUR)
        fetch('http://localhost:8080/api/widgets/exchange-rates')
            .then(res => res.json())
            .then(data => {
                if (data) {
                    setRates({
                        usd: data.usd || data.dolar || '--',
                        eur: data.eur || data.euro || '--'
                    });
                }
            })
            .catch(err => console.error('Döviz kuru hatası:', err));
    }, []);

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
                        <p className="text-slate-500 mt-1">{formattedDate}</p>
                        <p className="text-slate-400 text-[11px] capitalize">{dayName}</p>
                    </div>
                    <div className="text-right">
                        <span className="text-2xl font-bold text-slate-800">
                            {weather.temperature !== '--' ? `${weather.temperature} °C` : '--'}
                        </span>
                        <p className="text-[10px] text-slate-400 capitalize">{weather.description}</p>
                    </div>
                </div>

                <div className="mt-3">
                    <h4 className="font-bold text-slate-700 mb-2">Döviz Kuru</h4>
                    <div className="grid grid-cols-2 gap-2 text-center text-[11px]">
                        <div className="bg-slate-50 p-2 rounded">
                            <span className="block text-slate-400 font-medium text-[10px]">DOLAR</span>
                            <span className="font-bold text-slate-700 mt-0.5 block truncate">{rates.usd}</span>
                        </div>
                        <div className="bg-slate-50 p-2 rounded">
                            <span className="block text-slate-400 font-medium text-[10px]">EURO</span>
                            <span className="font-bold text-slate-700 mt-0.5 block truncate">{rates.eur}</span>
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
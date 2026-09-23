import React, { useState } from 'react';
import { Bus, Clock, MapPin, Search } from 'lucide-react';

export default function ShuttleServiceWidget() {
    const [selectedCampus, setSelectedCampus] = useState('kasimpasa');
    const [filter, setFilter] = useState('');

    const schedules = {
        kasimpasa: [
            { id: 1, route: 'Kadıköy - Üsküdar - Kasımpaşa', departure: '07:30', plate: '34 LSS 104', driver: 'Kemal Usta', returnTime: '17:15' },
            { id: 2, route: 'Bakırköy - Yenibosna - Kasımpaşa', departure: '07:45', plate: '34 TM 821', driver: 'Osman Kaya', returnTime: '17:15' },
            { id: 3, route: 'Beylikdüzü - Avcılar - Kasımpaşa', departure: '07:15', plate: '34 IBB 490', driver: 'Murat Yılmaz', returnTime: '17:30' }
        ],
        sarachane: [
            { id: 4, route: 'Maltepe - Kartal - Saraçhane', departure: '07:20', plate: '34 IBB 112', driver: 'Ali Demir', returnTime: '17:15' },
            { id: 5, route: 'Gaziosmanpaşa - Eyüpsultan - Saraçhane', departure: '07:50', plate: '34 AB 789', driver: 'Ahmet Çelik', returnTime: '17:15' }
        ]
    };

    const currentList = schedules[selectedCampus].filter(item =>
        item.route.toLowerCase().includes(filter.toLowerCase()) ||
        item.plate.toLowerCase().includes(filter.toLowerCase())
    );

    return (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <div className="flex items-center gap-2">
                    <div className="p-1.5 rounded-lg bg-emerald-50 text-emerald-600">
                        <Bus size={18} />
                    </div>
                    <h3 className="font-semibold text-slate-800 text-sm">Personel Servis Saatleri</h3>
                </div>
            </div>

            {/* Yerleşke Seçimi */}
            <div className="flex bg-slate-100 p-1 rounded-lg">
                <button
                    onClick={() => setSelectedCampus('kasimpasa')}
                    className={`flex-1 py-1.5 text-xs font-semibold rounded-md transition-all ${
                        selectedCampus === 'kasimpasa' ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-500 hover:text-slate-700'
                    }`}
                >
                    Kasımpaşa Hizmet Binası
                </button>
                <button
                    onClick={() => setSelectedCampus('sarachane')}
                    className={`flex-1 py-1.5 text-xs font-semibold rounded-md transition-all ${
                        selectedCampus === 'sarachane' ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-500 hover:text-slate-700'
                    }`}
                >
                    Saraçhane Ana Bina
                </button>
            </div>

            {/* Hızlı Arama */}
            <div className="relative">
                <Search size={14} className="absolute left-2.5 top-2.5 text-slate-400" />
                <input
                    type="text"
                    placeholder="Semt veya plaka ara..."
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    className="w-full pl-8 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-emerald-500"
                />
            </div>

            {/* Servis Kartları */}
            <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
                {currentList.map((item) => (
                    <div key={item.id} className="p-2.5 rounded-lg border border-slate-100 bg-slate-50/50 hover:bg-slate-50 transition-colors space-y-1">
                        <div className="flex items-center justify-between">
                            <span className="text-xs font-semibold text-slate-800 flex items-center gap-1">
                                <MapPin size={12} className="text-emerald-600" /> {item.route}
                            </span>
                            <span className="text-[10px] font-mono bg-slate-200 text-slate-700 px-1.5 py-0.5 rounded">
                                {item.plate}
                            </span>
                        </div>
                        <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1">
                            <span>Sürücü: {item.driver}</span>
                            <div className="flex items-center gap-2">
                                <span className="flex items-center gap-0.5 font-medium text-slate-700">
                                    <Clock size={11} className="text-slate-400" /> Sabah: {item.departure}
                                </span>
                                <span className="text-slate-400">|</span>
                                <span className="flex items-center gap-0.5 font-medium text-slate-700">
                                    Akşam: {item.returnTime}
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
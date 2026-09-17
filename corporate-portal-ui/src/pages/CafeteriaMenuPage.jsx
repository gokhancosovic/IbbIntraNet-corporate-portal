import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function CafeteriaMenuPage() {
    const navigate = useNavigate();

    return (
        <div className="p-8 max-w-5xl mx-auto">
            <button
                onClick={() => navigate('/')}
                className="mb-6 px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-lg text-sm font-medium transition-colors cursor-pointer">
                ← Ana Sayfaya Dön
            </button>

            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                <h1 className="text-2xl font-bold text-slate-800 mb-2">Günün Yemek Menüsü</h1>
                <p className="text-slate-500 mb-6">Kurum yemekhanesi haftalık yemek programı.</p>

                <ul className="space-y-3">
                    {['Mercimek Çorbası', 'Orman Kebabı', 'Pirinç Pilavı', 'Mevsim Salata'].map((item, idx) => (
                        <li key={idx} className="p-3 bg-slate-50 rounded-lg border border-slate-100 text-slate-700 font-medium">
                            {item}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
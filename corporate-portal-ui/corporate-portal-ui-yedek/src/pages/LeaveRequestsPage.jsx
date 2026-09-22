import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function LeaveRequestsPage() {
    const navigate = useNavigate();

    return (
        <div className="p-8 max-w-5xl mx-auto">
            <button
                onClick={() => navigate('/')}
                className="mb-6 px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-lg text-sm font-medium transition-colors cursor-pointer">
                ← Ana Sayfaya Dön
            </button>

            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                <h1 className="text-2xl font-bold text-slate-800 mb-2">Talep Yönetim Sistemi (İzinler)</h1>
                <p className="text-slate-500 mb-6">Buradan izin taleplerini görüntüleyebilir veya yeni talep açabilirsin.</p>

                <div className="border border-dashed border-slate-200 rounded-xl p-8 text-center text-slate-400">
                    İzin listesi ve form bileşenleri buraya gelecek.
                </div>
            </div>
        </div>
    );
}
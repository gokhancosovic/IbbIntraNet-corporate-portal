import React, { useEffect, useState } from 'react';

export default function CafeteriaMenuPage() {
    const [menu, setMenu] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTodayMenu = async () => {
            try {
                const token = localStorage.getItem('token');
                const res = await fetch('http://localhost:8080/api/food-menus/today', {
                    headers: {
                        'Content-Type': 'application/json',
                        ...(token ? { Authorization: `Bearer ${token}` } : {})
                    }
                });

                if (!res.ok) {
                    throw new Error('Bugün için yemek menüsü bulunamadı.');
                }

                const data = await res.json();
                setMenu(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchTodayMenu();
    }, []);

    return (
        <div className="p-8 max-w-4xl mx-auto">
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-slate-800">Günün Yemek Menüsü</h1>
                <p className="text-sm text-slate-500">Afiyet olsun! Bugün sunulan kurumsal menü detayları.</p>
            </div>

            {loading ? (
                <div className="p-8 text-center text-slate-400 bg-white rounded-xl shadow-sm border border-slate-200">
                    Menü yükleniyor...
                </div>
            ) : error ? (
                <div className="p-6 bg-amber-50 border border-amber-200 text-amber-700 rounded-xl">
                    {error}
                </div>
            ) : (
                <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
                    <div className="bg-indigo-600 text-white px-6 py-4 flex justify-between items-center">
                        <span className="font-semibold text-base">Tarih: {menu.menuDate}</span>
                        <span className="text-xs bg-indigo-700/80 px-3 py-1 rounded-full font-medium">Günün Menüsü</span>
                    </div>

                    <div className="divide-y divide-slate-100 p-2">
                        <div className="flex items-center justify-between p-4 hover:bg-slate-50 rounded-lg">
                            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Çorba</span>
                            <span className="text-base font-semibold text-slate-800">{menu.soup}</span>
                        </div>
                        <div className="flex items-center justify-between p-4 hover:bg-slate-50 rounded-lg">
                            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Ana Yemek</span>
                            <span className="text-base font-semibold text-slate-800">{menu.mainCourse}</span>
                        </div>
                        <div className="flex items-center justify-between p-4 hover:bg-slate-50 rounded-lg">
                            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Yardımcı Yemek</span>
                            <span className="text-base font-semibold text-slate-800">{menu.sideDish}</span>
                        </div>
                        <div className="flex items-center justify-between p-4 hover:bg-slate-50 rounded-lg">
                            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Tatlı / İçecek</span>
                            <span className="text-base font-semibold text-slate-800">{menu.dessertOrDrink}</span>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
import React, { useState } from 'react';
import { Cake, UserPlus, Send, Sparkles } from 'lucide-react';

export default function CelebrationWidget() {
    const [sentId, setSentId] = useState(null);

    const celebrations = [
        { id: 1, name: 'Selin Doğan', role: 'İş Analisti', dept: 'Yazılım Şube', type: 'birthday', avatar: 'SD' },
        { id: 2, name: 'Burak Demirtaş', role: 'Ağ Uzmanı', dept: 'Sistem Yönetimi', type: 'new_hire', avatar: 'BD' }
    ];

    const handleCongratulate = (id) => {
        setSentId(id);
        setTimeout(() => setSentId(null), 2500);
    };

    return (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <div className="flex items-center gap-2">
                    <div className="p-1.5 rounded-lg bg-amber-50 text-amber-600">
                        <Sparkles size={18} />
                    </div>
                    <h3 className="font-semibold text-slate-800 text-sm">Bizden Haberler & Kutlamalar</h3>
                </div>
            </div>

            <div className="space-y-3">
                {celebrations.map((person) => (
                    <div key={person.id} className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50 border border-slate-100">
                        <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-full bg-slate-200 text-slate-700 font-bold text-xs flex items-center justify-center">
                                {person.avatar}
                            </div>
                            <div>
                                <div className="flex items-center gap-1.5">
                                    <h4 className="text-xs font-semibold text-slate-800">{person.name}</h4>
                                    {person.type === 'birthday' ? (
                                        <Cake size={13} className="text-pink-500" title="Doğum Günü" />
                                    ) : (
                                        <UserPlus size={13} className="text-emerald-500" title="Aramıza Yeni Katıldı" />
                                    )}
                                </div>
                                <p className="text-[11px] text-slate-500">{person.dept} • {person.role}</p>
                            </div>
                        </div>

                        <button
                            onClick={() => handleCongratulate(person.id)}
                            className={`p-1.5 rounded-lg text-xs font-medium flex items-center gap-1 transition-all ${
                                sentId === person.id
                                    ? 'bg-emerald-600 text-white'
                                    : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100'
                            }`}
                        >
                            {sentId === person.id ? (
                                <>Kutlandı ✓</>
                            ) : (
                                <>
                                    <Send size={12} />
                                    <span className="hidden sm:inline">Tebrik Et</span>
                                </>
                            )}
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}
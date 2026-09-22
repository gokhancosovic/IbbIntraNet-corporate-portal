import React from 'react';
import { ShieldCheck, Target, Users, Landmark, Award } from 'lucide-react';

export default function Corporate() {
    return (
        <div className="p-8 max-w-6xl mx-auto space-y-8">
            {/* Başlık */}
            <div className="border-b pb-6">
                <h1 className="text-2xl font-bold text-slate-800">Kurumsal Yapı & Değerler</h1>
                <p className="text-sm text-slate-500">İstanbul Büyükşehir Belediyesi Portal Hizmetleri ve Kurumsal Kimlik</p>
            </div>

            {/* Vizyon - Misyon */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-3">
                    <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center">
                        <Target size={22} />
                    </div>
                    <h2 className="text-lg font-bold text-slate-800">Vizyonumuz</h2>
                    <p className="text-sm text-slate-600 leading-relaxed">
                        Adil, yeşil, yaratıcı ve dijital dönüşümünü tamamlamış, vatandaş ve çalışan memnuniyetini en üst düzeyde tutan, sürdürülebilir bir metropol yönetimi sağlamak.
                    </p>
                </div>

                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-3">
                    <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center">
                        <ShieldCheck size={22} />
                    </div>
                    <h2 className="text-lg font-bold text-slate-800">Misyonumuz</h2>
                    <p className="text-sm text-slate-600 leading-relaxed">
                        Şeffaf, liyakatli, teknolojiye ve ortak akla dayalı yönetim anlayışıyla belediyecilik ve kamu hizmetlerini kesintisiz ve yenilikçi çözümlerle üretmek.
                    </p>
                </div>
            </div>

            {/* Daire Başkanlıkları / Organizasyon */}
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
                <h3 className="font-bold text-slate-800 flex items-center gap-2">
                    <Landmark size={20} className="text-blue-700" />
                    Temel Hizmet Birimleri ve Daire Başkanlıkları
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 pt-2">
                    {[
                        'Bilgi İşlem Dairesi Başkanlığı',
                        'İnsan Kaynakları ve Eğitim Dairesi',
                        'Ulaşım Dairesi Başkanlığı',
                        'Çevre Koruma ve Kontrol Dairesi',
                        'Fen İşleri Dairesi Başkanlığı',
                        'Sosyal Hizmetler Dairesi'
                    ].map((dept, index) => (
                        <div key={index} className="p-3.5 bg-slate-50 border border-slate-100 rounded-lg text-xs font-semibold text-slate-700 flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                            {dept}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
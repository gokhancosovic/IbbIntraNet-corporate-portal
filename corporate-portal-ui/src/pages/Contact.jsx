import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2 } from 'lucide-react';

export default function Contact() {
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);
        setTimeout(() => setSubmitted(false), 4000);
    };

    return (
        <div className="p-8 max-w-6xl mx-auto space-y-8">
            <div className="border-b pb-6">
                <h1 className="text-2xl font-bold text-slate-800">İletişim & Destek Masası</h1>
                <p className="text-sm text-slate-500">Yerleşke bilgileri ve intranet içi teknik bildirim paneli</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Sol Panel: Adres ve Bilgiler */}
                <div className="space-y-4">
                    <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-3">
                        <h3 className="font-semibold text-slate-800 flex items-center gap-2">
                            <MapPin size={18} className="text-blue-700" /> Saraçhane Ana Hizmet Binası
                        </h3>
                        <p className="text-xs text-slate-600 leading-relaxed">
                            Kemalpaşa Mah. 15 Temmuz Şehitleri Cad. No:5 34134 Fatih / İstanbul
                        </p>
                    </div>

                    <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-3">
                        <h3 className="font-semibold text-slate-800 flex items-center gap-2">
                            <MapPin size={18} className="text-blue-700" /> Bakırköy Ek Hizmet Binası
                        </h3>
                        <p className="text-xs text-slate-600 leading-relaxed">
                            Osmaniye Mah. Koşuyolu Cad. No:51 34146 Bakırköy / İstanbul
                        </p>
                    </div>

                    <div className="bg-blue-900 text-white p-5 rounded-xl space-y-2.5">
                        <h4 className="text-sm font-bold flex items-center gap-2">
                            <Phone size={16} /> İntranet Dahili Destek Hattı
                        </h4>
                        <p className="text-xs text-blue-100">Portal arıza ve izin sistemi sorunları için:</p>
                        <p className="text-lg font-bold text-white tracking-wide">Dahili: 5555</p>
                    </div>
                </div>

                {/* Sağ Panel: Portal Destek Formu */}
                <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                    <h2 className="text-lg font-bold text-slate-800 mb-1">Dahili Portal Bildirim Formu</h2>
                    <p className="text-xs text-slate-500 mb-6">Sistem hataları, erişim izinleri veya önerileriniz için form oluşturun.</p>

                    {submitted ? (
                        <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-lg flex items-center gap-3 text-sm">
                            <CheckCircle2 size={20} className="text-emerald-600 flex-shrink-0" />
                            Talebiniz Bilgi İşlem Destek ekibine iletildi. Talep ID: #TK-8491
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="text-xs font-semibold text-slate-700 block mb-1">Konu Başlığı</label>
                                    <input
                                        required
                                        type="text"
                                        placeholder="Örn: İzin ekranı yetki hatası"
                                        className="w-full px-3.5 py-2 border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-blue-600 outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="text-xs font-semibold text-slate-700 block mb-1">Kategori</label>
                                    <select className="w-full px-3.5 py-2 border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-blue-600 outline-none bg-white">
                                        <option>Sistem Hatası (Bug)</option>
                                        <option>Yetki / Rol Talebi</option>
                                        <option>Öneri / Geliştirme</option>
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label className="text-xs font-semibold text-slate-700 block mb-1">Açıklama</label>
                                <textarea
                                    required
                                    rows={4}
                                    placeholder="Yaşadığınız durumu detaylandırın..."
                                    className="w-full px-3.5 py-2 border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-blue-600 outline-none"
                                ></textarea>
                            </div>

                            <button
                                type="submit"
                                className="px-5 py-2.5 bg-blue-700 hover:bg-blue-800 text-white font-semibold rounded-lg text-xs flex items-center gap-2 transition-colors shadow-sm"
                            >
                                <Send size={14} /> Talebi İlet
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
}
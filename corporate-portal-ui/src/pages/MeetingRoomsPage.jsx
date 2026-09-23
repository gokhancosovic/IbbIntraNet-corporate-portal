import React, { useState, useEffect } from 'react';
import {
    Building2,
    Calendar,
    Clock,
    Users,
    CheckCircle2,
    XCircle,
    Clock3,
    Plus,
    AlertCircle
} from 'lucide-react';

const ROOMS = [
    { id: 'marmara', name: 'Marmara Toplantı Salonu', capacity: 20, desc: 'Projeksiyon, Ses Sistemi, Video Konferans' },
    { id: 'halic', name: 'Haliç Çalışma Odası', capacity: 8, desc: 'Akıllı TV, Manyetik Yazı Tahtası' },
    { id: 'bogazici', name: 'Boğaziçi Konferans Salonu', capacity: 50, desc: 'Hibrit Kamera, Çift Kürsü, Simultane Sistem' }
];

export default function MeetingRoomsPage() {
    const [reservations, setReservations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isAdmin, setIsAdmin] = useState(false);

    // Form State
    const [formData, setFormData] = useState({
        title: '',
        roomName: ROOMS[0].name,
        reservationDate: new Date().toISOString().split('T')[0],
        startTime: '09:00',
        endTime: '10:00',
        participantCount: 4
    });
    const [submitting, setSubmitting] = useState(false);
    const [message, setMessage] = useState(null);

    const token = localStorage.getItem('token');
    const userRole = localStorage.getItem('role') || '';

    useEffect(() => {
        if (userRole.includes('ADMIN') || localStorage.getItem('isAdmin') === 'true') {
            setIsAdmin(true);
        }
        fetchReservations();
    }, []);

    const fetchReservations = async () => {
        setLoading(true);
        try {
            const endpoint = (userRole.includes('ADMIN') || localStorage.getItem('isAdmin') === 'true')
                ? 'http://localhost:8080/api/reservations'
                : 'http://localhost:8080/api/reservations/my';

            const res = await fetch(endpoint, {
                headers: {
                    'Content-Type': 'application/json',
                    ...(token ? { Authorization: `Bearer ${token}` } : {})
                }
            });
            if (!res.ok) throw new Error('API Hatası');
            const data = await res.json();
            setReservations(Array.isArray(data) ? data : []);
        } catch (err) {
            console.error('Rezervasyonlar çekilemedi:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleCreateReservation = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        setMessage(null);

        try {
            const res = await fetch('http://localhost:8080/api/reservations', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    ...(token ? { Authorization: `Bearer ${token}` } : {})
                },
                body: JSON.stringify(formData)
            });

            if (!res.ok) throw new Error('Kayıt başarısız');

            setMessage({ type: 'success', text: 'Rezervasyon talebiniz başarıyla iletildi.' });
            setFormData({
                title: '',
                roomName: ROOMS[0].name,
                reservationDate: new Date().toISOString().split('T')[0],
                startTime: '09:00',
                endTime: '10:00',
                participantCount: 4
            });
            fetchReservations();
        } catch (err) {
            setMessage({ type: 'error', text: 'Talep oluşturulurken bir hata meydana geldi.' });
        } finally {
            setSubmitting(false);
        }
    };

    const handleUpdateStatus = async (id, status) => {
        const adminNote = status === 'REJECTED'
            ? prompt('Reddetme gerekçesi belirtiniz (Opsiyonel):')
            : null;

        try {
            const res = await fetch(`http://localhost:8080/api/reservations/${id}/status`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    ...(token ? { Authorization: `Bearer ${token}` } : {})
                },
                body: JSON.stringify({ status, adminNote })
            });

            if (!res.ok) throw new Error('Güncelleme hatası');
            fetchReservations();
        } catch (err) {
            alert('İşlem gerçekleştirilemedi.');
        }
    };

    const getStatusBadge = (status) => {
        switch (status) {
            case 'APPROVED':
                return (
                    <span className="flex items-center gap-1 text-xs font-semibold px-2.5 py-1 bg-emerald-50 text-emerald-700 rounded-full border border-emerald-200">
            <CheckCircle2 className="w-3.5 h-3.5" /> Onaylandı
          </span>
                );
            case 'REJECTED':
                return (
                    <span className="flex items-center gap-1 text-xs font-semibold px-2.5 py-1 bg-rose-50 text-rose-700 rounded-full border border-rose-200">
            <XCircle className="w-3.5 h-3.5" /> Reddedildi
          </span>
                );
            default:
                return (
                    <span className="flex items-center gap-1 text-xs font-semibold px-2.5 py-1 bg-amber-50 text-amber-700 rounded-full border border-amber-200">
            <Clock3 className="w-3.5 h-3.5" /> Onay Bekliyor
          </span>
                );
        }
    };

    return (
        <div className="p-8 max-w-7xl mx-auto space-y-8">
            <div>
                <h1 className="text-2xl font-bold text-slate-800">Toplantı Salonu Rezervasyon Sistemi</h1>
                <p className="text-slate-500 text-sm mt-1">
                    Ekip toplantıları ve organizasyonlar için salon seçimi yapabilir, onay durumlarını takip edebilirsiniz.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Form Alanı */}
                <div className="lg:col-span-1 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm h-fit">
                    <div className="flex items-center gap-2 mb-5">
                        <Plus className="w-5 h-5 text-[#003366]" />
                        <h2 className="text-base font-bold text-slate-800">Yeni Rezervasyon Talebi</h2>
                    </div>

                    {message && (
                        <div className={`p-3 rounded-xl mb-4 text-xs font-medium flex items-center gap-2 ${
                            message.type === 'success' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-rose-50 text-rose-700 border border-rose-200'
                        }`}>
                            <AlertCircle className="w-4 h-4 shrink-0" />
                            <span>{message.text}</span>
                        </div>
                    )}

                    <form onSubmit={handleCreateReservation} className="space-y-4">
                        <div>
                            <label className="block text-xs font-semibold text-slate-600 mb-1">Toplantı Konusu / Birim</label>
                            <input
                                type="text"
                                required
                                placeholder="Örn: Haftalık Koordinasyon"
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                className="w-full text-xs p-2.5 border border-slate-200 rounded-lg focus:outline-none focus:border-[#003366]"
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-semibold text-slate-600 mb-1">Toplantı Salonu</label>
                            <select
                                value={formData.roomName}
                                onChange={(e) => setFormData({ ...formData, roomName: e.target.value })}
                                className="w-full text-xs p-2.5 border border-slate-200 rounded-lg focus:outline-none focus:border-[#003366] bg-white"
                            >
                                {ROOMS.map(r => (
                                    <option key={r.id} value={r.name}>{r.name} ({r.capacity} Kişilik)</option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block text-xs font-semibold text-slate-600 mb-1">Tarih</label>
                            <input
                                type="date"
                                required
                                value={formData.reservationDate}
                                onChange={(e) => setFormData({ ...formData, reservationDate: e.target.value })}
                                className="w-full text-xs p-2.5 border border-slate-200 rounded-lg focus:outline-none focus:border-[#003366]"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                            <div>
                                <label className="block text-xs font-semibold text-slate-600 mb-1">Başlangıç</label>
                                <input
                                    type="time"
                                    required
                                    value={formData.startTime}
                                    onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
                                    className="w-full text-xs p-2.5 border border-slate-200 rounded-lg focus:outline-none focus:border-[#003366]"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-slate-600 mb-1">Bitiş</label>
                                <input
                                    type="time"
                                    required
                                    value={formData.endTime}
                                    onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
                                    className="w-full text-xs p-2.5 border border-slate-200 rounded-lg focus:outline-none focus:border-[#003366]"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-semibold text-slate-600 mb-1">Katılımcı Sayısı</label>
                            <input
                                type="number"
                                min="1"
                                max="100"
                                value={formData.participantCount}
                                onChange={(e) => setFormData({ ...formData, participantCount: parseInt(e.target.value) || 1 })}
                                className="w-full text-xs p-2.5 border border-slate-200 rounded-lg focus:outline-none focus:border-[#003366]"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={submitting}
                            className="w-full py-2.5 bg-[#003366] text-white rounded-lg text-xs font-semibold hover:bg-[#002244] transition-colors cursor-pointer disabled:opacity-50 mt-2"
                        >
                            {submitting ? 'İletiliyor...' : 'Talep Oluştur'}
                        </button>
                    </form>
                </div>

                {/* Rezervasyon Listesi */}
                <div className="lg:col-span-2 space-y-4">
                    <div className="flex items-center justify-between">
                        <h2 className="text-base font-bold text-slate-800">
                            {isAdmin ? 'Tüm Rezervasyon Talepleri (Yönetici Paneli)' : 'Rezervasyon Taleplerim'}
                        </h2>
                        <span className="text-xs font-medium text-slate-400">
              {reservations.length} Kayıt
            </span>
                    </div>

                    {loading ? (
                        <div className="p-8 bg-white border border-slate-200 rounded-2xl text-center text-slate-400 text-xs">
                            Yükleniyor...
                        </div>
                    ) : reservations.length === 0 ? (
                        <div className="p-8 bg-white border border-slate-200 rounded-2xl text-center text-slate-500 text-xs">
                            Henüz oluşturulmuş bir rezervasyon bulunmuyor.
                        </div>
                    ) : (
                        <div className="space-y-3">
                            {reservations.map((res) => (
                                <div
                                    key={res.id}
                                    className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4"
                                >
                                    <div className="space-y-2">
                                        <div className="flex items-center gap-2">
                                            <span className="text-sm font-bold text-slate-800">{res.title}</span>
                                            {getStatusBadge(res.status)}
                                        </div>

                                        <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500">
                      <span className="flex items-center gap-1 font-medium text-[#003366]">
                        <Building2 className="w-3.5 h-3.5" /> {res.roomName}
                      </span>
                                            <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" /> {res.reservationDate}
                      </span>
                                            <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" /> {res.startTime} - {res.endTime}
                      </span>
                                            <span className="flex items-center gap-1">
                        <Users className="w-3.5 h-3.5" /> {res.participantCount} Kişi
                      </span>
                                        </div>

                                        {res.adminNote && (
                                            <p className="text-xs text-rose-600 bg-rose-50 px-2.5 py-1 rounded-md border border-rose-100 w-fit">
                                                Yönetici Notu: {res.adminNote}
                                            </p>
                                        )}
                                    </div>

                                    {isAdmin && res.status === 'PENDING' && (
                                        <div className="flex items-center gap-2 shrink-0">
                                            <button
                                                onClick={() => handleUpdateStatus(res.id, 'APPROVED')}
                                                className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold transition cursor-pointer"
                                            >
                                                Onayla
                                            </button>
                                            <button
                                                onClick={() => handleUpdateStatus(res.id, 'REJECTED')}
                                                className="px-3 py-1.5 bg-rose-600 hover:bg-rose-700 text-white rounded-lg text-xs font-semibold transition cursor-pointer"
                                            >
                                                Reddet
                                            </button>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
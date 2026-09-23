import React, { useEffect, useState } from 'react';
import { ticketService } from '../services/ticketService';
import CreateTicketModal from '../components/CreateTicketModal';
import { Plus, Clock, AlertCircle, CheckCircle2, XCircle } from 'lucide-react';

const STATUS_LABELS = {
    PENDING: {
        text: 'Beklemede',
        color: 'bg-amber-50 text-amber-700 border-amber-200',
        icon: <Clock className="w-3.5 h-3.5 text-amber-500" />
    },
    IN_PROGRESS: {
        text: 'İnceleniyor',
        color: 'bg-blue-50 text-blue-700 border-blue-200',
        icon: <AlertCircle className="w-3.5 h-3.5 text-blue-500" />
    },
    RESOLVED: {
        text: 'Çözüldü',
        color: 'bg-emerald-50 text-emerald-700 border-emerald-200',
        icon: <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
    },
    REJECTED: {
        text: 'Reddedildi / İptal',
        color: 'bg-rose-50 text-rose-700 border-rose-200',
        icon: <XCircle className="w-3.5 h-3.5 text-rose-500" />
    },
};

export default function HelpdeskPage() {
    const [tickets, setTickets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('ALL');
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Token içinden rol kontrolü
    let isAdmin = false;
    try {
        const token = localStorage.getItem('token');
        if (token) {
            const payload = JSON.parse(atob(token.split('.')[1]));
            const role = payload.role || payload.authorities || '';
            isAdmin = String(role).includes('ADMIN');
        }
    } catch (e) {
        isAdmin = false;
    }

    const fetchTickets = async () => {
        try {
            setLoading(true);
            // Admin ise sistemdeki tüm kayıtlar, normal çalışan ise sadece kendi açtığı kayıtlar gelir
            const data = isAdmin
                ? await ticketService.getAllTickets()
                : await ticketService.getMyTickets();
            setTickets(Array.isArray(data) ? data : []);
        } catch (err) {
            console.error('Talepler yüklenemedi:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTickets();
    }, [isAdmin]);

    const handleStatusChange = async (id, status) => {
        try {
            await ticketService.updateStatus(id, status);
            fetchTickets();
        } catch (err) {
            alert('Güncelleme sırasında hata oluştu: ' + err.message);
        }
    };

    const filteredTickets = tickets.filter((t) => {
        if (filter === 'ALL') return true;
        return t.status === filter;
    });

    return (
        <div className="max-w-7xl mx-auto p-6 space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-5">
                <div>
                    <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
                        <span>🛡️</span> IT Destek Masası (Helpdesk)
                    </h1>
                    <p className="text-sm text-slate-500">
                        {isAdmin
                            ? 'Personelden gelen teknik destek ve yetki taleplerini yönetin'
                            : 'Bilgi İşlem birimine açtığınız teknik destek ve yetki taleplerini takip edin'}
                    </p>
                </div>

                <div className="flex items-center gap-3">
                    {/* Talep Oluşturma Butonu (Her kullanıcı açabilir) */}
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="flex items-center gap-1.5 bg-[#003366] hover:bg-[#0b437e] text-white text-xs font-semibold px-4 py-2 rounded-xl transition shadow-sm cursor-pointer"
                    >
                        <Plus className="w-4 h-4" />
                        <span>Yeni Destek Talebi</span>
                    </button>

                    {/* Durum Filtreleri (Sadece Admin görür) */}
                    {isAdmin && (
                        <div className="flex items-center gap-1 bg-slate-100 p-1.5 rounded-xl text-xs font-semibold">
                            {[
                                { key: 'ALL', label: 'Tümü' },
                                { key: 'PENDING', label: 'Beklemede' },
                                { key: 'IN_PROGRESS', label: 'İnceleniyor' },
                                { key: 'RESOLVED', label: 'Çözüldü' },
                                { key: 'REJECTED', label: 'Reddedilen' },
                            ].map((item) => (
                                <button
                                    key={item.key}
                                    onClick={() => setFilter(item.key)}
                                    className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                                        filter === item.key
                                            ? 'bg-white text-slate-800 shadow-sm'
                                            : 'text-slate-600 hover:text-slate-900'
                                    }`}
                                >
                                    {item.label}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {loading ? (
                <div className="py-20 text-center text-slate-400 font-medium">Talepler yükleniyor...</div>
            ) : filteredTickets.length === 0 ? (
                <div className="py-16 text-center bg-white rounded-2xl border border-slate-100 shadow-sm space-y-3">
                    <p className="text-slate-500 font-medium text-sm">Bu filtreye uygun destek talebi bulunamadı.</p>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="text-xs text-[#003366] hover:underline font-semibold cursor-pointer"
                    >
                        İlk destek talebini oluşturun →
                    </button>
                </div>
            ) : (
                <div className="grid grid-cols-1 gap-4">
                    {filteredTickets.map((t) => {
                        const statusConfig = STATUS_LABELS[t.status] || STATUS_LABELS.PENDING;
                        return (
                            <div
                                key={t.id}
                                className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm hover:shadow transition-all space-y-3"
                            >
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
                                    <div className="flex items-center gap-3">
                                        <span className="text-xs font-bold text-slate-400">#{t.id}</span>
                                        <span className="text-xs font-medium bg-slate-100 text-slate-700 px-2.5 py-1 rounded-md">
                                            {t.category}
                                        </span>
                                        <h3 className="font-semibold text-slate-800 text-base">{t.title}</h3>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <span
                                            className={`flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full font-semibold border ${statusConfig.color}`}
                                        >
                                            {statusConfig.icon}
                                            {statusConfig.text}
                                        </span>
                                        <span className="text-xs text-slate-400">
                                            {new Date(t.createdAt).toLocaleDateString('tr-TR', {
                                                day: '2-digit',
                                                month: 'short',
                                                hour: '2-digit',
                                                minute: '2-digit',
                                            })}
                                        </span>
                                    </div>
                                </div>

                                <div className="text-sm text-slate-600 bg-slate-50 p-3.5 rounded-xl whitespace-pre-wrap">
                                    {t.description}
                                </div>

                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
                                    <div className="text-xs text-slate-500">
                                        <span className="font-medium text-slate-700">Talep Eden:</span>{' '}
                                        {t.createdByFullName || t.createdByUsername || 'Bilinmiyor'}
                                    </div>

                                    {/* Durum Değiştirme Butonları - SADECE ADMİN GÖRÜR */}
                                    {isAdmin && (
                                        <div className="flex items-center gap-2">
                                            {t.status === 'PENDING' && (
                                                <button
                                                    onClick={() => handleStatusChange(t.id, 'IN_PROGRESS')}
                                                    className="text-xs bg-blue-50 text-blue-600 hover:bg-blue-100 px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer"
                                                >
                                                    İncelemeye Al
                                                </button>
                                            )}
                                            {t.status !== 'RESOLVED' && (
                                                <button
                                                    onClick={() => handleStatusChange(t.id, 'RESOLVED')}
                                                    className="text-xs bg-emerald-50 text-emerald-600 hover:bg-emerald-100 px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer"
                                                >
                                                    ✓ Çözüldü
                                                </button>
                                            )}
                                            {t.status !== 'REJECTED' && (
                                                <button
                                                    onClick={() => handleStatusChange(t.id, 'REJECTED')}
                                                    className="text-xs bg-rose-50 text-rose-600 hover:bg-rose-100 px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer"
                                                >
                                                    ✕ Reddet
                                                </button>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}

            {/* Modal */}
            <CreateTicketModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSuccess={fetchTickets}
            />
        </div>
    );
}
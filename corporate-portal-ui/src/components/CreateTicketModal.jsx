import React, { useState } from 'react';
import { ticketService } from '../services/ticketService';

export default function CreateTicketModal({ isOpen, onClose, onSuccess }) {
    const [formData, setFormData] = useState({
        title: '',
        category: 'Donanım',
        description: '',
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    if (!isOpen) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            await ticketService.createTicket(formData);
            setFormData({ title: '', category: 'Donanım', description: '' });
            if (onSuccess) onSuccess();
            onClose();
        } catch (err) {
            setError(err.message || 'Talebiniz iletilirken bir hata oluştu');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-fade-in">
            <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden border border-slate-100">
                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-5 text-white flex justify-between items-center">
                    <div className="flex items-center gap-2">
                        <span className="text-2xl">🛠️</span>
                        <div>
                            <h3 className="font-bold text-lg">IT Destek Talebi Oluştur</h3>
                            <p className="text-xs text-blue-100">Bilgi İşlem birimine arıza veya destek kaydı iletin</p>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="text-white/80 hover:text-white text-xl font-bold p-1 rounded-lg hover:bg-white/10 transition-colors"
                    >
                        ✕
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    {error && (
                        <div className="bg-rose-50 text-rose-700 text-xs p-3 rounded-lg border border-rose-200">
                            {error}
                        </div>
                    )}

                    <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">Kategori</label>
                        <select
                            value={formData.category}
                            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                            className="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="Donanım">Donanım / Bilgisayar / Monitör</option>
                            <option value="Yazılım">Yazılım / Program / Lisans</option>
                            <option value="Ağ & İnternet">Ağ / Wi-Fi / VPN Erişimi</option>
                            <option value="Yazıcı">Yazıcı / Tarayıcı Arızası</option>
                            <option value="Yetki & Şifre">Kurumsal Hesap / Şifre Sıfırlama</option>
                            <option value="Diğer">Diğer Teknik Destek</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">Talep Başlığı</label>
                        <input
                            type="text"
                            required
                            placeholder="Örn: 2. Katta Wi-Fi bağlantısı sürekli kopuyor"
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            className="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">Açıklama / Detay</label>
                        <textarea
                            required
                            rows={4}
                            placeholder="Sorunu, cihaz kodunu veya çalıştığınız odayı belirtin..."
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            className="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                        />
                    </div>

                    <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 text-sm text-slate-600 hover:bg-slate-100 rounded-xl transition-colors font-medium"
                        >
                            Vazgeç
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="px-5 py-2 text-sm bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl transition-colors disabled:opacity-50"
                        >
                            {loading ? 'Gönderiliyor...' : 'Talebi İlet'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
import React, { useEffect, useState } from 'react';
import { Newspaper, Plus, Trash2, Calendar, ExternalLink } from 'lucide-react';

export default function NewsPage() {
    const [newsList, setNewsList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [title, setTitle] = useState('');
    const [summary, setSummary] = useState('');
    const [content, setContent] = useState('');
    const [imageUrl, setImageUrl] = useState('');

    // Token içinden rol kontrolü
    const token = localStorage.getItem('token');
    let isAdmin = false;

    if (token) {
        try {
            const payload = JSON.parse(atob(token.split('.')[1]));
            isAdmin = payload.role === 'ROLE_ADMIN';
        } catch (err) {
            console.error('Token çözülemedi:', err);
        }
    }

    const API_URL = 'http://localhost:8080/api/news';

    const getHeaders = () => {
        return {
            'Content-Type': 'application/json',
            ...(token ? { Authorization: `Bearer ${token}` } : {})
        };
    };

    const loadNews = async () => {
        try {
            const res = await fetch(API_URL, { headers: getHeaders() });
            if (res.ok) {
                const data = await res.json();
                setNewsList(data);
            }
        } catch (err) {
            console.error('Haberler çekilemedi:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadNews();
    }, []);

    const handleCreate = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch(API_URL, {
                method: 'POST',
                headers: getHeaders(),
                body: JSON.stringify({ title, summary, content, imageUrl })
            });

            if (res.ok) {
                setTitle('');
                setSummary('');
                setContent('');
                setImageUrl('');
                setShowModal(false);
                loadNews();
            } else {
                alert('Haber eklenemedi! Yetkinizi kontrol edin.');
            }
        } catch (err) {
            alert('Hata oluştu: ' + err.message);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Bu haberi silmek istediğinize emin misiniz?')) return;
        try {
            const res = await fetch(`${API_URL}/${id}`, {
                method: 'DELETE',
                headers: getHeaders()
            });
            if (res.ok) {
                loadNews();
            } else {
                alert('Silme başarısız!');
            }
        } catch (err) {
            alert('Hata oluştu: ' + err.message);
        }
    };

    return (
        <div className="p-6 max-w-6xl mx-auto">
            {/* Başlık ve Ekle Butonu */}
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
                        <Newspaper className="w-7 h-7 text-[#003366]" />
                        Kurumsal Haberler
                    </h1>
                    <p className="text-sm text-slate-500">Şirket içi ve sektörden güncel gelişmeler</p>
                </div>

                {/* Sadece Admin görür */}
                {isAdmin && (
                    <button
                        onClick={() => setShowModal(true)}
                        className="bg-[#003366] hover:bg-[#002244] text-white font-medium py-2.5 px-4 rounded-xl shadow-sm transition text-sm flex items-center gap-2 cursor-pointer"
                    >
                        <Plus className="w-4 h-4" />
                        Haber Ekle
                    </button>
                )}
            </div>

            {/* Liste Alanı */}
            {loading ? (
                <div className="text-slate-400 py-16 text-center">Haberler yükleniyor...</div>
            ) : newsList.length === 0 ? (
                <div className="bg-white border border-dashed border-slate-300 rounded-2xl p-12 text-center text-slate-400">
                    Henüz eklenmiş bir haber bulunmuyor.
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {newsList.map((item) => (
                        <div
                            key={item.id}
                            className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition flex flex-col justify-between"
                        >
                            <div>
                                {item.imageUrl ? (
                                    <img
                                        src={item.imageUrl}
                                        alt={item.title}
                                        className="w-full h-44 object-cover"
                                    />
                                ) : (
                                    <div className="w-full h-44 bg-slate-100 flex items-center justify-center text-slate-300">
                                        <Newspaper className="w-12 h-12" />
                                    </div>
                                )}
                                <div className="p-5">
                                    <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-2">
                                        <Calendar className="w-3.5 h-3.5" />
                                        <span>{item.createdAt ? new Date(item.createdAt).toLocaleDateString('tr-TR') : 'Güncel'}</span>
                                    </div>
                                    <h3 className="text-base font-semibold text-slate-800 line-clamp-2 mb-2">
                                        {item.title}
                                    </h3>
                                    <p className="text-sm text-slate-600 line-clamp-3">
                                        {item.summary || item.content}
                                    </p>
                                </div>
                            </div>

                            <div className="p-5 pt-0 border-t border-slate-100 mt-4 flex items-center justify-between">
                                <button
                                    onClick={() => alert(item.content)}
                                    className="text-xs font-semibold text-[#003366] hover:underline flex items-center gap-1 cursor-pointer"
                                >
                                    Devamını Oku
                                    <ExternalLink className="w-3.5 h-3.5" />
                                </button>

                                {/* Silme butonunu sadece Admin görür */}
                                {isAdmin && (
                                    <button
                                        onClick={() => handleDelete(item.id)}
                                        className="text-slate-400 hover:text-rose-600 transition p-1 cursor-pointer"
                                        title="Haberi Sil"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl">
                        <h3 className="text-lg font-bold text-slate-800 mb-4">Yeni Haber Ekle</h3>
                        <form onSubmit={handleCreate} className="space-y-4">
                            <div>
                                <label className="block text-xs font-semibold text-slate-600 mb-1">Haber Başlığı</label>
                                <input
                                    type="text"
                                    required
                                    placeholder="Başlık girin..."
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    className="w-full text-sm border border-slate-300 rounded-lg px-3 py-2 outline-none focus:border-[#003366]"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-slate-600 mb-1">Görsel URL (Opsiyonel)</label>
                                <input
                                    type="url"
                                    placeholder="https://images.unsplash.com/..."
                                    value={imageUrl}
                                    onChange={(e) => setImageUrl(e.target.value)}
                                    className="w-full text-sm border border-slate-300 rounded-lg px-3 py-2 outline-none focus:border-[#003366]"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-slate-600 mb-1">Kısa Özet</label>
                                <input
                                    type="text"
                                    placeholder="Kart üzerinde görünecek kısa özet..."
                                    value={summary}
                                    onChange={(e) => setSummary(e.target.value)}
                                    className="w-full text-sm border border-slate-300 rounded-lg px-3 py-2 outline-none focus:border-[#003366]"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-slate-600 mb-1">Detaylı İçerik</label>
                                <textarea
                                    required
                                    rows={4}
                                    placeholder="Haber metninin tamamı..."
                                    value={content}
                                    onChange={(e) => setContent(e.target.value)}
                                    className="w-full text-sm border border-slate-300 rounded-lg px-3 py-2 outline-none focus:border-[#003366]"
                                />
                            </div>

                            <div className="flex justify-end gap-3 pt-3 border-t border-slate-100">
                                <button
                                    type="button"
                                    onClick={() => setShowModal(false)}
                                    className="text-sm font-medium text-slate-600 px-4 py-2 hover:bg-slate-100 rounded-lg transition cursor-pointer"
                                >
                                    Vazgeç
                                </button>
                                <button
                                    type="submit"
                                    className="text-sm font-semibold bg-[#003366] hover:bg-[#002244] text-white px-5 py-2 rounded-lg transition shadow-sm cursor-pointer"
                                >
                                    Yayınla
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
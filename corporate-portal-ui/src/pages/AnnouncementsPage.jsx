import React, { useEffect, useState } from 'react';

export default function AnnouncementsPage() {
    const [announcements, setAnnouncements] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [isPinned, setIsPinned] = useState(false);

    // Token içinden rol bilgisini okuma
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

    const API_URL = 'http://localhost:8080/api/announcements';

    // Giriş yapılmışsa token'ı al
    const getHeaders = () => {
        return {
            'Content-Type': 'application/json',
            ...(token ? { Authorization: `Bearer ${token}` } : {})
        };
    };

    // 1. Duyuruları Backend'den Çek (GET)
    const loadAnnouncements = async () => {
        try {
            const res = await fetch(API_URL, { headers: getHeaders() });
            if (res.ok) {
                const data = await res.json();
                setAnnouncements(data);
            }
        } catch (err) {
            console.error('Duyurular çekilemedi:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadAnnouncements();
    }, []);

    // 2. Yeni Duyuru Ekle (POST)
    const handleCreate = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch(API_URL, {
                method: 'POST',
                headers: getHeaders(),
                body: JSON.stringify({ title, content, isPinned })
            });

            if (res.ok) {
                setTitle('');
                setContent('');
                setIsPinned(false);
                setShowModal(false);
                loadAnnouncements(); // Listeyi güncelle
            } else {
                alert('Duyuru eklenemedi! (Yetkiniz olmayabilir)');
            }
        } catch (err) {
            alert('Hata oluştu: ' + err.message);
        }
    };

    // 3. Duyuru Sil (DELETE)
    const handleDelete = async (id) => {
        if (!window.confirm('Bu duyuruyu silmek istediğinize emin misiniz?')) return;
        try {
            const res = await fetch(`${API_URL}/${id}`, {
                method: 'DELETE',
                headers: getHeaders()
            });

            if (res.ok) {
                loadAnnouncements();
            } else {
                alert('Silme başarısız! (Yalnızca Admin silebilir)');
            }
        } catch (err) {
            alert('Hata oluştu: ' + err.message);
        }
    };

    return (
        <div className="p-6 max-w-5xl mx-auto">
            {/* Üst Başlık ve Ekle Butonu */}
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-slate-800">Duyurular Panosu</h1>
                    <p className="text-sm text-slate-500">Şirket içi tüm güncel duyurular</p>
                </div>

                {/* Sadece ADMIN rolüne sahip olanlar görür */}
                {isAdmin && (
                    <button
                        onClick={() => setShowModal(true)}
                        className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg shadow-sm transition text-sm flex items-center gap-2 cursor-pointer"
                    >
                        <span>+</span> Yeni Duyuru Ekle
                    </button>
                )}
            </div>

            {/* Duyuru Listesi */}
            {loading ? (
                <div className="text-slate-400 py-10 text-center">Duyurular yükleniyor...</div>
            ) : announcements.length === 0 ? (
                <div className="bg-white border border-dashed border-slate-300 rounded-xl p-8 text-center text-slate-400">
                    Henüz yayınlanmış bir duyuru bulunmuyor.
                </div>
            ) : (
                <div className="grid gap-4">
                    {announcements.map((item) => (
                        <div
                            key={item.id}
                            className={`p-5 rounded-xl border transition shadow-sm ${
                                item.isPinned
                                    ? 'bg-amber-50/50 border-amber-200'
                                    : 'bg-white border-slate-200 hover:border-slate-300'
                            }`}
                        >
                            <div className="flex justify-between items-start gap-4">
                                <div className="space-y-1">
                                    <div className="flex items-center gap-2">
                                        {item.isPinned && (
                                            <span className="text-[11px] font-bold bg-amber-500 text-white px-2 py-0.5 rounded">
                                                SABİTLENDİ
                                            </span>
                                        )}
                                        <h3 className="text-base font-semibold text-slate-800">{item.title}</h3>
                                    </div>
                                    <p className="text-sm text-slate-600 whitespace-pre-line mt-2">{item.content}</p>
                                </div>

                                {/* Silme butonunu da sadece ADMIN görür */}
                                {isAdmin && (
                                    <button
                                        onClick={() => handleDelete(item.id)}
                                        className="text-slate-400 hover:text-rose-600 text-sm font-semibold p-1 transition cursor-pointer"
                                        title="Sil"
                                    >
                                        ✕
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Ekleme Modalı */}
            {showModal && (
                <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl">
                        <h3 className="text-lg font-bold text-slate-800 mb-4">Yeni Duyuru Oluştur</h3>
                        <form onSubmit={handleCreate} className="space-y-4">
                            <div>
                                <label className="block text-xs font-semibold text-slate-600 mb-1">Duyuru Başlığı</label>
                                <input
                                    type="text"
                                    required
                                    placeholder="Örn: Ofis İçi Bakım Çalışması"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    className="w-full text-sm border border-slate-300 rounded-lg px-3 py-2.5 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-slate-600 mb-1">Duyuru Metni</label>
                                <textarea
                                    required
                                    rows={4}
                                    placeholder="Duyurunun detaylarını buraya yazın..."
                                    value={content}
                                    onChange={(e) => setContent(e.target.value)}
                                    className="w-full text-sm border border-slate-300 rounded-lg px-3 py-2.5 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                                />
                            </div>

                            <div className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    id="pinned"
                                    checked={isPinned}
                                    onChange={(e) => setIsPinned(e.target.checked)}
                                    className="w-4 h-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                                />
                                <label htmlFor="pinned" className="text-sm text-slate-700 select-none">
                                    Bu duyuruyu en başa sabitle
                                </label>
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
                                    className="text-sm font-semibold bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-lg transition shadow-sm cursor-pointer"
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
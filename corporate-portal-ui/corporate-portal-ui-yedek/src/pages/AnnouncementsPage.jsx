import React, { useState, useEffect } from 'react';
import { Bell, Plus, Trash2, X, Pin } from 'lucide-react';

export default function Announcements() {
    const userRole = localStorage.getItem('role');
    const token = localStorage.getItem('token');
    const isAdmin = userRole === 'ADMIN' || userRole === 'ROLE_ADMIN';

    const [announcements, setAnnouncements] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [isPinned, setIsPinned] = useState(false);

    // Duyuruları Backend'den Çek
    const fetchAnnouncements = async () => {
        try {
            const res = await fetch('http://localhost:8080/api/announcements', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (res.ok) {
                const data = await res.json();
                setAnnouncements(data);
            }
        } catch (err) {
            console.error('Duyurular alınamadı:', err);
        }
    };

    useEffect(() => {
        fetchAnnouncements();
    }, []);

    // Yeni Duyuru Ekle (Sadece Admin)
    const handleCreate = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch('http://localhost:8080/api/announcements', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ title, content, isPinned })
            });

            if (res.ok) {
                setIsModalOpen(false);
                setTitle('');
                setContent('');
                setIsPinned(false);
                fetchAnnouncements();
            } else {
                alert('Duyuru eklenirken bir hata oluştu.');
            }
        } catch (err) {
            console.error('Hata:', err);
        }
    };

    return (
        <div className="p-8 max-w-5xl mx-auto flex flex-col gap-6">
            {/* Başlık ve Admin Butonu */}
            <div className="flex justify-between items-center pb-4 border-b border-slate-200">
                <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-[#003366] text-white rounded-xl">
                        <Bell className="w-5 h-5" />
                    </div>
                    <div>
                        <h1 className="text-xl font-bold text-slate-800">Kurumsal Duyurular</h1>
                        <p className="text-xs text-slate-500">Güncel şirket ve belediye içi bildirimler</p>
                    </div>
                </div>

                {/* Yalnızca Admin'e görünen buton */}
                {isAdmin && (
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="flex items-center gap-2 bg-[#003366] hover:bg-[#002244] text-white px-4 py-2.5 rounded-lg text-xs font-semibold shadow-sm transition-all"
                    >
                        <Plus className="w-4 h-4" />
                        Yeni Duyuru Ekle
                    </button>
                )}
            </div>

            {/* Duyuru Listesi */}
            <div className="flex flex-col gap-4">
                {announcements.length === 0 ? (
                    <div className="text-center py-12 text-slate-400 text-sm bg-white rounded-xl border border-slate-200">
                        Henüz yayında bir duyuru bulunmuyor.
                    </div>
                ) : (
                    announcements.map((item) => (
                        <div
                            key={item.id}
                            className={`p-5 bg-white border rounded-xl shadow-sm flex flex-col gap-2 transition-all ${
                                item.isPinned ? 'border-amber-300 bg-amber-50/20' : 'border-slate-200'
                            }`}
                        >
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    {item.isPinned && (
                                        <span className="flex items-center gap-1 text-[10px] font-bold text-amber-600 bg-amber-100 px-2 py-0.5 rounded">
                      <Pin className="w-3 h-3" /> Sabitlendi
                    </span>
                                    )}
                                    <h3 className="font-semibold text-slate-800 text-sm">{item.title}</h3>
                                </div>
                                <span className="text-[11px] text-slate-400">
                  {item.createdAt ? new Date(item.createdAt).toLocaleDateString('tr-TR') : ''}
                </span>
                            </div>
                            <p className="text-xs text-slate-600 leading-relaxed whitespace-pre-line">
                                {item.content}
                            </p>
                        </div>
                    ))
                )}
            </div>

            {/* Modal - Admin Ekleme Penceresi */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl w-full max-w-md p-6 shadow-xl border border-slate-200">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="font-bold text-slate-800 text-sm">Yeni Duyuru Yayınla</h3>
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="text-slate-400 hover:text-slate-600"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <form onSubmit={handleCreate} className="flex flex-col gap-4">
                            <div>
                                <label className="text-[11px] font-bold text-slate-600 uppercase tracking-wider block mb-1">
                                    Başlık
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    placeholder="Duyuru başlığını giriniz"
                                    className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:border-[#003366]"
                                />
                            </div>

                            <div>
                                <label className="text-[11px] font-bold text-slate-600 uppercase tracking-wider block mb-1">
                                    İçerik
                                </label>
                                <textarea
                                    required
                                    rows={4}
                                    value={content}
                                    onChange={(e) => setContent(e.target.value)}
                                    placeholder="Duyuru metnini detaylıca yazınız..."
                                    className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:border-[#003366] resize-none"
                                />
                            </div>

                            <div className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    id="pinCheck"
                                    checked={isPinned}
                                    onChange={(e) => setIsPinned(e.target.checked)}
                                    className="rounded border-slate-300 text-[#003366] focus:ring-0 cursor-pointer"
                                />
                                <label htmlFor="pinCheck" className="text-xs text-slate-700 cursor-pointer">
                                    Bu duyuruyu başa sabitle
                                </label>
                            </div>

                            <div className="flex justify-end gap-2 mt-2">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg"
                                >
                                    İptal
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 text-xs font-semibold bg-[#003366] text-white hover:bg-[#002244] rounded-lg shadow-sm"
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
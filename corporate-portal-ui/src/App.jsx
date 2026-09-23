import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import AnnouncementsPage from './pages/AnnouncementsPage';
import NewsPage from './pages/NewsPage';
import CafeteriaMenuPage from './pages/CafeteriaMenuPage';
import Directory from './pages/Directory';
import HelpdeskPage from './pages/HelpdeskPage';
import MeetingRoomsPage from './pages/MeetingRoomsPage';
import ProtectedRoute from './components/ProtectedRoute';

export default function App() {
    return (
        <Routes>
            {/* 1. GİRİŞ SAYFASI */}
            <Route path="/login" element={<Login />} />

            {/* 2. TÜM KORUMALI SAYFALAR (Navbar her zaman üstte kalır) */}
            <Route
                path="/*"
                element={
                    <ProtectedRoute>
                        <div className="min-h-screen bg-slate-100 font-sans text-slate-800 flex flex-col">
                            <Navbar />
                            <main className="flex-1 overflow-y-auto">
                                <Routes>
                                    {/* ANASAYFA (Slider, Hava Durumu, Kartlar) */}
                                    <Route path="/" element={<Dashboard />} />

                                    {/* TELEFON REHBERİ */}
                                    <Route path="/rehber" element={<Directory />} />
                                    <Route path="/directory" element={<Directory />} />
                                    <Route path="/kullanicilar" element={<Directory />} />

                                    {/* DUYURULAR */}
                                    <Route path="/duyurular" element={<AnnouncementsPage />} />
                                    <Route path="/announcements" element={<AnnouncementsPage />} />

                                    {/* HABERLER */}
                                    <Route path="/haberler" element={<NewsPage />} />
                                    <Route path="/news" element={<NewsPage />} />

                                    {/* YEMEK MENÜSÜ */}
                                    <Route path="/yemek-menusu" element={<CafeteriaMenuPage />} />
                                    <Route path="/cafeteria" element={<CafeteriaMenuPage />} />

                                    {/* IT DESTEK MASASI (HELPDESK) */}
                                    <Route path="/destek-masasi" element={<HelpdeskPage />} />
                                    <Route path="/helpdesk" element={<HelpdeskPage />} />

                                    {/* TOPLANTI SALONU REZERVASYONU */}
                                    <Route path="/rezervasyon" element={<MeetingRoomsPage />} />
                                    <Route path="/toplanti-salonu" element={<MeetingRoomsPage />} />
                                    <Route path="/meeting-rooms" element={<MeetingRoomsPage />} />

                                    {/* BULUNAMAYAN ROTALAR */}
                                    <Route path="*" element={<Navigate to="/" replace />} />
                                </Routes>
                            </main>
                        </div>
                    </ProtectedRoute>
                }
            />
        </Routes>
    );
}
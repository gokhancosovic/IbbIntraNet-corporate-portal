import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import AnnouncementsPage from './pages/AnnouncementsPage';
import NewsPage from './pages/NewsPage';
import ProtectedRoute from './components/ProtectedRoute';

export default function App() {
    return (
        <Routes>
            {/* 1. GİRİŞ SAYFASI */}
            <Route path="/login" element={<Login />} />

            {/* 2. KORUMALI PORTAL ALANI (Sadece token varsa girilir) */}
            <Route path="/*" element={
                <ProtectedRoute>
                    <div className="min-h-screen bg-slate-100 font-sans text-slate-800 flex flex-col">
                        <Navbar />
                        <main className="flex-1 overflow-y-auto">
                            <Routes>
                                <Route path="/" element={<Dashboard />} />
                                <Route path="/duyurular" element={<AnnouncementsPage />} />
                                <Route path="/announcements" element={<AnnouncementsPage />} />
                                <Route path="/haberler" element={<NewsPage />} />
                                <Route path="/news" element={<NewsPage />} />
                                <Route path="*" element={<Navigate to="/" replace />} />
                            </Routes>
                        </main>
                    </div>
                </ProtectedRoute>
            } />
        </Routes>
    );
}
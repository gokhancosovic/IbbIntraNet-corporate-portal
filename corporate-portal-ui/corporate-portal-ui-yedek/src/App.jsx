import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import UsersPage from './pages/UsersPage';

export default function App() {
    return (
        <div className="flex min-h-screen bg-slate-100 font-sans text-slate-800">
            <Sidebar />
            <div className="flex-1 flex flex-col min-w-0">
                <Navbar />
                <main className="flex-1 overflow-y-auto">
                    <Routes>
                        <Route path="/" element={<Dashboard />} />
                        <Route path="/kullanicilar" element={<UsersPage />} />
                        <Route path="/rehber" element={<UsersPage />} />
                        {/* Tanımsız veya yanlış bir URL yazılırsa ana sayfaya yönlendir */}
                        <Route path="*" element={<Navigate to="/" replace />} />
                    </Routes>
                </main>
            </div>
        </div>
    );
}
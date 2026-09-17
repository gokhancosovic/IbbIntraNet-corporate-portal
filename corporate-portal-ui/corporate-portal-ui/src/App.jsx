import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import LeaveRequestsPage from './pages/LeaveRequestsPage';
import CafeteriaMenuPage from './pages/CafeteriaMenuPage';
import AnnouncementsPage from './pages/AnnouncementsPage';

export default function App() {
    return (
        <BrowserRouter>
            <div className="flex min-h-screen bg-slate-100 font-sans text-slate-800">
                {/* Sol Dikey Menü */}
                <Sidebar />

                {/* Sağ Ana Gövde */}
                <div className="flex-1 flex flex-col min-w-0">
                    <Navbar />
                    <main className="flex-1 overflow-y-auto">
                        <Routes>
                            <Route path="/" element={<Dashboard />} />
                            <Route path="/talepler" element={<LeaveRequestsPage />} />
                            <Route path="/yemek-listesi" element={<CafeteriaMenuPage />} />
                            <Route path="/duyurular" element={<AnnouncementsPage />} />
                        </Routes>
                    </main>
                </div>
            </div>
        </BrowserRouter>
    );
}
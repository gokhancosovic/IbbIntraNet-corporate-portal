import React from 'react';
import { Link } from 'react-router-dom';
import { Search, LogOut } from 'lucide-react';

export default function Navbar() {
    const handleLogout = () => {
        localStorage.clear();
        sessionStorage.clear();
        window.location.replace("/login");
    };

    return (
        <header className="h-14 bg-white border-b border-slate-200 px-6 flex items-center justify-between sticky top-0 z-10 shadow-sm">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 cursor-pointer">
                <span className="font-black text-xl text-[#003366] tracking-tight">İBB</span>
                <span className="text-xs bg-[#c9282d] text-white font-bold px-1.5 py-0.5 rounded uppercase tracking-wider">
                    PORTAL
                </span>
                <span className="text-xs text-slate-400 font-light italic ml-1">Intranet</span>
            </Link>

            {/* Arama Çubuğu */}
            <div className="relative w-80">
                <input
                    type="text"
                    placeholder="Aradığınız Kelimeyi Giriniz"
                    className="w-full pl-9 pr-4 py-1.5 text-xs bg-slate-50 border border-slate-300 rounded-full focus:outline-none focus:border-[#003366] transition"
                />
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            </div>

            {/* Menü Linkleri & Çıkış */}
            <nav className="flex items-center gap-5">
                <Link to="/kurumsal" className="text-xs font-semibold text-slate-600 hover:text-[#003366] transition-colors">
                    Kurumsal
                </Link>
                <Link to="/haberler" className="text-xs font-semibold text-slate-600 hover:text-[#003366] transition-colors">
                    Haberler
                </Link>
                <Link to="/duyurular" className="text-xs font-semibold text-slate-600 hover:text-[#003366] transition-colors">
                    Duyurular
                </Link>
                <Link to="/cafeteria" className="text-xs font-semibold text-slate-600 hover:text-[#003366] transition-colors">
                    Yemek Menüsü
                </Link>
                <Link to="/rehber" className="text-xs font-semibold text-slate-600 hover:text-[#003366] transition-colors">
                    Rehber
                </Link>
                <Link to="/iletisim" className="text-xs font-semibold text-slate-600 hover:text-[#003366] transition-colors">
                    İletişim
                </Link>

                <div className="h-4 w-px bg-slate-200 mx-1"></div>

                <button
                    type="button"
                    onClick={handleLogout}
                    className="flex items-center gap-1.5 text-xs font-semibold text-red-600 hover:text-red-700 bg-red-50 hover:bg-red-100 px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
                >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Çıkış Yap</span>
                </button>
            </nav>
        </header>
    );
}
import React from 'react';
import { Link } from 'react-router-dom';
import { Search } from 'lucide-react';

export default function Navbar() {
    return (
        <header className="h-14 bg-white border-b border-slate-200 px-6 flex items-center justify-between sticky top-0 z-10">
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

            {/* Menü Linkleri */}
            <nav className="flex items-center gap-5">
                <Link to="/kurumsal" className="text-xs font-semibold text-slate-600 hover:text-[#003366] transition-colors">
                    Kurumsal
                </Link>
                <Link to="/duyurular" className="text-xs font-semibold text-slate-600 hover:text-[#003366] transition-colors">
                    Duyurular
                </Link>
                <Link to="/iletisim" className="text-xs font-semibold text-slate-600 hover:text-[#003366] transition-colors">
                    İletişim
                </Link>
            </nav>
        </header>
    );
}
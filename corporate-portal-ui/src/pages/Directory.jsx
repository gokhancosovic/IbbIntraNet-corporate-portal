import React, { useState, useEffect } from 'react';
import { Search, Phone, Mail, Building2, User } from 'lucide-react';
import api from '../api/axios';

export default function Directory() {
    const [employees, setEmployees] = useState([]);
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Backend'deki kullanıcıları listele
        api.get('/users')
            .then(res => {
                setEmployees(res.data);
                setLoading(false);
            })
            .catch(() => {
                // Test fallback verisi
                setEmployees([
                    { id: 1, firstName: 'Ahmet', lastName: 'Yılmaz', role: 'ADMIN', department: { name: 'Bilgi İşlem Dairesi' }, email: 'ahmet.yilmaz@ibb.gov.tr', ext: '1042' },
                    { id: 2, firstName: 'Gökhan', lastName: 'Albayrak', role: 'SOFTWARE_ENGINEER', department: { name: 'Yazılım Şube Müdürlüğü' }, email: 'gokhan.albayrak@ibb.gov.tr', ext: '2105' },
                    { id: 3, firstName: 'Elif', lastName: 'Demir', role: 'HR_SPECIALIST', department: { name: 'İnsan Kaynakları' }, email: 'elif.demir@ibb.gov.tr', ext: '3410' },
                    { id: 4, firstName: 'Mehmet', lastName: 'Kaya', role: 'MANAGER', department: { name: 'Destek Hizmetleri' }, email: 'mehmet.kaya@ibb.gov.tr', ext: '1580' }
                ]);
                setLoading(false);
            });
    }, []);

    const filtered = employees.filter(emp =>
        `${emp.firstName} ${emp.lastName}`.toLowerCase().includes(search.toLowerCase()) ||
        (emp.department?.name && emp.department.name.toLowerCase().includes(search.toLowerCase()))
    );

    return (
        <div className="p-8 max-w-7xl mx-auto space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b pb-6">
                <div>
                    <h1 className="text-2xl font-bold text-slate-800">Kurumsal Telefon Rehberi</h1>
                    <p className="text-sm text-slate-500">Çalışan dahili hatları ve departman iletişim bilgileri</p>
                </div>
                <div className="relative w-full md:w-80">
                    <Search className="absolute left-3 top-2.5 text-slate-400" size={18} />
                    <input
                        type="text"
                        placeholder="İsim veya departman ara..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 shadow-sm"
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {filtered.map((emp) => (
                    <div key={emp.id} className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow flex items-start gap-4">
                        <div className="w-12 h-12 rounded-full bg-blue-50 text-blue-700 flex items-center justify-center font-bold text-lg flex-shrink-0">
                            {emp.firstName?.[0]}{emp.lastName?.[0]}
                        </div>
                        <div className="space-y-1.5 flex-1 min-w-0">
                            <h3 className="font-semibold text-slate-800 truncate">{emp.firstName} {emp.lastName}</h3>
                            <p className="text-xs text-blue-700 font-medium">{emp.role}</p>

                            <div className="pt-2 space-y-1 text-xs text-slate-500">
                                <div className="flex items-center gap-2 truncate">
                                    <Building2 size={14} className="text-slate-400 flex-shrink-0" />
                                    <span className="truncate">{emp.department?.name || 'Genel Yönetim'}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Phone size={14} className="text-slate-400 flex-shrink-0" />
                                    <span>Dahili: <strong className="text-slate-700">{emp.ext || '1000'}</strong></span>
                                </div>
                                <div className="flex items-center gap-2 truncate">
                                    <Mail size={14} className="text-slate-400 flex-shrink-0" />
                                    <span className="truncate">{emp.email}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
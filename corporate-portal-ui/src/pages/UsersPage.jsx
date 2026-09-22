import React, { useState, useEffect } from 'react';
import { Users, Mail, Phone, Building } from 'lucide-react';

export default function UsersPage() {
    const [users, setUsers] = useState([
        { id: 1, name: 'Ahmet Yılmaz', title: 'Yazılım Mühendisi', department: 'Bilgi İşlem Dairesi', email: 'ahmet.yilmaz@ibb.gov.tr', ext: '1420' },
        { id: 2, name: 'Zeynep Kaya', title: 'İnsan Kaynakları Uzmanı', department: 'İnsan Kaynakları', email: 'zeynep.kaya@ibb.gov.tr', ext: '1105' },
        { id: 3, name: 'Mehmet Demir', title: 'Sistem Yöneticisi', department: 'Bilgi İşlem Dairesi', email: 'mehmet.demir@ibb.gov.tr', ext: '1425' },
        { id: 4, name: 'Ayşe Çelik', title: 'İdari İşler Şefi', department: 'Destek Hizmetleri', email: 'ayse.celik@ibb.gov.tr', ext: '1330' }
    ]);

    return (
        <div className="p-8 max-w-6xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
                <div className="p-2.5 bg-[#003366] text-white rounded-xl">
                    <Users className="w-6 h-6" />
                </div>
                <div>
                    <h1 className="text-2xl font-bold text-slate-800">Personel Listesi & Rehber</h1>
                    <p className="text-xs text-slate-500">Kurum içi aktif çalışan personeller ve iletişim bilgileri</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {users.map((user) => (
                    <div key={user.id} className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm hover:border-[#003366]/40 transition">
                        <h3 className="font-bold text-slate-800 text-base">{user.name}</h3>
                        <p className="text-xs font-medium text-[#003366] mb-3">{user.title}</p>

                        <div className="space-y-1.5 text-xs text-slate-600">
                            <div className="flex items-center gap-2">
                                <Building className="w-4 h-4 text-slate-400" />
                                <span>{user.department}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Mail className="w-4 h-4 text-slate-400" />
                                <span>{user.email}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Phone className="w-4 h-4 text-slate-400" />
                                <span>Dahili: <strong>{user.ext}</strong></span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
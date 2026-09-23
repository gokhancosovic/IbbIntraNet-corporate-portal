import React, { useState } from 'react';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, Clock, MapPin } from 'lucide-react';

export default function MiniCalendarWidget() {
    const [selectedDate, setSelectedDate] = useState('2026-09-23');

    const events = [
        { date: '2026-09-23', title: 'İş Sağlığı ve Güvenliği Eğitimi', time: '14:00', location: 'Kasımpaşa Konferans Salonu', tag: 'Zorunlu Eğitim' },
        { date: '2026-09-25', title: 'Yazılım Şube Çeyrek Sonu Değerlendirmesi', time: '10:30', location: 'Saraçhane B Blok Toplantı Odası 2', tag: 'Birim İçi' },
        { date: '2026-09-29', title: 'Veri Güvenliği ve KVKK Bilgilendirmesi', time: '11:00', location: 'Online (Teams)', tag: 'Seminer' }
    ];

    const currentEvents = events.filter(e => e.date === selectedDate);

    return (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <div className="flex items-center gap-2">
                    <div className="p-1.5 rounded-lg bg-blue-50 text-blue-600">
                        <CalendarIcon size={18} />
                    </div>
                    <h3 className="font-semibold text-slate-800 text-sm">Etkinlik & Toplantı Takvimi</h3>
                </div>
                <div className="flex items-center gap-1 text-slate-400">
                    <button className="p-1 hover:text-slate-700 hover:bg-slate-100 rounded"><ChevronLeft size={16} /></button>
                    <span className="text-xs font-semibold text-slate-700">Eylül 2026</span>
                    <button className="p-1 hover:text-slate-700 hover:bg-slate-100 rounded"><ChevronRight size={16} /></button>
                </div>
            </div>

            {/* Mini Gün Çizelgesi */}
            <div className="grid grid-cols-5 gap-1.5 text-center">
                {[
                    { day: 'Pzt', num: '21', date: '2026-09-21' },
                    { day: 'Sal', num: '22', date: '2026-09-22' },
                    { day: 'Çar', num: '23', date: '2026-09-23', hasEvent: true },
                    { day: 'Per', num: '24', date: '2026-09-24' },
                    { day: 'Cum', num: '25', date: '2026-09-25', hasEvent: true }
                ].map((item) => (
                    <button
                        key={item.date}
                        onClick={() => setSelectedDate(item.date)}
                        className={`py-2 px-1 rounded-lg flex flex-col items-center gap-1 transition-all ${
                            selectedDate === item.date
                                ? 'bg-blue-600 text-white shadow-sm'
                                : 'hover:bg-slate-100 text-slate-600'
                        }`}
                    >
                        <span className="text-[10px] uppercase font-medium">{item.day}</span>
                        <span className="text-xs font-bold">{item.num}</span>
                        {item.hasEvent && (
                            <span className={`w-1.5 h-1.5 rounded-full ${selectedDate === item.date ? 'bg-white' : 'bg-blue-600'}`} />
                        )}
                    </button>
                ))}
            </div>

            {/* Seçili Güne Ait Etkinlik Listesi */}
            <div className="space-y-2 pt-1">
                {currentEvents.length > 0 ? (
                    currentEvents.map((evt, idx) => (
                        <div key={idx} className="p-2.5 rounded-lg bg-slate-50 border border-slate-100 space-y-1.5">
                            <div className="flex items-center justify-between">
                                <span className="text-xs font-semibold text-slate-800">{evt.title}</span>
                                <span className="text-[10px] bg-blue-100 text-blue-700 font-medium px-2 py-0.5 rounded-full">
                                    {evt.tag}
                                </span>
                            </div>
                            <div className="flex items-center gap-3 text-[11px] text-slate-500">
                                <span className="flex items-center gap-1"><Clock size={12} /> {evt.time}</span>
                                <span className="flex items-center gap-1 truncate"><MapPin size={12} /> {evt.location}</span>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="py-4 text-center text-xs text-slate-400">
                        Bu tarihte planlanmış etkinlik bulunmuyor.
                    </div>
                )}
            </div>
        </div>
    );
}
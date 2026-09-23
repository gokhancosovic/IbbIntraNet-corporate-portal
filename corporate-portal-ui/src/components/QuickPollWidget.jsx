import React, { useState, useEffect } from 'react';
import { BarChart3, CheckCircle2 } from 'lucide-react';

export default function QuickPollWidget() {
    const [voted, setVoted] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);
    const [options, setOptions] = useState([
        { id: 1, text: 'Yeni portal arayüzü çok başarılı', votes: 42 },
        { id: 2, text: 'Eskiye göre daha pratik, beğendim', votes: 28 },
        { id: 3, text: 'Geliştirilmesi gereken yerler var', votes: 6 }
    ]);

    useEffect(() => {
        const savedVote = localStorage.getItem('portal_poll_voted');
        if (savedVote) {
            setVoted(true);
            setSelectedOption(Number(savedVote));
        }
    }, []);

    const totalVotes = options.reduce((sum, opt) => sum + opt.votes, 0);

    const handleVote = (id) => {
        if (voted) return;
        setOptions(prev => prev.map(opt => opt.id === id ? { ...opt, votes: opt.votes + 1 } : opt));
        setVoted(true);
        setSelectedOption(id);
        localStorage.setItem('portal_poll_voted', id);
    };

    return (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <div className="flex items-center gap-2">
                    <div className="p-1.5 rounded-lg bg-indigo-50 text-indigo-600">
                        <BarChart3 size={18} />
                    </div>
                    <h3 className="font-semibold text-slate-800 text-sm">Günün Anketi</h3>
                </div>
                <span className="text-[11px] bg-indigo-100 text-indigo-700 font-semibold px-2 py-0.5 rounded-full">
                    {totalVotes} Katılım
                </span>
            </div>

            <p className="text-xs font-medium text-slate-700">
                Yeni Kurumsal Portal tasarımını ve erişim hızını nasıl buldunuz?
            </p>

            <div className="space-y-2">
                {options.map((opt) => {
                    const percentage = Math.round((opt.votes / totalVotes) * 100) || 0;
                    const isSelected = selectedOption === opt.id;

                    return (
                        <div key={opt.id} className="relative">
                            <button
                                disabled={voted}
                                onClick={() => handleVote(opt.id)}
                                className={`w-full text-left p-2.5 rounded-lg border text-xs transition-all relative overflow-hidden flex items-center justify-between z-10 ${
                                    isSelected
                                        ? 'border-indigo-500 bg-indigo-50/50 font-medium text-indigo-900'
                                        : 'border-slate-200 hover:border-slate-300 text-slate-700 bg-white/70'
                                }`}
                            >
                                <span className="flex items-center gap-1.5 z-20">
                                    {isSelected && <CheckCircle2 size={13} className="text-indigo-600" />}
                                    {opt.text}
                                </span>
                                {voted && (
                                    <span className="text-[11px] font-bold text-slate-600 z-20">
                                        %{percentage}
                                    </span>
                                )}
                            </button>

                            {voted && (
                                <div
                                    className="absolute left-0 top-0 bottom-0 bg-indigo-100/60 rounded-lg transition-all duration-700"
                                    style={{ width: `${percentage}%` }}
                                />
                            )}
                        </div>
                    );
                })}
            </div>
            {voted && (
                <p className="text-[11px] text-center text-slate-400">Oyunuz kaydedildi, teşekkürler!</p>
            )}
        </div>
    );
}
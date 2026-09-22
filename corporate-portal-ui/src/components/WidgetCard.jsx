import React, { useState, useEffect } from "react";
import axios from "axios";

export default function RightWidget() {
    const [rates, setRates] = useState({ usd: "--", eur: "--" });
    const [weather, setWeather] = useState({
        city: "İstanbul",
        temperature: "--",
        description: "Yükleniyor..."
    });

    // Bugünün güncel tarihi ve gün adı
    const today = new Date();
    const formattedDate = today.toLocaleDateString("tr-TR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric"
    });
    const dayName = today.toLocaleDateString("tr-TR", { weekday: "long" });

    useEffect(() => {
        // Backend'deki hava durumunu çek
        axios.get("http://localhost:8080/api/widgets/weather")
            .then(res => {
                if (res.data) setWeather(res.data);
            })
            .catch(err => console.error("Hava durumu hatası:", err));

        // Backend'deki döviz kurlarını çek
        axios.get("http://localhost:8080/api/widgets/exchange-rates")
            .then(res => {
                if (res.data) setRates(res.data);
            })
            .catch(err => console.error("Kur hatası:", err));
    }, []);

    return (
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm space-y-4">
            {/* Hava Durumu */}
            <div className="flex justify-between items-start">
                <div>
                    <h4 className="text-xs font-semibold text-slate-500 uppercase">Hava Durumu</h4>
                    <p className="text-xs text-slate-400 mt-0.5">{formattedDate}</p>
                    <p className="text-xs font-medium text-slate-600">{dayName}</p>
                </div>
                <div className="text-right">
          <span className="text-2xl font-bold text-slate-800">
            {weather.temperature !== "--" ? `${weather.temperature} °C` : "--"}
          </span>
                    <p className="text-xs text-slate-500 capitalize">{weather.description}</p>
                </div>
            </div>

            <hr className="border-slate-100" />

            {/* Döviz Kurları */}
            <div>
                <h4 className="text-xs font-semibold text-slate-500 uppercase mb-2">Döviz Kuru</h4>
                <div className="grid grid-cols-2 gap-2 text-center text-xs">
                    <div className="p-2 bg-slate-50 rounded-lg">
                        <span className="text-slate-400 block text-[10px]">DOLAR</span>
                        <span className="font-bold text-slate-700">{rates.usd || "--"}</span>
                    </div>
                    <div className="p-2 bg-slate-50 rounded-lg">
                        <span className="text-slate-400 block text-[10px]">EURO</span>
                        <span className="font-bold text-slate-700">{rates.eur || "--"}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
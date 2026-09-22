import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function BannerSlider() {
    const [slides, setSlides] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        fetch("http://localhost:8080/api/sliders")
            .then((res) => (res.ok ? res.json() : []))
            .then((data) => {
                if (data && data.length > 0) {
                    setSlides(data);
                }
            })
            .catch((err) => console.error("Slider verisi alınamadı:", err));
    }, []);

    // 6 saniyede bir otomatik geçiş
    useEffect(() => {
        if (slides.length <= 1) return;
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % slides.length);
        }, 6000);
        return () => clearInterval(interval);
    }, [slides.length]);

    if (slides.length === 0) return null;

    const prevSlide = () => {
        setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
    };

    const nextSlide = () => {
        setCurrentIndex((prev) => (prev + 1) % slides.length);
    };

    const current = slides[currentIndex];

    return (
        <div className="relative w-full h-64 md:h-72 rounded-2xl overflow-hidden shadow-sm border border-slate-200 bg-slate-900 group select-none">
            {/* Arka Plan Görseli */}
            <img
                src={current.imageUrl}
                alt={current.title}
                className="w-full h-full object-cover transition-all duration-700 opacity-90 group-hover:scale-105"
            />

            {/* Karartma Gradyanı & Metin Alanı */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent flex flex-col justify-end p-6 md:p-8">
                <h2 className="text-xl md:text-2xl font-bold text-white mb-2 tracking-wide drop-shadow">
                    {current.title}
                </h2>
                {current.description && (
                    <p className="text-xs md:text-sm text-slate-200 line-clamp-2 max-w-2xl drop-shadow">
                        {current.description}
                    </p>
                )}
            </div>

            {/* Sol Ok Butonu */}
            <button
                type="button"
                onClick={prevSlide}
                aria-label="Önceki Slayt"
                className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/40 hover:bg-black/75 text-white flex items-center justify-center backdrop-blur-sm transition-all duration-200 z-20 cursor-pointer hover:scale-110 opacity-80 group-hover:opacity-100"
            >
                <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Sağ Ok Butonu */}
            <button
                type="button"
                onClick={nextSlide}
                aria-label="Sonraki Slayt"
                className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/40 hover:bg-black/75 text-white flex items-center justify-center backdrop-blur-sm transition-all duration-200 z-20 cursor-pointer hover:scale-110 opacity-80 group-hover:opacity-100"
            >
                <ChevronRight className="w-5 h-5" />
            </button>

            {/* Alt Navigasyon Noktaları (Dots) */}
            <div className="absolute bottom-4 right-6 flex items-center gap-1.5 z-20">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        type="button"
                        onClick={() => setCurrentIndex(index)}
                        className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                            currentIndex === index ? "w-6 bg-white" : "w-2 bg-white/40 hover:bg-white/70"
                        }`}
                    />
                ))}
            </div>
        </div>
    );
}
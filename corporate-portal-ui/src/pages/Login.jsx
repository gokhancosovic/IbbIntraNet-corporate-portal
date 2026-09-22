import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const response = await fetch('http://localhost:8080/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            if (!response.ok) {
                throw new Error('Kullanıcı adı veya şifre hatalı!');
            }

            const data = await response.json();

            // Gelen bilgileri kaydet
            localStorage.setItem('token', data.token || 'auth-token');
            if (data.role) localStorage.setItem('role', data.role);
            if (data.username) localStorage.setItem('username', data.username);

            // Giriş başarılı olunca portala yönlendir
            navigate('/');
        } catch (err) {
            setError(err.message || 'Giriş işlemi başarısız');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 w-full max-w-md">
                <div className="text-center mb-6">
                    <div className="inline-flex items-center gap-2 mb-2">
                        <span className="font-black text-2xl text-[#003366] tracking-tight">İBB</span>
                        <span className="text-xs bg-[#c9282d] text-white font-bold px-2 py-0.5 rounded uppercase tracking-wider">
                            PORTAL
                        </span>
                    </div>
                    <p className="text-xs text-slate-500">Lütfen kurumsal kimliğinizle giriş yapınız</p>
                </div>

                {error && (
                    <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 text-xs rounded-lg text-center font-medium">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                            Kullanıcı Adı
                        </label>
                        <input
                            type="text"
                            required
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:border-[#003366] transition"
                            placeholder="admin"
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                            Şifre
                        </label>
                        <input
                            type="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:border-[#003366] transition"
                            placeholder="••••••••"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full mt-2 bg-[#003366] hover:bg-[#002850] text-white py-2.5 rounded-lg text-sm font-semibold transition disabled:opacity-50 cursor-pointer shadow-sm"
                    >
                        {loading ? 'Giriş Yapılıyor...' : 'Sisteme Gir'}
                    </button>
                </form>
            </div>
        </div>
    );
}
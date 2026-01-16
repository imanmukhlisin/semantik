import { Head, Link } from '@inertiajs/react';
import { useState, useEffect } from 'react';

export default function Welcome({ auth }) {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const stats = [
        { label: 'Total Skripsi', value: '1.2k+', icon: '📚' },
        { label: 'Pengguna Aktif', value: '850+', icon: '👥' },
        { label: 'Koneksi Data', value: '15k+', icon: '🕸️' },
        { label: 'Akurasi Pencarian', value: '99%', icon: '🚀' },
    ];

    const roles = [
        {
            name: 'Admin',
            icon: '👨‍💼',
            description: 'Manajemen sistem & akses pengguna secara menyeluruh.',
            color: 'from-purple-500 to-indigo-600',
        },
        {
            name: 'Dosen',
            icon: '👨‍🏫',
            description: 'Akses repository lengkap untuk bimbingan & riset.',
            color: 'from-blue-500 to-blue-600',
        },
        {
            name: 'Mahasiswa',
            icon: '🎓',
            description: 'Cari & unduh referensi skripsi berkualitas.',
            color: 'from-pink-500 to-rose-600',
        }
    ];

    return (
        <div className="min-h-screen bg-slate-50 font-sans selection:bg-pink-100 selection:text-pink-600">
            <Head title="Welcome - Repository Skripsi Berbasis Web Semantik" />

            {/* Floating Navbar */}
            <nav className={`fixed w-full z-50 transition-all duration-500 ${scrolled ? 'py-4 bg-white/80 backdrop-blur-md shadow-lg' : 'py-6 bg-transparent'
                }`}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center gap-3 group cursor-pointer">
                            <div className="relative">
                                <img src="/BinaInsan.png" alt="Logo" className="h-10 w-auto transition-transform group-hover:rotate-12" />
                            </div>
                            <div>
                                <h1 className={`text-xl font-bold tracking-tight transition-colors ${scrolled ? 'text-gray-900' : 'text-white'}`}>
                                    Semantik<span className="text-pink-500">BI</span>
                                </h1>
                                <p className={`text-[10px] uppercase tracking-widest font-bold ${scrolled ? 'text-gray-500' : 'text-white/70'}`}>
                                    Repository Skripsi
                                </p>
                            </div>
                        </div>

                        <div className="hidden md:flex items-center gap-8">
                            <a href="#features" className={`text-sm font-semibold hover:text-pink-500 transition-colors ${scrolled ? 'text-gray-600' : 'text-white/90'}`}>Fitur</a>
                            <a href="#about" className={`text-sm font-semibold hover:text-pink-500 transition-colors ${scrolled ? 'text-gray-600' : 'text-white/90'}`}>Tentang</a>
                            {auth.user ? (
                                <Link
                                    href={route(auth.user.role === 'admin' ? 'admin.dashboard' : auth.user.role === 'dosen' ? 'dosen.dashboard' : 'mahasiswa.dashboard')}
                                    className="px-6 py-2.5 bg-pink-600 text-white rounded-full font-bold text-sm shadow-lg shadow-pink-500/30 hover:bg-pink-700 hover:scale-105 transition-all"
                                >
                                    Dashboard
                                </Link>
                            ) : (
                                <Link
                                    href={route('login')}
                                    className={`px-6 py-2.5 rounded-full font-bold text-sm border-2 transition-all ${scrolled
                                        ? 'border-pink-600 text-pink-600 hover:bg-pink-600 hover:text-white'
                                        : 'border-white text-white hover:bg-white hover:text-pink-600'
                                        }`}
                                >
                                    Masuk Ke Sistem
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-slate-900">
                {/* Background Image with Overlay */}
                <div className="absolute inset-0 z-0">
                    <img
                        src="/assets/images/hero.png"
                        alt="Hero background"
                        className="w-full h-full object-cover opacity-40 scale-105 animate-pulse-slow"
                    />
                    <div className="absolute inset-0 bg-gradient-to-tr from-slate-900 via-slate-900/80 to-transparent"></div>
                </div>

                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                    <div className="max-w-3xl animate-fade-in-up">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-500/10 border border-pink-500/20 text-pink-400 text-xs font-bold uppercase tracking-wider mb-6">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-pink-500"></span>
                            </span>
                            Smart Academic Repository v2.0
                        </div>
                        <h1 className="text-5xl md:text-7xl font-extrabold text-white leading-tight mb-6">
                            Kelola Pengetahuan dengan <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-rose-500">Web Semantik.</span>
                        </h1>
                        <p className="text-lg md:text-xl text-slate-300 mb-10 leading-relaxed font-medium">
                            Platform modern untuk mengelola, mencari, dan menganalisis repository skripsi menggunakan teknologi <span className="text-pink-400 font-bold underline decoration-pink-500/30">Semantic Web</span> untuk hasil yang lebih presisi dan terintegrasi.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <Link
                                href={auth.user 
                                    ? (auth.user.role === 'admin' ? route('admin.dashboard') : auth.user.role === 'dosen' ? route('dosen.dashboard') : route('mahasiswa.dashboard'))
                                    : route('login')
                                }
                                className="px-8 py-4 bg-gradient-to-r from-pink-600 to-rose-600 text-white rounded-2xl font-bold text-lg shadow-xl shadow-pink-600/20 hover:scale-105 hover:shadow-2xl hover:shadow-pink-600/30 active:scale-95 transition-all text-center"
                            >
                                {auth.user ? 'Ke Dashboard' : 'Mulai Sekarang'}
                            </Link>
                            <a
                                href="#about"
                                className="px-8 py-4 bg-white/5 border border-white/10 text-white rounded-2xl font-bold text-lg hover:bg-white/10 active:scale-95 transition-all text-center backdrop-blur-sm"
                            >
                                Pelajari Lebih Lanjut
                            </a>
                        </div>
                    </div>
                </div>

                {/* Decorative Elements */}
                <div className="absolute -bottom-1 left-0 right-0 h-32 bg-gradient-to-t from-slate-50 to-transparent"></div>
            </section>

            {/* Stats Section */}
            <section className="relative z-20 -mt-16 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    {stats.map((stat, i) => (
                        <div key={i} className="glass-card bg-white/70 backdrop-blur-xl p-8 rounded-3xl shadow-xl shadow-slate-200/50 border border-white animate-slide-up" style={{ animationDelay: `${i * 100}ms` }}>
                            <div className="text-3xl mb-2">{stat.icon}</div>
                            <div className="text-3xl font-black text-slate-900 mb-1">{stat.value}</div>
                            <div className="text-xs font-bold text-slate-500 uppercase tracking-widest">{stat.label}</div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Role & Ecosystem Section */}
            <section id="features" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-pink-600 font-bold text-sm uppercase tracking-widest mb-4">Ekosistem Digital</h2>
                    <h3 className="text-4xl font-black text-slate-900">Platform Terintegrasi Untuk Semua</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {roles.map((role, i) => (
                        <div key={i} className="group relative p-10 bg-white rounded-3xl border border-slate-100 hover:border-pink-200 shadow-sm hover:shadow-2xl transition-all duration-500">
                            <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${role.color} flex items-center justify-center text-3xl mb-8 shadow-lg transition-transform group-hover:scale-110 group-hover:rotate-3`}>
                                {role.icon}
                            </div>
                            <h4 className="text-2xl font-bold text-slate-900 mb-4">{role.name}</h4>
                            <p className="text-slate-600 leading-relaxed mb-6 font-medium">
                                {role.description}
                            </p>
                            <div className="h-1 w-12 bg-slate-100 group-hover:w-full group-hover:bg-pink-200 transition-all duration-500"></div>
                        </div>
                    ))}
                </div>
            </section>

            {/* About / Technology Section */}
            <section id="about" className="py-24 bg-slate-900 text-white overflow-hidden relative">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10 pointer-events-none">
                    <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                        <path d="M0 50 Q 25 25 50 50 T 100 50" stroke="currentColor" fill="none" strokeWidth="0.1" />
                        <path d="M0 30 Q 25 5 50 30 T 100 30" stroke="currentColor" fill="none" strokeWidth="0.1" />
                        <path d="M0 70 Q 25 45 50 70 T 100 70" stroke="currentColor" fill="none" strokeWidth="0.1" />
                    </svg>
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div className="animate-fade-in">
                            <h2 className="text-pink-500 font-bold text-sm uppercase tracking-widest mb-4">Teknologi Masa Depan</h2>
                            <h3 className="text-4xl md:text-5xl font-black mb-8 leading-tight">Mengapa Web Semantik?</h3>
                            <p className="text-slate-400 text-lg leading-relaxed mb-8">
                                Berbeda dengan pencarian tradisional yang hanya mencocokkan kata kunci, <span className="text-white font-bold">Web Semantik</span> memungkinkan komputer memahami konteks dan relasi antar data skripsi secara cerdas.
                            </p>
                            <div className="space-y-6">
                                {[
                                    { title: 'Relasi Data', desc: 'Menghubungkan tema skripsi yang serupa secara otomatis.', icon: '🔗' },
                                    { title: 'Akurasi Tinggi', desc: 'Meningkatkan relevansi hasil pencarian hingga 80%.', icon: '🎯' },
                                    { title: 'Struktur Standar', desc: 'Menggunakan format RDF/Linked Data yang universal.', icon: '🏗️' }
                                ].map((item, i) => (
                                    <div key={i} className="flex gap-4">
                                        <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-xl">
                                            {item.icon}
                                        </div>
                                        <div>
                                            <h5 className="font-bold text-white mb-1">{item.title}</h5>
                                            <p className="text-sm text-slate-500 leading-relaxed font-medium">{item.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="relative">
                            <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-pink-500/10 border border-white/5 group">
                                <img
                                    src="/assets/images/hero.png"
                                    className="w-full h-auto transition-transform duration-700 group-hover:scale-110"
                                    alt="Technology Visualization"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent"></div>
                                <div className="absolute bottom-8 left-8 right-8 p-6 bg-white/10 backdrop-blur-md rounded-2xl border border-white/10">
                                    <p className="text-sm italic font-medium">"Data is not just a bunch of numbers, it's the foundation of a new academic era."</p>
                                </div>
                            </div>

                            {/* Floating Card */}
                            <div className="absolute -top-6 -right-6 hidden lg:block p-6 bg-pink-600 rounded-2xl shadow-2xl animate-bounce-slow">
                                <div className="text-2xl font-black">99.9%</div>
                                <div className="text-[10px] font-bold uppercase tracking-widest text-pink-200">System Linkage</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-white pt-20 pb-10 border-t border-slate-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
                        <div className="col-span-1 md:col-span-2">
                            <div className="flex items-center gap-3 mb-6">
                                <img src="/BinaInsan.png" alt="Logo" className="h-10 w-auto" />
                                <h1 className="text-2xl font-black tracking-tight text-slate-900">
                                    Semantik<span className="text-pink-600">BI</span>
                                </h1>
                            </div>
                            <p className="text-slate-500 max-w-sm font-medium leading-relaxed">
                                Solusi cerdas untuk manajemen repository karya ilmiah mahasiswa. Menghubungkan riset untuk masa depan yang lebih baik.
                            </p>
                        </div>
                        <div>
                            <h6 className="font-bold text-slate-900 uppercase tracking-widest mb-6 text-xs">Pintasan</h6>
                            <ul className="space-y-4">
                                <li><a href="#" className="text-sm font-bold text-slate-500 hover:text-pink-600 transition-colors">Beranda</a></li>
                                <li><a href="#features" className="text-sm font-bold text-slate-500 hover:text-pink-600 transition-colors">Fitur Utama</a></li>
                                <li><a href="#about" className="text-sm font-bold text-slate-500 hover:text-pink-600 transition-colors">Teknologi</a></li>
                            </ul>
                        </div>
                        <div>
                            <h6 className="font-bold text-slate-900 uppercase tracking-widest mb-6 text-xs">Platform</h6>
                            <ul className="space-y-4">
                                <li><Link href={route('login')} className="text-sm font-bold text-slate-500 hover:text-pink-600 transition-colors">Login Admin</Link></li>
                                <li><Link href={route('register')} className="text-sm font-bold text-slate-500 hover:text-pink-600 transition-colors">Daftar Mahasiswa</Link></li>
                                <li><Link href={route('dosen.register')} className="text-sm font-bold text-slate-500 hover:text-pink-600 transition-colors">Daftar Dosen</Link></li>
                            </ul>
                        </div>
                    </div>

                    <div className="pt-8 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-sm font-bold text-slate-400 text-center md:text-left">
                            © 2025 Bintang Maharani - SemantikBI. All rights reserved.
                        </p>
                        <div className="flex gap-6">
                            <a href="#" className="p-2 bg-slate-50 rounded-lg text-slate-400 hover:text-pink-600 hover:bg-pink-50 transition-all">
                                <span className="sr-only">Social</span>
                                🌐
                            </a>
                        </div>
                    </div>
                </div>
            </footer>

            <style dangerouslySetInnerHTML={{
                __html: `
                @keyframes fade-in-up {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fade-in-up {
                    animation: fade-in-up 1s ease-out forwards;
                }
                .animate-pulse-slow {
                    animation: pulse 8s cubic-bezier(0.4, 0, 0.6, 1) infinite;
                }
                @keyframes pulse {
                    0%, 100% { opacity: 0.4; transform: scale(1.05); }
                    50% { opacity: 0.5; transform: scale(1.1); }
                }
                .animate-bounce-slow {
                    animation: bounce 3s infinite;
                }
                @keyframes bounce {
                    0%, 100% { transform: translateY(-5%); animation-timing-function: cubic-bezier(0.8,0,1,1); }
                    50% { transform: none; animation-timing-function: cubic-bezier(0,0,0.2,1); }
                }
            `}} />
        </div>
    );
}

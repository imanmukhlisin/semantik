import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function MahasiswaDashboard({ recent_thesis, popular_thesis, categories, stats }) {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Dashboard Mahasiswa
                </h2>
            }
        >
            <Head title="Mahasiswa Dashboard" />

            {/* Hero Section with Search */}
            <div className="bg-animated-gradient py-16 px-4 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-7xl">
                    <div className="text-center animate-fade-in">
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 drop-shadow-lg">
                            Repository Skripsi
                        </h1>
                        <p className="text-lg md:text-xl text-white/90 mb-8 drop-shadow">
                            Cariskripsi yang Anda butuhkan
                        </p>

                        {/* Search Bar */}
                        <div className="max-w-2xl mx-auto animate-slide-up">
                            <Link href={route('mahasiswa.search')} className="block">
                                <div className="relative">
                                    <input
                                        type="text"
                                        placeholder="Cari skripsi berdasarkan judul, penulis, atau kategori..."
                                        className="search-bar pl-12 text-gray-700 cursor-pointer"
                                        readOnly
                                    />
                                    <svg
                                        className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-pink-500"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                        />
                                    </svg>
                                </div>
                            </Link>
                            
                            {/* --- TAMBAHAN: Tombol Upload di Hero --- */}
                            <div className="mt-6">
                                <Link 
                                    href={route('mahasiswa.thesis.create')} 
                                    className="inline-flex items-center px-6 py-3 bg-white text-pink-600 rounded-full font-bold shadow-lg hover:bg-pink-50 transition-all duration-300"
                                >
                                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                    </svg>
                                    Upload Skripsi Anda
                                </Link>
                            </div>
                            {/* -------------------------------------- */}
                        </div>
                    </div>
                </div>
            </div>

            <div className="py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-pink-50 to-white">
                <div className="mx-auto max-w-7xl">
                    {/* Quick Action: Upload Skripsi */}
                    <div className="mb-12 animate-slide-up">
                        <div className="bg-gradient-to-r from-pink-500 to-pink-600 rounded-2xl p-8 text-white shadow-xl relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full transform translate-x-1/2 -translate-y-1/2 group-hover:scale-110 transition-transform duration-500"></div>
                            <div className="absolute bottom-0 left-0 w-48 h-48 bg-black opacity-10 rounded-full transform -translate-x-1/2 translate-y-1/2 group-hover:scale-110 transition-transform duration-500"></div>

                            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
                                <div>
                                    <h2 className="text-2xl font-bold mb-2">Ingin Mengupload Skripsi Anda?</h2>
                                    <p className="text-pink-100 max-w-xl">
                                        Kontribusikan karya ilmiah Anda ke dalam repository universitas.
                                        Pastikan data yang diinputkan benar dan file PDF sudah sesuai.
                                    </p>
                                </div>
                                <Link
                                    href={route('mahasiswa.thesis.create')}
                                    className="px-8 py-3 bg-white text-pink-600 rounded-xl font-bold hover:bg-pink-50 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
                                >
                                    + Upload Skripsi
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Statistics */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                        <div className="stat-card">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-600 mb-1">
                                        Total Skripsi
                                    </p>
                                    <p className="text-3xl font-bold text-gradient-pink">
                                        {stats.total_thesis}
                                    </p>
                                </div>
                                <div className="icon-container bg-gradient-to-br from-pink-500 to-pink-600">
                                    <span className="text-2xl">📚</span>
                                </div>
                            </div>
                        </div>

                        <div className="stat-card">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-600 mb-1">
                                        Kategori
                                    </p>
                                    <p className="text-3xl font-bold text-gradient-pink">
                                        {stats.categories_count}
                                    </p>
                                </div>
                                <div className="icon-container bg-gradient-to-br from-pink-400 to-pink-500">
                                    <span className="text-2xl">🏷️</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Recent Thesis */}
                    <div className="mb-12">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-2xl font-bold text-gray-800">
                                Skripsi Terbaru
                            </h2>
                            <div className="flex items-center gap-4">
                                {/* --- TAMBAHAN: Link Upload Kecil --- */}
                                <Link href={route('mahasiswa.thesis.create')} className="hidden md:block text-pink-600 font-semibold border-b-2 border-transparent hover:border-pink-600 transition-all">
                                    + Upload Baru
                                </Link>
                                {/* ----------------------------------- */}
                                <Link href={route('mahasiswa.search')} className="text-pink-600 hover:text-pink-700 font-medium">
                                    Lihat Semua →
                                </Link>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {recent_thesis.map((thesis) => (
                                <div key={thesis.id} className="thesis-card">
                                    <div className="mb-4">
                                        <span className="badge-pink">{thesis.category}</span>
                                    </div>
                                    <h3 className="text-lg font-bold text-gray-800 mb-3 line-clamp-2">
                                        {thesis.title}
                                    </h3>
                                    <div className="space-y-2 mb-4">
                                        <div className="flex items-center text-sm text-gray-600">
                                            <svg className="w-4 h-4 mr-2 text-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                            </svg>
                                            {thesis.author_name}
                                        </div>
                                        <div className="flex items-center text-sm text-gray-600">
                                            <svg className="w-4 h-4 mr-2 text-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                            </svg>
                                            {thesis.year}
                                        </div>
                                    </div>
                                    <div className="flex gap-2 pt-4 border-t border-pink-100">
                                        <Link href={route('mahasiswa.thesis.show', thesis.id)} className="flex-1 px-4 py-2 bg-gradient-to-r from-pink-500 to-pink-600 text-white rounded-lg font-medium hover:from-pink-600 hover:to-pink-700 transition-all duration-300 text-center">
                                            Lihat Detail
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Popular Thesis */}
                    <div className="mb-12">
                        <h2 className="text-2xl font-bold text-gray-800 mb-6">
                            Skripsi Populer
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {popular_thesis.map((thesis) => (
                                <div key={thesis.id} className="thesis-card">
                                    <div className="mb-4">
                                        <span className="badge-pink">{thesis.category}</span>
                                    </div>
                                    <h3 className="text-lg font-bold text-gray-800 mb-3 line-clamp-2">
                                        {thesis.title}
                                    </h3>
                                    <div className="space-y-2 mb-4">
                                        <div className="flex items-center text-sm text-gray-600">
                                            <svg className="w-4 h-4 mr-2 text-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                            </svg>
                                            {thesis.author_name}
                                        </div>
                                        <div className="flex items-center text-sm text-gray-600">
                                            <svg className="w-4 h-4 mr-2 text-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                            </svg>
                                            {thesis.download_count} downloads
                                        </div>
                                    </div>
                                    <div className="flex gap-2 pt-4 border-t border-pink-100">
                                        <Link href={route('mahasiswa.thesis.show', thesis.id)} className="flex-1 px-4 py-2 bg-gradient-to-r from-pink-500 to-pink-600 text-white rounded-lg font-medium hover:from-pink-600 hover:to-pink-700 transition-all duration-300 text-center">
                                            Lihat Detail
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Categories */}
                    <div>
                        <h2 className="text-2xl font-bold text-gray-800 mb-6">
                            Kategori
                        </h2>

                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                            {categories.map((category, index) => (
                                <Link
                                    key={index}
                                    href={route('mahasiswa.search', { category })}
                                    className="glass-card rounded-lg p-4 text-center hover:shadow-xl transition-all duration-300 group"
                                >
                                    <div className="text-3xl mb-2">📁</div>
                                    <div className="text-sm font-medium text-gray-800 group-hover:text-pink-600">
                                        {category}
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
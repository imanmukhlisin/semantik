import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function DosenDashboard({ stats }) {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Dashboard Dosen
                </h2>
            }
        >
            <Head title="Dosen Dashboard" />

            <div className="py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-pink-50 to-white min-h-screen">
                <div className="mx-auto max-w-7xl">
                    {/* Welcome Section */}
                    <div className="mb-8 animate-fade-in">
                        <h1 className="text-3xl font-bold text-gray-800 mb-2">
                            Dashboard Dosen
                        </h1>
                        <p className="text-gray-600">
                            Kelola skripsi yang Anda bimbing
                        </p>
                    </div>

                    {/* Statistics Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                        <div className="stat-card">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-600 mb-1">
                                        Skripsi Saya
                                    </p>
                                    <p className="text-3xl font-bold text-gradient-pink">
                                        {stats.my_thesis}
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
                                        Total Download
                                    </p>
                                    <p className="text-3xl font-bold text-gradient-pink">
                                        {stats.total_downloads}
                                    </p>
                                </div>
                                <div className="icon-container bg-gradient-to-br from-pink-400 to-pink-500">
                                    <span className="text-2xl">📥</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="mb-12">
                        <Link href={route('dosen.thesis.index')} className="glass-card rounded-xl p-8 hover:shadow-xl transition-all duration-300 group flex items-center justify-between">
                            <div className="flex items-center">
                                <div className="icon-container mr-6 group-hover:scale-110 transition-transform bg-pink-100 p-4 rounded-full">
                                    <span className="text-3xl">📋</span>
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-gray-800 mb-2">
                                        Lihat Semua Skripsi
                                    </h3>
                                    <p className="text-gray-600">
                                        Jelajahi dan baca skripsi dari seluruh repositori
                                    </p>
                                </div>
                            </div>
                            <svg className="w-6 h-6 text-pink-500 transform group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </Link>
                    </div>

                    {/* Recent Thesis */}
                    {stats.recent_thesis && stats.recent_thesis.length > 0 && (
                        <div className="mb-8">
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-2xl font-bold text-gray-800">
                                    Skripsi Terbaru
                                </h2>
                                <Link href={route('dosen.thesis.index')} className="text-pink-600 hover:text-pink-700 font-medium">
                                    Lihat Semua →
                                </Link>
                            </div>

                            <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-pink-100">
                                <div className="overflow-x-auto">
                                    <table className="min-w-full divide-y divide-pink-100">
                                        <thead className="bg-pink-50">
                                            <tr>
                                                <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-pink-700 uppercase tracking-wider">
                                                    Skripsi
                                                </th>
                                                <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-pink-700 uppercase tracking-wider">
                                                    Kategori/Tahun
                                                </th>
                                                {/* <th scope="col" className="px-6 py-4 text-center text-xs font-bold text-pink-700 uppercase tracking-wider">
                                                    Downloads
                                                </th> */}
                                                <th scope="col" className="px-6 py-4 text-center text-xs font-bold text-pink-700 uppercase tracking-wider w-40">
                                                    Aksi
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-pink-50">
                                            {stats.recent_thesis.map((thesis) => (
                                                <tr key={thesis.id} className="hover:bg-pink-50/50 transition-colors">
                                                    <td className="px-6 py-4">
                                                        <div className="flex flex-col">
                                                            <span className="text-lg font-bold text-gray-900 line-clamp-2 mb-1">
                                                                {thesis.title}
                                                            </span>
                                                            <span className="text-sm text-gray-500 flex items-center">
                                                                <svg className="w-4 h-4 mr-1 text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                                                </svg>
                                                                {thesis.author_name}
                                                            </span>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <div className="flex flex-col gap-1">
                                                            <span className="badge-pink w-fit text-xs">
                                                                {thesis.category}
                                                            </span>
                                                            <span className="text-sm text-gray-600 flex items-center">
                                                                <svg className="w-4 h-4 mr-1 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                                </svg>
                                                                {thesis.year}
                                                            </span>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 text-center">
                                                        <div className="flex items-center justify-center text-gray-600 font-medium">
                                                            <svg className="w-5 h-5 mr-1 text-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                                            </svg>
                                                            {thesis.download_count}
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 text-center">
                                                        <div className="flex justify-center items-center gap-2">
                                                            <Link
                                                                href={route('dosen.thesis.show', thesis.id)}
                                                                className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors tooltip"
                                                                title="Detail"
                                                            >
                                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                                </svg>
                                                            </Link>
                                                            <Link
                                                                href={route('dosen.thesis.edit', thesis.id)}
                                                                className="p-2 text-yellow-600 hover:bg-yellow-50 rounded-lg transition-colors"
                                                                title="Edit"
                                                            >
                                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                                </svg>
                                                            </Link>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

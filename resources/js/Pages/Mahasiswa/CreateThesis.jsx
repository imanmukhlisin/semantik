import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, Link } from '@inertiajs/react';

export default function CreateThesis({ categories }) {
    // Inisialisasi Form Inertia
    const { data, setData, post, processing, errors, progress } = useForm({
        title: '',
        year: new Date().getFullYear(),
        description: '',
        category: '',
        keywords: '',
        file: null, // Untuk file_path
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('mahasiswa.thesis.store'), {
            forceFormData: true, // Penting untuk pengiriman file
        });
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Upload Skripsi Baru
                </h2>
            }
        >
            <Head title="Upload Skripsi" />

            <div className="py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-pink-50 to-white min-h-screen">
                <div className="mx-auto max-w-3xl">
                    {/* Breadcrumbs / Back Link */}
                    <div className="mb-6">
                        <Link href={route('mahasiswa.dashboard')} className="text-pink-600 hover:text-pink-700 font-medium flex items-center">
                            ← Kembali ke Dashboard
                        </Link>
                    </div>

                    <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-pink-100">
                        <div className="bg-gradient-to-r from-pink-500 to-pink-600 p-6">
                            <h3 className="text-xl font-bold text-white">Formulir Pengajuan Skripsi</h3>
                            <p className="text-pink-100 text-sm">Pastikan informasi yang Anda masukkan sudah benar sebelum menekan tombol simpan.</p>
                        </div>

                        <form onSubmit={handleSubmit} className="p-8 space-y-6">
                            {/* Judul Skripsi */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Judul Skripsi</label>
                                <input
                                    type="text"
                                    className={`w-full rounded-xl border-gray-300 focus:border-pink-500 focus:ring-pink-500 shadow-sm ${errors.title ? 'border-red-500' : ''}`}
                                    placeholder="Masukkan judul lengkap skripsi..."
                                    value={data.title}
                                    onChange={e => setData('title', e.target.value)}
                                />
                                {errors.title && <div className="text-red-500 text-xs mt-1">{errors.title}</div>}
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Tahun */}
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Tahun Lulus</label>
                                    <input
                                        type="number"
                                        className="w-full rounded-xl border-gray-300 focus:border-pink-500 focus:ring-pink-500 shadow-sm"
                                        value={data.year}
                                        onChange={e => setData('year', e.target.value)}
                                    />
                                    {errors.year && <div className="text-red-500 text-xs mt-1">{errors.year}</div>}
                                </div>

                                {/* Kategori */}
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Kategori</label>
                                    <select
                                        className="w-full rounded-xl border-gray-300 focus:border-pink-500 focus:ring-pink-500 shadow-sm"
                                        value={data.category}
                                        onChange={e => setData('category', e.target.value)}
                                    >
                                        <option value="">Pilih Kategori</option>
                                        {categories.map((cat, i) => (
                                            <option key={i} value={cat}>{cat}</option>
                                        ))}
                                    </select>
                                    {errors.category && <div className="text-red-500 text-xs mt-1">{errors.category}</div>}
                                </div>
                            </div>

                            {/* Keywords */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Kata Kunci (Keywords)</label>
                                <input
                                    type="text"
                                    className="w-full rounded-xl border-gray-300 focus:border-pink-500 focus:ring-pink-500 shadow-sm"
                                    placeholder="Contoh: AI, Laravel, IoT (pisahkan dengan koma)"
                                    value={data.keywords}
                                    onChange={e => setData('keywords', e.target.value)}
                                />
                                {errors.keywords && <div className="text-red-500 text-xs mt-1">{errors.keywords}</div>}
                            </div>

                            {/* Deskripsi / Abstrak */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Abstrak / Deskripsi</label>
                                <textarea
                                    rows="4"
                                    className="w-full rounded-xl border-gray-300 focus:border-pink-500 focus:ring-pink-500 shadow-sm"
                                    placeholder="Tuliskan abstrak singkat skripsi Anda..."
                                    value={data.description}
                                    onChange={e => setData('description', e.target.value)}
                                ></textarea>
                                {errors.description && <div className="text-red-500 text-xs mt-1">{errors.description}</div>}
                            </div>

                            {/* Dropzone File PDF */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">File Skripsi (Hanya PDF)</label>
                                <div className={`relative border-2 border-dashed rounded-2xl p-8 transition-all ${data.file ? 'border-pink-500 bg-pink-50' : 'border-gray-300 hover:border-pink-400'}`}>
                                    <input
                                        type="file"
                                        accept="application/pdf"
                                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                        onChange={e => setData('file', e.target.files[0])}
                                    />
                                    <div className="text-center">
                                        <div className="text-4xl mb-2">{data.file ? '📄' : '📤'}</div>
                                        <p className="text-sm font-medium text-gray-700">
                                            {data.file ? data.file.name : 'Klik atau tarik file PDF ke sini'}
                                        </p>
                                        <p className="text-xs text-gray-500 mt-1">
                                            {data.file ? `Ukuran: ${(data.file.size / 1024 / 1024).toFixed(2)} MB` : 'Maksimal 10MB'}
                                        </p>
                                    </div>
                                </div>
                                {errors.file && <div className="text-red-500 text-xs mt-1">{errors.file}</div>}
                                
                                {/* Progress Bar Upload */}
                                {progress && (
                                    <div className="w-full bg-gray-200 rounded-full h-2.5 mt-4">
                                        <div className="bg-pink-600 h-2.5 rounded-full" style={{ width: `${progress.percentage}%` }}></div>
                                    </div>
                                )}
                            </div>

                            <button
                                type="submit"
                                disabled={processing}
                                className="w-full py-4 bg-gradient-to-r from-pink-500 to-pink-600 text-white rounded-xl font-bold text-lg hover:from-pink-600 hover:to-pink-700 transition-all shadow-lg shadow-pink-200 disabled:opacity-50"
                            >
                                {processing ? 'Sedang Mengunggah...' : 'Simpan Skripsi'}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';
import { useState, useEffect } from 'react';

export default function ThesisIndex({ theses, filters, categories, years }) {
    const [search, setSearch] = useState(filters.search || '');
    const [category, setCategory] = useState(filters.category || '');
    const [year, setYear] = useState(filters.year || '');
    const [yearFrom, setYearFrom] = useState(filters.year_from || '');
    const [yearTo, setYearTo] = useState(filters.year_to || '');
    const [sort, setSort] = useState(filters.sort || 'latest');
    const [showFilters, setShowFilters] = useState(false);

    const handleSearch = (e) => {
        e.preventDefault();
        performSearch();
    };

    const performSearch = () => {
        router.get(route('dosen.thesis.index'), {
            search,
            category,
            year,
            year_from: yearFrom,
            year_to: yearTo,
            sort,
        }, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    const resetFilters = () => {
        setSearch('');
        setCategory('');
        setYear('');
        setYearFrom('');
        setYearTo('');
        setSort('latest');
        router.get(route('dosen.thesis.index'));
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            if (search !== (filters.search || '')) {
                performSearch();
            }
        }, 500);
        return () => clearTimeout(timer);
    }, [search]);



    const activeFiltersCount = [category, year, yearFrom, yearTo].filter(Boolean).length;

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Telusuri Skripsi
                </h2>
            }
        >
            <Head title="Telusuri Skripsi" />

            <div className="py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-pink-50 to-white min-h-screen">
                <div className="mx-auto max-w-7xl">
                    {/* Search & Filter Section */}
                    <div className="mb-8 animate-fade-in">
                        <form onSubmit={handleSearch}>
                            <div className="relative max-w-4xl mx-auto">
                                <input
                                    type="text"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    placeholder="Cari skripsi berdasarkan judul, penulis, deskripsi..."
                                    className="search-bar pl-12 pr-32"
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
                                <button
                                    type="button"
                                    onClick={() => setShowFilters(!showFilters)}
                                    className="absolute right-4 top-1/2 transform -translate-y-1/2 px-4 py-2 bg-pink-500 text-white rounded-lg font-medium hover:bg-pink-600 transition-all duration-300 flex items-center gap-2"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                                    </svg>
                                    Filter
                                    {activeFiltersCount > 0 && (
                                        <span className="bg-white text-pink-600 rounded-full px-2 py-0.5 text-xs font-bold">
                                            {activeFiltersCount}
                                        </span>
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>

                    {/* Filters Panel */}
                    {showFilters && (
                        <div className="mb-8 glass-card rounded-xl p-6 animate-slide-up">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-lg font-bold text-gray-800">
                                    Filter Pencarian
                                </h3>
                                <button
                                    onClick={resetFilters}
                                    className="text-pink-600 hover:text-pink-700 font-medium text-sm"
                                >
                                    Reset Semua
                                </button>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Kategori</label>
                                    <select
                                        value={category}
                                        onChange={(e) => {
                                            setCategory(e.target.value);
                                            setTimeout(performSearch, 100);
                                        }}
                                        className="w-full border-pink-200 focus:border-pink-500 focus:ring-pink-500 rounded-md shadow-sm"
                                    >
                                        <option value="">Semua Kategori</option>
                                        {categories.map((cat) => (
                                            <option key={cat} value={cat}>{cat}</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Tahun</label>
                                    <select
                                        value={year}
                                        onChange={(e) => {
                                            setYear(e.target.value);
                                            setYearFrom('');
                                            setYearTo('');
                                            setTimeout(performSearch, 100);
                                        }}
                                        className="w-full border-pink-200 focus:border-pink-500 focus:ring-pink-500 rounded-md shadow-sm"
                                    >
                                        <option value="">Semua Tahun</option>
                                        {years.map((yr) => (
                                            <option key={yr} value={yr}>{yr}</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Dari Tahun</label>
                                    <select
                                        value={yearFrom}
                                        onChange={(e) => {
                                            setYearFrom(e.target.value);
                                            setYear('');
                                            setTimeout(performSearch, 100);
                                        }}
                                        className="w-full border-pink-200 focus:border-pink-500 focus:ring-pink-500 rounded-md shadow-sm"
                                    >
                                        <option value="">-</option>
                                        {years.map((yr) => (
                                            <option key={yr} value={yr}>{yr}</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Sampai Tahun</label>
                                    <select
                                        value={yearTo}
                                        onChange={(e) => {
                                            setYearTo(e.target.value);
                                            setYear('');
                                            setTimeout(performSearch, 100);
                                        }}
                                        className="w-full border-pink-200 focus:border-pink-500 focus:ring-pink-500 rounded-md shadow-sm"
                                    >
                                        <option value="">-</option>
                                        {years.map((yr) => (
                                            <option key={yr} value={yr}>{yr}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Result Info & Sorting */}
                    <div className="flex items-center justify-between mb-6">
                        <p className="text-gray-600">
                            Ditemukan <strong className="text-pink-600">{theses.total}</strong> skripsi
                        </p>
                        <div className="flex items-center gap-2">
                            <label className="text-sm text-gray-600">Urutkan:</label>
                            <select
                                value={sort}
                                onChange={(e) => {
                                    setSort(e.target.value);
                                    setTimeout(performSearch, 100);
                                }}
                                className="border-pink-200 focus:border-pink-500 focus:ring-pink-500 rounded-md shadow-sm text-sm"
                            >
                                <option value="latest">Terbaru</option>
                                <option value="oldest">Terlama</option>
                                <option value="title_asc">Judul A-Z</option>
                                <option value="title_desc">Judul Z-A</option>
                                <option value="most_downloaded">Paling Banyak Diunduh</option>
                            </select>
                        </div>
                    </div>

                    {/* List View (Table) */}
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
                                    {theses.data.length > 0 ? (
                                        theses.data.map((thesis) => (
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
                                                        {/* Show Dosen Name if exists */}
                                                        {thesis.user && (
                                                            <span className="text-xs text-gray-400 mt-1">
                                                                Oleh: {thesis.user.name}
                                                            </span>
                                                        )}
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

                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="4" className="px-6 py-12 text-center text-gray-500">
                                                <div className="flex flex-col items-center justify-center">
                                                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4 text-3xl">
                                                        🧐
                                                    </div>
                                                    <p className="text-lg font-medium">Tidak ada data ditemukan</p>
                                                    <p className="text-sm">Coba sesuaikan filter pencarian Anda</p>
                                                </div>
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Pagination */}
                    {theses.links.length > 3 && (
                        <div className="mt-6 flex justify-center gap-2">
                            {theses.links.map((link, index) => (
                                <Link
                                    key={index}
                                    href={link.url || '#'}
                                    className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${link.active
                                        ? 'bg-gradient-to-r from-pink-500 to-pink-600 text-white'
                                        : link.url
                                            ? 'bg-white border-2 border-pink-200 text-pink-600 hover:border-pink-500'
                                            : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                        }`}
                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                    preserveScroll
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

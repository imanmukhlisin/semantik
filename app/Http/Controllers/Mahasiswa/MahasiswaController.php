<?php

namespace App\Http\Controllers\Mahasiswa;

use App\Http\Controllers\Controller;
use App\Models\Thesis;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage; // Pastikan ini ditambahkan
use Illuminate\Support\Facades\Auth;    // Pastikan ini ditambahkan

class MahasiswaController extends Controller
{
    public function dashboard()
    {
        $recent_thesis = Thesis::with('user')
            ->latest()
            ->take(6)
            ->get();

        $popular_thesis = Thesis::with('user')
            ->orderBy('download_count', 'desc')
            ->take(6)
            ->get();

        $categories = Thesis::select('category')
            ->distinct()
            ->pluck('category');

        $stats = [
            'total_thesis' => Thesis::count(),
            'categories_count' => $categories->count(),
        ];

        return Inertia::render('Mahasiswa/Dashboard', [
            'recent_thesis' => $recent_thesis,
            'popular_thesis' => $popular_thesis,
            'categories' => $categories,
            'stats' => $stats,
        ]);
    }

    public function show(Thesis $thesis)
    {
        $thesis->load('user');

        // Get related thesis (same category)
        $related = Thesis::where('category', $thesis->category)
            ->where('id', '!=', $thesis->id)
            ->take(3)
            ->get();

        return Inertia::render('Mahasiswa/Thesis/Show', [
            'thesis' => $thesis,
            'related' => $related,
        ]);
    }

    public function download(Thesis $thesis)
    {
        if (!$thesis->file_path || !Storage::disk('public')->exists($thesis->file_path)) {
            abort(404, 'File tidak ditemukan');
        }

        // Increment download count
        $thesis->incrementDownloads();

        return Storage::disk('public')->download($thesis->file_path);
    }

    public function create()
    {
        // Mengambil kategori unik untuk pilihan di form (opsional)
        $categories = Thesis::distinct()->pluck('category');

        return Inertia::render('Mahasiswa/CreateThesis', [
            'categories' => $categories
        ]);
    }

    public function store(Request $request)
    {
        // 1. Validasi input
        $request->validate([
            'title'       => 'required|string|max:500',
            'year'        => 'required|numeric|digits:4',
            'description' => 'required|string',
            'category'    => 'required|string',
            'keywords'    => 'nullable|string',
            'file'        => 'required|mimes:pdf|max:10240', // Validasi hanya PDF, maks 10MB
        ]);

        // 2. Proses File
        if ($request->hasFile('file')) {
            $file = $request->file('file');
            
            // Membuat nama file unik: timestamp_nama_asli.pdf
            $fileName = time() . '_' . $file->getClientOriginalName();
            
            // Simpan file ke folder 'thesis_files' di disk public
            $path = $file->storeAs('thesis_files', $fileName, 'public');
            
            // Ambil ukuran file (dalam bytes)
            $fileSize = $file->getSize();
        }

        // 3. Simpan ke Database
        Thesis::create([
            'user_id'        => Auth::id(),               // Otomatis dari ID user login
            'title'          => $request->title,
            'year'           => $request->year,
            'description'    => $request->description,
            'category'       => $request->category,
            'keywords'       => $request->keywords,
            'author_name'    => Auth::user()->name,       // Otomatis dari Nama user login
            'file_path'      => $path,                    // Path hasil upload
            'file_size'      => $fileSize,                // Ukuran file otomatis
            'download_count' => 0,                        // Default awal 0
            'status'         => "processing",             // Default Processing >> Rejected >> Approved
        ]);

        // 4. Redirect kembali ke dashboard dengan pesan sukses
        return redirect()->route('mahasiswa.dashboard')
            ->with('message', 'Skripsi berhasil diunggah dan sedang diproses!');
    }
}
<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\Admin\AdminController;
use App\Http\Controllers\Admin\UserController;
use App\Http\Controllers\Admin\ThesisController as AdminThesisController;
use App\Http\Controllers\Dosen\DosenController;
use App\Http\Controllers\Dosen\ThesisController as DosenThesisController;
use App\Http\Controllers\Mahasiswa\MahasiswaController;
use App\Http\Controllers\Mahasiswa\SearchController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;


Route::get('/', function () {
    // Redirect authenticated users to their dashboard
    if (Auth::check()) {
        return redirect()->route('dashboard');
    }
    
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

// Dashboard redirect based on role
Route::get('/dashboard', function () {
    $user = auth()->user();
    
    return match ($user->role) {
        'admin' => redirect()->route('admin.dashboard'),
        'dosen' => redirect()->route('dosen.thesis.index'),
        'mahasiswa' => redirect()->route('mahasiswa.dashboard'),
        default => redirect()->route('login'),
    };
})->middleware(['auth', 'verified'])->name('dashboard');

// Admin Routes
Route::middleware(['auth', 'verified', 'role:admin'])->prefix('admin')->name('admin.')->group(function () {
    Route::get('/dashboard', [AdminController::class, 'dashboard'])->name('dashboard');
    Route::resource('users', UserController::class);
    Route::resource('thesis', AdminThesisController::class);
});

// Dosen Routes
Route::middleware(['auth', 'verified', 'role:dosen'])->prefix('dosen')->name('dosen.')->group(function () {
    Route::get('/dashboard', function () {
        return redirect()->route('dosen.thesis.index');
    })->name('dashboard');
    Route::resource('thesis', DosenThesisController::class)->except(['create', 'store']);
});

// Mahasiswa Routes
Route::middleware(['auth', 'verified', 'role:mahasiswa'])->prefix('mahasiswa')->name('mahasiswa.')->group(function () {
    Route::get('/dashboard', [MahasiswaController::class, 'dashboard'])->name('dashboard');
    Route::get('/search', [SearchController::class, 'index'])->name('search');
    // --- TAMBAHKAN DUA BARIS INI ---
    Route::get('/thesis/create', [MahasiswaController::class, 'create'])->name('thesis.create');
    Route::post('/thesis/store', [MahasiswaController::class, 'store'])->name('thesis.store');
    Route::get('/thesis/{thesis}', [MahasiswaController::class, 'show'])->name('thesis.show');
});

// Public PDF Routes (accessible by all authenticated users)
Route::middleware(['auth'])->group(function () {
    Route::get('/thesis/{thesis}/download', function ($id) {
        $thesis = \App\Models\Thesis::findOrFail($id);
        
        if (!$thesis->file_path || !\Storage::disk('public')->exists($thesis->file_path)) {
            abort(404, 'File tidak ditemukan');
        }
        
        // Increment download count
        $thesis->incrementDownloads();
        
        $filename = \Illuminate\Support\Str::slug($thesis->title) . '.pdf';
        
        return \Storage::disk('public')->download($thesis->file_path, $filename, [
            'Content-Type' => 'application/pdf',
        ]);
    })->name('thesis.download');
    
    Route::get('/thesis/{thesis}/preview', function ($id) {
        $thesis = \App\Models\Thesis::findOrFail($id);
        
        if (!$thesis->file_path || !\Storage::disk('public')->exists($thesis->file_path)) {
            abort(404, 'File tidak ditemukan');
        }
        
        return \Storage::disk('public')->response($thesis->file_path, null, [
            'Content-Type' => 'application/pdf',
            'Content-Disposition' => 'inline; filename="' . \Illuminate\Support\Str::slug($thesis->title) . '.pdf"',
        ]);
    })->name('thesis.preview');
});

// Profile Routes (all authenticated users)
Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';

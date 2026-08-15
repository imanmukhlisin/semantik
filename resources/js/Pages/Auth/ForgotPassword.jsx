import PrimaryButton from "@/Components/PrimaryButton";
import GuestLayout from "@/Layouts/GuestLayout";
import { Head, Link } from "@inertiajs/react";

export default function ForgotPassword() {
    return (
        <GuestLayout>
            <Head title="Lupa Password" />

            <div className="text-center mb-6">
                <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-pink-100 mb-6 shadow-sm">
                    <svg
                        className="h-8 w-8 text-pink-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                        />
                    </svg>
                </div>
                <h1 className="text-2xl font-bold text-gray-800">
                    Akun Terkunci?
                </h1>

                <div className="text-sm text-gray-600 mt-6 leading-relaxed bg-gray-50 p-5 rounded-xl border border-gray-100 shadow-inner text-left">
                    <p className="mb-3">
                        Untuk alasan keamanan data sistem Semantik, fitur reset
                        password mandiri saat ini didisabled.
                    </p>
                    <p>
                        Silakan hubungi{" "}
                        <strong>Administrator / IT Support</strong> Bina Insan
                        untuk melakukan permohonan reset password akun Anda.
                    </p>
                </div>
            </div>

            <div className="mt-8 text-center flex flex-col space-y-4">
                <Link href={route("login")} className="w-full">
                    <PrimaryButton className="w-full justify-center py-3 bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 shadow-md">
                        Kembali ke Halaman Login
                    </PrimaryButton>
                </Link>
            </div>
        </GuestLayout>
    );
}

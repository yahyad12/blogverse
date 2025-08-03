import Navbar from "@/components/Navbar";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <div className="bg-white">
          <div className="max-w-7xl mx-auto px-4 py-16 sm:py-24">
            <div className="text-center">
              <h1 className="text-4xl font-bold text-gray-900 sm:text-6xl">
                Selamat Datang di BlogVerse
              </h1>
              <p className="mt-6 text-lg text-gray-600 max-w-3xl mx-auto">
                Temukan cerita-cerita menakjubkan, bagikan pemikiran Anda, dan terhubung dengan komunitas penulis dan pembaca.
                Buat akun Anda dan mulai perjalanan blogging hari ini.
              </p>
              <div className="mt-10 flex items-center justify-center gap-x-6">
                <Link
                  href="/auth/signup"
                  className="rounded-md bg-blue-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                >
                  Mulai Sekarang
                </Link>
                <Link 
                  href="/posts" 
                  className="text-sm font-semibold leading-6 text-gray-900"
                >
                  Jelajahi Postingan <span aria-hidden="true">→</span>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="py-24 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-900">Fitur</h2>
              <p className="mt-4 text-lg text-gray-600">
                Semua yang Anda butuhkan untuk membuat dan mengelola blog Anda
              </p>
            </div>
            
            <div className="mt-20 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold text-gray-900">Menulis Mudah</h3>
                <p className="mt-2 text-gray-600">
                  Buat dan edit postingan blog Anda dengan editor yang intuitif
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold text-gray-900">Kategori</h3>
                <p className="mt-2 text-gray-600">
                  Organisasi konten Anda dengan kategori khusus
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold text-gray-900">Manajemen Pengguna</h3>
                <p className="mt-2 text-gray-600">
                  Otentikasi aman dan manajemen konten khusus pengguna
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

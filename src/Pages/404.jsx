import React from 'react';
import { Home, ArrowLeft } from 'lucide-react';
import Navbar from '../components/Navbar';

export default function NotFoundPage() {
  const handleGoBack = () => {
    window.history.back();
  };

  const handleGoHome = () => {
    // In a real app, you would use your router's navigation
    window.location.href = '/';
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center">
          {/* 404 Number */}
          <div className="mb-8">
            <h1 className="text-9xl font-bold text-white mb-4 animate-bounce">
              404
            </h1>
            <div className="w-24 h-1 bg-indigo-500 mx-auto rounded-full"></div>
          </div>

          {/* Message */}
          <div className="mb-8">
            <h2 className="text-3xl font-semibold text-white mb-4">
              Oops! Halaman Tidak Ditemukan
            </h2>
            <p className="text-lg text-gray-300 max-w-md mx-auto leading-relaxed">
              Halaman yang Anda cari mungkin telah dipindahkan, dihapus, atau tidak pernah ada.
            </p>
          </div>

          {/* Illustration */}
          <div className="mb-8">
            <div className="w-32 h-32 mx-auto bg-white/5 backdrop-blur-sm rounded-full flex items-center justify-center mb-6">
              <div className="text-6xl">🔍</div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={handleGoBack}
              className="flex items-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-sm text-white rounded-lg hover:bg-white/20 transition-colors duration-200"
            >
              <ArrowLeft size={20} />
              Kembali
            </button>
            
            <button
              onClick={handleGoHome}
              className="flex items-center gap-2 px-6 py-3 bg-indigo-600/80 backdrop-blur-sm text-white rounded-lg hover:bg-indigo-600 transition-colors duration-200"
            >
              <Home size={20} />
              Beranda
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
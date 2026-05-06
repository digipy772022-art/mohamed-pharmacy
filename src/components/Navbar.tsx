import React from 'react';
import { Link } from 'react-router-dom';
import { HeartPulse, Settings } from 'lucide-react';

export default function Navbar() {
  return (
    <header className="h-16 bg-white border-b border-slate-200 px-4 sm:px-8 flex items-center justify-between flex-none sticky top-0 z-40">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-emerald-600 rounded-lg flex items-center justify-center text-white flex-shrink-0 shadow-sm">
          <HeartPulse className="h-6 w-6" strokeWidth={2} />
        </div>
        <Link to="/" className="text-xl font-bold text-slate-800 truncate">
          صيدلية الخير
        </Link>
      </div>
      <nav className="flex items-center gap-4 sm:gap-6 font-medium text-slate-600 text-sm sm:text-base">
        <div className="hidden sm:flex items-center gap-6">
          <Link to="/" className="hover:text-emerald-600 whitespace-nowrap">
            الرئيسية
          </Link>
          <Link to="/medicines" className="hover:text-emerald-600 whitespace-nowrap">
            الأدوية المتاحة
          </Link>
          <Link to="/upload" className="hover:text-emerald-600 whitespace-nowrap">
            رفع دواء جديد
          </Link>
        </div>
        <Link to="/settings" className="bg-slate-100 text-slate-700 px-3 py-1.5 sm:bg-slate-100 sm:text-slate-700 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-bold whitespace-nowrap hover:bg-slate-200 transition-colors flex items-center gap-1.5">
          <Settings className="w-4 h-4" />
          <span className="hidden sm:inline">الإعدادات</span>
        </Link>
      </nav>
    </header>
  );
}

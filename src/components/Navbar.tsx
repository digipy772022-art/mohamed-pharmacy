import React from 'react';
import { Link } from 'react-router-dom';
import { Download } from 'lucide-react';
import logo from '../assets/logo.png';

export default function Navbar() {
  return (
    <header className="h-16 bg-white border-b border-slate-200 px-4 sm:px-8 flex items-center justify-between flex-none sticky top-0 z-40">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 flex-shrink-0 flex items-center justify-center bg-slate-50 rounded-xl overflow-hidden border border-emerald-100 p-1">
          <Link to="/" className="w-full h-full flex items-center justify-center">
            <img 
              src={logo} 
              alt="شعار صيدلية اهل الجرنوس" 
              className="w-full h-full object-contain mix-blend-multiply"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = 'none';
              }}
            />
          </Link>
        </div>
        <Link to="/" className="text-xl font-bold text-slate-800 truncate">
          صيدلية اهل الجرنوس
        </Link>
      </div>
      <nav className="flex items-center gap-4 sm:gap-6 font-medium text-slate-600 text-sm sm:text-base">
        <div className="hidden sm:flex items-center gap-6">
          <Link to="/" className="hover:text-emerald-600 whitespace-nowrap transition-colors">
            الرئيسية
          </Link>
          <Link to="/medicines" className="hover:text-emerald-600 whitespace-nowrap transition-colors">
            الأدوية المتاحة
          </Link>
          <Link to="/upload" className="hover:text-emerald-600 whitespace-nowrap transition-colors">
            رفع دواء جديد
          </Link>
        </div>
        <a 
          href="https://median.co/share/dyamyoy#apk"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-4 py-2 rounded-full text-sm font-medium transition-all shadow-sm hover:shadow active:scale-95"
        >
          <Download className="w-4 h-4" />
          <span className="hidden sm:inline">تحميل التطبيق</span>
        </a>
      </nav>
    </header>
  );
}

import React from 'react';
import { Link } from 'react-router-dom';
import { HeartPulse } from 'lucide-react';

export default function Navbar() {
  return (
    <header className="h-16 bg-white border-b border-slate-200 px-4 sm:px-8 flex items-center justify-between flex-none sticky top-0 z-40">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 flex-shrink-0 flex items-center justify-center rounded-lg overflow-hidden bg-slate-50 border border-slate-200 shadow-sm">
          <img 
            src="https://i.imgur.com/hhA8rJd.png" 
            alt="شعار صيدلية الخير" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
            onError={(e) => {
              // Fallback to the original heart pulse icon style if image fails to load
              e.currentTarget.style.display = 'none';
              if (e.currentTarget.parentElement) {
                e.currentTarget.parentElement.className = "w-10 h-10 bg-emerald-600 rounded-lg flex items-center justify-center text-white flex-shrink-0 shadow-sm";
                e.currentTarget.parentElement.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-heart-pulse"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/><path d="M3.22 12H9.5l.5-1 2 4.5 2-7 1.5 3.5h5.27"/></svg>';
              }
            }}
          />
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
      </nav>
    </header>
  );
}

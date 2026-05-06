import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, List, PlusCircle } from 'lucide-react';

export default function BottomNav() {
  const location = useLocation();

  const navItems = [
    { name: 'الرئيسية', path: '/', icon: Home },
    { name: 'الأدوية', path: '/medicines', icon: List },
    { name: 'إضافة', path: '/upload', icon: PlusCircle },
  ];

  return (
    <div className="sm:hidden fixed bottom-0 left-0 w-full h-[68px] bg-white border-t border-slate-200 flex items-center justify-around z-50 pb-safe shadow-[0_-2px_10px_rgba(0,0,0,0.05)] px-2">
      {navItems.map((item) => {
        const isActive = location.pathname === item.path;
        const Icon = item.icon;
        return (
          <Link
            key={item.path}
            to={item.path}
            className={`flex flex-col items-center justify-center w-full h-full space-y-1 rounded-xl transition-all select-none ${
              isActive ? 'text-emerald-600' : 'text-slate-400 hover:text-slate-600 active:bg-slate-50'
            }`}
          >
            <div className={`p-1 rounded-full transition-colors ${isActive ? 'bg-emerald-50' : ''}`}>
              <Icon className="h-[22px] w-[22px]" strokeWidth={isActive ? 2.5 : 2} />
            </div>
            <span className="text-[10px] font-bold">{item.name}</span>
          </Link>
        );
      })}
    </div>
  );
}

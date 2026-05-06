import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HumanitarianBanner from './components/HumanitarianBanner';
import Navbar from './components/Navbar';
import BottomNav from './components/BottomNav';
import Home from './pages/Home';
import UploadMedicine from './pages/UploadMedicine';
import MedicinesList from './pages/MedicinesList';
import Settings from './pages/Settings';

export default function App() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50 text-slate-900 font-sans sm:pb-0 pb-16">
      <Navbar />
      <HumanitarianBanner />
      <main className="flex-grow flex p-6 gap-6 w-full max-w-7xl mx-auto flex-col overflow-x-hidden">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/upload" element={<UploadMedicine />} />
          <Route path="/medicines" element={<MedicinesList />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </main>
      <footer className="w-full sm:h-10 bg-slate-800 text-slate-400 flex flex-col sm:flex-row items-center justify-between px-8 py-3 sm:py-0 text-xs flex-none gap-2 sm:gap-0 mt-auto hidden sm:flex">
        <p>© {new Date().getFullYear()} صيدلية الخير - منصة خيرية غير ربحية</p>
        <div className="flex gap-4">
          <span className="text-emerald-400 font-bold">صنع بنية خالصة للمحتاجين</span>
        </div>
      </footer>
      <BottomNav />
    </div>
  );
}

import React from 'react';

export default function HumanitarianBanner() {
  return (
    <div className="bg-emerald-50 border-b border-emerald-100 py-3 px-4 sm:px-8 flex-none top-0 z-50">
      <p className="text-center text-emerald-800 font-bold text-base sm:text-lg">
        🌿 هذا الموقع صدقة جارية لعمي محمد عبد المنعم عبدالموجود
        <br className="sm:hidden" />
        <span className="hidden sm:inline"> | </span>
        نسألكم الدعاء له بالرحمة والمغفرة 🌿
      </p>
    </div>
  );
}

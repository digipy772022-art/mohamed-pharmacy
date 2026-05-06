import React from 'react';
import { Link } from 'react-router-dom';
import { HeartPulse, HandHeart, Pill, Share2, PhoneCall, CheckCircle } from 'lucide-react';

export default function Home() {
  return (
    <div className="w-full flex flex-col gap-10 sm:gap-16 pb-8 md:pb-12">
      {/* Hero Section */}
      <section className="flex flex-col lg:flex-row items-center justify-between gap-12 bg-white rounded-[2rem] p-6 sm:p-8 lg:p-12 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 relative overflow-hidden mt-4">
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-100 rounded-full blur-3xl opacity-50 -mr-20 -mt-20"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-50 rounded-full blur-3xl opacity-50 -ml-20 -mb-20"></div>

        <div className="max-w-2xl relative z-10 space-y-6 text-center lg:text-right w-full">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 text-emerald-700 text-sm font-bold border border-emerald-100 mb-2">
            <HeartPulse className="w-4 h-4 ml-1" />
            <span>منصة خيرية لتبادل الأدوية</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-800 leading-[1.3]">
            لا تدع الدواء الفائض <br className="hidden sm:block"/> <span className="text-transparent bg-clip-text bg-gradient-to-l from-emerald-600 to-blue-600">ينتهي بلا فائدة</span>
          </h1>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-xl mx-auto lg:mx-0">
            صيدلية اهل الجرنوس هي منصة تربط بين من يملك دواءً فائضاً ومن يحتاجه بشدة. ساهم في توفير العلاج واحتسب الأجر في صدقة جارية تنفع الناس.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 pt-4 justify-center lg:justify-start">
            <Link to="/upload" className="w-full sm:w-auto px-6 sm:px-8 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-base sm:text-lg shadow-lg shadow-emerald-200 transition-all flex items-center justify-center gap-2 sm:hover:-translate-y-1">
              <HandHeart className="w-5 h-5 ml-1" />
              تبرع بدواء الآن
            </Link>
            <Link to="/medicines" className="w-full sm:w-auto px-6 sm:px-8 py-3.5 bg-white hover:bg-slate-50 text-slate-700 border-2 border-slate-200 rounded-xl font-bold text-base sm:text-lg transition-all flex items-center justify-center gap-2 sm:hover:-translate-y-1">
              <Pill className="w-5 h-5 ml-1 text-emerald-500" />
              تصفح الأدوية المتاحة
            </Link>
          </div>
        </div>

        <div className="w-full lg:w-1/2 relative z-10 flex justify-center mt-8 lg:mt-0">
           {/* Abstract illustration block */}
           <div className="relative w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96">
              <div className="absolute inset-0 bg-gradient-to-tr from-emerald-100 to-blue-50 rounded-[2.5rem] sm:rounded-full opacity-70"></div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 sm:p-8 rounded-3xl shadow-xl border border-white/50 rotate-3 z-10">
                <HeartPulse className="w-20 h-20 sm:w-28 sm:h-28 text-emerald-500" strokeWidth={1.5} />
              </div>
              <div className="absolute top-4 sm:top-8 right-4 sm:right-8 bg-blue-600 text-white p-3 sm:p-4 rounded-2xl shadow-lg shadow-blue-200 -rotate-6 z-20">
                <Pill className="w-6 h-6 sm:w-8 sm:h-8" />
              </div>
              <div className="absolute bottom-8 sm:bottom-12 left-0 sm:left-4 bg-emerald-500 text-white p-3 sm:p-4 rounded-2xl shadow-lg shadow-emerald-200 rotate-12 z-20">
                <HandHeart className="w-6 h-6 sm:w-8 sm:h-8" />
              </div>
           </div>
        </div>
      </section>

      {/* How it works Section */}
      <section className="space-y-8 sm:space-y-10">
        <div className="text-center space-y-3">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-800">كيف تعمل المنصة؟</h2>
          <p className="text-slate-500 text-sm sm:text-base">خطوات بسيطة لنشر الخير وتوصيل الدواء لمستحقيه</p>
        </div>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {/* Step 1 */}
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-100 shadow-sm text-center relative group hover:border-emerald-200 hover:shadow-md transition-all">
            <div className="w-14 h-14 sm:w-16 sm:h-16 bg-blue-50 text-blue-600 rounded-2xl mx-auto flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 transition-transform">
              <Share2 className="w-7 h-7 sm:w-8 sm:h-8" strokeWidth={1.5} />
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-slate-800 mb-2 sm:mb-3">1. إضافة الدواء</h3>
            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">قم برفع صورة الدواء واسمه ورقم هاتفك للتواصل.</p>
          </div>

          {/* Step 2 */}
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-100 shadow-sm text-center relative group hover:border-emerald-200 hover:shadow-md transition-all">
            <div className="w-14 h-14 sm:w-16 sm:h-16 bg-emerald-50 text-emerald-600 rounded-2xl mx-auto flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 transition-transform">
              <PhoneCall className="w-7 h-7 sm:w-8 sm:h-8" strokeWidth={1.5} />
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-slate-800 mb-2 sm:mb-3">2. التواصل المباشر</h3>
            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">يجد المحتاج الدواء ويتواصل معك هاتفياً للاستلام.</p>
          </div>

          {/* Step 3 */}
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-100 shadow-sm text-center relative group hover:border-emerald-200 hover:shadow-md transition-all sm:col-span-2 md:col-span-1">
            <div className="w-14 h-14 sm:w-16 sm:h-16 bg-amber-50 text-amber-600 rounded-2xl mx-auto flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 transition-transform">
              <CheckCircle className="w-7 h-7 sm:w-8 sm:h-8" strokeWidth={1.5} />
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-slate-800 mb-2 sm:mb-3">3. تم التسليم</h3>
            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">يتم الضغط على "تم الطلب" لإخفاء الدواء من القائمة.</p>
          </div>
        </div>
      </section>
    </div>
  );
}

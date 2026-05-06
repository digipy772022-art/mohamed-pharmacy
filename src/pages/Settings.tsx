import React, { useState } from 'react';
import { Database, Save, CheckCircle2, AlertCircle } from 'lucide-react';

export default function Settings() {
  const [url, setUrl] = useState(localStorage.getItem('SUPABASE_URL') || '');
  const [key, setKey] = useState(localStorage.getItem('SUPABASE_ANON_KEY') || '');
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (url) localStorage.setItem('SUPABASE_URL', url.trim());
    else localStorage.removeItem('SUPABASE_URL');
    
    if (key) localStorage.setItem('SUPABASE_ANON_KEY', key.trim());
    else localStorage.removeItem('SUPABASE_ANON_KEY');
    
    setSaved(true);
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };

  return (
    <div className="max-w-2xl mx-auto w-full flex flex-col gap-6 w-full">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-12 h-12 bg-slate-100 text-slate-600 rounded-xl flex items-center justify-center">
            <Database className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-800">إعدادات قاعدة البيانات (Supabase)</h1>
            <p className="text-sm text-slate-500">أدخل روابط الربط مع قاعدة البيانات لكي يعمل الموقع</p>
          </div>
        </div>

        {saved && (
          <div className="mb-6 bg-emerald-50 text-emerald-800 p-4 rounded-xl flex items-center gap-3 border border-emerald-200">
            <CheckCircle2 className="h-6 w-6 text-emerald-600 flex-shrink-0" />
            <p className="font-bold text-sm">تم الحفظ بنجاح! سيتم إعادة تحميل الصفحة الآن...</p>
          </div>
        )}

        <div className="mb-6 bg-blue-50 text-blue-800 p-4 rounded-xl flex gap-3 border border-blue-200 text-sm leading-relaxed">
          <AlertCircle className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
          <p>
            تُحفظ هذه البيانات في متصفحك الحالي فقط لغرض تشغيل النسخة. تأكد من إدخال <strong dir="ltr">Project URL</strong> و <strong dir="ltr">anon API key</strong> الصحيحين من إعدادات Supabase.
          </p>
        </div>

        <form onSubmit={handleSave} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-bold text-slate-700">Project URL</label>
            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://xxxx.supabase.co"
              className="px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 outline-none text-left"
              dir="ltr"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-bold text-slate-700">anon API Key</label>
            <input
              type="text"
              value={key}
              onChange={(e) => setKey(e.target.value)}
              placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
              className="px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 outline-none text-left font-mono"
              dir="ltr"
            />
          </div>

          <button
            type="submit"
            className="mt-4 bg-slate-800 text-white font-bold py-3 rounded-lg shadow-md hover:bg-slate-900 transition-all flex items-center justify-center gap-2"
          >
            <Save className="w-5 h-5" />
            حفظ الإعدادات
          </button>
        </form>
      </div>
    </div>
  );
}

import React, { useEffect, useState } from 'react';
import { supabase, isSupabaseConfigured } from '../supabaseClient';
import { Phone, CheckCircle2, Loader2, Info } from 'lucide-react';

interface Medicine {
  id: string;
  drug_name: string;
  drug_image: string;
  owner_name: string;
  owner_phone: string;
  created_at: string;
}

export default function MedicinesList() {
  const [medicines, setMedicines] = useState<Medicine[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const fetchMedicines = async () => {
    setLoading(true);
    if (!isSupabaseConfigured) {
      setError('يرجى إضافة روابط ومفاتيح Supabase في ملف src/supabaseClient.ts لكي تعمل قاعدة البيانات. \n(CONFIG_SUPABASE_URL + CONFIG_SUPABASE_ANON_KEY)');
      setLoading(false);
      return;
    }
    
    try {
      const { data, error } = await supabase
        .from('medicines')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setMedicines(data || []);
    } catch (err: any) {
      setError('تعذر جلب الأدوية. يرجى التأكد من إضافة مفاتيح Supabase في إعدادات البيئة (.env)');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMedicines();
  }, []);

  const handleRequest = async (id: string, drug_image: string) => {
    if (!window.confirm('هل أنت متأكد أنك حصلت على هذا الدواء وتريد إخفاءه من القائمة لغيرك؟')) return;
    
    try {
      // Delete image from storage
      if (drug_image) {
        // extract file name
        const urlParts = drug_image.split('/');
        const fileName = urlParts[urlParts.length - 1];
        if (fileName) {
          await supabase.storage.from('medicines-images').remove([fileName]);
        }
      }

      // Delete from db
      const { error } = await supabase.from('medicines').delete().eq('id', id);
      if (error) throw error;

      setSuccessMsg('✅ تم الحصول على الدواء بنجاح. تم مسح الإعلان.');
      
      // Remove from UI immediately
      setMedicines(prev => prev.filter(m => m.id !== id));
      
      setTimeout(() => setSuccessMsg(''), 5000);
    } catch (err: any) {
      alert(`حدث خطأ أثناء الطلب: ${err.message}`);
    }
  };

  return (
    <div className="w-full flex-grow flex flex-col gap-4">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-lg font-bold flex items-center gap-2">
          <span className="w-2 h-6 bg-blue-500 rounded-full"></span>
          الأدوية المتاحة حالياً
        </h2>
      </div>

      {successMsg && (
        <div className="mb-4 bg-emerald-50 text-emerald-800 p-4 rounded-xl flex items-center gap-3 border border-emerald-200">
          <CheckCircle2 className="h-6 w-6 text-emerald-600 flex-shrink-0" />
          <p className="font-bold text-sm sm:text-base">{successMsg}</p>
        </div>
      )}

      {error ? (
        <div className="bg-orange-50 text-orange-800 p-6 rounded-xl flex items-center justify-center gap-3 border border-orange-200">
          <Info className="h-6 w-6 text-orange-600 flex-shrink-0" />
          <p className="font-medium text-sm">{error}</p>
        </div>
      ) : loading ? (
        <div className="flex flex-col items-center justify-center py-20 text-slate-400">
          <Loader2 className="h-10 w-10 animate-spin text-emerald-500 mb-4" />
          <p>جاري تحميل الأدوية...</p>
        </div>
      ) : medicines.length === 0 ? (
        <div className="bg-white text-slate-500 p-12 rounded-xl flex flex-col items-center justify-center border border-slate-200 border-dashed text-center shadow-sm">
          <Info className="h-12 w-12 text-slate-300 mb-4" />
          <p className="text-base font-medium text-slate-600">لا توجد أدوية متاحة حالياً.</p>
          <p className="mt-2 text-xs">إذا كان لديك دواء فائض، ساهم في إضافته واحتسب الأجر.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {medicines.map((med) => (
            <div key={med.id} className="bg-white rounded-xl border border-slate-200 shadow-sm p-4 flex gap-4">
              <div className="w-24 h-24 sm:w-28 sm:h-28 bg-slate-100 rounded-lg flex-none flex items-center justify-center text-slate-400 overflow-hidden">
                <img 
                  src={med.drug_image || "https://via.placeholder.com/400x300?text=لا+توجد+صورة"} 
                  alt={med.drug_name} 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex flex-col justify-between flex-grow">
                <div>
                  <h3 className="font-bold text-emerald-700">{med.drug_name}</h3>
                  <p className="text-xs text-slate-500 mt-1">بواسطة: {med.owner_name}</p>
                </div>
                <div className="flex gap-2 mt-2">
                  <a 
                    href={`tel:${med.owner_phone}`}
                    className="flex-grow bg-blue-600 text-white py-1.5 rounded-lg text-xs font-bold text-center flex items-center justify-center gap-1 hover:bg-blue-700 transition"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    اتصل الآن
                  </a>
                  <button 
                    onClick={() => handleRequest(med.id, med.drug_image)}
                    className="flex-grow border border-emerald-600 text-emerald-600 py-1.5 rounded-lg text-xs font-bold hover:bg-emerald-50 transition"
                  >
                    تم الطلب
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

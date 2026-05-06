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
  const [selectedMedicine, setSelectedMedicine] = useState<Medicine | null>(null);

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
            <div 
              key={med.id} 
              className="bg-white rounded-xl border border-slate-200 shadow-sm p-4 flex gap-4 cursor-pointer hover:border-emerald-300 hover:shadow-md transition-all relative overflow-hidden"
              onClick={() => setSelectedMedicine(med)}
            >
              <div className="w-24 h-24 sm:w-28 sm:h-28 bg-slate-100 rounded-lg flex-none flex items-center justify-center text-slate-400 overflow-hidden">
                <img 
                  src={med.drug_image || "https://via.placeholder.com/400x300?text=لا+توجد+صورة"} 
                  alt={med.drug_name} 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex flex-col justify-between flex-grow">
                <div>
                  <h3 className="font-bold text-emerald-700 text-lg">{med.drug_name}</h3>
                  <p className="text-xs sm:text-sm text-slate-500 mt-1">بواسطة: <span className="font-medium text-slate-700">{med.owner_name}</span></p>
                </div>
                <div className="flex gap-2 mt-2">
                  <a 
                    href={`tel:${med.owner_phone}`}
                    onClick={(e) => e.stopPropagation()}
                    className="flex-grow bg-blue-600 text-white py-1.5 rounded-lg text-xs sm:text-sm font-bold text-center flex items-center justify-center gap-1 hover:bg-blue-700 transition"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    اتصل
                  </a>
                  <button 
                    onClick={(e) => { e.stopPropagation(); handleRequest(med.id, med.drug_image); }}
                    className="flex-grow border border-emerald-600 text-emerald-600 py-1.5 rounded-lg text-xs sm:text-sm font-bold hover:bg-emerald-50 transition"
                  >
                    تم الطلب
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {selectedMedicine && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm transition-opacity"
          onClick={() => setSelectedMedicine(null)}
        >
          <div 
            className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden relative flex flex-col max-h-[95vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="relative h-40 sm:h-56 bg-slate-100 flex-shrink-0 p-4">
              <img 
                src={selectedMedicine.drug_image || "https://via.placeholder.com/400x300?text=لا+توجد+صورة"} 
                alt={selectedMedicine.drug_name} 
                className="w-full h-full object-contain mix-blend-multiply"
              />
              <button 
                onClick={() => setSelectedMedicine(null)}
                className="absolute top-4 right-4 w-8 h-8 bg-white/80 backdrop-blur-md rounded-full flex items-center justify-center text-slate-700 hover:bg-white hover:scale-110 transition-all shadow-sm z-10"
              >
                ✕
              </button>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent p-4 pt-12 pb-3">
                <h2 className="text-xl sm:text-2xl font-bold text-white drop-shadow-md">
                  {selectedMedicine.drug_name}
                </h2>
              </div>
            </div>
            
            {/* Modal Body */}
            <div className="p-4 sm:p-5 flex-grow overflow-y-auto min-h-0 space-y-4 sm:space-y-5">
              
              <div className="flex flex-col gap-1.5">
                <p className="text-sm font-semibold text-slate-500">صاحب الدواء</p>
                <div className="flex items-center gap-2 bg-slate-50 border border-slate-100 p-3 rounded-xl">
                  <span className="font-bold text-slate-800 text-base">{selectedMedicine.owner_name}</span>
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <p className="text-sm font-semibold text-slate-500">رقم التواصل</p>
                <div className="flex items-center gap-3 bg-blue-50/50 border border-blue-100 p-3 rounded-xl">
                  <Phone className="w-5 h-5 text-blue-600" />
                  <span className="font-bold text-blue-700 text-lg" dir="ltr">{selectedMedicine.owner_phone}</span>
                </div>
              </div>
              
              <div className="flex flex-col gap-1.5">
                <p className="text-sm font-semibold text-slate-500">تاريخ الإضافة</p>
                <div className="flex items-center gap-2 text-slate-600">
                  <Info className="w-4 h-4 text-emerald-500" />
                  <span className="text-sm font-medium">
                    {new Date(selectedMedicine.created_at).toLocaleDateString('ar-EG', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: 'numeric',
                      minute: 'numeric'
                    })}
                  </span>
                </div>
              </div>
              
              <div className="pt-2">
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 flex gap-3 text-amber-800 items-start">
                  <span className="text-sm leading-relaxed">
                    <strong>تنبيه:</strong> الرجاء عدم التواصل إلا إذا كنت بحاجة فعلية لهذا الدواء، واحرص على استخدام الأدوية تحت إشراف طبي.
                  </span>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-slate-100 flex flex-col sm:flex-row gap-3 bg-slate-50 flex-shrink-0">
              <a 
                href={`tel:${selectedMedicine.owner_phone}`}
                className="w-full sm:flex-[2] bg-blue-600 text-white py-3.5 rounded-xl text-base font-bold text-center flex items-center justify-center gap-2 hover:bg-blue-700 hover:-translate-y-0.5 transition-all shadow-md shadow-blue-200"
              >
                <Phone className="w-5 h-5" />
                اتصل بصاحب الدواء
              </a>
              <button 
                onClick={() => {
                  handleRequest(selectedMedicine.id, selectedMedicine.drug_image);
                  setSelectedMedicine(null);
                }}
                className="w-full sm:flex-1 bg-white border-2 border-emerald-600 text-emerald-600 py-3.5 rounded-xl text-base font-bold hover:bg-emerald-50 transition-all flex items-center justify-center"
              >
                تم الطلب
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

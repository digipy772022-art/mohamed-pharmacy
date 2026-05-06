import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase, isSupabaseConfigured } from '../supabaseClient';
import { Camera, Loader2, CheckCircle2, PackageCheck } from 'lucide-react';

export default function UploadMedicine() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [preview, setPreview] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setPreview(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);
    setErrorMsg('');

    const formData = new FormData(e.currentTarget);
    const drug_name = formData.get('drug_name') as string;
    const owner_name = formData.get('owner_name') as string;
    const owner_phone = formData.get('owner_phone') as string;
    const file = formData.get('drug_image') as File;

    if (!isSupabaseConfigured) {
      setErrorMsg('الرجاء إضافة روابط ومفاتيح Supabase في ملف src/supabaseClient.ts لكي تعمل قاعدة البيانات.');
      setLoading(false);
      return;
    }

    if (!drug_name || !owner_name || !owner_phone || !file || file.size === 0) {
      setErrorMsg('الرجاء إكمال جميع الحقول وإرفاق صورة للدواء.');
      setLoading(false);
      return;
    }

    try {
      // 1. Upload Image
      const fileExt = file.name.split('.').pop();
      const fileName = `drug-${Date.now()}.${fileExt}`;
      
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('medicines-images')
        .upload(fileName, file);

      if (uploadError) {
        console.error('Upload Error:', uploadError);
        if (uploadError.message === 'Bucket not found') {
          throw new Error('خطأ: لم يتم العثور على وعاء التخزين. يرجى إنشاء Bucket باسم "medicines-images" في Supabase وجعله Public.');
        }
        throw new Error(`فشل رفع الصورة: ${uploadError.message}`);
      }

      // 2. Get Public URL
      const { data: { publicUrl } } = supabase.storage
        .from('medicines-images')
        .getPublicUrl(uploadData.path);

      // 3. Save to database
      const { error: dbError } = await supabase.from('medicines').insert({
        drug_name,
        drug_image: publicUrl,
        owner_name,
        owner_phone
      });

      if (dbError) throw new Error(`فشل حفظ البيانات: ${dbError.message}`);

      setSuccess(true);
      
      // Auto redirect after 3 seconds
      setTimeout(() => {
        navigate('/medicines');
      }, 3000);
      
    } catch (err: any) {
      setErrorMsg(err.message || 'حدث خطأ. تأكد من إعدادات Supabase الخاصة بك.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="max-w-2xl mx-auto w-full flex flex-col items-center justify-center my-10 animate-fade-in">
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xl p-10 flex flex-col items-center text-center max-w-sm w-full">
          <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-6">
            <PackageCheck className="w-10 h-10" strokeWidth={2} />
          </div>
          <h2 className="text-2xl font-bold text-slate-800 mb-2">تم الرفع بنجاح!</h2>
          <p className="text-slate-500 mb-8 leading-relaxed">
            جزاك الله خيراً وجعله في ميزان حسناتك.<br />سيتم تحويلك لقائمة الأدوية الآن...
          </p>
          <Loader2 className="w-6 h-6 text-emerald-400 animate-spin" />
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto w-full bg-white rounded-2xl border border-slate-200 shadow-xl p-6 flex flex-col my-4">
      <div className="text-center mb-6">
        <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-full mx-auto flex items-center justify-center mb-3">
          <CheckCircle2 className="w-8 h-8" strokeWidth={2} />
        </div>
        <h2 className="text-lg font-bold text-slate-800">رفع دواء متاح</h2>
        <p className="text-sm text-slate-500">ساعد الآخرين بأدويتك الزائدة</p>
      </div>

      {errorMsg && (
        <div className="mb-6 bg-red-50 text-red-800 p-4 rounded-xl border border-red-200 text-sm">
          {errorMsg}
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <label htmlFor="drug_name" className="text-xs font-bold text-slate-600">
            اسم الدواء <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="drug_name"
            name="drug_name"
            required
            className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
            placeholder="مثال: بنادول 500 ملغ"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-xs font-bold text-slate-600">
            صورة الدواء <span className="text-red-500">*</span>
          </label>
          <div className="border-2 border-dashed border-slate-200 bg-slate-50 rounded-lg py-6 text-center cursor-pointer hover:border-emerald-400 transition-colors relative min-h-[140px] flex items-center justify-center overflow-hidden">
            {preview ? (
              <img src={preview} alt="Preview" className="absolute inset-0 w-full h-full object-contain p-2" />
            ) : (
              <div className="flex flex-col items-center gap-1">
                <Camera className="h-8 w-8 text-slate-400" />
                <p className="text-xs text-slate-500 mt-2 font-medium">اضغط لرفع الصورة</p>
              </div>
            )}
            <input 
              id="drug_image" 
              name="drug_image" 
              type="file" 
              accept="image/*" 
              required 
              onChange={handleImageChange}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" 
            />
          </div>
        </div>

        <div className="flex flex-col gap-1 mt-2">
          <label htmlFor="owner_name" className="text-xs font-bold text-slate-600">
            الاسم (صاحب الدواء) <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="owner_name"
            name="owner_name"
            required
            className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
            placeholder="الاسم الأول أو الكامل"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="owner_phone" className="text-xs font-bold text-slate-600">
            رقم الهاتف للتواصل <span className="text-red-500">*</span>
          </label>
          <input
            type="tel"
            id="owner_phone"
            name="owner_phone"
            required
            dir="ltr"
            className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 outline-none text-right"
            placeholder="+218 9X XXX XXXX"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="mt-4 bg-emerald-600 text-white font-bold py-2.5 rounded-lg shadow-lg shadow-emerald-200 hover:bg-emerald-700 transition-all flex justify-center w-full disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {loading ? (
            <span className="flex items-center gap-2">
              <Loader2 className="h-5 w-5 animate-spin" />
              جاري الرفع...
            </span>
          ) : (
            'رفع البيانات الآن'
          )}
        </button>
      </form>

      <div className="mt-6 mb-2">
        <p className="text-[10px] text-slate-400 text-center leading-relaxed">
          * برفعك لهذه البيانات أنت تؤكد صلاحية الدواء ومسؤوليتك عن دقة المعلومات.
        </p>
      </div>
    </div>
  );
}


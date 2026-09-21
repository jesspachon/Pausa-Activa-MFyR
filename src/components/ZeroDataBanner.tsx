import React from 'react';
import { HeartHandshake, ShieldCheck, Lock } from 'lucide-react';

export const ZeroDataBanner: React.FC = () => {
  return (
    <div className="bg-gradient-to-r from-emerald-50 via-teal-50 to-slate-50 border border-emerald-200/80 rounded-2xl p-4 sm:p-5 shadow-xs">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-start gap-3">
          <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0 mt-0.5">
            <HeartHandshake className="w-5 h-5 text-emerald-700" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-slate-800 flex items-center gap-1.5">
              <span>Tu espacio de bienestar en el HUV</span>
              <span className="text-[11px] font-normal px-2 py-0.5 rounded-md bg-emerald-100/70 text-emerald-800 border border-emerald-200">
                100% Confidencial y Libre
              </span>
            </h2>
            <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
              Esta aplicación es <strong>100% estática y autónoma</strong>: no utiliza servidores externos, no requiere API Keys, ni solicita nombres, correos ni datos personales, ni realiza evaluaciones. Las rutinas, ritmos y guías silenciosas se ejecutan directamente en tu dispositivo sin conexión requerida.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 shrink-0 text-xs text-slate-500 bg-white/70 px-3 py-1.5 rounded-lg border border-slate-200 self-stretch sm:self-auto justify-center">
          <span className="flex items-center gap-1 text-emerald-700 font-medium">
            <ShieldCheck className="w-3.5 h-3.5" /> Acceso directo
          </span>
          <span className="text-slate-300">•</span>
          <span className="flex items-center gap-1 text-slate-600 font-medium">
            <Lock className="w-3.5 h-3.5" /> Sin registros
          </span>
        </div>
      </div>
    </div>
  );
};

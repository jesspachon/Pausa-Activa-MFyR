import React from 'react';
import { Sparkles, Users, Stethoscope, HeartHandshake } from 'lucide-react';

interface InstitutionalBannerProps {
  onQuickRoleSelect?: (category: string) => void;
}

export const InstitutionalBanner: React.FC<InstitutionalBannerProps> = ({ onQuickRoleSelect }) => {
  return (
    <div className="bg-white rounded-3xl border border-slate-200/80 p-5 sm:p-6 shadow-xs">
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
        {/* Text overview */}
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 text-teal-800 border border-teal-200 text-xs font-semibold">
            <Stethoscope className="w-3.5 h-3.5 text-teal-600" />
            <span>Servicio de Medicina Física y Rehabilitación • HUV Evaristo García</span>
          </div>

          <h2 className="text-xl sm:text-2xl font-bold font-['Outfit'] text-slate-900 tracking-tight">
            60 segundos diseñados para tu jornada clínica
          </h2>

          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Tu labor rehabilitando pacientes requiere esfuerzo articular, fuerza de agarre, atención continua y horas frente a historias clínicas. Cada ejercicio fue concebido para realizarse <strong>de pie o sentado en tu puesto</strong>, sin necesidad de implementos ni cambio de ropa.
          </p>

          <div className="flex flex-wrap gap-2 pt-1 text-xs text-slate-500 font-medium">
            <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700">Fisioterapia</span>
            <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700">Terapia Ocupacional</span>
            <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700">Fonoaudiología</span>
            <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700">Médicos Fisiatras</span>
            <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700">Auxiliares</span>
          </div>
        </div>

        {/* Quick Access Badges for Rehab Roles */}
        <div className="w-full lg:w-auto shrink-0 bg-slate-50 border border-slate-100 p-4 rounded-2xl flex flex-col gap-2.5">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
            Filtro rápido por necesidad asistencial:
          </span>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => onQuickRoleSelect?.('estiramiento')}
              className="px-3 py-2 rounded-xl bg-white hover:bg-teal-50 text-slate-700 hover:text-teal-900 border border-slate-200 hover:border-teal-300 text-xs font-semibold transition-colors flex items-center gap-1.5 cursor-pointer text-left"
            >
              <span className="w-2 h-2 rounded-full bg-teal-500" />
              <span>Muñecas y Cuello</span>
            </button>
            <button
              onClick={() => onQuickRoleSelect?.('visual')}
              className="px-3 py-2 rounded-xl bg-white hover:bg-sky-50 text-slate-700 hover:text-sky-900 border border-slate-200 hover:border-sky-300 text-xs font-semibold transition-colors flex items-center gap-1.5 cursor-pointer text-left"
            >
              <span className="w-2 h-2 rounded-full bg-sky-500" />
              <span>Fatiga de Pantallas</span>
            </button>
            <button
              onClick={() => onQuickRoleSelect?.('respiracion')}
              className="px-3 py-2 rounded-xl bg-white hover:bg-emerald-50 text-slate-700 hover:text-emerald-900 border border-slate-200 hover:border-emerald-300 text-xs font-semibold transition-colors flex items-center gap-1.5 cursor-pointer text-left"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>Reset Respiratorio</span>
            </button>
            <button
              onClick={() => onQuickRoleSelect?.('relajacion')}
              className="px-3 py-2 rounded-xl bg-white hover:bg-indigo-50 text-slate-700 hover:text-indigo-900 border border-slate-200 hover:border-indigo-300 text-xs font-semibold transition-colors flex items-center gap-1.5 cursor-pointer text-left"
            >
              <span className="w-2 h-2 rounded-full bg-indigo-500" />
              <span>Cintura Escapular</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

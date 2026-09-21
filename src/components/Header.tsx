import React from 'react';
import { Bell, HeartHandshake, ShieldCheck, VolumeX } from 'lucide-react';

interface HeaderProps {
  onOpenReminderModal: () => void;
  reminderInterval: number;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenReminderModal,
  reminderInterval,
}) => {
  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-xs">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3.5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        {/* Brand & HUV Institutional ID */}
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-teal-600 flex items-center justify-center text-white shadow-xs shrink-0">
            <span className="font-['Outfit'] font-bold text-xl tracking-tighter">1'</span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-['Outfit'] font-bold text-xl text-slate-900 leading-tight">
                1 Minuto Para Mí
              </h1>
              <span className="text-[11px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-teal-50 text-teal-700 border border-teal-200">
                Pausa Activa
              </span>
            </div>
            <p className="text-xs text-slate-500 font-medium">
              Medicina Física y Rehabilitación • HUV Evaristo García
            </p>
          </div>
        </div>

        {/* Guarantees & Silent Alert Controls */}
        <div className="flex items-center flex-wrap gap-2 text-xs">
          {/* Zero Data & Zero Eval Badge */}
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-emerald-50/80 text-emerald-800 border border-emerald-200 font-medium" title="Sin registros, sin nombres, sin evaluaciones">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
            <span>Sin datos ni evaluación</span>
          </div>

          {/* Silent Indicator */}
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-slate-100 text-slate-700 border border-slate-200 font-medium" title="Guías visuales y vibración silenciosa para áreas clínicas">
            <VolumeX className="w-3.5 h-3.5 text-slate-500 shrink-0" />
            <span>Guía Silenciosa</span>
          </div>

          {/* Reminder Trigger Button */}
          <button
            id="open-reminder-btn"
            onClick={onOpenReminderModal}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-teal-50 hover:bg-teal-100 text-teal-800 border border-teal-200 transition-colors font-semibold cursor-pointer"
          >
            <Bell className="w-3.5 h-3.5 text-teal-600 shrink-0" />
            <span>
              {reminderInterval > 0 ? `Aviso c/${reminderInterval}m` : 'Recordatorio'}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};

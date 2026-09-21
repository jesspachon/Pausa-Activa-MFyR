import React, { useState } from 'react';
import { Bell, X, Check, VolumeX, Shield, Clock } from 'lucide-react';
import { requestSilentNotificationPermission, sendSilentBrowserNotification } from '../utils/silentNotifications';

interface SilentReminderModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentInterval: number; // in minutes (0 = off)
  onSaveInterval: (minutes: number) => void;
}

export const SilentReminderModal: React.FC<SilentReminderModalProps> = ({
  isOpen,
  onClose,
  currentInterval,
  onSaveInterval,
}) => {
  const [selectedInterval, setSelectedInterval] = useState<number>(currentInterval);
  const [permissionStatus, setPermissionStatus] = useState<string>(
    typeof window !== 'undefined' && 'Notification' in window
      ? Notification.permission
      : 'default'
  );

  if (!isOpen) return null;

  const intervals = [
    { value: 0, label: 'Desactivado', desc: 'Solo cuando yo decida entrar' },
    { value: 30, label: 'Cada 30 minutos', desc: 'Ideal tras pacientes de alta exigencia física' },
    { value: 45, label: 'Cada 45 minutos', desc: 'Recomendado para terapeutas y digitación' },
    { value: 60, label: 'Cada 60 minutos', desc: '1 pausa por cada hora de turno asistencial' },
    { value: 90, label: 'Cada 90 minutos', desc: 'Ritmo espaciado para rondas hospitalarias' },
  ];

  const handleEnablePermission = async () => {
    const granted = await requestSilentNotificationPermission();
    setPermissionStatus(granted ? 'granted' : 'denied');
    if (granted) {
      sendSilentBrowserNotification(
        '1 Minuto Para Mí - Pausa Activa',
        'Notificaciones silenciosas configuradas correctamente para tu turno en el HUV.'
      );
    }
  };

  const handleSave = () => {
    onSaveInterval(selectedInterval);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
      <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl border border-slate-100 overflow-hidden flex flex-col">
        
        {/* Header */}
        <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/70">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-teal-100 text-teal-700 flex items-center justify-center">
              <Bell className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold font-['Outfit'] text-slate-800">
                Recordatorio Silencioso
              </h3>
              <p className="text-xs text-slate-500">
                Avisos discretos sin interrumpir a los pacientes
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 space-y-4">
          {/* Silent Guarantee note */}
          <div className="p-3 rounded-xl bg-teal-50/60 border border-teal-100 flex items-start gap-2.5 text-xs text-teal-900">
            <VolumeX className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              <strong>100% Silencioso:</strong> No emitirá ruidos ni timbres molestos. Utiliza aviso visual y vibración sutil, ideal para el gimnasio de rehabilitación y consultorios.
            </p>
          </div>

          {/* Browser Notification Permission status if needed */}
          {permissionStatus !== 'granted' && selectedInterval > 0 && (
            <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 flex flex-col gap-2 text-xs text-amber-900">
              <div className="flex items-center gap-2 font-semibold">
                <Shield className="w-4 h-4 text-amber-600 shrink-0" />
                <span>Permitir aviso silencioso del navegador</span>
              </div>
              <p className="text-amber-800">
                Para que te avise mientras tienes abierta la historia clínica en otra pestaña:
              </p>
              <button
                onClick={handleEnablePermission}
                className="self-start px-3 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-700 text-white font-bold transition-colors cursor-pointer"
              >
                Activar aviso en el navegador
              </button>
            </div>
          )}

          {/* Interval options */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Frecuencia sugerida:
            </label>
            {intervals.map((item) => (
              <div
                key={item.value}
                onClick={() => setSelectedInterval(item.value)}
                className={`p-3 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                  selectedInterval === item.value
                    ? 'bg-teal-50/80 border-teal-500 shadow-xs'
                    : 'bg-slate-50/50 border-slate-200/80 hover:bg-slate-100/70'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Clock className={`w-4 h-4 ${selectedInterval === item.value ? 'text-teal-600' : 'text-slate-400'}`} />
                  <div>
                    <p className={`text-xs font-bold ${selectedInterval === item.value ? 'text-teal-950' : 'text-slate-800'}`}>
                      {item.label}
                    </p>
                    <p className="text-[11px] text-slate-500">{item.desc}</p>
                  </div>
                </div>
                {selectedInterval === item.value && (
                  <div className="w-5 h-5 rounded-full bg-teal-600 text-white flex items-center justify-center shrink-0">
                    <Check className="w-3 h-3" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-100 bg-slate-50 flex items-center justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-200 transition-colors cursor-pointer"
          >
            Cancelar
          </button>
          <button
            onClick={handleSave}
            className="px-5 py-2 rounded-xl text-xs font-bold bg-teal-600 hover:bg-teal-700 text-white transition-colors cursor-pointer shadow-xs"
          >
            Guardar configuración
          </button>
        </div>

      </div>
    </div>
  );
};

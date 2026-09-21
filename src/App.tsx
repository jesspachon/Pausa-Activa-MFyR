import React, { useState, useEffect, useMemo } from 'react';
import { 
  Play, 
  Sparkles, 
  Wind, 
  Activity, 
  Eye, 
  Search, 
  Shuffle, 
  X, 
  Clock, 
  BellRing,
  Heart,
  ShieldCheck
} from 'lucide-react';
import { Exercise, ExerciseCategory } from './types';
import { EXERCISES, CATEGORY_METADATA } from './data/exercises';
import { Header } from './components/Header';
import { ZeroDataBanner } from './components/ZeroDataBanner';
import { InstitutionalBanner } from './components/InstitutionalBanner';
import { ExerciseCard } from './components/ExerciseCard';
import { ActivePausePlayer } from './components/ActivePausePlayer';
import { SilentReminderModal } from './components/SilentReminderModal';
import { sendSilentBrowserNotification, triggerHapticFeedback } from './utils/silentNotifications';

export default function App() {
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('todos');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isReminderModalOpen, setIsReminderModalOpen] = useState<boolean>(false);
  const [reminderIntervalMinutes, setReminderIntervalMinutes] = useState<number>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('huv_pausa_reminder_interval');
      return saved ? parseInt(saved, 10) : 45; // Default: 45 min recommended for rehab ergonomics
    }
    return 45;
  });
  
  // Discreet in-app silent alert banner when time elapses
  const [showInAppReminderBanner, setShowInAppReminderBanner] = useState<boolean>(false);

  // Interval timer for silent reminder
  useEffect(() => {
    if (reminderIntervalMinutes <= 0) return;

    const intervalMs = reminderIntervalMinutes * 60 * 1000;
    const timer = setInterval(() => {
      // Trigger silent browser notification
      sendSilentBrowserNotification(
        '1 Minuto Para Mí • Pausa Activa HUV',
        'Es momento de tu pausa activa de 60 segundos. Cuida tu postura y respira.'
      );

      // Trigger subtle in-app reminder
      setShowInAppReminderBanner(true);
      triggerHapticFeedback([100, 50, 100]);
    }, intervalMs);

    return () => clearInterval(timer);
  }, [reminderIntervalMinutes]);

  const handleSaveReminder = (mins: number) => {
    setReminderIntervalMinutes(mins);
    if (typeof window !== 'undefined') {
      localStorage.setItem('huv_pausa_reminder_interval', mins.toString());
    }
  };

  // Instant random 1-minute pause
  const handleStartRandomPause = () => {
    const randomIndex = Math.floor(Math.random() * EXERCISES.length);
    setSelectedExercise(EXERCISES[randomIndex]);
  };

  // Filtered exercises
  const filteredExercises = useMemo(() => {
    return EXERCISES.filter((ex) => {
      const matchesCategory = activeCategory === 'todos' || ex.category === activeCategory;
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch = 
        query === '' ||
        ex.title.toLowerCase().includes(query) ||
        ex.bodyArea.toLowerCase().includes(query) ||
        ex.shortDescription.toLowerCase().includes(query) ||
        ex.clinicalContext.toLowerCase().includes(query);
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-800 flex flex-col selection:bg-teal-100 selection:text-teal-900">
      
      {/* App Header */}
      <Header
        onOpenReminderModal={() => setIsReminderModalOpen(true)}
        reminderInterval={reminderIntervalMinutes}
      />

      {/* Discreet In-App Silent Reminder Alert Banner (Appears when timer triggers) */}
      {showInAppReminderBanner && (
        <div className="bg-teal-800 text-white px-4 py-3 shadow-md border-b border-teal-700 animate-in fade-in slide-in-from-top duration-300">
          <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2.5">
              <span className="w-2.5 h-2.5 rounded-full bg-teal-300 animate-ping shrink-0" />
              <BellRing className="w-4 h-4 text-teal-300 shrink-0" />
              <span>
                <strong>Aviso silencioso de pausa:</strong> Ha pasado el intervalo de trabajo clínico. ¿Tomamos 1 minuto para ti?
              </span>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => {
                  setShowInAppReminderBanner(false);
                  handleStartRandomPause();
                }}
                className="px-3 py-1.5 rounded-lg bg-teal-500 hover:bg-teal-400 text-white font-bold transition-colors cursor-pointer"
              >
                Iniciar 1 minuto ahora
              </button>
              <button
                onClick={() => setShowInAppReminderBanner(false)}
                className="p-1 rounded-md hover:bg-teal-700 text-teal-200 hover:text-white transition-colors cursor-pointer"
                title="Descartar aviso"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8 flex-1 w-full space-y-6">
        
        {/* Zero Data & Zero Evaluation Guarantee Banner */}
        <ZeroDataBanner />

        {/* Institutional HUV Rehabilitation Banner */}
        <InstitutionalBanner
          onQuickRoleSelect={(cat) => {
            setActiveCategory(cat);
            window.scrollTo({ top: 380, behavior: 'smooth' });
          }}
        />

        {/* Quick Instant Start Hero Box */}
        <div className="bg-gradient-to-br from-teal-700 via-teal-800 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-md relative overflow-hidden">
          {/* Subtle decorative background circles */}
          <div className="absolute -right-16 -top-16 w-64 h-64 bg-teal-500/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -left-16 -bottom-16 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-2 max-w-xl">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-500/30 text-teal-200 border border-teal-400/30 text-xs font-semibold">
                <Clock className="w-3.5 h-3.5" />
                <span>60 Segundos Exactos</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold font-['Outfit'] tracking-tight text-white">
                ¿Solo tienes 1 minuto entre pacientes?
              </h2>
              <p className="text-xs sm:text-sm text-teal-100/90 leading-relaxed">
                Sin configuraciones ni búsquedas. Pulsa el botón y la aplicación elegirá una pausa activa descompresiva guiada silenciosamente para ti.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full md:w-auto shrink-0">
              <button
                id="instant-random-pause-btn"
                onClick={handleStartRandomPause}
                className="px-6 py-3.5 rounded-2xl bg-white hover:bg-teal-50 text-teal-900 font-bold text-sm shadow-md transition-all duration-200 flex items-center justify-center gap-2.5 cursor-pointer active:scale-95 group"
              >
                <Shuffle className="w-4 h-4 text-teal-700 group-hover:rotate-45 transition-transform" />
                <span>Pausa Rápida Aleatoria</span>
              </button>
            </div>
          </div>
        </div>

        {/* Category Filters & Search Controls */}
        <div className="space-y-3 pt-2">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div>
              <h2 className="text-lg font-bold font-['Outfit'] text-slate-900">
                Catálogo de Pausas Activas
              </h2>
              <p className="text-xs text-slate-500">
                Selecciona la zona o necesidad que requiere alivio en este momento
              </p>
            </div>

            {/* Search Input */}
            <div className="relative w-full sm:w-64">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                id="search-exercises-input"
                type="text"
                placeholder="Buscar (ej. muñeca, cuello, ojos)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-8 py-2 rounded-xl bg-white border border-slate-200 text-xs text-slate-800 placeholder:text-slate-400 focus:outline-hidden focus:border-teal-500 focus:ring-2 focus:ring-teal-100 transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* Category Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            <button
              onClick={() => setActiveCategory('todos')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                activeCategory === 'todos'
                  ? 'bg-teal-700 text-white shadow-xs'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              Todos ({EXERCISES.length})
            </button>

            <button
              onClick={() => setActiveCategory('respiracion')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer ${
                activeCategory === 'respiracion'
                  ? 'bg-emerald-700 text-white shadow-xs'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-emerald-50/50'
              }`}
            >
              <Wind className="w-3.5 h-3.5" />
              <span>Respiración</span>
            </button>

            <button
              onClick={() => setActiveCategory('estiramiento')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer ${
                activeCategory === 'estiramiento'
                  ? 'bg-teal-700 text-white shadow-xs'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-teal-50/50'
              }`}
            >
              <Activity className="w-3.5 h-3.5" />
              <span>Estiramiento</span>
            </button>

            <button
              onClick={() => setActiveCategory('relajacion')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer ${
                activeCategory === 'relajacion'
                  ? 'bg-indigo-700 text-white shadow-xs'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-indigo-50/50'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Relajación</span>
            </button>

            <button
              onClick={() => setActiveCategory('visual')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer ${
                activeCategory === 'visual'
                  ? 'bg-sky-700 text-white shadow-xs'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-sky-50/50'
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Descanso Visual</span>
            </button>
          </div>
        </div>

        {/* Exercises Grid */}
        {filteredExercises.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {filteredExercises.map((exercise) => (
              <ExerciseCard
                key={exercise.id}
                exercise={exercise}
                onStart={(ex) => setSelectedExercise(ex)}
              />
            ))}
          </div>
        ) : (
          <div className="p-12 text-center bg-white rounded-3xl border border-slate-200">
            <Search className="w-8 h-8 text-slate-300 mx-auto mb-2" />
            <p className="text-sm font-bold text-slate-700">No encontramos ejercicios con ese criterio</p>
            <p className="text-xs text-slate-500 mt-1">Prueba con palabras como "muñeca", "cuello", "hombros" o limpia la búsqueda.</p>
            <button
              onClick={() => { setSearchQuery(''); setActiveCategory('todos'); }}
              className="mt-4 px-4 py-2 rounded-xl bg-teal-50 text-teal-800 text-xs font-semibold hover:bg-teal-100 transition-colors cursor-pointer"
            >
              Restablecer filtros
            </button>
          </div>
        )}

      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white py-6 mt-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-700 font-['Outfit']">1 Minuto Para Mí</span>
            <span>•</span>
            <span>Hospital Universitario del Valle "Evaristo García" E.S.E.</span>
          </div>
          <div className="flex items-center gap-4 text-slate-400">
            <span className="flex items-center gap-1 text-slate-600">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> Sin recolección de datos
            </span>
            <span>•</span>
            <span>Guía Silenciosa Ergonómica</span>
          </div>
        </div>
      </footer>

      {/* 60-Second Active Pause Player Modal */}
      {selectedExercise && (
        <ActivePausePlayer
          exercise={selectedExercise}
          onClose={() => setSelectedExercise(null)}
          onSelectAnother={() => {
            setSelectedExercise(null);
          }}
        />
      )}

      {/* Silent Reminder Modal */}
      <SilentReminderModal
        isOpen={isReminderModalOpen}
        onClose={() => setIsReminderModalOpen(false)}
        currentInterval={reminderIntervalMinutes}
        onSaveInterval={handleSaveReminder}
      />

    </div>
  );
}

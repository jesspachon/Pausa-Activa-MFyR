import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  X, 
  CheckCircle2, 
  Vibrate, 
  Volume2, 
  VolumeX, 
  ArrowRight,
  Info,
  Sparkles,
  Heart
} from 'lucide-react';
import { Exercise, ExercisePhase } from '../types';
import { triggerHapticFeedback } from '../utils/silentNotifications';

interface ActivePausePlayerProps {
  exercise: Exercise;
  onClose: () => void;
  onSelectAnother: () => void;
}

export const ActivePausePlayer: React.FC<ActivePausePlayerProps> = ({
  exercise,
  onClose,
  onSelectAnother,
}) => {
  const [totalSecondsLeft, setTotalSecondsLeft] = useState<number>(60);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [currentPhaseIndex, setCurrentPhaseIndex] = useState<number>(0);
  const [phaseSecondsLeft, setPhaseSecondsLeft] = useState<number>(
    exercise.phases[0]?.duration || 60
  );
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [vibrationEnabled, setVibrationEnabled] = useState<boolean>(true);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(false); // strictly false by default in hospital
  const [silentCueBanner, setSilentCueBanner] = useState<string | null>(null);
  const [transitionFlash, setTransitionFlash] = useState<boolean>(false);

  // Audio tone generation for optional soft chime (no external audio assets required)
  const audioCtxRef = useRef<AudioContext | null>(null);

  const playSoftChime = () => {
    if (!soundEnabled) return;
    try {
      if (!audioCtxRef.current) {
        const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        audioCtxRef.current = new AudioContextClass();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(528, ctx.currentTime); // 528 Hz calm Solfeggio frequency
      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.2);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 1.2);
    } catch {
      // Audio not supported or blocked
    }
  };

  // Manage timer countdown
  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isPlaying && totalSecondsLeft > 0) {
      interval = setInterval(() => {
        setTotalSecondsLeft((prev) => {
          if (prev <= 1) {
            // Completed!
            setIsCompleted(true);
            setIsPlaying(false);
            if (vibrationEnabled) {
              triggerHapticFeedback([100, 50, 100, 50, 150]);
            }
            playSoftChime();
            return 0;
          }
          return prev - 1;
        });

        setPhaseSecondsLeft((prevPhaseSec) => {
          // Check if phase is ending
          if (prevPhaseSec <= 1) {
            // Next phase transition
            setCurrentPhaseIndex((prevIdx) => {
              const nextIdx = prevIdx + 1;
              if (nextIdx < exercise.phases.length) {
                const nextPhase = exercise.phases[nextIdx];
                
                // Trigger silent notifications
                if (vibrationEnabled) {
                  triggerHapticFeedback([90, 50, 90]);
                }
                setTransitionFlash(true);
                setTimeout(() => setTransitionFlash(false), 900);
                
                setSilentCueBanner(`🔔 Siguiente: ${nextPhase.phaseTitle}`);
                setTimeout(() => setSilentCueBanner(null), 3500);

                playSoftChime();

                return nextIdx;
              }
              return prevIdx;
            });

            // Set duration for the new phase
            const nextIdx = currentPhaseIndex + 1;
            return nextIdx < exercise.phases.length ? exercise.phases[nextIdx].duration : 0;
          }

          // Silent cue when 3 seconds remaining in current phase
          if (prevPhaseSec === 4) {
            const nextIdx = currentPhaseIndex + 1;
            if (nextIdx < exercise.phases.length) {
              setSilentCueBanner(`Preparando: ${exercise.phases[nextIdx].phaseTitle}...`);
              if (vibrationEnabled) {
                triggerHapticFeedback([40]);
              }
              setTimeout(() => setSilentCueBanner(null), 2800);
            }
          }

          return prevPhaseSec - 1;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isPlaying, totalSecondsLeft, currentPhaseIndex, exercise.phases, vibrationEnabled, soundEnabled]);

  const currentPhase: ExercisePhase = exercise.phases[currentPhaseIndex] || exercise.phases[0];
  const progressPercent = ((60 - totalSecondsLeft) / 60) * 100;
  const phaseProgressPercent = currentPhase ? ((currentPhase.duration - phaseSecondsLeft) / currentPhase.duration) * 100 : 0;

  const handleRestart = () => {
    setTotalSecondsLeft(60);
    setCurrentPhaseIndex(0);
    setPhaseSecondsLeft(exercise.phases[0]?.duration || 60);
    setIsCompleted(false);
    setIsPlaying(true);
    setSilentCueBanner('Reiniciando tu minuto de pausa...');
    setTimeout(() => setSilentCueBanner(null), 2500);
  };

  const handleNextPhaseManual = () => {
    if (currentPhaseIndex + 1 < exercise.phases.length) {
      const nextIdx = currentPhaseIndex + 1;
      setCurrentPhaseIndex(nextIdx);
      setPhaseSecondsLeft(exercise.phases[nextIdx].duration);
      if (vibrationEnabled) triggerHapticFeedback([60]);
    }
  };

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/60 backdrop-blur-md transition-colors duration-500 ${transitionFlash ? 'ring-8 ring-teal-400/50' : ''}`}>
      {/* Container */}
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden flex flex-col max-h-[95vh]">
        
        {/* Top silent notification banner floating in */}
        <AnimatePresence>
          {silentCueBanner && (
            <motion.div
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -50, opacity: 0 }}
              className="absolute top-2 left-4 right-4 z-40 bg-teal-800 text-white text-xs font-semibold py-2 px-4 rounded-xl shadow-lg flex items-center justify-between pointer-events-none"
            >
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-teal-300 animate-ping" />
                <span>{silentCueBanner}</span>
              </div>
              <span className="text-[10px] uppercase font-bold text-teal-200 tracking-wider">Aviso Silencioso</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Header of Modal */}
        <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/70">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-teal-700 bg-teal-100/70 px-2 py-0.5 rounded-md">
                {exercise.bodyArea}
              </span>
              <span className="text-xs text-slate-500 font-medium">
                Pausa Activa de 60s
              </span>
            </div>
            <h2 className="text-lg sm:text-xl font-bold font-['Outfit'] text-slate-800 mt-0.5">
              {exercise.title}
            </h2>
          </div>

          <div className="flex items-center gap-2">
            {/* Silent Vibration Toggle */}
            <button
              id="toggle-vibration-btn"
              onClick={() => {
                const next = !vibrationEnabled;
                setVibrationEnabled(next);
                if (next) triggerHapticFeedback([60]);
              }}
              className={`p-2 rounded-xl border transition-colors cursor-pointer ${
                vibrationEnabled 
                  ? 'bg-teal-50 border-teal-200 text-teal-700' 
                  : 'bg-slate-100 border-slate-200 text-slate-400'
              }`}
              title={vibrationEnabled ? 'Vibración háptica silenciosa activa' : 'Vibración desactivada'}
            >
              <Vibrate className="w-4 h-4" />
            </button>

            {/* Sound toggle (off by default for hospital silence) */}
            <button
              id="toggle-sound-btn"
              onClick={() => {
                const next = !soundEnabled;
                setSoundEnabled(next);
                if (next) playSoftChime();
              }}
              className={`p-2 rounded-xl border transition-colors cursor-pointer ${
                soundEnabled 
                  ? 'bg-amber-50 border-amber-200 text-amber-700' 
                  : 'bg-slate-100 border-slate-200 text-slate-400'
              }`}
              title={soundEnabled ? 'Sonido suave activado' : 'Modo Silencioso Clínico (Recomendado HUV)'}
            >
              {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>

            {/* Close Button */}
            <button
              id="close-player-btn"
              onClick={onClose}
              className="p-2 rounded-xl hover:bg-slate-200 text-slate-500 hover:text-slate-700 transition-colors cursor-pointer"
              title="Cerrar pausa"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Main Body */}
        <div className="p-4 sm:p-6 flex-1 overflow-y-auto">
          {!isCompleted ? (
            <div className="flex flex-col items-center">
              
              {/* Overall 60-Second Progress Bar */}
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden mb-6">
                <div 
                  className="h-full bg-teal-500 transition-all duration-1000 ease-linear rounded-full"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>

              {/* Big Interactive Visual Focus Circle */}
              <div className="relative w-48 h-48 sm:w-56 sm:h-56 flex items-center justify-center my-2">
                {/* Outer animated aura */}
                <motion.div
                  animate={{
                    scale: currentPhase.breathingState === 'inhale' 
                      ? [1, 1.25, 1.25] 
                      : currentPhase.breathingState === 'exhale' 
                      ? [1.25, 1, 1] 
                      : [1, 1.05, 1],
                    opacity: [0.35, 0.65, 0.35]
                  }}
                  transition={{
                    duration: currentPhase.breathingState ? 4 : 2.5,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className={`absolute inset-0 rounded-full blur-xl ${
                    exercise.category === 'respiracion' ? 'bg-emerald-300' :
                    exercise.category === 'estiramiento' ? 'bg-teal-300' :
                    exercise.category === 'visual' ? 'bg-sky-300' : 'bg-indigo-300'
                  }`}
                />

                {/* SVG Circular Progress Track */}
                <svg className="w-full h-full transform -rotate-90">
                  <circle
                    cx="50%"
                    cy="50%"
                    r="42%"
                    className="stroke-slate-100"
                    strokeWidth="8"
                    fill="transparent"
                  />
                  <circle
                    cx="50%"
                    cy="50%"
                    r="42%"
                    className="stroke-teal-600 transition-all duration-1000 ease-linear"
                    strokeWidth="8"
                    strokeDasharray="264"
                    strokeDashoffset={264 - (264 * phaseProgressPercent) / 100}
                    strokeLinecap="round"
                    fill="transparent"
                  />
                </svg>

                {/* Center Content */}
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4">
                  <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Tiempo Total
                  </span>
                  <div className="text-4xl sm:text-5xl font-black font-['Outfit'] text-slate-800 tracking-tight my-0.5">
                    00:{totalSecondsLeft < 10 ? `0${totalSecondsLeft}` : totalSecondsLeft}
                  </div>
                  
                  {/* Side badge if applicable */}
                  {currentPhase.side && currentPhase.side !== 'neutro' && (
                    <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full mt-1 ${
                      currentPhase.side === 'der' ? 'bg-blue-100 text-blue-800' :
                      currentPhase.side === 'izq' ? 'bg-indigo-100 text-indigo-800' :
                      'bg-emerald-100 text-emerald-800'
                    }`}>
                      {currentPhase.side === 'der' ? 'Lado Derecho ➡️' :
                       currentPhase.side === 'izq' ? 'Lado Izquierdo ⬅️' :
                       'Ambos Lados ✨'}
                    </span>
                  )}

                  {/* Phase countdown */}
                  <span className="text-[11px] font-medium text-slate-500 mt-1">
                    Fase: {phaseSecondsLeft}s
                  </span>
                </div>
              </div>

              {/* Current Phase Description & Silent Guide */}
              <div className="w-full mt-4 bg-slate-50 border border-slate-200/80 rounded-2xl p-4 sm:p-5 text-center">
                <div className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-teal-700 bg-teal-100/60 px-2.5 py-0.5 rounded-full mb-2">
                  <span>Fase {currentPhaseIndex + 1} de {exercise.phases.length}:</span>
                  <span>{currentPhase.phaseTitle}</span>
                </div>
                
                <p className="text-sm sm:text-base font-medium text-slate-800 leading-relaxed max-w-xl mx-auto">
                  {currentPhase.instruction}
                </p>

                {/* Visual Cue Pill */}
                <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-teal-600/10 text-teal-800 text-xs font-medium">
                  <Sparkles className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                  <span>{currentPhase.visualCue}</span>
                </div>

                {/* Ergonomic Clinical Posture Tip */}
                {currentPhase.postureTip && (
                  <div className="mt-2 text-xs text-slate-500 flex items-center justify-center gap-1.5 italic">
                    <Info className="w-3 h-3 text-slate-400 shrink-0" />
                    <span>{currentPhase.postureTip}</span>
                  </div>
                )}
              </div>

              {/* Stepper Dots */}
              <div className="flex items-center gap-2 mt-4">
                {exercise.phases.map((ph, idx) => (
                  <div
                    key={idx}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      idx === currentPhaseIndex
                        ? 'w-8 bg-teal-600'
                        : idx < currentPhaseIndex
                        ? 'w-2.5 bg-teal-300'
                        : 'w-2.5 bg-slate-200'
                    }`}
                    title={ph.phaseTitle}
                  />
                ))}
              </div>

            </div>
          ) : (
            /* Completed Screen (Warm, respectful, acknowledging HUV staff) */
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="py-6 sm:py-8 text-center flex flex-col items-center"
            >
              <div className="w-16 h-16 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-4 shadow-sm">
                <CheckCircle2 className="w-10 h-10 text-emerald-600" />
              </div>

              <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                ¡Minuto Cumplido!
              </span>

              <h3 className="text-2xl font-bold font-['Outfit'] text-slate-800 mt-3">
                Gracias por cuidar de ti
              </h3>

              <p className="text-sm text-slate-600 max-w-md mt-2 leading-relaxed">
                Has regalado a tu cuerpo y a tu mente una descompresión real. En el servicio de Medicina Física y Rehabilitación tu energía es valiosa para tus pacientes y para ti.
              </p>

              <div className="my-6 p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-600 flex items-center gap-3 max-w-md text-left">
                <Heart className="w-5 h-5 text-rose-500 shrink-0" />
                <span>
                  <strong>Recuerda:</strong> El autocuidado del personal de salud no es una pausa del trabajo; es el pilar que sostiene una rehabilitación humana y de excelencia.
                </span>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
                <button
                  id="repeat-minute-btn"
                  onClick={handleRestart}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-semibold text-sm transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Hacer otro minuto</span>
                </button>
                <button
                  id="select-another-btn"
                  onClick={onSelectAnother}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-sm transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Elegir otro ejercicio</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}
        </div>

        {/* Footer Controls (when pause is active) */}
        {!isCompleted && (
          <div className="p-4 border-t border-slate-100 bg-slate-50/50 flex items-center justify-between">
            <button
              id="restart-current-btn"
              onClick={handleRestart}
              className="p-2 rounded-xl text-slate-500 hover:text-slate-800 hover:bg-slate-200 transition-colors cursor-pointer flex items-center gap-1.5 text-xs font-semibold"
              title="Reiniciar a 60 segundos"
            >
              <RotateCcw className="w-4 h-4" />
              <span className="hidden sm:inline">Reiniciar</span>
            </button>

            {/* Play / Pause Toggle */}
            <button
              id="play-pause-btn"
              onClick={() => setIsPlaying(!isPlaying)}
              className="px-6 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-semibold text-sm transition-colors flex items-center gap-2 cursor-pointer shadow-xs"
            >
              {isPlaying ? (
                <>
                  <Pause className="w-4 h-4" />
                  <span>Pausar</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4" />
                  <span>Continuar</span>
                </>
              )}
            </button>

            {/* Skip phase button */}
            <button
              id="skip-phase-btn"
              onClick={handleNextPhaseManual}
              disabled={currentPhaseIndex >= exercise.phases.length - 1}
              className={`p-2 rounded-xl transition-colors flex items-center gap-1.5 text-xs font-semibold ${
                currentPhaseIndex < exercise.phases.length - 1
                  ? 'text-slate-600 hover:text-slate-900 hover:bg-slate-200 cursor-pointer'
                  : 'text-slate-300 cursor-not-allowed'
              }`}
              title="Avanzar a la siguiente fase"
            >
              <span className="hidden sm:inline">Siguiente fase</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

      </div>
    </div>
  );
};

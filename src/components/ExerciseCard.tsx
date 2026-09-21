import React, { useState } from 'react';
import { 
  Wind, 
  Hand, 
  UserCheck, 
  Maximize2, 
  ShieldAlert, 
  Sparkles, 
  Smile, 
  Compass, 
  Eye, 
  Sun, 
  RotateCw, 
  Activity, 
  Play, 
  Clock, 
  ChevronDown, 
  ChevronUp, 
  Stethoscope
} from 'lucide-react';
import { Exercise } from '../types';
import { CATEGORY_METADATA } from '../data/exercises';

interface ExerciseCardProps {
  exercise: Exercise;
  onStart: (exercise: Exercise) => void;
}

// Icon mapper
const renderExerciseIcon = (name: string, className: string = 'w-5 h-5') => {
  switch (name) {
    case 'Wind': return <Wind className={className} />;
    case 'Hand': return <Hand className={className} />;
    case 'UserCheck': return <UserCheck className={className} />;
    case 'Maximize2': return <Maximize2 className={className} />;
    case 'ShieldAlert': return <ShieldAlert className={className} />;
    case 'Sparkles': return <Sparkles className={className} />;
    case 'Smile': return <Smile className={className} />;
    case 'Compass': return <Compass className={className} />;
    case 'Eye': return <Eye className={className} />;
    case 'Sun': return <Sun className={className} />;
    case 'RotateCw': return <RotateCw className={className} />;
    default: return <Activity className={className} />;
  }
};

export const ExerciseCard: React.FC<ExerciseCardProps> = ({ exercise, onStart }) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const meta = CATEGORY_METADATA[exercise.category] || CATEGORY_METADATA.estiramiento;

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 hover:border-teal-400/80 shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between overflow-hidden group">
      
      {/* Top Details */}
      <div className="p-5">
        {/* Category & Duration Tags */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <span className={`text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${meta.bgBadge}`}>
            {meta.label}
          </span>
          <div className="flex items-center gap-1 text-slate-500 text-xs font-semibold">
            <Clock className="w-3.5 h-3.5 text-teal-600" />
            <span>60 segundos</span>
          </div>
        </div>

        {/* Title & Icon Header */}
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-slate-100 text-teal-700 flex items-center justify-center shrink-0 group-hover:bg-teal-600 group-hover:text-white transition-colors">
            {renderExerciseIcon(exercise.iconName, 'w-5 h-5')}
          </div>
          <div>
            <h3 className="font-['Outfit'] font-bold text-base text-slate-800 group-hover:text-teal-900 transition-colors">
              {exercise.title}
            </h3>
            <p className="text-xs font-semibold text-slate-500 mt-0.5">
              Zona: <span className="text-slate-700">{exercise.bodyArea}</span>
            </p>
          </div>
        </div>

        {/* Short Description */}
        <p className="text-xs text-slate-600 mt-3 leading-relaxed">
          {exercise.shortDescription}
        </p>

        {/* Clinical Rehab Context */}
        <div className="mt-3.5 p-2.5 rounded-xl bg-slate-50 border border-slate-100 flex items-start gap-2 text-[11px] text-slate-600">
          <Stethoscope className="w-3.5 h-3.5 text-teal-600 shrink-0 mt-0.5" />
          <span className="leading-snug">{exercise.clinicalContext}</span>
        </div>

        {/* Expandable Phase Breakdown */}
        {isExpanded && (
          <div className="mt-3 pt-3 border-t border-slate-100 space-y-2">
            <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Fases de este minuto (con guía silenciosa):
            </p>
            {exercise.phases.map((ph, idx) => (
              <div key={idx} className="p-2 rounded-lg bg-teal-50/40 border border-teal-100/60 text-xs text-slate-700">
                <div className="flex items-center justify-between font-semibold text-[11px] text-teal-900">
                  <span>{ph.phaseTitle}</span>
                  <span className="text-slate-500 font-normal">{ph.duration}s</span>
                </div>
                <p className="text-[11px] text-slate-600 mt-0.5 leading-snug">{ph.instruction}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Action Footer */}
      <div className="px-5 py-3.5 bg-slate-50/60 border-t border-slate-100 flex items-center justify-between gap-3">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-xs font-medium text-slate-500 hover:text-slate-800 flex items-center gap-1 cursor-pointer transition-colors"
        >
          <span>{isExpanded ? 'Menos' : 'Ver fases'}</span>
          {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </button>

        <button
          onClick={() => onStart(exercise)}
          className="px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold transition-all shadow-xs hover:shadow flex items-center gap-1.5 cursor-pointer active:scale-95"
        >
          <Play className="w-3.5 h-3.5 fill-white" />
          <span>Iniciar 1 Minuto</span>
        </button>
      </div>

    </div>
  );
};

export type ExerciseCategory = 'respiracion' | 'estiramiento' | 'relajacion' | 'visual';

export interface ExercisePhase {
  duration: number; // in seconds, sum of phases is 60 seconds
  phaseTitle: string;
  instruction: string;
  visualCue: string;
  breathingState?: 'inhale' | 'hold' | 'exhale' | 'rest';
  side?: 'izq' | 'der' | 'ambos' | 'neutro';
  postureTip?: string;
}

export interface Exercise {
  id: string;
  title: string;
  category: ExerciseCategory;
  bodyArea: string;
  clinicalContext: string; // Tailored for HUV rehabilitation staff context
  shortDescription: string;
  phases: ExercisePhase[];
  iconName: string;
}

export interface SilentNotificationSettings {
  vibrationEnabled: boolean;
  screenFlashEnabled: boolean;
  browserNotificationsEnabled: boolean;
  soundEnabled: boolean; // default false for hospital environment
  reminderIntervalMinutes: number; // 0 = off, 30, 45, 60, 90
}

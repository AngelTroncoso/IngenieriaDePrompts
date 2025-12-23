
export enum Screen {
  WELCOME = 'WELCOME',
  GENERATOR = 'GENERATOR',
  LIBRARY = 'LIBRARY',
  SETTINGS = 'SETTINGS',
  RESULT = 'RESULT'
}

export enum StyleTone {
  CREATIVE = 'Creativo',
  PROFESSIONAL = 'Profesional',
  CODE = 'Código',
  ACADEMIC = 'Académico',
  FRIENDLY = 'Amigable'
}

export interface PromptItem {
  id: string;
  title: string;
  category: string;
  timestamp: string;
  content: string;
  isFavorite: boolean;
}

export interface AppSettings {
  focus: 'Creative' | 'Technical' | 'Business' | 'Academic';
  temperature: number;
  explainReasoning: boolean;
  hapticFeedback: boolean;
  responseLength: 'Concise' | 'Normal' | 'Detailed';
}

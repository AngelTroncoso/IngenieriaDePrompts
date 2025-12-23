
import React, { useState } from 'react';
import { Screen, StyleTone, AppSettings } from '../types';
import { generatePromptAction } from '../services/geminiService';

interface GeneratorScreenProps {
  onGenerate: (prompt: string, concept: string, style: StyleTone) => void;
  settings: AppSettings;
  onNavigate: (screen: Screen) => void;
}

const GeneratorScreen: React.FC<GeneratorScreenProps> = ({ onGenerate, settings, onNavigate }) => {
  const [concept, setConcept] = useState('');
  const [selectedStyle, setSelectedStyle] = useState<StyleTone>(StyleTone.CREATIVE);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = async () => {
    if (!concept.trim()) return;
    setIsGenerating(true);
    const result = await generatePromptAction(concept, selectedStyle, settings);
    setIsGenerating(false);
    onGenerate(result, concept, selectedStyle);
  };

  const styles = [
    { icon: 'palette', value: StyleTone.CREATIVE },
    { icon: 'business_center', value: StyleTone.PROFESSIONAL },
    { icon: 'code', value: StyleTone.CODE },
    { icon: 'school', value: StyleTone.ACADEMIC },
    { icon: 'sentiment_satisfied', value: StyleTone.FRIENDLY },
  ];

  return (
    <div className="flex flex-col min-h-full pb-20">
      <header className="sticky top-0 z-40 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-sm px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/20 text-primary">
            <span className="material-symbols-outlined text-[20px]">auto_awesome</span>
          </div>
          <h1 className="text-xl font-bold tracking-tight">Arquitecto</h1>
        </div>
        <button 
          onClick={() => onNavigate(Screen.SETTINGS)}
          className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-black/5 dark:hover:bg-white/10"
        >
          <span className="material-symbols-outlined text-[24px]">settings</span>
        </button>
      </header>

      <section className="px-5 pt-4 pb-2">
        <h2 className="text-3xl font-bold leading-tight mb-2">Crea tu Prompt Perfecto</h2>
        <p className="text-slate-600 dark:text-slate-400 font-body text-base font-normal leading-relaxed">
          ¿Qué quieres pedirle a la IA hoy? Ingresa un tema simple y nosotros lo estructuramos.
        </p>
      </section>

      <section className="px-4 py-4">
        <div className="relative group">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-purple-600 rounded-xl opacity-30 blur group-focus-within:opacity-75 transition duration-500"></div>
          <div className="relative bg-surface-light dark:bg-surface-dark rounded-xl p-4 border border-slate-200 dark:border-[#3f3b54]">
            <div className="flex justify-between items-center mb-3">
              <label className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Tu Concepto</label>
              <button 
                onClick={() => onNavigate(Screen.LIBRARY)}
                className="text-xs text-primary hover:text-primary/80 font-medium flex items-center gap-1"
              >
                <span className="material-symbols-outlined text-[14px]">history</span>
                Historial
              </button>
            </div>
            <textarea 
              value={concept}
              onChange={(e) => setConcept(e.target.value)}
              className="w-full bg-transparent border-0 p-0 text-slate-800 dark:text-white placeholder:text-slate-400 dark:placeholder:text-[#6b6684] focus:ring-0 text-lg font-body leading-relaxed resize-none min-h-[140px]" 
              placeholder="Escribe tu idea aquí (ej. necesito un correo para vender servicios de diseño web)..."
            />
            <div className="flex justify-end mt-2">
              <span className="text-xs text-slate-400 dark:text-slate-600 font-mono">{concept.length}/500</span>
            </div>
          </div>
        </div>
      </section>

      <section className="py-2">
        <div className="px-5 mb-3 flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-800 dark:text-white">Estilo y Tono</h3>
          <span className="text-xs text-primary font-medium cursor-pointer">Ver todos</span>
        </div>
        <div className="flex gap-3 px-5 overflow-x-auto no-scrollbar pb-2">
          {styles.map((style) => (
            <button
              key={style.value}
              onClick={() => setSelectedStyle(style.value)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-full shrink-0 transition-all active:scale-95 ${
                selectedStyle === style.value
                ? 'bg-primary text-white shadow-lg shadow-primary/30'
                : 'bg-slate-200 dark:bg-[#2b2839] text-slate-700 dark:text-slate-300'
              }`}
            >
              <span className="material-symbols-outlined text-[18px]">{style.icon}</span>
              <span className="text-sm font-medium">{style.value}</span>
            </button>
          ))}
        </div>
      </section>

      <section className="px-4 py-4 mt-2">
        <h3 className="text-sm font-bold text-slate-800 dark:text-white px-1 mb-3">Consejos pro</h3>
        <div className="grid gap-3">
          <div className="bg-white dark:bg-[#1d1c27] border border-slate-100 dark:border-[#2b2839] rounded-xl p-4 flex items-start gap-4 shadow-sm">
            <div className="h-10 w-10 shrink-0 rounded-full bg-orange-500/10 flex items-center justify-center text-orange-500">
              <span className="material-symbols-outlined">person_pin</span>
            </div>
            <div>
              <h4 className="font-bold text-sm mb-1">Define un Rol</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-body leading-normal">
                Dile a la IA quién debe ser. Ej: "Actúa como un experto en marketing".
              </p>
            </div>
          </div>
          <div className="bg-white dark:bg-[#1d1c27] border border-slate-100 dark:border-[#2b2839] rounded-xl p-4 flex items-start gap-4 shadow-sm">
            <div className="h-10 w-10 shrink-0 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-500">
              <span className="material-symbols-outlined">format_list_bulleted</span>
            </div>
            <div>
              <h4 className="font-bold text-sm mb-1">Especifica el Formato</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-body leading-normal">
                Pide una tabla, una lista o código Markdown.
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md p-4 bg-gradient-to-t from-background-light via-background-light to-transparent dark:from-background-dark dark:via-background-dark dark:to-transparent z-50 mb-16">
        <button 
          onClick={handleGenerate}
          disabled={isGenerating || !concept.trim()}
          className={`w-full h-14 rounded-xl font-bold text-lg shadow-xl flex items-center justify-center gap-3 transition-all active:scale-[0.98] ${
            isGenerating || !concept.trim()
            ? 'bg-slate-400 cursor-not-allowed'
            : 'bg-primary hover:bg-primary/90 text-white shadow-primary/25'
          }`}
        >
          {isGenerating ? (
            <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full" />
          ) : (
            <>
              <span className="material-symbols-outlined">auto_awesome</span>
              Generar Prompt
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default GeneratorScreen;

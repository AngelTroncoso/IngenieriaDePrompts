
import React from 'react';
import { Screen } from '../types';

interface ResultScreenProps {
  prompt: string;
  concept: string;
  onCopy: () => void;
  onNavigate: (screen: Screen) => void;
}

const ResultScreen: React.FC<ResultScreenProps> = ({ prompt, concept, onCopy, onNavigate }) => {
  return (
    <div className="flex flex-col min-h-full">
      <header className="sticky top-0 z-50 flex items-center bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-md p-4 pb-2 justify-between border-b border-gray-200 dark:border-white/5">
        <button 
          onClick={() => onNavigate(Screen.GENERATOR)}
          className="flex size-10 items-center justify-center rounded-full hover:bg-gray-200 dark:hover:bg-white/10"
        >
          <span className="material-symbols-outlined text-gray-900 dark:text-white" style={{ fontSize: '24px' }}>arrow_back_ios_new</span>
        </button>
        <h2 className="text-lg font-bold flex-1 text-center pr-10">Tu Prompt Perfecto</h2>
      </header>

      <div className="p-5 space-y-6">
        <div className="bg-slate-100 dark:bg-[#1d1c27] p-4 rounded-2xl border border-slate-200 dark:border-[#3f3b54]">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Concepto Original</h3>
          <p className="text-slate-700 dark:text-slate-300 italic">{concept}</p>
        </div>

        <div className="relative group">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-purple-600 rounded-xl opacity-20 blur"></div>
          <div className="relative bg-white dark:bg-surface-dark rounded-xl p-5 border border-slate-200 dark:border-[#3f3b54] shadow-lg">
             <div className="flex justify-between items-center mb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-primary">Prompt Generado</span>
                <button 
                  onClick={onCopy}
                  className="p-2 bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition-colors flex items-center gap-1 text-xs font-bold"
                >
                  <span className="material-symbols-outlined text-sm">content_copy</span>
                  Copiar
                </button>
             </div>
             <div className="text-slate-800 dark:text-white whitespace-pre-wrap leading-relaxed font-body">
               {prompt}
             </div>
          </div>
        </div>

        <div className="flex flex-col gap-3 py-4">
           <button 
             onClick={() => onNavigate(Screen.LIBRARY)}
             className="w-full py-4 border-2 border-primary text-primary font-bold rounded-xl hover:bg-primary/5 transition-all"
           >
             Ver en Biblioteca
           </button>
           <button 
             onClick={() => onNavigate(Screen.GENERATOR)}
             className="w-full py-4 bg-primary text-white font-bold rounded-xl shadow-lg shadow-primary/30 hover:bg-blue-700 transition-all"
           >
             Crear otro nuevo
           </button>
        </div>
      </div>
    </div>
  );
};

export default ResultScreen;

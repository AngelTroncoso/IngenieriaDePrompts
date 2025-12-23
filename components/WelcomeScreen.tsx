
import React from 'react';
import { Screen } from '../types';
import { IMAGES } from '../constants';

interface WelcomeScreenProps {
  onStart: () => void;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onStart }) => {
  return (
    <div className="relative flex flex-col min-h-screen">
      {/* Header Image Area */}
      <div className="w-full relative">
        <div className="w-full h-[40vh] min-h-[320px] bg-center bg-no-repeat bg-cover flex flex-col justify-end overflow-hidden relative rounded-b-[2rem] shadow-2xl" 
             style={{ backgroundImage: `url("${IMAGES.HERO_WAVE}")` }}>
          <div className="absolute inset-0 bg-gradient-to-t from-background-light dark:from-background-dark via-transparent to-transparent opacity-90 h-1/3 mt-auto"></div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col px-6 -mt-12 relative z-10">
        <div className="flex flex-col gap-2 mb-8 text-center bg-white/80 dark:bg-[#1d1c27]/80 backdrop-blur-md p-6 rounded-2xl border border-white/20 shadow-lg dark:border-[#3f3b54]">
          <h1 className="text-slate-900 dark:text-white tracking-tight text-3xl font-bold leading-tight">
            Desbloquea el poder de la IA
          </h1>
          <p className="text-slate-600 dark:text-[#a19db9] text-base font-normal leading-relaxed">
            Crea prompts creativos y efectivos en segundos. Deja de adivinar y empieza a crear.
          </p>
        </div>

        <div className="flex flex-col gap-3 mb-8">
          <h2 className="text-slate-900 dark:text-white text-lg font-bold px-1 mb-1">Beneficios</h2>
          
          <div className="flex gap-4 rounded-xl border border-slate-200 dark:border-[#3f3b54] bg-white dark:bg-[#1d1c27] p-4 items-center shadow-sm">
            <div className="text-primary bg-primary/10 p-2 rounded-lg">
              <span className="material-symbols-outlined text-2xl">bolt</span>
            </div>
            <div className="flex flex-col">
              <h3 className="text-slate-900 dark:text-white text-base font-bold leading-tight">Generación instantánea</h3>
              <p className="text-slate-500 dark:text-[#a19db9] text-sm font-normal">Obtén resultados en milisegundos</p>
            </div>
          </div>

          <div className="flex gap-4 rounded-xl border border-slate-200 dark:border-[#3f3b54] bg-white dark:bg-[#1d1c27] p-4 items-center shadow-sm">
            <div className="text-primary bg-primary/10 p-2 rounded-lg">
              <span className="material-symbols-outlined text-2xl">palette</span>
            </div>
            <div className="flex flex-col">
              <h3 className="text-slate-900 dark:text-white text-base font-bold leading-tight">Estilos ilimitados</h3>
              <p className="text-slate-500 dark:text-[#a19db9] text-sm font-normal">Explora miles de variaciones</p>
            </div>
          </div>

          <div className="flex gap-4 rounded-xl border border-slate-200 dark:border-[#3f3b54] bg-white dark:bg-[#1d1c27] p-4 items-center shadow-sm">
            <div className="text-primary bg-primary/10 p-2 rounded-lg">
              <span className="material-symbols-outlined text-2xl">psychology</span>
            </div>
            <div className="flex flex-col">
              <h3 className="text-slate-900 dark:text-white text-base font-bold leading-tight">Optimización inteligente</h3>
              <p className="text-slate-500 dark:text-[#a19db9] text-sm font-normal">Mejora la calidad de tus respuestas</p>
            </div>
          </div>
        </div>

        <div className="flex-grow"></div>

        <div className="flex flex-col gap-4 py-6">
          <button 
            onClick={onStart}
            className="group flex w-full cursor-pointer items-center justify-center overflow-hidden rounded-xl h-14 px-5 bg-primary text-white gap-2 text-lg font-bold shadow-lg shadow-primary/30 hover:bg-blue-700 transition-all active:scale-[0.98]"
          >
            <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
            <span className="truncate">Empezar Ahora</span>
          </button>
          <div className="text-center">
            <button className="inline-flex items-center gap-1 text-sm font-medium text-slate-500 dark:text-[#a19db9]">
              <span>¿Ya tienes una cuenta?</span>
              <span className="text-primary font-bold">Iniciar Sesión</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeScreen;

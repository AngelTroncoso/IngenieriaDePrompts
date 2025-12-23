
import React from 'react';
import { AppSettings, Screen } from '../types';
import { IMAGES } from '../constants';

interface SettingsScreenProps {
  settings: AppSettings;
  setSettings: (settings: AppSettings) => void;
  onBack: () => void;
}

const SettingsScreen: React.FC<SettingsScreenProps> = ({ settings, setSettings, onBack }) => {
  const toggle = (key: keyof AppSettings) => {
    setSettings({ ...settings, [key]: !settings[key] });
  };

  const setFocus = (focus: AppSettings['focus']) => {
    setSettings({ ...settings, focus });
  };

  const setResponseLength = (len: AppSettings['responseLength']) => {
    setSettings({ ...settings, responseLength: len });
  };

  return (
    <div className="flex flex-col h-full bg-background-light dark:bg-background-dark pb-24">
      <div className="sticky top-0 z-50 flex items-center bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-md p-4 pb-2 justify-between border-b border-gray-200 dark:border-white/5">
        <button 
          onClick={onBack}
          className="flex size-10 items-center justify-center rounded-full hover:bg-gray-200 dark:hover:bg-white/10 transition-colors"
        >
          <span className="material-symbols-outlined text-gray-900 dark:text-white" style={{ fontSize: '24px' }}>arrow_back_ios_new</span>
        </button>
        <h2 className="text-lg font-bold leading-tight tracking-[-0.015em] flex-1 text-center pr-10">Configuración</h2>
      </div>

      <div className="flex flex-col gap-6 py-4">
        <div className="px-4">
          <div className="flex items-center gap-4 bg-white dark:bg-surface-dark p-4 rounded-2xl shadow-sm border border-gray-200 dark:border-white/5">
            <div className="relative">
              <div className="bg-center bg-no-repeat bg-cover rounded-full h-16 w-16 ring-2 ring-primary ring-offset-2 ring-offset-background-dark" 
                   style={{ backgroundImage: `url("${IMAGES.AVATAR}")` }}>
              </div>
              <div className="absolute bottom-0 right-0 h-4 w-4 bg-green-500 rounded-full border-2 border-surface-dark"></div>
            </div>
            <div className="flex flex-col justify-center flex-1">
              <p className="text-xl font-bold leading-tight">Prompt Architect</p>
              <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">Plan: Pro - Nivel 4</p>
            </div>
            <button className="p-2 text-primary hover:bg-primary/10 rounded-full">
              <span className="material-symbols-outlined">edit</span>
            </button>
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between px-6 mb-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">Enfoque Principal</h3>
            <span className="text-primary text-xs font-medium cursor-pointer">Ver todos</span>
          </div>
          <div className="grid grid-cols-2 gap-3 px-4">
            {[
              { id: 'Creative', title: 'Creativo', img: IMAGES.CREATIVE, icon: 'palette' },
              { id: 'Technical', title: 'Técnico', img: IMAGES.TECHNICAL, icon: 'terminal' },
              { id: 'Business', title: 'Negocios', img: IMAGES.BUSINESS, icon: 'business_center' },
              { id: 'Academic', title: 'Académico', img: IMAGES.ACADEMIC, icon: 'school' },
            ].map((item) => (
              <div 
                key={item.id}
                onClick={() => setFocus(item.id as any)}
                className={`relative group cursor-pointer overflow-hidden rounded-xl border-2 transition-all ${
                  settings.focus === item.id 
                  ? 'border-primary shadow-[0_0_15px_rgba(55,19,236,0.3)]' 
                  : 'border-transparent dark:border-white/10'
                }`}
              >
                <div className={`absolute inset-0 bg-gradient-to-t ${settings.focus === item.id ? 'from-primary/90' : 'from-black/80'} to-transparent opacity-80 z-10`}></div>
                <div 
                  className={`bg-cover bg-center h-28 w-full transition-all duration-500 ${settings.focus !== item.id ? 'grayscale' : ''}`} 
                  style={{ backgroundImage: `url("${item.img}")` }}
                ></div>
                <div className="absolute bottom-3 left-3 z-20 flex flex-col">
                  <span className="material-symbols-outlined text-white mb-1">{item.icon}</span>
                  <p className="text-white text-sm font-bold">{item.title}</p>
                </div>
                {settings.focus === item.id && (
                  <div className="absolute top-2 right-2 z-20 bg-primary rounded-full p-1 shadow-sm">
                    <span className="material-symbols-outlined text-white text-[16px]">check</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="px-4">
          <div className="bg-white dark:bg-surface-dark p-5 rounded-2xl shadow-sm border border-gray-200 dark:border-white/5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-bold leading-tight">Temperatura (Creatividad)</h3>
              <span className="bg-primary/20 text-primary text-xs font-bold px-2 py-1 rounded">{(settings.temperature / 100).toFixed(1)}</span>
            </div>
            <div className="relative w-full h-6 flex items-center mb-2">
              <input 
                className="w-full h-1 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer focus:outline-none" 
                max="100" min="0" step="10" type="range" 
                value={settings.temperature}
                onChange={(e) => setSettings({ ...settings, temperature: parseInt(e.target.value) })}
              />
            </div>
            <div className="flex justify-between text-xs text-gray-500 font-medium">
              <span>Preciso</span>
              <span>Equilibrado</span>
              <span>Caótico</span>
            </div>
          </div>
        </div>

        <div>
          <h3 className="px-6 mb-3 text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">Preferencias de Interacción</h3>
          <div className="bg-white dark:bg-surface-dark mx-4 rounded-2xl shadow-sm border border-gray-200 dark:border-white/5 overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b border-gray-100 dark:border-white/5">
              <div className="flex items-center gap-3">
                <div className="bg-primary/10 p-2 rounded-lg text-primary">
                  <span className="material-symbols-outlined">psychology</span>
                </div>
                <div className="flex flex-col">
                  <span className="font-medium">Explicar razonamiento</span>
                  <span className="text-xs text-gray-500">Incluir el "por qué" en las respuestas</span>
                </div>
              </div>
              <div 
                onClick={() => toggle('explainReasoning')}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors cursor-pointer ${settings.explainReasoning ? 'bg-primary' : 'bg-gray-300 dark:bg-gray-600'}`}
              >
                <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition shadow-sm ${settings.explainReasoning ? 'translate-x-6' : 'translate-x-1'}`}></span>
              </div>
            </div>
            
            <div className="flex items-center justify-between p-4 border-b border-gray-100 dark:border-white/5">
              <div className="flex items-center gap-3">
                <div className={`${settings.hapticFeedback ? 'bg-primary/10 text-primary' : 'bg-gray-100 dark:bg-gray-800 text-gray-500'} p-2 rounded-lg transition-colors`}>
                  <span className="material-symbols-outlined">vibration</span>
                </div>
                <div className="flex flex-col">
                  <span className="font-medium">Respuesta háptica</span>
                </div>
              </div>
              <div 
                onClick={() => toggle('hapticFeedback')}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors cursor-pointer ${settings.hapticFeedback ? 'bg-primary' : 'bg-gray-300 dark:bg-gray-600'}`}
              >
                <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition shadow-sm ${settings.hapticFeedback ? 'translate-x-6' : 'translate-x-1'}`}></span>
              </div>
            </div>

            <div className="p-4">
              <p className="font-medium mb-3 flex items-center gap-2">
                <span className="material-symbols-outlined text-gray-400 text-sm">short_text</span>
                Longitud de respuesta
              </p>
              <div className="flex w-full bg-gray-100 dark:bg-background-dark p-1 rounded-xl">
                {(['Concise', 'Normal', 'Detailed'] as const).map((len) => (
                  <button 
                    key={len}
                    onClick={() => setResponseLength(len)}
                    className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${
                      settings.responseLength === len 
                      ? 'bg-white dark:bg-surface-dark text-primary shadow-sm ring-1 ring-black/5 dark:ring-white/10 font-bold' 
                      : 'text-gray-500 hover:text-gray-900 dark:hover:text-white'
                    }`}
                  >
                    {len === 'Concise' ? 'Conciso' : len === 'Normal' ? 'Normal' : 'Detallado'}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="px-4">
          <div className="bg-white dark:bg-surface-dark rounded-2xl shadow-sm border border-gray-200 dark:border-white/5 overflow-hidden">
            <div className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-white/5">
              <div className="flex items-center gap-3">
                <div className="bg-orange-500/10 p-2 rounded-lg text-orange-500">
                  <span className="material-symbols-outlined">key</span>
                </div>
                <span className="font-medium">Gestionar claves API</span>
              </div>
              <span className="material-symbols-outlined text-gray-400">chevron_right</span>
            </div>
          </div>
          <p className="text-center text-xs text-gray-400 mt-6">Versión 1.0.2 • Build 2045</p>
        </div>
      </div>

      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md p-4 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-lg border-t border-gray-200 dark:border-white/5 z-50">
        <button 
          onClick={onBack}
          className="w-full bg-primary hover:bg-blue-700 text-white font-bold py-3.5 px-4 rounded-xl shadow-lg shadow-primary/30 flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
        >
          <span>Guardar cambios</span>
        </button>
      </div>
    </div>
  );
};

export default SettingsScreen;

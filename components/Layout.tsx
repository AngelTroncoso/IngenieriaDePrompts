
import React from 'react';
import { Screen } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  activeScreen: Screen;
  onNavigate: (screen: Screen) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, activeScreen, onNavigate }) => {
  const isNavVisible = [Screen.GENERATOR, Screen.LIBRARY, Screen.SETTINGS, Screen.RESULT].includes(activeScreen);

  return (
    <div className="relative flex flex-col min-h-screen w-full max-w-md mx-auto overflow-x-hidden bg-background-light dark:bg-background-dark pb-24 transition-colors duration-300">
      <main className="flex-1">
        {children}
      </main>

      {isNavVisible && (
        <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md z-40 bg-white/90 dark:bg-[#121118]/90 backdrop-blur-lg border-t border-gray-200 dark:border-white/5 pb-6 pt-2">
          <div className="flex justify-around items-center px-2">
            {/* Item: Library */}
            <button 
              onClick={() => onNavigate(Screen.LIBRARY)}
              className={`flex flex-col items-center gap-1 p-2 transition-all ${activeScreen === Screen.LIBRARY ? 'text-primary' : 'text-gray-400'}`}
            >
              <div className="relative">
                {activeScreen === Screen.LIBRARY && (
                  <div className="absolute -inset-2 bg-primary/10 dark:bg-primary/20 rounded-full blur-md"></div>
                )}
                <span className={`material-symbols-outlined text-[28px] ${activeScreen === Screen.LIBRARY ? 'filled' : ''}`} style={{ fontVariationSettings: activeScreen === Screen.LIBRARY ? "'FILL' 1" : "" }}>dataset</span>
              </div>
              <span className="text-[10px] font-bold">Biblioteca</span>
            </button>

            {/* Item: Generator */}
            <button 
              onClick={() => onNavigate(Screen.GENERATOR)}
              className={`flex flex-col items-center gap-1 p-2 transition-all ${activeScreen === Screen.GENERATOR ? 'text-primary' : 'text-gray-400'}`}
            >
              <span className="material-symbols-outlined text-[28px]">auto_awesome</span>
              <span className="text-[10px] font-medium">Generar</span>
            </button>

            {/* Item: Settings */}
            <button 
              onClick={() => onNavigate(Screen.SETTINGS)}
              className={`flex flex-col items-center gap-1 p-2 transition-all ${activeScreen === Screen.SETTINGS ? 'text-primary' : 'text-gray-400'}`}
            >
              <span className="material-symbols-outlined text-[28px]">person</span>
              <span className="text-[10px] font-medium">Perfil</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Layout;


import React, { useState } from 'react';
import { PromptItem, Screen } from '../types';

interface LibraryScreenProps {
  prompts: PromptItem[];
  onSelect: (prompt: PromptItem) => void;
  onNavigate: (screen: Screen) => void;
}

const LibraryScreen: React.FC<LibraryScreenProps> = ({ prompts, onSelect, onNavigate }) => {
  const [search, setSearch] = useState('');
  const [activeFilter, setActiveFilter] = useState('Todos');

  const filters = ['Todos', 'Coding', 'Business', 'Art', 'Writing'];

  const filteredPrompts = prompts.filter(p => {
    const matchesSearch = p.title.toLowerCase().includes(search.toLowerCase()) || 
                          p.content.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = activeFilter === 'Todos' || p.category === activeFilter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="flex flex-col h-full">
      <div className="sticky top-0 z-20 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-md pt-12 pb-2 px-4 border-b border-gray-200 dark:border-white/5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold leading-tight tracking-tight">Mis Prompts</h2>
          <button 
            onClick={() => onNavigate(Screen.SETTINGS)}
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-white/10 transition-colors"
          >
            <span className="material-symbols-outlined">settings</span>
          </button>
        </div>
        <div className="relative w-full mb-2">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
            <span className="material-symbols-outlined text-[20px]">search</span>
          </div>
          <input 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="block w-full pl-10 pr-3 py-3 border-none rounded-xl bg-white dark:bg-surface-dark text-gray-900 dark:text-white placeholder-gray-500 focus:ring-2 focus:ring-primary transition-all shadow-sm" 
            placeholder="Buscar prompts..." 
            type="text"
          />
        </div>
      </div>

      <div className="py-3 sticky top-[152px] z-10 bg-background-light dark:bg-background-dark">
        <div className="flex gap-3 px-4 overflow-x-auto no-scrollbar">
          {filters.map(f => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`flex h-9 shrink-0 items-center justify-center gap-x-2 rounded-full px-4 transition-all shadow-sm ${
                activeFilter === f
                ? 'bg-primary text-white shadow-primary/20'
                : 'bg-white dark:bg-surface-dark border border-gray-200 dark:border-white/5 text-gray-700 dark:text-gray-300'
              }`}
            >
              {f !== 'Todos' && <span className="material-symbols-outlined text-[18px] opacity-60">
                {f === 'Coding' ? 'terminal' : f === 'Business' ? 'business_center' : f === 'Art' ? 'palette' : 'edit_note'}
              </span>}
              <span className="text-sm font-medium">{f}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="px-4 space-y-4 mt-2 pb-24">
        {filteredPrompts.length > 0 ? filteredPrompts.map(prompt => (
          <div 
            key={prompt.id}
            onClick={() => onSelect(prompt)}
            className="group relative flex flex-col gap-3 rounded-2xl bg-white dark:bg-surface-dark p-4 shadow-sm border border-gray-100 dark:border-white/5 active:scale-[0.99] transition-all cursor-pointer"
          >
            <div className="flex justify-between items-start">
              <div className="flex gap-3">
                <div className={`flex items-center justify-center rounded-xl shrink-0 size-12 ${
                  prompt.category === 'Coding' ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600' :
                  prompt.category === 'Business' ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-600' :
                  prompt.category === 'Art' ? 'bg-pink-100 dark:bg-pink-900/30 text-pink-600' :
                  'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600'
                }`}>
                  <span className="material-symbols-outlined">
                    {prompt.category === 'Coding' ? 'terminal' : prompt.category === 'Business' ? 'mark_email_read' : prompt.category === 'Art' ? 'palette' : 'edit_note'}
                  </span>
                </div>
                <div>
                  <h3 className="text-base font-bold text-gray-900 dark:text-white leading-tight mb-1">{prompt.title}</h3>
                  <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                    <span className={`font-medium px-2 py-0.5 rounded ${
                       prompt.category === 'Coding' ? 'text-blue-600 bg-blue-50 dark:bg-blue-900/20' :
                       prompt.category === 'Business' ? 'text-purple-600 bg-purple-50 dark:bg-purple-900/20' :
                       prompt.category === 'Art' ? 'text-pink-600 bg-pink-50 dark:bg-pink-900/20' :
                       'text-emerald-600 bg-emerald-50 dark:bg-emerald-900/20'
                    }`}>{prompt.category}</span>
                    <span>•</span>
                    <span>{prompt.timestamp}</span>
                  </div>
                </div>
              </div>
              <button className={`transition-colors ${prompt.isFavorite ? 'text-yellow-400' : 'text-gray-400'}`}>
                <span className={`material-symbols-outlined ${prompt.isFavorite ? 'filled' : ''}`} style={{ fontVariationSettings: prompt.isFavorite ? "'FILL' 1" : "" }}>star</span>
              </button>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2 leading-relaxed">
              {prompt.content}
            </p>
          </div>
        )) : (
          <div className="flex flex-col items-center justify-center py-20 text-gray-400">
            <span className="material-symbols-outlined text-6xl mb-4">folder_open</span>
            <p>No se encontraron prompts</p>
          </div>
        )}
      </div>

      <div className="absolute bottom-24 right-5 z-30">
        <button 
          onClick={() => onNavigate(Screen.GENERATOR)}
          className="flex items-center justify-center size-14 rounded-full bg-primary text-white shadow-lg shadow-primary/40 hover:scale-105 active:scale-95 transition-all"
        >
          <span className="material-symbols-outlined text-[28px]">add</span>
        </button>
      </div>
    </div>
  );
};

export default LibraryScreen;

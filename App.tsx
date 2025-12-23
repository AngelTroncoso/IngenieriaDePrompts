
import React, { useState, useEffect } from 'react';
import WelcomeScreen from './components/WelcomeScreen';
import GeneratorScreen from './components/GeneratorScreen';
import LibraryScreen from './components/LibraryScreen';
import SettingsScreen from './components/SettingsScreen';
import ResultScreen from './components/ResultScreen';
import Layout from './components/Layout';
import { Screen, PromptItem, AppSettings, StyleTone } from './types';
import { DEFAULT_PROMPTS } from './constants';

const App: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<Screen>(Screen.WELCOME);
  const [prompts, setPrompts] = useState<PromptItem[]>([]);
  const [lastResult, setLastResult] = useState({ prompt: '', concept: '', style: StyleTone.CREATIVE });
  const [settings, setSettings] = useState<AppSettings>({
    focus: 'Creative',
    temperature: 70,
    explainReasoning: true,
    hapticFeedback: false,
    responseLength: 'Normal'
  });

  // Load prompts from local storage on mount
  useEffect(() => {
    const saved = localStorage.getItem('prompts');
    if (saved) {
      setPrompts(JSON.parse(saved));
    } else {
      setPrompts(DEFAULT_PROMPTS);
    }
  }, []);

  // Save prompts whenever they change
  useEffect(() => {
    if (prompts.length > 0) {
      localStorage.setItem('prompts', JSON.stringify(prompts));
    }
  }, [prompts]);

  const handleStart = () => setCurrentScreen(Screen.GENERATOR);

  const handleGenerateSuccess = (prompt: string, concept: string, style: StyleTone) => {
    const newPrompt: PromptItem = {
      id: Date.now().toString(),
      title: concept.slice(0, 25) + (concept.length > 25 ? '...' : ''),
      category: style === StyleTone.CODE ? 'Coding' : style === StyleTone.PROFESSIONAL ? 'Business' : style === StyleTone.ACADEMIC ? 'Writing' : 'Art',
      timestamp: 'Ahora',
      content: prompt,
      isFavorite: false
    };
    
    setPrompts([newPrompt, ...prompts]);
    setLastResult({ prompt, concept, style });
    setCurrentScreen(Screen.RESULT);
  };

  const handleSelectPrompt = (prompt: PromptItem) => {
    setLastResult({ prompt: prompt.content, concept: 'Saved Prompt', style: StyleTone.CREATIVE });
    setCurrentScreen(Screen.RESULT);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(lastResult.prompt);
    // Simple visual feedback if we had a toast system
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case Screen.WELCOME:
        return <WelcomeScreen onStart={handleStart} />;
      case Screen.GENERATOR:
        return <GeneratorScreen onGenerate={handleGenerateSuccess} settings={settings} onNavigate={setCurrentScreen} />;
      case Screen.LIBRARY:
        return <LibraryScreen prompts={prompts} onSelect={handleSelectPrompt} onNavigate={setCurrentScreen} />;
      case Screen.SETTINGS:
        return <SettingsScreen settings={settings} setSettings={setSettings} onBack={() => setCurrentScreen(Screen.GENERATOR)} />;
      case Screen.RESULT:
        return <ResultScreen prompt={lastResult.prompt} concept={lastResult.concept} onCopy={handleCopy} onNavigate={setCurrentScreen} />;
      default:
        return <WelcomeScreen onStart={handleStart} />;
    }
  };

  return (
    <Layout activeScreen={currentScreen} onNavigate={setCurrentScreen}>
      {renderScreen()}
    </Layout>
  );
};

export default App;

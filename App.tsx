import React, { useState } from 'react';
import { AppState, Character, GeminiModelId, FrameRatio, GeneratedContent } from './types';
import { CHARACTER_UNIVERSE, FRAME_RATIO_OPTIONS } from './constants';
import * as Icons from './components/icons';
import { generateScriptAndPrompts } from './services/geminiService';

export default function App() {
  const [appState, setAppState] = useState<AppState>(AppState.HOME);
  const [topic, setTopic] = useState('');
  const [duration, setDuration] = useState(60);
  const [selectedRatio, setSelectedRatio] = useState<FrameRatio>(FrameRatio.NINE_SIXTEEN);
  const [selectedCharacters, setSelectedCharacters] = useState<Character[]>([]);
  const [generatedContent, setGeneratedContent] = useState<GeneratedContent | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Character Modal State
  const [editingCharacter, setEditingCharacter] = useState<Character | null>(null);
  const [activeTab, setActiveTab] = useState<'general' | 'visual' | 'personality' | 'behavior' | 'voice' | 'prompt'>('general');

  const handleGenerate = async () => {
    setIsGenerating(true);
    setError(null);
    setAppState(AppState.GENERATING);
    try {
      const apiKey = process.env.API_KEY || '';
      const result = await generateScriptAndPrompts(
        apiKey,
        GeminiModelId.FLASH,
        topic,
        duration,
        selectedCharacters,
        selectedRatio,
        true,
        undefined,
        undefined
      );
      setGeneratedContent(result);
      setAppState(AppState.RESULTS);
    } catch (e: any) {
      setError(e.message);
      setAppState(AppState.ERROR);
    } finally {
      setIsGenerating(false);
    }
  };

  const toggleCharacterSelection = (char: Character) => {
    if (selectedCharacters.find(c => c.id === char.id)) {
      setSelectedCharacters(selectedCharacters.filter(c => c.id !== char.id));
    } else {
      setSelectedCharacters([...selectedCharacters, char]);
    }
  };

  const openCharacterModal = (char: Character) => {
      setEditingCharacter(char);
      setActiveTab('general');
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <Icons.Logo />
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-8">
        {appState === AppState.HOME && (
          <div className="space-y-8">
            <section className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h2 className="text-xl font-bold mb-4">Project Settings</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Topic / Idea</label>
                  <input 
                    type="text" 
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                    placeholder="e.g. A funny meeting between a cat and a dog"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Duration (seconds)</label>
                   <input 
                    type="number" 
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                    value={duration}
                    onChange={(e) => setDuration(Number(e.target.value))}
                  />
                </div>
                <div>
                   <label className="block text-sm font-medium text-gray-700 mb-1">Frame Ratio</label>
                   <select 
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                    value={selectedRatio}
                    onChange={(e) => setSelectedRatio(e.target.value as FrameRatio)}
                   >
                       {FRAME_RATIO_OPTIONS.map(opt => (
                           <option key={opt.value} value={opt.value}>{opt.label}</option>
                       ))}
                   </select>
                </div>
              </div>
            </section>

            <section className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
               <h2 className="text-xl font-bold mb-4">Cast Characters (Optional)</h2>
               <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                   {CHARACTER_UNIVERSE.map(char => (
                       <div 
                        key={char.id} 
                        className={`p-4 border rounded-lg cursor-pointer transition-all ${selectedCharacters.find(c => c.id === char.id) ? 'border-indigo-500 bg-indigo-50' : 'border-gray-200 hover:border-indigo-300'}`}
                        onClick={() => toggleCharacterSelection(char)}
                       >
                           <div className="font-bold text-sm">{char.name}</div>
                           <div className="text-xs text-gray-500">{char.role}</div>
                           <button 
                            onClick={(e) => { e.stopPropagation(); openCharacterModal(char); }}
                            className="mt-2 text-xs text-indigo-600 hover:underline"
                           >
                               View Details
                           </button>
                       </div>
                   ))}
               </div>
            </section>

            <div className="flex justify-end">
                <button 
                    onClick={handleGenerate}
                    disabled={!topic || isGenerating}
                    className={`px-6 py-3 rounded-lg font-bold text-white shadow-lg transition-all transform hover:-translate-y-0.5 ${!topic || isGenerating ? 'bg-gray-400 cursor-not-allowed' : 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700'}`}
                >
                    {isGenerating ? 'Generating...' : 'Generate Script & Prompts'}
                </button>
            </div>
          </div>
        )}

        {appState === AppState.GENERATING && (
            <div className="flex flex-col items-center justify-center py-20">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-indigo-600 mb-6"></div>
                <h3 className="text-xl font-semibold text-gray-800">AI is working its magic...</h3>
                <p className="text-gray-500 mt-2">Writing script and visualizing scenes</p>
            </div>
        )}

        {appState === AppState.RESULTS && generatedContent && (
            <div className="space-y-8">
                <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-bold">Generation Results</h2>
                    <button onClick={() => setAppState(AppState.HOME)} className="text-indigo-600 hover:underline">Back to Edit</button>
                </div>
                
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <h3 className="font-bold text-lg mb-2">Script</h3>
                    <pre className="whitespace-pre-wrap font-mono text-sm bg-gray-50 p-4 rounded-lg text-gray-700">{generatedContent.script}</pre>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <h3 className="font-bold text-lg mb-4">Image Prompts</h3>
                    <div className="space-y-4">
                        {generatedContent.imagePrompts.map((p, i) => (
                            <div key={i} className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                                <div className="flex justify-between mb-2">
                                    <span className="font-bold text-indigo-700">#{p.id} {p.title}</span>
                                    <span className="text-xs text-gray-500">{p.duration}s</span>
                                </div>
                                <p className="text-sm text-gray-800 mb-2">{p.description}</p>
                                <div className="text-xs bg-white p-2 rounded border border-gray-200 font-mono text-gray-600">
                                    {p.text}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        )}
        
        {appState === AppState.ERROR && (
            <div className="text-center py-20">
                <div className="text-red-500 text-6xl mb-4">!</div>
                <h3 className="text-xl font-bold text-gray-900">Something went wrong</h3>
                <p className="text-gray-600 mt-2">{error}</p>
                <button onClick={() => setAppState(AppState.HOME)} className="mt-6 px-6 py-2 bg-indigo-600 text-white rounded-lg">Try Again</button>
            </div>
        )}
      </main>

      {/* Character Modal */}
      {editingCharacter && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                <div className="p-6 border-b border-gray-100 flex justify-between items-center sticky top-0 bg-white z-10">
                    <h3 className="text-xl font-bold">{editingCharacter.name}</h3>
                    <button onClick={() => setEditingCharacter(null)} className="text-gray-400 hover:text-gray-600">
                        <Icons.XMarkIcon />
                    </button>
                </div>
                
                <div className="p-6">
                    {/* Navigation Tabs */}
                    <div className="flex border-b border-gray-100 mb-6 overflow-x-auto no-scrollbar">
                        {[
                            { id: 'general', label: 'Tổng quan' },
                            { id: 'visual', label: 'Ngoại hình' },
                            { id: 'personality', label: 'Tính cách' },
                            { id: 'behavior', label: 'Hành vi' },
                            { id: 'voice', label: 'Giọng & Lời' },
                            { id: 'prompt', label: 'AI Prompt' }
                        ].map(tab => (
                            <button
                                key={tab.id}
                                type="button"
                                onClick={() => setActiveTab(tab.id as any)}
                                className={`px-4 py-2 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
                                    activeTab === tab.id 
                                    ? 'border-indigo-600 text-indigo-600' 
                                    : 'border-transparent text-gray-500 hover:text-gray-700'
                                }`}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>

                    <div className="space-y-4">
                        {activeTab === 'general' && (
                            <div className="space-y-4">
                                <div>
                                    <label className="text-xs font-bold text-gray-500 uppercase">Role</label>
                                    <p className="text-gray-800">{editingCharacter.role}</p>
                                </div>
                                <div>
                                    <label className="text-xs font-bold text-gray-500 uppercase">Age</label>
                                    <p className="text-gray-800">{editingCharacter.ageRange}</p>
                                </div>
                                <div>
                                    <label className="text-xs font-bold text-gray-500 uppercase">Type</label>
                                    <p className="text-gray-800">{editingCharacter.type}</p>
                                </div>
                            </div>
                        )}
                        {activeTab === 'visual' && (
                            <pre className="text-sm bg-gray-50 p-4 rounded">{JSON.stringify(editingCharacter.visual, null, 2)}</pre>
                        )}
                         {activeTab === 'personality' && (
                            <pre className="text-sm bg-gray-50 p-4 rounded">{JSON.stringify(editingCharacter.personality, null, 2)}</pre>
                        )}
                        {activeTab === 'behavior' && (
                            <pre className="text-sm bg-gray-50 p-4 rounded">{JSON.stringify(editingCharacter.behavior, null, 2)}</pre>
                        )}
                        {activeTab === 'voice' && (
                            <pre className="text-sm bg-gray-50 p-4 rounded">{JSON.stringify(editingCharacter.voice, null, 2)}</pre>
                        )}
                        {activeTab === 'prompt' && (
                            <div className="space-y-4">
                                <div>
                                    <label className="text-xs font-bold text-gray-500 uppercase">Positive</label>
                                    <p className="text-sm text-gray-800 bg-green-50 p-3 rounded border border-green-100">{editingCharacter.aiPrompt.positive}</p>
                                </div>
                                <div>
                                    <label className="text-xs font-bold text-gray-500 uppercase">Negative</label>
                                    <p className="text-sm text-gray-800 bg-red-50 p-3 rounded border border-red-100">{editingCharacter.aiPrompt.negative}</p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
      )}
    </div>
  );
}
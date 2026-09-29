'use client';

import React, { useState } from 'react';
import { Loader2, ArrowRight } from 'lucide-react';
import { TranslationResult } from '@/types';

interface TranslatorCardProps {
  onTranslate: (result: TranslationResult) => void;
  onClear: () => void;
  isLoading: boolean;
  setIsLoading: (val: boolean) => void;
}

const EXAMPLE_SENTENCES = [
  'रामः वनं गच्छति।',
  'बालकः पुस्तकं पठति।',
  'सीता रामं पश्यति।',
  'विद्या विनयं ददाति।',
  'देवालयः',
  'अहम् ईश्वर्यः',
  'अहम् आदिलः'
];

export function TranslatorCard({ onTranslate, onClear, isLoading, setIsLoading }: TranslatorCardProps) {
  const [text, setText] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleTranslate = async (textToTranslate: string) => {
    if (!textToTranslate.trim()) {
      setError('Please enter a Sanskrit sentence to translate.');
      return;
    }
    
    setError(null);
    setIsLoading(true);
    
    try {
      const response = await fetch('/api/translate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: textToTranslate }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to translate');
      }
      
      onTranslate(data);
    } catch (err: any) {
      setError(err.message || 'An error occurred during translation.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleExampleClick = (example: string) => {
    setText(example);
    handleTranslate(example);
  };

  return (
    <div className="bg-slate-900 border border-slate-700/50 rounded-2xl p-6 shadow-xl w-full max-w-4xl mx-auto backdrop-blur-sm">
      <div className="mb-4">
        <label htmlFor="sanskrit-input" className="block text-sm font-medium text-slate-300 mb-2">
          Enter Sanskrit Text
        </label>
        <textarea
          id="sanskrit-input"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="e.g. रामः वनं गच्छति।"
          className="w-full h-32 bg-slate-950/50 border border-slate-700 rounded-xl p-4 text-lg text-slate-100 placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-amber-500/50 resize-none"
          dir="auto"
        />
        {error && <p className="text-red-400 text-sm mt-2">{error}</p>}
      </div>

      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between mb-6">
        <div className="flex gap-2">
          <button
            onClick={() => handleTranslate(text)}
            disabled={isLoading || !text.trim()}
            className="px-6 py-2.5 bg-amber-600 hover:bg-amber-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium rounded-lg transition-colors flex items-center gap-2"
          >
            {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Translate'}
          </button>
          <button
            onClick={() => {
              setText('');
              setError(null);
              onClear();
            }}
            disabled={isLoading}
            className="px-6 py-2.5 bg-slate-800 hover:bg-slate-700 disabled:opacity-50 text-slate-200 font-medium rounded-lg transition-colors"
          >
            Clear
          </button>
        </div>
      </div>

      <div>
        <p className="text-sm font-medium text-slate-400 mb-3">Try an example:</p>
        <div className="flex flex-wrap gap-2">
          {EXAMPLE_SENTENCES.map((example) => (
            <button
              key={example}
              onClick={() => handleExampleClick(example)}
              disabled={isLoading}
              className="px-4 py-2 bg-slate-800/50 hover:bg-slate-700/50 border border-slate-700 rounded-lg text-sm text-slate-300 transition-colors"
            >
              {example}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

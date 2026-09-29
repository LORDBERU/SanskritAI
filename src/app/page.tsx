'use client';

import React, { useState } from 'react';
import { TranslatorCard } from '@/components/translator/TranslatorCard';
import { TranslationResultCard } from '@/components/results/TranslationResultCard';
import { TranslationResult } from '@/types';
import { Sparkles } from 'lucide-react';

export default function Home() {
  const [result, setResult] = useState<TranslationResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <main className="min-h-screen bg-slate-950 text-slate-50 selection:bg-amber-500/30 font-sans">
      
      {/* Background gradients */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-amber-600/10 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-indigo-600/10 blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        
        {/* Header section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 text-sm font-medium mb-6 border border-amber-500/20">
            <Sparkles className="w-4 h-4" />
            <span>AI-Powered Analysis</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-slate-100 mb-6">
            Sanskrit <span className="text-amber-500">→</span> English
            <br />
            <span className="text-3xl md:text-4xl lg:text-5xl text-slate-400 font-medium mt-2 block">
              with the grammar explained.
            </span>
          </h1>
          <p className="max-w-2xl mx-auto text-lg text-slate-400 leading-relaxed">
            Translate Sanskrit sentences and understand their meaning, structure, and grammar using NLP and Transformer-based AI.
          </p>
        </div>

        {/* Main Content */}
        <div className="space-y-12">
          <TranslatorCard 
            onTranslate={setResult} 
            onClear={() => setResult(null)} 
            isLoading={isLoading} 
            setIsLoading={setIsLoading} 
          />

          {isLoading && (
            <div className="flex flex-col items-center justify-center py-12 space-y-4 animate-in fade-in duration-300">
              <div className="w-12 h-12 border-4 border-slate-800 border-t-amber-500 rounded-full animate-spin" />
              <div className="text-slate-400 font-medium">
                <span className="animate-pulse">Analyzing Sanskrit...</span>
              </div>
            </div>
          )}

          {!isLoading && result && (
            <TranslationResultCard result={result} />
          )}
        </div>
        
      </div>
    </main>
  );
}

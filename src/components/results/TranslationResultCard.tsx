'use client';

import React from 'react';
import { TranslationResult as ITranslationResult } from '@/types';
import { BookOpen, AlertCircle, Type, Waypoints, Zap, ScrollText } from 'lucide-react';

interface ResultProps {
  result: ITranslationResult;
}

export function TranslationResultCard({ result }: ResultProps) {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Translation & Meaning */}
      <div className="bg-slate-900 border border-slate-700/50 rounded-2xl p-6 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 left-0 w-1 h-full bg-amber-500" />
        <h2 className="text-xl font-semibold text-slate-100 flex items-center gap-2 mb-4">
          <BookOpen className="w-5 h-5 text-amber-500" />
          Translation & Meaning
        </h2>
        
        <div className="space-y-4">
          <div>
            <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">English Translation</span>
            <p className="text-2xl text-slate-100 font-medium mt-1">{result.translation}</p>
          </div>
          
          <div>
            <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">Transliteration</span>
            <p className="text-lg text-slate-300 mt-1 font-serif italic">{result.transliteration}</p>
          </div>
          
          <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700/50">
            <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">Explanation</span>
            <p className="text-slate-200 mt-2 leading-relaxed">{result.meaning}</p>
          </div>
        </div>
      </div>

      {/* Sentence Structure */}
      {result.structure && result.structure.length > 0 && (
        <div className="bg-slate-900 border border-slate-700/50 rounded-2xl p-6 shadow-xl">
           <h2 className="text-lg font-semibold text-slate-100 flex items-center gap-2 mb-4">
            <Waypoints className="w-5 h-5 text-indigo-400" />
            Sentence Structure
          </h2>
          <div className="flex flex-wrap items-center gap-2">
            {result.structure.map((node, index) => (
              <React.Fragment key={index}>
                <div className="flex flex-col items-center p-3 bg-slate-800/80 rounded-lg border border-slate-700/50 min-w-[120px]">
                  <span className="text-lg font-medium text-slate-100">{node.word}</span>
                  <span className="text-xs text-slate-400 mt-1">{node.role}</span>
                </div>
                {index < result.structure.length - 1 && (
                  <ArrowRightIcon className="text-slate-500" />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      )}

      {/* Word-by-Word Analysis */}
      <div className="bg-slate-900 border border-slate-700/50 rounded-2xl p-6 shadow-xl">
        <h2 className="text-lg font-semibold text-slate-100 flex items-center gap-2 mb-4">
          <Type className="w-5 h-5 text-emerald-400" />
          Word-by-Word Analysis
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-700">
                <th className="py-3 px-4 text-sm font-medium text-slate-400 uppercase tracking-wider">Sanskrit</th>
                <th className="py-3 px-4 text-sm font-medium text-slate-400 uppercase tracking-wider">Transliteration</th>
                <th className="py-3 px-4 text-sm font-medium text-slate-400 uppercase tracking-wider">Meaning</th>
                <th className="py-3 px-4 text-sm font-medium text-slate-400 uppercase tracking-wider">Grammatical Role</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/50">
              {result.words.map((word, i) => (
                <tr key={i} className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 text-slate-100 font-medium">{word.sanskrit}</td>
                  <td className="py-3 px-4 text-slate-300 italic">{word.transliteration}</td>
                  <td className="py-3 px-4 text-slate-200">{word.meaning}</td>
                  <td className="py-3 px-4 text-emerald-400/90 text-sm">{word.role || '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Grammar Analysis */}
      <div className="bg-slate-900 border border-slate-700/50 rounded-2xl p-6 shadow-xl">
         <h2 className="text-lg font-semibold text-slate-100 flex items-center gap-2 mb-4">
          <ScrollText className="w-5 h-5 text-blue-400" />
          Detailed Grammar Analysis
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {result.words.map((word, i) => (
            word.case || word.gender || word.tense ? (
              <div key={i} className="bg-slate-800/50 p-4 rounded-xl border border-slate-700/50">
                <h3 className="text-md font-semibold text-slate-200 mb-2 border-b border-slate-700 pb-2">{word.sanskrit}</h3>
                <dl className="space-y-1 text-sm">
                  {word.gender && <div className="flex justify-between"><dt className="text-slate-400">Gender:</dt><dd className="text-slate-200">{word.gender}</dd></div>}
                  {word.number && <div className="flex justify-between"><dt className="text-slate-400">Number:</dt><dd className="text-slate-200">{word.number}</dd></div>}
                  {word.case && <div className="flex justify-between"><dt className="text-slate-400">Case:</dt><dd className="text-slate-200">{word.case}</dd></div>}
                  {word.person && <div className="flex justify-between"><dt className="text-slate-400">Person:</dt><dd className="text-slate-200">{word.person}</dd></div>}
                  {word.tense && <div className="flex justify-between"><dt className="text-slate-400">Tense:</dt><dd className="text-slate-200">{word.tense}</dd></div>}
                  {word.root && <div className="flex justify-between"><dt className="text-slate-400">Root:</dt><dd className="text-slate-200">{word.root}</dd></div>}
                </dl>
              </div>
            ) : null
          ))}
        </div>
      </div>

      {/* Sandhi & Samasa */}
      {(result.sandhi.length > 0 || result.samasa.length > 0) && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {result.sandhi.length > 0 && (
            <div className="bg-slate-900 border border-slate-700/50 rounded-2xl p-6 shadow-xl">
              <h2 className="text-lg font-semibold text-slate-100 flex items-center gap-2 mb-4">
                <Zap className="w-5 h-5 text-yellow-400" />
                Sandhi Analysis
              </h2>
              <div className="space-y-4">
                {result.sandhi.map((item, i) => (
                  <div key={i} className="bg-slate-800/50 p-4 rounded-xl border border-slate-700/50">
                    {!item.isProbable && (
                      <div className="flex items-center gap-1 text-xs text-amber-500 mb-2">
                        <AlertCircle className="w-3 h-3" /> Possible Analysis
                      </div>
                    )}
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-slate-100 font-medium">{item.combined}</span>
                      <span className="text-slate-400 text-sm">→</span>
                      <span className="text-slate-200 font-medium">{item.split}</span>
                    </div>
                    {item.type && <div className="text-xs text-yellow-400/90 mb-1">{item.type}</div>}
                    <p className="text-sm text-slate-300">{item.explanation}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {result.samasa.length > 0 && (
            <div className="bg-slate-900 border border-slate-700/50 rounded-2xl p-6 shadow-xl">
              <h2 className="text-lg font-semibold text-slate-100 flex items-center gap-2 mb-4">
                <BookOpen className="w-5 h-5 text-rose-400" />
                Samāsa (Compound) Analysis
              </h2>
              <div className="space-y-4">
                {result.samasa.map((item, i) => (
                  <div key={i} className="bg-slate-800/50 p-4 rounded-xl border border-slate-700/50">
                     {!item.isProbable && (
                      <div className="flex items-center gap-1 text-xs text-amber-500 mb-2">
                        <AlertCircle className="w-3 h-3" /> Possible Analysis
                      </div>
                    )}
                    <div className="text-slate-100 font-medium mb-1">{item.compound}</div>
                    <div className="text-sm text-slate-300 mb-2">Split: {item.split}</div>
                    {item.type && <div className="text-xs text-rose-400/90 mb-1">{item.type}</div>}
                    <p className="text-sm text-slate-200 mb-1">Meaning: {item.meaning}</p>
                    <p className="text-xs text-slate-400">{item.explanation}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

    </div>
  );
}

function ArrowRightIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}

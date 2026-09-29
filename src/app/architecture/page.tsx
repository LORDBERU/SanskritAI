import React from 'react';
import { ArrowDown } from 'lucide-react';

export default function ArchitecturePage() {
  const Step = ({ title, desc }: { title: string, desc: string }) => (
    <div className="flex flex-col items-center">
      <div className="bg-slate-900 border border-slate-700 w-64 p-4 rounded-xl text-center shadow-lg">
        <h3 className="font-semibold text-slate-100">{title}</h3>
        <p className="text-xs text-slate-400 mt-2">{desc}</p>
      </div>
      <ArrowDown className="w-6 h-6 text-slate-600 my-2" />
    </div>
  );

  return (
    <main className="min-h-screen py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold text-slate-100 mb-8">How the AI Works</h1>
      
      <div className="mb-12">
        <p className="text-slate-300 leading-relaxed mb-8">
          The SanskritAI platform is designed with a modular architecture. While the frontend handles user interaction and result visualization, the heavy lifting of translation and morphological analysis is delegated to a specialized Machine Learning pipeline.
        </p>

        <div className="flex flex-col items-center py-8 bg-slate-950/50 rounded-2xl border border-slate-800">
          <Step title="Sanskrit Input" desc="User provides raw Devnagari text" />
          <Step title="Normalization" desc="Cleaning characters, standardizing spaces" />
          <Step title="Tokenization" desc="SentencePiece/BPE breaking into subwords" />
          <Step title="Morphological Analysis" desc="Identifying roots, cases, and Sandhi splits" />
          <Step title="Transformer Model" desc="Encoder-Decoder translating to English" />
          <Step title="Grammar Analysis" desc="Mapping syntactic roles and structures" />
          
          <div className="bg-amber-600/20 border border-amber-500/30 w-64 p-4 rounded-xl text-center shadow-[0_0_15px_rgba(245,158,11,0.2)]">
            <h3 className="font-semibold text-amber-500">Human-readable Explanation</h3>
            <p className="text-xs text-amber-200/70 mt-2">Final structured JSON delivered to UI</p>
          </div>
        </div>
      </div>

      <div className="space-y-8 text-slate-300 leading-relaxed">
        <section>
          <h2 className="text-2xl font-semibold text-amber-500 mb-4">Future ML Training</h2>
          <p className="mb-4">
            Currently, the system uses a flexible provider architecture. To integrate a fully fine-tuned Transformer model (e.g., based on mT5 or a custom LLaMA derivative), the following pipeline is established:
          </p>
          <ol className="list-decimal pl-5 space-y-2 text-sm">
            <li><strong>Dataset Collection:</strong> Gathering high-quality Sanskrit-English parallel corpora (e.g., from Mahābhārata, Rāmāyaṇa translations, and generic sentence datasets).</li>
            <li><strong>Preprocessing & Cleaning:</strong> Aligning sentences and fixing OCR errors.</li>
            <li><strong>Train/Validation/Test Split:</strong> Standard splits for rigorous evaluation.</li>
            <li><strong>Fine-tuning:</strong> Adapting a pre-trained sequence-to-sequence model using PyTorch and Hugging Face Transformers.</li>
            <li><strong>Evaluation:</strong> Measuring accuracy using BLEU, chrF, and COMET scores, alongside human expert evaluation.</li>
            <li><strong>Deployment:</strong> Exporting the model (e.g., ONNX) and serving it via a Python FastAPI endpoint.</li>
          </ol>
        </section>
      </div>
    </main>
  );
}

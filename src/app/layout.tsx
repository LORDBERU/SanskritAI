import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Link from 'next/link';
import { BookMarked } from 'lucide-react';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'SanskritAI | AI-Based Translation & Grammar',
  description: 'Translate Sanskrit to English with detailed grammatical analysis.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-slate-950 text-slate-50 antialiased`}>
        <nav className="border-b border-slate-800 bg-slate-950/50 backdrop-blur-md sticky top-0 z-50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16 items-center">
              <Link href="/" className="flex items-center gap-2">
                <BookMarked className="w-6 h-6 text-amber-500" />
                <span className="text-xl font-bold tracking-tight">Sanskrit<span className="text-amber-500">AI</span></span>
              </Link>
              
              <div className="flex gap-6 text-sm font-medium text-slate-300">
                <Link href="/" className="hover:text-amber-400 transition-colors">Translator</Link>
                <Link href="/about" className="hover:text-amber-400 transition-colors">About</Link>
                <Link href="/architecture" className="hover:text-amber-400 transition-colors">How it Works</Link>
              </div>
            </div>
          </div>
        </nav>
        {children}
      </body>
    </html>
  );
}

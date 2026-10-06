import React from 'react';
import { ExternalLink } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="relative overflow-hidden border-t border-white/[0.07] bg-[#05070a] text-slate-400 px-4 sm:px-6 lg:px-8 py-12">
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_50%_120%,rgba(224,35,28,.10),transparent_35%)]" />

      <div className="relative max-w-7xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div>
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-[#e0231c] shadow-[0_0_20px_rgba(224,35,28,.7)]" />
            <span className="text-xl font-semibold tracking-[0.24em] text-white">EXAMIFY</span>
          </div>

          <p className="mt-4 max-w-md text-sm leading-6 text-slate-500">
            A quieter place to track the date, protect your focus and keep showing up.
          </p>

          <p className="mt-5 text-[10px] uppercase tracking-[0.18em] text-slate-600">
            Focus. Track. Finish.
          </p>
        </div>

        <div className="md:text-right">
          <a
            href="https://kittycorp.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-xs text-slate-400 hover:text-white transition-colors"
          >
            <span>A Kitty Corp product</span>
            <ExternalLink className="w-3.5 h-3.5 text-[#ff7563]" />
          </a>
          <div className="mt-3 text-[10px] uppercase tracking-[0.16em] text-slate-700">
            © {new Date().getFullYear()} EXAMIFY
          </div>
        </div>
      </div>
    </footer>
  );
};

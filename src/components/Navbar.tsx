import React, { useEffect, useState } from 'react';
import {
  Flame,
  Clock,
  Volume2,
  VolumeX,
  Compass,
  Menu,
  X,
  Target,
  MessageCircle,
  Instagram
} from 'lucide-react';
import { Exam, AmbientCategory } from '../types';

const WHATSAPP_URL = 'https://chat.whatsapp.com/LBGnz1tsfPg3EG87QiL5Xg';
const INSTAGRAM_URL = 'https://www.instagram.com/viratanand.7';

interface NavbarProps {
  exams: Exam[];
  targetExam: Exam | null;
  onSelectTargetExam: (examId: string) => void;
  onOpenFocusRoom: () => void;
  streakDays: number;
  currentAudioCategory: AmbientCategory;
  onToggleAudio: () => void;
  isAudioPlaying: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  exams,
  targetExam,
  onSelectTargetExam,
  onOpenFocusRoom,
  streakDays,
  currentAudioCategory,
  onToggleAudio,
  isAudioPlaying
}) => {
  const [timeStr, setTimeStr] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const updateTime = () => {
      setTimeStr(
        new Date().toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit'
        })
      );
    };

    updateTime();
    const interval = window.setInterval(updateTime, 1000);
    return () => window.clearInterval(interval);
  }, []);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/[0.07] bg-[#05070a]/78 backdrop-blur-2xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        <a href="/" className="flex items-center gap-3 min-w-0 group" aria-label="EXAMIFY home">
          <span className="relative grid place-items-center w-9 h-9 rounded-full border border-white/10 bg-white/[0.035] overflow-hidden">
            <span className="absolute inset-1 rounded-full bg-[#e0231c]/15 blur-sm" />
            <span className="relative w-2.5 h-2.5 rounded-full bg-[#e0231c] shadow-[0_0_20px_rgba(224,35,28,.75)]" />
          </span>

          <span className="flex flex-col min-w-0">
            <span className="text-sm font-semibold tracking-[0.28em] text-white leading-none">
              EXAMIFY
            </span>
            <span className="mt-1 text-[8px] uppercase tracking-[0.34em] text-slate-500">
              Focus system
            </span>
          </span>
        </a>

        <div className="hidden md:flex items-center gap-1.5 px-3 py-1 rounded-full border border-[#e0231c]/20 bg-[#e0231c]/[0.06] text-[10px] font-semibold tracking-[0.16em] text-[#ff7563]">
          <Flame className="w-3.5 h-3.5 fill-[#e0231c] text-[#e0231c]" />
          <span>{streakDays} DAY STREAK</span>
        </div>

        <div className="hidden lg:flex items-center gap-2 ml-auto">
          <label className="flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.025] px-3.5 py-2 text-xs text-slate-300">
            <Target className="w-3.5 h-3.5 text-[#ff6a55]" />
            <span className="text-slate-500 font-medium">Target</span>
            <select
              value={targetExam?.id || ''}
              onChange={(event) => onSelectTargetExam(event.target.value)}
              className="max-w-[180px] bg-transparent text-white font-medium cursor-pointer focus:outline-none"
              aria-label="Target exam"
            >
              <option value="" disabled className="bg-[#0a0e12]">Choose exam</option>
              {exams.map((exam) => (
                <option key={exam.id} value={exam.id} className="bg-[#0a0e12] text-white">
                  {exam.name}
                </option>
              ))}
            </select>
          </label>

          <div className="flex items-center gap-1.5 rounded-full border border-white/[0.08] bg-white/[0.025] px-3.5 py-2 text-xs font-mono text-slate-300">
            <Clock className="w-3.5 h-3.5 text-[#ff6a55]" />
            <span>{timeStr || '00:00:00'}</span>
          </div>

          <button
            type="button"
            onClick={onToggleAudio}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-full border text-xs font-medium transition-all ${
              isAudioPlaying
                ? 'border-[#e0231c]/35 bg-[#e0231c]/10 text-[#ff8a78]'
                : 'border-white/[0.08] bg-white/[0.025] text-slate-400 hover:text-white'
            }`}
            title="Toggle ambient audio"
          >
            {isAudioPlaying ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
            <span className="uppercase text-[10px] tracking-wider">
              {isAudioPlaying ? currentAudioCategory : 'Sound off'}
            </span>
          </button>

          <button
            type="button"
            onClick={onOpenFocusRoom}
            className="flex items-center gap-2 px-5 py-2 rounded-full bg-[#e7eee9] text-[#05070a] font-bold text-[11px] tracking-[0.13em] uppercase hover:bg-white hover:-translate-y-0.5 transition-all shadow-[0_10px_30px_rgba(0,0,0,.25)]"
          >
            <Compass className="w-3.5 h-3.5" />
            <span>Focus room</span>
          </button>

          <div className="flex items-center gap-1 pl-1 ml-1 border-l border-white/[0.08]">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="EXAMIFY WhatsApp"
              className="p-2 rounded-full text-slate-500 hover:text-emerald-400 hover:bg-white/[0.04] transition-all"
            >
              <MessageCircle className="w-4 h-4" />
            </a>
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="EXAMIFY Instagram"
              className="p-2 rounded-full text-slate-500 hover:text-pink-400 hover:bg-white/[0.04] transition-all"
            >
              <Instagram className="w-4 h-4" />
            </a>
          </div>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <button
            type="button"
            onClick={onOpenFocusRoom}
            className="px-3.5 py-2 rounded-full bg-[#e7eee9] text-[#05070a] font-bold text-[10px] tracking-[0.14em] uppercase"
          >
            Focus
          </button>
          <button
            type="button"
            onClick={() => setMobileMenuOpen((open) => !open)}
            className="p-2 rounded-full border border-white/[0.09] bg-white/[0.03] text-slate-300"
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-white/[0.06] bg-[#05070a]/95 backdrop-blur-2xl px-4 pt-4 pb-5 space-y-3 animate-fade-in">
          <div className="flex items-center justify-between text-xs font-mono text-slate-300 examify-card p-3 rounded-xl">
            <span className="text-slate-500">LOCAL TIME</span>
            <span className="font-semibold text-[#ff7563]">{timeStr}</span>
          </div>

          <div className="p-3 examify-card rounded-xl space-y-2">
            <label className="text-[10px] font-semibold text-slate-500 uppercase tracking-[0.18em] block">
              Target exam
            </label>
            <select
              value={targetExam?.id || ''}
              onChange={(event) => {
                onSelectTargetExam(event.target.value);
                setMobileMenuOpen(false);
              }}
              className="w-full bg-[#05070a] text-white font-medium text-xs border border-white/[0.08] rounded-lg p-2.5 focus:outline-none"
            >
              <option value="" disabled>Choose your target</option>
              {exams.map((exam) => (
                <option key={exam.id} value={exam.id}>
                  {exam.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onToggleAudio}
              className="flex-1 py-2.5 px-3 rounded-xl examify-card text-xs font-medium text-slate-300 flex items-center justify-center gap-2"
            >
              {isAudioPlaying ? <Volume2 className="w-4 h-4 text-[#ff7563]" /> : <VolumeX className="w-4 h-4" />}
              <span>{isAudioPlaying ? currentAudioCategory.toUpperCase() : 'ENABLE AMBIENCE'}</span>
            </button>

            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="p-2.5 rounded-xl examify-card text-slate-400 hover:text-emerald-400"
            >
              <MessageCircle className="w-4 h-4" />
            </a>

            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="p-2.5 rounded-xl examify-card text-slate-400 hover:text-pink-400"
            >
              <Instagram className="w-4 h-4" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

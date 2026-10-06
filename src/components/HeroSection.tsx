import React, { useEffect, useState } from 'react';
import { Calendar, Zap, BookOpen, Target, ArrowUpRight } from 'lucide-react';
import { Exam, StudyVibe } from '../types';
import { calculateTimeRemaining, getCountdownMotivationContext } from '../lib/quoteSystem';

interface HeroSectionProps {
  targetExam: Exam | null;
  currentVibe: StudyVibe | null;
  onStartFocus: () => void;
  onViewExams: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  targetExam,
  currentVibe,
  onStartFocus,
  onViewExams
}) => {
  const [timeLeft, setTimeLeft] = useState(() =>
    targetExam
      ? calculateTimeRemaining(targetExam.target_date)
      : { days: 0, hours: 0, minutes: 0, seconds: 0, totalDays: 0, isPassed: false }
  );

  useEffect(() => {
    if (!targetExam) return;

    setTimeLeft(calculateTimeRemaining(targetExam.target_date));
    const interval = window.setInterval(() => {
      setTimeLeft(calculateTimeRemaining(targetExam.target_date));
    }, 1000);

    return () => window.clearInterval(interval);
  }, [targetExam]);

  const motivationContext = getCountdownMotivationContext(timeLeft.days);
  const bgImage =
    currentVibe?.image_url ||
    'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=2000&q=82';

  return (
    <section className="relative min-h-[88svh] overflow-hidden border-b border-white/[0.06]">
      <div className="absolute inset-0 z-0">
        <picture>
          {currentVibe?.mobile_image_url && (
            <source media="(max-width: 640px)" srcSet={currentVibe.mobile_image_url} />
          )}
          <img
            src={bgImage}
            alt=""
            aria-hidden="true"
            loading="eager"
            decoding="async"
            fetchPriority="high"
            className="hero-image w-full h-full object-cover object-center brightness-[0.46] contrast-[1.12] saturate-[0.8]"
          />
        </picture>

        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(5,7,10,.94)_0%,rgba(5,7,10,.72)_42%,rgba(5,7,10,.32)_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,7,10,.28),rgba(5,7,10,.12)_45%,rgba(5,7,10,.9))]" />
        <div className="absolute -right-20 top-[8%] w-[min(48vw,520px)] aspect-square rounded-full bg-[#e0231c]/20 blur-3xl" />
        <div className="absolute right-[8%] top-[12%] w-20 sm:w-32 aspect-square rounded-full bg-[#e0231c]/70 blur-[1px] opacity-35 shadow-[0_0_90px_rgba(224,35,28,.45)]" />
        <div className="absolute inset-0 vignette" />
      </div>

      <div className="relative z-10 min-h-[88svh] max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20 flex items-center">
        <div className="w-full grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          <div className="lg:col-span-7">
            <div className="flex items-center gap-2 text-[10px] sm:text-xs font-semibold tracking-[0.24em] uppercase text-[#ff7563] mb-5 animate-fade-in">
              <span className="w-1.5 h-1.5 rounded-full bg-[#e0231c] shadow-[0_0_16px_rgba(224,35,28,.8)]" />
              <span>EXAMIFY / TARGET MODE</span>
            </div>

            <div className="flex flex-wrap items-center gap-2 mb-5">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-black/20 px-3 py-1.5 text-[10px] font-medium tracking-[0.14em] uppercase text-slate-300">
                <Target className="w-3.5 h-3.5 text-[#ff7563]" />
                {targetExam?.category || 'Target'}
              </span>
              <span className={`rounded-full px-3 py-1.5 text-[10px] font-semibold tracking-[0.12em] uppercase border ${
                targetExam?.is_official
                  ? 'border-emerald-500/25 bg-emerald-500/[0.08] text-emerald-300'
                  : 'border-[#e0231c]/25 bg-[#e0231c]/[0.08] text-[#ff8a78]'
              }`}>
                {targetExam?.is_official ? 'Official date' : 'Expected date'}
              </span>
            </div>

            <h1 className="text-balance text-4xl sm:text-6xl xl:text-7xl font-semibold tracking-[-0.045em] leading-[0.98] text-[#e9efeb] max-w-4xl">
              {targetExam?.name || 'Your next exam'}
            </h1>

            <p className="mt-6 max-w-2xl text-sm sm:text-base leading-7 text-slate-300/85">
              {motivationContext}
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <button
                type="button"
                onClick={onStartFocus}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#e8eee9] text-[#05070a] px-7 py-3.5 text-[11px] font-bold tracking-[0.13em] uppercase hover:bg-white hover:-translate-y-0.5 transition-all"
              >
                <Zap className="w-4 h-4 fill-[#05070a]" />
                Start focus mode
              </button>
              <button
                type="button"
                onClick={onViewExams}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/[0.035] px-7 py-3.5 text-[11px] font-semibold tracking-[0.13em] uppercase text-slate-200 hover:bg-white/[0.07] transition-all"
              >
                <Calendar className="w-4 h-4 text-[#ff7563]" />
                View exams
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <div className="lg:col-span-5 lg:justify-self-end w-full max-w-md">
            <div className="glass rounded-[28px] p-5 sm:p-7 border-white/[0.10]">
              <div className="flex items-center justify-between gap-4 pb-5 border-b border-white/[0.08]">
                <div>
                  <div className="text-[9px] tracking-[0.24em] uppercase text-slate-500">
                    Time remaining
                  </div>
                  <div className="mt-1 text-xs text-slate-300">
                    Every block still counts.
                  </div>
                </div>
                <div className="w-8 h-8 rounded-full border border-[#e0231c]/25 bg-[#e0231c]/10 grid place-items-center">
                  <span className="w-2 h-2 rounded-full bg-[#e0231c] animate-pulse" />
                </div>
              </div>

              <div className="py-7 text-center">
                <div className="text-[92px] sm:text-[118px] leading-[0.8] font-semibold tracking-[-0.08em] text-white glow-orange tabular-nums">
                  {String(timeLeft.days).padStart(2, '0')}
                </div>
                <div className="mt-4 text-[10px] uppercase tracking-[0.36em] text-slate-500">
                  days remaining
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2">
                {[
                  ['Hours', timeLeft.hours],
                  ['Minutes', timeLeft.minutes],
                  ['Seconds', timeLeft.seconds]
                ].map(([label, value]) => (
                  <div key={String(label)} className="rounded-2xl border border-white/[0.07] bg-black/20 px-3 py-3 text-center">
                    <div className="text-xl sm:text-2xl font-medium tabular-nums text-slate-100">
                      {String(value).padStart(2, '0')}
                    </div>
                    <div className="mt-1 text-[8px] uppercase tracking-[0.16em] text-slate-600">
                      {label}
                    </div>
                  </div>
                ))}
              </div>

              {currentVibe && (
                <div className="mt-5 flex items-center gap-2 text-[10px] text-slate-500">
                  <BookOpen className="w-3.5 h-3.5 text-[#ff7563]" />
                  <span className="uppercase tracking-[0.12em]">Atmosphere</span>
                  <span className="text-slate-300 truncate">· {currentVibe.title}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

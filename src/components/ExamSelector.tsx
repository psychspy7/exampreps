import React from 'react';
import { Calendar, CheckCircle2, AlertCircle, Target, ArrowRight } from 'lucide-react';
import { Exam } from '../types';
import { calculateTimeRemaining } from '../lib/quoteSystem';

interface ExamSelectorProps {
  exams: Exam[];
  onSelectExam: (examId: string) => void;
}

export const ExamSelector: React.FC<ExamSelectorProps> = ({ exams, onSelectExam }) => {
  return (
    <section className="relative min-h-[calc(100svh-4rem)] flex items-center justify-center overflow-hidden py-16 sm:py-24 border-b border-white/[0.06]">
      <div className="absolute inset-0 formula-bg opacity-35 pointer-events-none" />
      <div className="absolute -right-24 top-16 w-72 h-72 rounded-full bg-[#e0231c]/10 blur-3xl pointer-events-none" />
      <div className="absolute inset-0 vignette pointer-events-none" />

      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6">
        <div className="max-w-3xl mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 text-[10px] sm:text-xs font-semibold tracking-[0.24em] uppercase text-[#ff7563] mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[#e0231c] shadow-[0_0_14px_rgba(224,35,28,.7)]" />
            <span>EXAMIFY / FIRST TARGET</span>
          </div>

          <h1 className="text-balance text-4xl sm:text-6xl font-semibold tracking-[-0.045em] leading-[1.02] text-[#e8eee9]">
            What are you preparing for?
          </h1>

          <p className="mt-5 text-sm sm:text-base leading-7 text-slate-400 max-w-2xl">
            Pick the exam that matters right now. EXAMIFY will shape the countdown, focus tools and progress view around that target.
          </p>
        </div>

        {exams.length === 0 ? (
          <div className="glass rounded-3xl p-8 text-center text-slate-400">
            No exams are currently available. Please check back soon.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {exams.map((exam) => {
              const remaining = calculateTimeRemaining(exam.target_date);
              const formattedDate = new Date(exam.target_date).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric'
              });

              return (
                <button
                  key={exam.id}
                  type="button"
                  onClick={() => onSelectExam(exam.id)}
                  className="group text-left examify-card rounded-[24px] p-5 sm:p-6 transition-all duration-300 hover:-translate-y-1 cursor-pointer"
                >
                  <div className="flex items-center justify-between gap-2 mb-5">
                    <span className="px-3 py-1 rounded-full bg-white/[0.035] border border-white/[0.08] text-slate-400 text-[9px] font-semibold tracking-[0.16em] uppercase">
                      {exam.category}
                    </span>

                    {exam.is_official ? (
                      <span className="flex items-center gap-1 text-[9px] font-semibold text-emerald-400">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        OFFICIAL
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-[9px] font-semibold text-[#ff8a78]">
                        <AlertCircle className="w-3.5 h-3.5" />
                        EXPECTED
                      </span>
                    )}
                  </div>

                  <h2 className="text-lg sm:text-xl font-semibold text-white leading-snug mb-3 group-hover:text-[#ffd2cb] transition-colors">
                    {exam.name}
                  </h2>

                  <div className="flex items-center gap-2 text-xs text-slate-500 mb-6">
                    <Calendar className="w-3.5 h-3.5 text-[#ff7563]" />
                    <span>{formattedDate}</span>
                  </div>

                  <div className="flex items-end justify-between gap-4 pt-4 border-t border-white/[0.06]">
                    <div>
                      <div className="text-4xl font-semibold tracking-[-0.05em] text-white tabular-nums glow-orange">
                        {remaining.days}
                      </div>
                      <div className="mt-1 text-[8px] uppercase tracking-[0.20em] text-slate-600">
                        days remaining
                      </div>
                    </div>

                    <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#e7eee9] text-[#05070a] text-[9px] font-bold tracking-[0.13em] uppercase group-hover:bg-white transition-colors">
                      Select
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        )}

        <p className="text-[10px] text-slate-600 mt-8">
          You can change your target anytime from the navigation bar.
        </p>
      </div>
    </section>
  );
};

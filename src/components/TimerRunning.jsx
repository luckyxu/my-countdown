import React from 'react';
import { Play, Pause, Square } from 'lucide-react';
import { CATEGORIES, CATEGORY_MAP } from '../data/categories';

export default function TimerRunning({
  displayTime,
  isPaused,
  isActive,
  progress,
  category,
  onPause,
  onResume,
  onStop,
}) {
  const cat = CATEGORY_MAP[category] || CATEGORIES[0];

  return (
    <div className="relative z-10 flex flex-col items-center justify-center w-full h-full p-4 animate-in zoom-in-95 duration-500">
      {/* Category label */}
      <div className={`mb-6 px-4 py-2 rounded-full ${cat.bgClass} backdrop-blur-sm border border-white/10 flex items-center gap-2`}>
        <span className="text-lg">{cat.emoji}</span>
        <span className="text-white/90 text-sm font-medium tracking-wide">{cat.label}</span>
      </div>

      {/* Progress bar */}
      <div className="w-full max-w-2xl mb-8 px-4">
        <div className="h-1 bg-white/10 rounded-full overflow-hidden">
          <div
            className={`h-full ${cat.barClass} transition-all duration-1000 ease-linear rounded-full`}
            style={{ width: `${Math.min(progress * 100, 100)}%` }}
          />
        </div>
      </div>

      {/* Countdown display */}
      <div className="flex items-center justify-center font-mono tracking-tighter text-white mb-20 md:mb-32 drop-shadow-[0_10px_30px_rgba(0,0,0,0.8)] w-full">
        <div className="flex flex-col items-center w-[28vw] md:w-[22vw]">
          <span className={`text-[25vw] md:text-[20vw] font-bold leading-none ${isPaused ? 'opacity-40' : ''}`}>
            {displayTime.h}
          </span>
          <span className="text-sm md:text-2xl text-white/60 mt-2 md:mt-6 uppercase tracking-[0.4em] font-light">Hours</span>
        </div>

        <span className={`text-[12vw] md:text-[10vw] font-light pb-8 md:pb-20 ${isPaused ? 'opacity-20' : 'opacity-60 animate-[pulse_1s_ease-in-out_infinite]'}`}>:</span>

        <div className="flex flex-col items-center w-[28vw] md:w-[22vw]">
          <span className={`text-[25vw] md:text-[20vw] font-bold leading-none ${isPaused ? 'opacity-40' : ''}`}>
            {displayTime.m}
          </span>
          <span className="text-sm md:text-2xl text-white/60 mt-2 md:mt-6 uppercase tracking-[0.4em] font-light">Mins</span>
        </div>

        <span className={`text-[12vw] md:text-[10vw] font-light pb-8 md:pb-20 ${isPaused ? 'opacity-20' : 'opacity-60 animate-[pulse_1s_ease-in-out_infinite]'}`}>:</span>

        <div className="flex flex-col items-center w-[28vw] md:w-[22vw]">
          <span className={`text-[25vw] md:text-[20vw] font-bold leading-none ${isPaused ? 'opacity-40' : ''}`}>
            {displayTime.s}
          </span>
          <span className="text-sm md:text-2xl text-white/60 mt-2 md:mt-6 uppercase tracking-[0.4em] font-light">Secs</span>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-4 md:gap-12 w-full max-w-3xl px-4">
        {isActive ? (
          <button
            onClick={onPause}
            className="flex-1 py-5 md:py-6 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white rounded-[2rem] border border-white/20 font-medium text-lg md:text-xl transition-all flex items-center justify-center gap-3 hover:scale-105"
          >
            <Pause className="w-6 h-6 md:w-8 md:h-8" fill="currentColor" />
            暂停
          </button>
        ) : (
          <button
            onClick={onResume}
            className="flex-1 py-5 md:py-6 bg-white text-black rounded-[2rem] font-bold text-lg md:text-xl transition-all flex items-center justify-center gap-3 hover:scale-105 shadow-[0_0_30px_rgba(255,255,255,0.3)]"
          >
            <Play className="w-6 h-6 md:w-8 md:h-8" fill="currentColor" />
            继续
          </button>
        )}

        <button
          onClick={onStop}
          className="w-20 md:w-28 h-20 md:h-24 bg-white/5 hover:bg-white/10 backdrop-blur-md text-white/70 hover:text-white rounded-[2rem] border border-white/10 transition-all flex items-center justify-center hover:scale-105 hover:bg-red-500/20 hover:border-red-500/50 hover:text-red-400 shrink-0 group"
          title="停止并重置"
        >
          <Square className="w-8 h-8 md:w-10 md:h-10 transition-transform group-hover:scale-90" fill="currentColor" />
        </button>
      </div>
    </div>
  );
}

import React from 'react';
import { motion as Motion } from 'motion/react';
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
      <div className={`mb-6 px-5 py-2 rounded-full ${cat.gradient} backdrop-blur-sm border border-white/20 flex items-center gap-2 shadow-lg`}>
        <span className="text-lg">{cat.emoji}</span>
        <span className="text-white text-sm font-semibold tracking-wide">{cat.label}</span>
      </div>

      {/* Progress bar */}
      <div className="w-full max-w-2xl mb-8 px-4">
        <div className="h-1 bg-white/10 rounded-full overflow-hidden">
          <Motion.div
            className="h-full bg-gradient-to-r from-blue-400 to-purple-400 rounded-full"
            style={{ width: `${Math.min(progress * 100, 100)}%` }}
            transition={{ duration: 1, ease: 'linear' }}
          />
        </div>
      </div>

      {/* Countdown display */}
      <div className="flex items-center justify-center font-mono tracking-tighter text-white mb-20 md:mb-32 drop-shadow-[0_10px_30px_rgba(0,0,0,0.8)] w-full">
        <div className="flex flex-col items-center w-[28vw] md:w-[22vw]">
          <span className={`text-[25vw] md:text-[20vw] font-bold leading-none transition-opacity duration-300 ${isPaused ? 'opacity-40' : ''}`}>
            {displayTime.h}
          </span>
          <span className="text-sm md:text-2xl text-white/60 mt-2 md:mt-6 uppercase tracking-[0.4em] font-light">Hours</span>
        </div>

        <span className={`text-[12vw] md:text-[10vw] font-light pb-8 md:pb-20 transition-opacity duration-300 ${isPaused ? 'opacity-20' : 'opacity-60 animate-[pulse_1s_ease-in-out_infinite]'}`}>:</span>

        <div className="flex flex-col items-center w-[28vw] md:w-[22vw]">
          <span className={`text-[25vw] md:text-[20vw] font-bold leading-none transition-opacity duration-300 ${isPaused ? 'opacity-40' : ''}`}>
            {displayTime.m}
          </span>
          <span className="text-sm md:text-2xl text-white/60 mt-2 md:mt-6 uppercase tracking-[0.4em] font-light">Mins</span>
        </div>

        <span className={`text-[12vw] md:text-[10vw] font-light pb-8 md:pb-20 transition-opacity duration-300 ${isPaused ? 'opacity-20' : 'opacity-60 animate-[pulse_1s_ease-in-out_infinite]'}`}>:</span>

        <div className="flex flex-col items-center w-[28vw] md:w-[22vw]">
          <span className={`text-[25vw] md:text-[20vw] font-bold leading-none transition-opacity duration-300 ${isPaused ? 'opacity-40' : ''}`}>
            {displayTime.s}
          </span>
          <span className="text-sm md:text-2xl text-white/60 mt-2 md:mt-6 uppercase tracking-[0.4em] font-light">Secs</span>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-4 md:gap-12 w-full max-w-3xl px-4">
        {isActive ? (
          <Motion.button
            onClick={onPause}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex-1 py-5 md:py-6 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white rounded-[2rem] border border-white/20 font-medium text-lg md:text-xl transition-all flex items-center justify-center gap-3"
          >
            <Pause className="w-6 h-6 md:w-8 md:h-8" fill="currentColor" />
            暂停
          </Motion.button>
        ) : (
          <Motion.button
            onClick={onResume}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex-1 py-5 md:py-6 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white rounded-[2rem] font-bold text-lg md:text-xl transition-all flex items-center justify-center gap-3 shadow-2xl shadow-blue-500/30"
          >
            <Play className="w-6 h-6 md:w-8 md:h-8" fill="currentColor" />
            继续
          </Motion.button>
        )}

        <Motion.button
          onClick={onStop}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-20 md:w-28 h-20 md:h-24 bg-white/5 hover:bg-red-500/20 backdrop-blur-md text-white/70 hover:text-red-400 rounded-[2rem] border border-white/10 hover:border-red-500/50 transition-all flex items-center justify-center shrink-0 group"
          title="停止并重置"
        >
          <Square className="w-8 h-8 md:w-10 md:h-10 transition-transform group-hover:scale-90" fill="currentColor" />
        </Motion.button>
      </div>
    </div>
  );
}

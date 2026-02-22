import React from 'react';
import { BellRing } from 'lucide-react';
import { CATEGORIES, CATEGORY_MAP } from '../data/categories';

function formatDuration(seconds) {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  if (h > 0) return `${h}小时${m > 0 ? m + '分钟' : ''}`;
  if (m > 0) return `${m}分钟${s > 0 ? s + '秒' : ''}`;
  return `${s}秒`;
}

export default function TimerFinished({ category, plannedDuration, actualDuration, onAgain, onRest }) {
  const cat = CATEGORY_MAP[category] || CATEGORIES[0];
  const completionPct = plannedDuration > 0 ? Math.round((actualDuration / plannedDuration) * 100) : 100;

  return (
    <div className="absolute inset-0 bg-black/80 backdrop-blur-lg z-50 flex flex-col items-center justify-center p-6 text-center animate-in fade-in duration-500">
      <div className="w-32 h-32 bg-white/10 rounded-full flex items-center justify-center mb-8 animate-[bounce_2s_infinite]">
        <BellRing className="w-16 h-16 text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]" />
      </div>
      <h2 className="text-6xl md:text-8xl font-bold text-white mb-6 drop-shadow-2xl tracking-wider">时间到！</h2>
      <p className="text-xl md:text-2xl text-white/80 mb-8 font-light tracking-wide">您设定的倒计时已完美结束</p>

      {/* Session summary */}
      <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl px-8 py-5 mb-10 flex items-center gap-6">
        <span className="text-4xl">{cat.emoji}</span>
        <div className="text-left">
          <div className="text-white/60 text-sm mb-1">{cat.label}</div>
          <div className="text-white font-semibold text-lg">{formatDuration(actualDuration)}</div>
        </div>
        <div className="border-l border-white/20 pl-6">
          <div className="text-white/60 text-sm mb-1">完成度</div>
          <div className="text-white font-semibold text-lg">{completionPct}%</div>
        </div>
      </div>

      <div className="flex gap-4">
        <button
          onClick={onAgain}
          className="px-10 py-4 bg-white/20 hover:bg-white/30 backdrop-blur-md border border-white/30 text-white rounded-full text-lg font-medium transition-all hover:scale-105"
        >
          再来一次
        </button>
        <button
          onClick={onRest}
          className="px-10 py-4 bg-white hover:bg-white/90 text-black rounded-full text-lg font-bold transition-all hover:scale-105 shadow-[0_0_30px_rgba(255,255,255,0.3)]"
        >
          休息一下
        </button>
      </div>
    </div>
  );
}

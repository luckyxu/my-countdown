import React from 'react';
import { motion as Motion } from 'motion/react';
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
    <div className="absolute inset-0 bg-slate-900/90 backdrop-blur-xl z-50 flex flex-col items-center justify-center p-6 text-center">
      {/* Bell icon */}
      <Motion.div
        animate={{ y: [0, -12, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        className="w-32 h-32 bg-gradient-to-br from-blue-500/30 to-purple-500/30 border border-white/20 rounded-full flex items-center justify-center mb-8 shadow-2xl"
      >
        <BellRing className="w-16 h-16 text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]" />
      </Motion.div>

      <Motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-6xl md:text-8xl font-bold text-white mb-4 drop-shadow-2xl tracking-wider bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"
      >
        时间到！
      </Motion.h2>
      <p className="text-xl md:text-2xl text-white/70 mb-8 font-light tracking-wide">
        您设定的倒计时已完美结束
      </p>

      {/* Session summary */}
      <Motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
        className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl px-8 py-5 mb-10 flex items-center gap-6 shadow-2xl"
      >
        <div className={`w-14 h-14 rounded-2xl ${cat.gradient} flex items-center justify-center shadow-lg`}>
          <span className="text-2xl">{cat.emoji}</span>
        </div>
        <div className="text-left">
          <div className="text-white/60 text-sm mb-1">{cat.label}</div>
          <div className="text-white font-semibold text-lg">{formatDuration(actualDuration)}</div>
        </div>
        <div className="border-l border-white/20 pl-6">
          <div className="text-white/60 text-sm mb-1">完成度</div>
          <div className="text-white font-semibold text-lg">{completionPct}%</div>
        </div>
      </Motion.div>

      {/* Action buttons */}
      <Motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="flex gap-4"
      >
        <Motion.button
          onClick={onAgain}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-10 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white rounded-full text-lg font-medium transition-all"
        >
          再来一次
        </Motion.button>
        <Motion.button
          onClick={onRest}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="relative overflow-hidden px-10 py-4 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white rounded-full text-lg font-bold transition-all shadow-2xl shadow-blue-500/30"
        >
          休息一下
        </Motion.button>
      </Motion.div>
    </div>
  );
}

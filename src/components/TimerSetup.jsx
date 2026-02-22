import React, { useState } from 'react';
import { Play, Settings2 } from 'lucide-react';
import { CATEGORIES, DEFAULT_CATEGORY } from '../data/categories';
import { useFatigue } from '../hooks/useFatigue';

const PRESETS = [
  { label: '番茄钟',   minutes: 25, desc: '短时高效' },
  { label: '课堂',     minutes: 45, desc: '标准学习' },
  { label: '深度专注', minutes: 90, desc: '长时攻坚' },
];

export default function TimerSetup({ onStart }) {
  const fatigue = useFatigue();
  const [hours, setHours] = useState('');
  const [minutes, setMinutes] = useState('');
  const [seconds, setSeconds] = useState('');
  const [category, setCategory] = useState(DEFAULT_CATEGORY);

  const handleInputChange = (setter, maxLimit) => (e) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value === '') { setter(''); return; }
    const num = parseInt(value, 10);
    setter((num > maxLimit ? maxLimit : num).toString());
  };

  const applyPreset = (mins) => {
    setHours('');
    setMinutes(mins.toString());
    setSeconds('');
  };

  const handleStart = () => {
    const h = parseInt(hours || '0', 10);
    const m = parseInt(minutes || '0', 10);
    const s = parseInt(seconds || '0', 10);
    const total = h * 3600 + m * 60 + s;
    if (total > 0) onStart(total, category);
  };

  const hasValue = hours || minutes || seconds;

  return (
    <div className="relative z-10 w-full max-w-4xl mx-4 animate-in slide-in-from-bottom-8 duration-700">
      {/* Fatigue greeting banner */}
      <div className="text-center mb-5">
        <p className={`text-sm font-medium ${fatigue.colorClass} mb-1`}>
          {fatigue.emoji} {fatigue.greeting}，{fatigue.label} · 推荐 {fatigue.recommendedMinutes} 分钟
        </p>
        <p className="text-white/50 text-xs">{fatigue.message}</p>
      </div>

      <div className="p-8 md:p-10 bg-black/30 backdrop-blur-xl border border-white/20 rounded-[3rem] shadow-[0_0_50px_rgba(0,0,0,0.5)]">
        <h1 className="text-3xl md:text-4xl font-light text-center mb-8 flex items-center justify-center gap-3 text-white tracking-wide">
          <Settings2 className="w-8 h-8 text-white/80" />
          沉浸式倒计时
        </h1>

        {/* Category selector — 3×2 card grid */}
        <div className="grid grid-cols-3 gap-3 mb-8">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setCategory(cat.key)}
              className={`flex flex-col items-center justify-center py-4 gap-2 rounded-2xl border transition-all ${
                category === cat.key
                  ? `${cat.bgClass} border-white/40 text-white shadow-[0_0_14px_rgba(255,255,255,0.12)] scale-[1.03]`
                  : 'bg-white/5 border-white/10 text-white/60 hover:text-white hover:bg-white/10'
              }`}
            >
              <span className="text-2xl leading-none">{cat.emoji}</span>
              <span className="text-sm font-medium">{cat.label}</span>
            </button>
          ))}
        </div>

        {/* Preset buttons */}
        <div className="grid grid-cols-3 gap-3 mb-8">
          {PRESETS.map(({ label, minutes: mins, desc }) => {
            const isRecommended = mins === fatigue.recommendedMinutes;
            return (
              <button
                key={mins}
                onClick={() => applyPreset(mins)}
                className={`relative py-4 rounded-2xl border transition-all text-center ${
                  isRecommended
                    ? 'bg-white/20 border-white/40 text-white shadow-[0_0_15px_rgba(255,255,255,0.15)]'
                    : 'bg-white/5 border-white/10 text-white/70 hover:bg-white/10 hover:text-white'
                }`}
              >
                {isRecommended && (
                  <span className="absolute -top-2 left-1/2 -translate-x-1/2 bg-white text-black text-[10px] font-bold px-2 py-0.5 rounded-full">
                    推荐
                  </span>
                )}
                <div className="text-sm font-semibold mb-1 opacity-90">{label}</div>
                <div className="text-2xl font-bold">{mins}</div>
                <div className="text-xs opacity-70 mt-0.5">分钟</div>
                <div className="text-xs opacity-50 mt-1">{desc}</div>
              </button>
            );
          })}
        </div>

        {/* Custom time input */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-10 mb-8">
          <div className="flex flex-col items-center flex-1 w-full">
            <input
              type="text" inputMode="numeric" value={hours}
              onChange={handleInputChange(setHours, 999)} placeholder="00"
              className="w-full bg-white/5 text-center text-5xl md:text-6xl font-mono py-6 rounded-3xl border border-white/10 focus:border-white/50 focus:bg-white/10 outline-none transition-all text-white placeholder:text-white/20 shadow-inner"
            />
            <label className="text-sm text-white/60 mt-3 font-medium tracking-widest uppercase">Hours (0-999)</label>
          </div>
          <span className="text-5xl font-light text-white/30 hidden md:block pb-8">:</span>
          <div className="flex flex-col items-center flex-1 w-full">
            <input
              type="text" inputMode="numeric" value={minutes}
              onChange={handleInputChange(setMinutes, 59)} placeholder="00"
              className="w-full bg-white/5 text-center text-5xl md:text-6xl font-mono py-6 rounded-3xl border border-white/10 focus:border-white/50 focus:bg-white/10 outline-none transition-all text-white placeholder:text-white/20 shadow-inner"
            />
            <label className="text-sm text-white/60 mt-3 font-medium tracking-widest uppercase">Minutes (0-59)</label>
          </div>
          <span className="text-5xl font-light text-white/30 hidden md:block pb-8">:</span>
          <div className="flex flex-col items-center flex-1 w-full">
            <input
              type="text" inputMode="numeric" value={seconds}
              onChange={handleInputChange(setSeconds, 59)} placeholder="00"
              className="w-full bg-white/5 text-center text-5xl md:text-6xl font-mono py-6 rounded-3xl border border-white/10 focus:border-white/50 focus:bg-white/10 outline-none transition-all text-white placeholder:text-white/20 shadow-inner"
            />
            <label className="text-sm text-white/60 mt-3 font-medium tracking-widest uppercase">Seconds (0-59)</label>
          </div>
        </div>

        <button
          onClick={handleStart}
          disabled={!hasValue}
          className="w-full py-6 bg-white text-black disabled:bg-white/10 disabled:text-white/30 rounded-full font-bold text-xl md:text-2xl transition-all flex items-center justify-center gap-3 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(255,255,255,0.4)] disabled:hover:scale-100 disabled:shadow-none"
        >
          <Play className="w-7 h-7" fill="currentColor" />
          开启专注时光
        </button>
      </div>
    </div>
  );
}

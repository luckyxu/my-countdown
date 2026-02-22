import React, { useState } from 'react';
import { motion as Motion } from 'motion/react';
import {
  Play, Clock,
  BookOpen, Calculator, Globe, Atom, Beaker, Map,
  Coffee, GraduationCap, Flame,
  ChevronUp, ChevronDown, ChevronsUp, ChevronsDown,
} from 'lucide-react';
import { CATEGORIES, DEFAULT_CATEGORY } from '../data/categories';
import { useFatigue } from '../hooks/useFatigue';

const PRESETS = [
  { label: '番茄钟 25分', minutes: 25, icon: Coffee,        gradient: 'from-rose-500 to-pink-500'     },
  { label: '课堂 45分',   minutes: 45, icon: GraduationCap, gradient: 'from-blue-500 to-cyan-500'     },
  { label: '深度 90分',   minutes: 90, icon: Flame,         gradient: 'from-purple-500 to-fuchsia-500'},
];

const CATEGORY_ICONS = {
  chinese:   BookOpen,
  math:      Calculator,
  english:   Globe,
  physics:   Atom,
  chemistry: Beaker,
  geography: Map,
};

function TimeInput({ value, onChange, max, label }) {
  const [isFocused, setIsFocused] = useState(false);
  const num = value;

  const increment = (amount) => {
    const next = num + amount;
    onChange(next > max ? max : next);
  };

  const decrement = (amount) => {
    const next = num - amount;
    onChange(next < 0 ? 0 : next);
  };

  return (
    <div className="flex flex-col items-center gap-3">
      {/* +10 / +1 */}
      <div className="flex gap-1">
        <Motion.button
          whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
          onClick={() => increment(10)}
          className="text-white/60 hover:text-white p-1.5 rounded-full hover:bg-white/10 transition-colors"
        >
          <ChevronsUp className="w-4 h-4" />
        </Motion.button>
        <Motion.button
          whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
          onClick={() => increment(1)}
          className="text-white/60 hover:text-white p-1.5 rounded-full hover:bg-white/10 transition-colors"
        >
          <ChevronUp className="w-4 h-4" />
        </Motion.button>
      </div>

      {/* Number display */}
      <div className={`bg-white/10 backdrop-blur-md rounded-2xl border-2 transition-all duration-300 ${isFocused ? 'border-blue-400 shadow-lg shadow-blue-500/30' : 'border-white/20'}`}>
        <input
          type="number"
          value={num.toString().padStart(2, '0')}
          onChange={(e) => {
            const v = e.target.value.replace(/\D/g, '');
            if (v === '') { onChange(0); return; }
            const n = parseInt(v, 10);
            onChange(n > max ? max : n < 0 ? 0 : n);
          }}
          onClick={(e) => e.target.select()}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          min={0}
          max={max}
          className="w-24 bg-transparent text-5xl font-bold text-white text-center p-4 outline-none tabular-nums [-moz-appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
        />
      </div>

      {/* -1 / -10 */}
      <div className="flex gap-1">
        <Motion.button
          whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
          onClick={() => decrement(1)}
          className="text-white/60 hover:text-white p-1.5 rounded-full hover:bg-white/10 transition-colors"
        >
          <ChevronDown className="w-4 h-4" />
        </Motion.button>
        <Motion.button
          whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
          onClick={() => decrement(10)}
          className="text-white/60 hover:text-white p-1.5 rounded-full hover:bg-white/10 transition-colors"
        >
          <ChevronsDown className="w-4 h-4" />
        </Motion.button>
      </div>

      <span className="text-white/50 text-xs uppercase tracking-wider font-medium">{label}</span>
    </div>
  );
}

export default function TimerSetup({ onStart }) {
  const fatigue = useFatigue();
  const [hours,   setHours]   = useState(0);
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [category, setCategory] = useState(DEFAULT_CATEGORY);

  const applyPreset = (mins) => {
    setHours(0);
    setMinutes(mins);
    setSeconds(0);
  };

  const handleStart = () => {
    const total = hours * 3600 + minutes * 60 + seconds;
    if (total > 0) onStart(total, category);
  };

  const hasValue = hours > 0 || minutes > 0 || seconds > 0;

  return (
    <div className="relative z-10 w-full max-w-4xl mx-4 py-8 overflow-y-auto max-h-screen">
      {/* Header */}
      <Motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <div className="inline-flex items-center gap-3 mb-2">
          <Clock className="w-7 h-7 text-white" />
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            沉浸式倒计时
          </h1>
        </div>
        <p className={`text-sm font-medium ${fatigue.colorClass}`}>
          {fatigue.emoji} {fatigue.greeting}，{fatigue.label} · 推荐 {fatigue.recommendedMinutes} 分钟
        </p>
        <p className="text-white/40 text-xs mt-1">{fatigue.message}</p>
      </Motion.div>

      {/* Category tabs */}
      <Motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mb-6"
      >
        <div className="bg-white/5 backdrop-blur-md rounded-3xl p-2 border border-white/10">
          <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
            {CATEGORIES.map((cat) => {
              const Icon = CATEGORY_ICONS[cat.key];
              const isSelected = cat.key === category;
              return (
                <Motion.button
                  key={cat.key}
                  onClick={() => setCategory(cat.key)}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className={`relative overflow-hidden rounded-2xl p-3 transition-all duration-300 ${
                    isSelected
                      ? `${cat.gradient} shadow-lg shadow-blue-500/30`
                      : 'bg-transparent hover:bg-white/5'
                  }`}
                >
                  <div className="flex flex-col items-center gap-1.5">
                    <Icon
                      className={`w-5 h-5 transition-all duration-300 ${isSelected ? 'text-white' : 'text-white/50'}`}
                      strokeWidth={isSelected ? 2 : 1.5}
                    />
                    <span className={`text-xs transition-all duration-300 ${isSelected ? 'text-white font-semibold' : 'text-white/50 font-medium'}`}>
                      {cat.label}
                    </span>
                  </div>
                  {isSelected && (
                    <Motion.div
                      layoutId="subject-highlight"
                      className="absolute inset-0 rounded-2xl border-2 border-white/30"
                      transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                </Motion.button>
              );
            })}
          </div>
        </div>
      </Motion.div>

      {/* Presets + Time input card */}
      <Motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mb-6"
      >
        <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-6 md:p-8 border border-white/10 shadow-2xl">
          <h2 className="text-white text-xl font-bold mb-5 text-center">设置倒计时</h2>

          {/* Quick presets */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {PRESETS.map((preset) => {
              const Icon = preset.icon;
              const isRec = preset.minutes === fatigue.recommendedMinutes;
              return (
                <Motion.button
                  key={preset.minutes}
                  onClick={() => applyPreset(preset.minutes)}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className={`relative bg-gradient-to-br ${preset.gradient} text-white px-5 py-3 rounded-2xl font-bold text-sm shadow-lg flex items-center gap-2 transition-all duration-300`}
                >
                  {isRec && (
                    <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 bg-white text-black text-[10px] font-bold px-2 py-0.5 rounded-full whitespace-nowrap">
                      推荐
                    </span>
                  )}
                  <Icon className="w-4 h-4" />
                  <span>{preset.label}</span>
                </Motion.button>
              );
            })}
          </div>

          {/* Time inputs */}
          <div className="flex justify-center items-center gap-4 md:gap-6">
            <TimeInput value={hours}   onChange={setHours}   max={999} label="小时" />
            <div className="text-white/30 text-4xl font-bold mb-14">:</div>
            <TimeInput value={minutes} onChange={setMinutes} max={59}  label="分钟" />
            <div className="text-white/30 text-4xl font-bold mb-14">:</div>
            <TimeInput value={seconds} onChange={setSeconds} max={59}  label="秒"  />
          </div>
        </div>
      </Motion.div>

      {/* Start button */}
      <Motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="flex justify-center"
      >
        <Motion.button
          whileHover={hasValue ? { scale: 1.05 } : {}}
          whileTap={hasValue ? { scale: 0.95 } : {}}
          onClick={handleStart}
          disabled={!hasValue}
          className="relative overflow-hidden bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 disabled:from-white/10 disabled:to-white/10 text-white disabled:text-white/30 px-12 py-5 rounded-full text-xl font-semibold shadow-2xl shadow-blue-500/30 disabled:shadow-none transition-all duration-300"
        >
          <div className="flex items-center gap-3">
            <Play className="w-6 h-6 fill-current" />
            <span>开启专注时光</span>
          </div>
          {hasValue && (
            <Motion.div
              className="absolute inset-0 bg-white/20"
              initial={{ x: '-100%' }}
              whileHover={{ x: '100%' }}
              transition={{ duration: 0.5 }}
            />
          )}
        </Motion.button>
      </Motion.div>
    </div>
  );
}

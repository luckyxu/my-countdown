import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, Square, RotateCcw, BellRing, Settings2 } from 'lucide-react';

export default function App() {
  // 状态管理
  const [hours, setHours] = useState('');
  const [minutes, setMinutes] = useState('');
  const [seconds, setSeconds] = useState('');
  const [remainingTime, setRemainingTime] = useState(0); // 剩余时间（秒）
  const [isActive, setIsActive] = useState(false); // 是否正在倒计时
  const [isPaused, setIsPaused] = useState(false); // 是否暂停
  const [isFinished, setIsFinished] = useState(false); // 是否结束

  // 引用，用于处理音频或其他副作用
  const timerRef = useRef(null);

  // 处理输入变化，确保在合法范围内
  const handleInputChange = (setter, maxLimit) => (e) => {
    let value = e.target.value;
    // 移除非数字字符
    value = value.replace(/\D/g, '');
    
    if (value === '') {
      setter('');
      return;
    }

    const numValue = parseInt(value, 10);
    if (numValue > maxLimit) {
      setter(maxLimit.toString());
    } else {
      setter(numValue.toString());
    }
  };

  // 开始倒计时
  const handleStart = () => {
    const h = parseInt(hours || '0', 10);
    const m = parseInt(minutes || '0', 10);
    const s = parseInt(seconds || '0', 10);

    const totalSeconds = h * 3600 + m * 60 + s;

    if (totalSeconds > 0) {
      setRemainingTime(totalSeconds);
      setIsActive(true);
      setIsPaused(false);
      setIsFinished(false);
    }
  };

  // 暂停
  const handlePause = () => {
    setIsPaused(true);
    setIsActive(false);
  };

  // 继续
  const handleResume = () => {
    setIsPaused(false);
    setIsActive(true);
  };

  // 重置
  const handleReset = () => {
    setIsActive(false);
    setIsPaused(false);
    setRemainingTime(0);
    setIsFinished(false);
  };

  // 返回设置界面
  const handleBackToSetup = () => {
    handleReset();
  };

  // 倒计时核心逻辑
  useEffect(() => {
    if (isActive && remainingTime > 0) {
      timerRef.current = setInterval(() => {
        setRemainingTime((prev) => prev - 1);
      }, 1000);
    } else if (isActive && remainingTime === 0) {
      // 倒计时结束
      setIsActive(false);
      setIsFinished(true);
      clearInterval(timerRef.current);
    }

    return () => clearInterval(timerRef.current);
  }, [isActive, remainingTime]);

  // 格式化显示时间
  const formatTime = (timeInSeconds) => {
    const h = Math.floor(timeInSeconds / 3600);
    const m = Math.floor((timeInSeconds % 3600) / 60);
    const s = timeInSeconds % 60;

    return {
      h: h.toString().padStart(2, '0'),
      m: m.toString().padStart(2, '0'),
      s: s.toString().padStart(2, '0'),
    };
  };

  const displayTime = formatTime(remainingTime);

  return (
    <div 
      className="min-h-screen w-full relative flex items-center justify-center font-sans overflow-hidden"
      style={{
        backgroundImage: "url('https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=2560&q=80')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* 全局暗色遮罩，保证文字可读性，在倒计时运行时减弱模糊感以突出风景 */}
      <div className={`absolute inset-0 transition-all duration-1000 ${isActive ? 'bg-black/30 backdrop-blur-sm' : 'bg-black/40 backdrop-blur-md'}`}></div>

      {/* 倒计时结束提示弹窗 (全屏效果) */}
      {isFinished && (
        <div className="absolute inset-0 bg-black/80 backdrop-blur-lg z-50 flex flex-col items-center justify-center p-6 text-center animate-in fade-in duration-500">
          <div className="w-32 h-32 bg-white/10 rounded-full flex items-center justify-center mb-8 animate-[bounce_2s_infinite]">
            <BellRing className="w-16 h-16 text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]" />
          </div>
          <h2 className="text-6xl md:text-8xl font-bold text-white mb-6 drop-shadow-2xl tracking-wider">时间到！</h2>
          <p className="text-xl md:text-2xl text-white/80 mb-12 font-light tracking-wide">您设定的倒计时已完美结束</p>
          <button
            onClick={handleReset}
            className="px-12 py-5 bg-white/20 hover:bg-white/30 backdrop-blur-md border border-white/30 text-white rounded-full text-xl font-medium transition-all hover:scale-105 hover:shadow-[0_0_30px_rgba(255,255,255,0.2)]"
          >
            重新开始
          </button>
        </div>
      )}

      {/* 核心内容区 */}
      {!isActive && !isPaused && remainingTime === 0 ? (
        // --- 设置界面 (沉浸式玻璃拟态大卡片) ---
        <div className="relative z-10 w-full max-w-4xl p-8 md:p-12 bg-black/30 backdrop-blur-xl border border-white/20 rounded-[3rem] shadow-[0_0_50px_rgba(0,0,0,0.5)] mx-4 animate-in slide-in-from-bottom-8 duration-700">
          <h1 className="text-3xl md:text-4xl font-light text-center mb-12 flex items-center justify-center gap-3 text-white tracking-wide">
            <Settings2 className="w-8 h-8 text-white/80" />
            沉浸式倒计时
          </h1>

          <div className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-10 mb-12">
            {/* 小时输入 */}
            <div className="flex flex-col items-center flex-1 w-full">
              <input
                type="text"
                inputMode="numeric"
                value={hours}
                onChange={handleInputChange(setHours, 999)}
                placeholder="00"
                className="w-full bg-white/5 text-center text-6xl md:text-7xl font-mono py-8 rounded-3xl border border-white/10 focus:border-white/50 focus:bg-white/10 outline-none transition-all text-white placeholder:text-white/20 shadow-inner"
              />
              <label className="text-sm md:text-base text-white/60 mt-4 font-medium tracking-widest uppercase">Hours (0-999)</label>
            </div>
            <span className="text-6xl font-light text-white/30 hidden md:block pb-10">:</span>
            
            {/* 分钟输入 */}
            <div className="flex flex-col items-center flex-1 w-full">
              <input
                type="text"
                inputMode="numeric"
                value={minutes}
                onChange={handleInputChange(setMinutes, 59)}
                placeholder="00"
                className="w-full bg-white/5 text-center text-6xl md:text-7xl font-mono py-8 rounded-3xl border border-white/10 focus:border-white/50 focus:bg-white/10 outline-none transition-all text-white placeholder:text-white/20 shadow-inner"
              />
              <label className="text-sm md:text-base text-white/60 mt-4 font-medium tracking-widest uppercase">Minutes (0-59)</label>
            </div>
            <span className="text-6xl font-light text-white/30 hidden md:block pb-10">:</span>

            {/* 秒数输入 */}
            <div className="flex flex-col items-center flex-1 w-full">
              <input
                type="text"
                inputMode="numeric"
                value={seconds}
                onChange={handleInputChange(setSeconds, 59)}
                placeholder="00"
                className="w-full bg-white/5 text-center text-6xl md:text-7xl font-mono py-8 rounded-3xl border border-white/10 focus:border-white/50 focus:bg-white/10 outline-none transition-all text-white placeholder:text-white/20 shadow-inner"
              />
              <label className="text-sm md:text-base text-white/60 mt-4 font-medium tracking-widest uppercase">Seconds (0-59)</label>
            </div>
          </div>

          <button
            onClick={handleStart}
            disabled={!hours && !minutes && !seconds}
            className="w-full py-6 bg-white text-black disabled:bg-white/10 disabled:text-white/30 rounded-full font-bold text-xl md:text-2xl transition-all flex items-center justify-center gap-3 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(255,255,255,0.4)] disabled:hover:scale-100 disabled:shadow-none"
          >
            <Play className="w-7 h-7" fill="currentColor" />
            开启专注时光
          </button>
        </div>
      ) : (
        // --- 运行/暂停界面 (去除了边框，全屏超大字展示) ---
        <div className="relative z-10 flex flex-col items-center justify-center w-full h-full p-4 animate-in zoom-in-95 duration-500">
          
          {/* 倒计时数字展示 - 使用 vw 动态适应全屏宽度 */}
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

          {/* 控制按钮组 - 底部悬浮效果 */}
          <div className="flex items-center justify-center gap-4 md:gap-12 w-full max-w-3xl px-4">
            {isActive ? (
              <button
                onClick={handlePause}
                className="flex-1 py-5 md:py-6 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white rounded-[2rem] border border-white/20 font-medium text-lg md:text-xl transition-all flex items-center justify-center gap-3 hover:scale-105"
              >
                <Pause className="w-6 h-6 md:w-8 md:h-8" fill="currentColor" />
                暂停
              </button>
            ) : (
              <button
                onClick={handleResume}
                className="flex-1 py-5 md:py-6 bg-white text-black rounded-[2rem] font-bold text-lg md:text-xl transition-all flex items-center justify-center gap-3 hover:scale-105 shadow-[0_0_30px_rgba(255,255,255,0.3)]"
              >
                <Play className="w-6 h-6 md:w-8 md:h-8" fill="currentColor" />
                继续
              </button>
            )}
            
            <button
              onClick={handleBackToSetup}
              className="w-20 md:w-28 h-20 md:h-24 bg-white/5 hover:bg-white/10 backdrop-blur-md text-white/70 hover:text-white rounded-[2rem] border border-white/10 transition-all flex items-center justify-center hover:scale-105 hover:bg-red-500/20 hover:border-red-500/50 hover:text-red-400 shrink-0 group"
              title="停止并重置"
            >
              <Square className="w-8 h-8 md:w-10 md:h-10 transition-transform group-hover:scale-90" fill="currentColor" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

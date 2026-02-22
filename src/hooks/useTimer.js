import { useState, useEffect, useRef } from 'react';

export function useTimer() {
  const [remainingTime, setRemainingTime] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [plannedDuration, setPlannedDuration] = useState(0);

  const timerRef = useRef(null);
  // Keeps a ref in sync so the interval callback can read the latest remaining time
  // without creating a stale closure. Updated inside an effect (not during render).
  const remainingRef = useRef(0);

  useEffect(() => {
    remainingRef.current = remainingTime;
  }, [remainingTime]);

  useEffect(() => {
    if (!isActive) return;

    timerRef.current = setInterval(() => {
      // Read latest value from ref to avoid stale closure
      const next = Math.max(0, remainingRef.current - 1);
      setRemainingTime(next);
      if (next === 0) {
        clearInterval(timerRef.current);
        // setState is inside the interval callback, not directly in the effect body
        setIsActive(false);
        setIsFinished(true);
      }
    }, 1000);

    return () => clearInterval(timerRef.current);
  }, [isActive]);

  const start = (totalSeconds) => {
    if (totalSeconds > 0) {
      setPlannedDuration(totalSeconds);
      setRemainingTime(totalSeconds);
      setIsActive(true);
      setIsPaused(false);
      setIsFinished(false);
    }
  };

  const pause = () => {
    setIsPaused(true);
    setIsActive(false);
  };

  const resume = () => {
    setIsPaused(false);
    setIsActive(true);
  };

  const reset = () => {
    clearInterval(timerRef.current);
    setIsActive(false);
    setIsPaused(false);
    setRemainingTime(0);
    setIsFinished(false);
    setPlannedDuration(0);
  };

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

  const elapsed = plannedDuration - remainingTime;
  const progress = plannedDuration > 0 ? elapsed / plannedDuration : 0;

  return {
    remainingTime,
    isActive,
    isPaused,
    isFinished,
    plannedDuration,
    elapsed,
    progress,
    displayTime: formatTime(remainingTime),
    start,
    pause,
    resume,
    reset,
  };
}

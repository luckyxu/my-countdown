import React from 'react';
import { CATEGORIES } from '../data/categories';
import { toDateKey, totalSecondsForDate, computeStreak } from '../hooks/useSessions';

function formatMinutes(seconds) {
  const m = Math.round(seconds / 60);
  if (m >= 60) return `${(m / 60).toFixed(1)}h`;
  return `${m}m`;
}

function getLast7Days() {
  const days = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date(Date.now() - i * 86400000);
    days.push(toDateKey(d.toISOString()));
  }
  return days;
}

export default function StatsDashboard({ sessions }) {
  const todayKey = toDateKey(new Date().toISOString());
  const todaySeconds = totalSecondsForDate(sessions, todayKey);
  const streak = computeStreak(sessions);

  const last7 = getLast7Days();
  const weekData = last7.map((key) => ({
    key,
    seconds: totalSecondsForDate(sessions, key),
    label: new Date(key + 'T00:00:00').getDate() + '日',
  }));
  const maxWeek = Math.max(...weekData.map((d) => d.seconds), 1);

  // Category breakdown (completed sessions only)
  const completed = sessions.filter((s) => s.completed);
  const totalCompleted = completed.reduce((sum, s) => sum + s.actualDuration, 0);
  const catStats = CATEGORIES.map((cat) => {
    const catTotal = completed
      .filter((s) => s.category === cat.key)
      .reduce((sum, s) => sum + s.actualDuration, 0);
    return { ...cat, total: catTotal, pct: totalCompleted > 0 ? catTotal / totalCompleted : 0 };
  })
    .filter((c) => c.total > 0)
    .sort((a, b) => b.total - a.total);

  return (
    <div className="w-full max-w-2xl flex flex-col gap-4 pb-24 pt-4">
      {/* Hero numbers */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 text-center shadow-xl">
          <p className="text-white/60 text-xs mb-2">今日专注</p>
          <p className="text-4xl font-bold text-white">{formatMinutes(todaySeconds)}</p>
        </div>
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 text-center shadow-xl">
          <p className="text-white/60 text-xs mb-2">连续打卡</p>
          <p className="text-4xl font-bold text-white">
            {streak}<span className="text-lg font-normal text-white/60 ml-1">天</span>
          </p>
        </div>
      </div>

      {/* Weekly bar chart */}
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-xl">
        <p className="text-white/70 text-sm font-medium mb-5">本周专注时长</p>
        <div className="flex items-end justify-between gap-2 h-28">
          {weekData.map((d) => {
            const heightPct = (d.seconds / maxWeek) * 100;
            const isToday = d.key === todayKey;
            return (
              <div key={d.key} className="flex flex-col items-center flex-1 gap-2">
                <div className="flex-1 w-full flex items-end">
                  <div
                    className={`w-full rounded-t-lg transition-all ${isToday ? 'bg-white' : 'bg-white/30'}`}
                    style={{ height: d.seconds > 0 ? `${Math.max(heightPct, 4)}%` : '2px' }}
                  />
                </div>
                <span className={`text-xs ${isToday ? 'text-white font-bold' : 'text-white/40'}`}>{d.label}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Category distribution */}
      {catStats.length > 0 ? (
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-xl">
          <p className="text-white/70 text-sm font-medium mb-5">科目分布</p>
          <div className="flex flex-col gap-4">
            {catStats.map((cat) => (
              <div key={cat.key}>
                <div className="flex justify-between items-center mb-1.5">
                  <span className="text-white/80 text-sm flex items-center gap-2">
                    <span>{cat.emoji}</span>{cat.label}
                  </span>
                  <span className="text-white/50 text-xs">{formatMinutes(cat.total)}</span>
                </div>
                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${cat.barClass} rounded-full transition-all`}
                    style={{ width: `${cat.pct * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <span className="text-6xl mb-4">📊</span>
          <p className="text-white/60 text-lg mb-2">暂无统计数据</p>
          <p className="text-white/40 text-sm">完成专注后，数据将显示在这里</p>
        </div>
      )}
    </div>
  );
}

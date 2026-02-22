import React from 'react';
import { Trash2 } from 'lucide-react';
import { CATEGORIES, CATEGORY_MAP } from '../data/categories';
import { groupSessionsByDate, totalSecondsForDate, toDateKey } from '../hooks/useSessions';

function formatDuration(s) {
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const sec = s % 60;
  if (h > 0) return `${h}h ${m > 0 ? m + 'm' : ''}`.trim();
  if (m > 0) return `${m}m ${sec > 0 ? sec + 's' : ''}`.trim();
  return `${sec}s`;
}

function formatDateHeader(dateKey) {
  const today = toDateKey(new Date().toISOString());
  const yesterday = toDateKey(new Date(Date.now() - 86400000).toISOString());
  if (dateKey === today) return '今天';
  if (dateKey === yesterday) return '昨天';
  const d = new Date(dateKey + 'T00:00:00');
  const weekdays = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
  return `${d.getMonth() + 1}月${d.getDate()}日 ${weekdays[d.getDay()]}`;
}

function formatTime(isoString) {
  const d = new Date(isoString);
  return `${d.getHours().toString().padStart(2, '0')}:${d.getMinutes().toString().padStart(2, '0')}`;
}

export default function SessionHistory({ sessions, onDelete }) {
  const todayKey = toDateKey(new Date().toISOString());
  const todaySeconds = totalSecondsForDate(sessions, todayKey);
  const groups = groupSessionsByDate(sessions);
  const dateKeys = Object.keys(groups).sort((a, b) => b.localeCompare(a));

  const todayHours = Math.floor(todaySeconds / 3600);
  const todayMins = Math.floor((todaySeconds % 3600) / 60);

  return (
    <div className="w-full max-w-2xl flex flex-col gap-4 pb-24 pt-4">
      {/* Today summary */}
      <div className="bg-black/30 backdrop-blur-xl border border-white/20 rounded-3xl p-6 text-center">
        <p className="text-white/60 text-sm mb-1">今日累计专注</p>
        <p className="text-5xl font-bold text-white">
          {todayHours > 0 ? `${todayHours}h ` : ''}{todayMins}m
        </p>
      </div>

      {dateKeys.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <span className="text-6xl mb-4">📖</span>
          <p className="text-white/60 text-lg mb-2">还没有专注记录</p>
          <p className="text-white/40 text-sm">完成第一次专注后，记录将出现在这里</p>
        </div>
      ) : (
        dateKeys.map((dateKey) => (
          <div key={dateKey}>
            <div className="flex items-center justify-between mb-2 px-1">
              <span className="text-white/70 text-sm font-medium">{formatDateHeader(dateKey)}</span>
              <span className="text-white/40 text-xs">{formatDuration(totalSecondsForDate(sessions, dateKey))}</span>
            </div>
            <div className="bg-black/30 backdrop-blur-xl border border-white/20 rounded-3xl overflow-hidden">
              {groups[dateKey].map((session, i) => {
                const cat = CATEGORY_MAP[session.category] || CATEGORIES[0];
                return (
                  <div
                    key={session.id}
                    className={`flex items-center gap-4 px-5 py-4 group hover:bg-white/5 transition-colors ${i > 0 ? 'border-t border-white/5' : ''}`}
                  >
                    <span className="text-2xl">{cat.emoji}</span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-white font-medium">{cat.label}</span>
                        {session.completed ? (
                          <span className="text-[10px] bg-green-500/20 text-green-400 border border-green-500/30 px-2 py-0.5 rounded-full">完成</span>
                        ) : (
                          <span className="text-[10px] bg-orange-500/20 text-orange-400 border border-orange-500/30 px-2 py-0.5 rounded-full">中断</span>
                        )}
                      </div>
                      <div className="text-white/40 text-xs mt-0.5">{formatTime(session.startTime)}</div>
                    </div>
                    <span className="text-white/60 text-sm font-mono">{formatDuration(session.actualDuration)}</span>
                    <button
                      onClick={() => onDelete(session.id)}
                      className="opacity-0 group-hover:opacity-100 transition-opacity text-white/30 hover:text-red-400 ml-1"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        ))
      )}
    </div>
  );
}

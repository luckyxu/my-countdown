import { useState } from 'react';

const STORAGE_KEY = 'focus_sessions_v1';

export function loadSessions() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveSessions(sessions) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(sessions));
}

export function toDateKey(isoString) {
  // Works with both Date.toISOString() and plain date strings
  return isoString.slice(0, 10);
}

export function groupSessionsByDate(sessions) {
  const groups = {};
  [...sessions]
    .sort((a, b) => b.startTime.localeCompare(a.startTime))
    .forEach((s) => {
      const key = toDateKey(s.startTime);
      if (!groups[key]) groups[key] = [];
      groups[key].push(s);
    });
  return groups;
}

export function totalSecondsForDate(sessions, dateKey) {
  return sessions
    .filter((s) => s.completed && toDateKey(s.startTime) === dateKey)
    .reduce((sum, s) => sum + s.actualDuration, 0);
}

export function computeStreak(sessions) {
  let streak = 0;
  const d = new Date();
  while (true) {
    const key = toDateKey(d.toISOString());
    const hasCompleted = sessions.some((s) => s.completed && toDateKey(s.startTime) === key);
    if (!hasCompleted) break;
    streak++;
    d.setDate(d.getDate() - 1);
  }
  return streak;
}

export function useSessions() {
  const [sessions, setSessions] = useState(() => loadSessions());

  const addSession = (session) => {
    setSessions((prev) => {
      const updated = [...prev, session];
      saveSessions(updated);
      return updated;
    });
  };

  const deleteSession = (id) => {
    setSessions((prev) => {
      const updated = prev.filter((s) => s.id !== id);
      saveSessions(updated);
      return updated;
    });
  };

  return { sessions, addSession, deleteSession };
}

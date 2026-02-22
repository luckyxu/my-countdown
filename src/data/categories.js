export const CATEGORIES = [
  { key: 'chinese',   label: '语文', emoji: '📖', gradient: 'bg-gradient-to-br from-red-500 to-pink-500',    bgClass: 'bg-red-500/40',    barClass: 'bg-red-400'    },
  { key: 'math',      label: '数学', emoji: '📐', gradient: 'bg-gradient-to-br from-blue-500 to-indigo-500',   bgClass: 'bg-blue-500/40',   barClass: 'bg-blue-400'   },
  { key: 'english',   label: '英语', emoji: '🌏', gradient: 'bg-gradient-to-br from-green-500 to-emerald-500',  bgClass: 'bg-green-500/40',  barClass: 'bg-green-400'  },
  { key: 'physics',   label: '物理', emoji: '⚛️', gradient: 'bg-gradient-to-br from-purple-500 to-violet-500', bgClass: 'bg-purple-500/40', barClass: 'bg-purple-400' },
  { key: 'chemistry', label: '化学', emoji: '🧪', gradient: 'bg-gradient-to-br from-teal-500 to-cyan-500',    bgClass: 'bg-yellow-500/40', barClass: 'bg-yellow-400' },
  { key: 'geography', label: '地理', emoji: '🌍', gradient: 'bg-gradient-to-br from-amber-500 to-orange-500',  bgClass: 'bg-teal-500/40',   barClass: 'bg-teal-400'   },
];

export const CATEGORY_MAP = Object.fromEntries(CATEGORIES.map((c) => [c.key, c]));

export const DEFAULT_CATEGORY = 'math';

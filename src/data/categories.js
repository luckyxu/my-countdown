export const CATEGORIES = [
  { key: 'chinese',   label: '语文', emoji: '📖', bgClass: 'bg-red-500/40',    barClass: 'bg-red-400'    },
  { key: 'math',      label: '数学', emoji: '📐', bgClass: 'bg-blue-500/40',   barClass: 'bg-blue-400'   },
  { key: 'english',   label: '英语', emoji: '🌏', bgClass: 'bg-green-500/40',  barClass: 'bg-green-400'  },
  { key: 'physics',   label: '物理', emoji: '⚛️', bgClass: 'bg-purple-500/40', barClass: 'bg-purple-400' },
  { key: 'chemistry', label: '化学', emoji: '🧪', bgClass: 'bg-yellow-500/40', barClass: 'bg-yellow-400' },
  { key: 'geography', label: '地理', emoji: '🌍', bgClass: 'bg-teal-500/40',   barClass: 'bg-teal-400'   },
];

export const CATEGORY_MAP = Object.fromEntries(CATEGORIES.map((c) => [c.key, c]));

export const DEFAULT_CATEGORY = 'math';

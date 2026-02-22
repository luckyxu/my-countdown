import React from 'react';
import { motion as Motion } from 'motion/react';
import { Timer, BookOpen, BarChart2 } from 'lucide-react';

const TABS = [
  { key: 'timer',   label: '专注', Icon: Timer    },
  { key: 'history', label: '记录', Icon: BookOpen },
  { key: 'stats',   label: '统计', Icon: BarChart2 },
];

export default function BottomNav({ activeTab, onTabChange }) {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 flex justify-around items-center px-6 py-3 bg-white/5 backdrop-blur-xl border-t border-white/10">
      {TABS.map((tab) => {
        const isActive = activeTab === tab.key;
        const TabIcon = tab.Icon;
        return (
          <Motion.button
            key={tab.key}
            onClick={() => onTabChange(tab.key)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`flex flex-col items-center gap-1 px-6 py-2 rounded-2xl transition-all ${
              isActive
                ? 'bg-gradient-to-br from-blue-500/30 to-purple-500/30 border border-white/20 text-white'
                : 'text-white/50 hover:text-white/80'
            }`}
          >
            <TabIcon className="w-5 h-5" />
            <span className="text-xs font-medium tracking-wide">{tab.label}</span>
          </Motion.button>
        );
      })}
    </div>
  );
}

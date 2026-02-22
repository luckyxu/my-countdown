import { motion } from 'motion/react';

interface PresetButtonProps {
  duration: number;
  label: string;
  description: string;
  badge?: string;
  isSelected: boolean;
  onClick: () => void;
}

export function PresetButton({ duration, label, description, badge, isSelected, onClick }: PresetButtonProps) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.98 }}
      className={`relative overflow-hidden rounded-2xl p-6 transition-all duration-300 ${
        isSelected
          ? 'bg-gradient-to-br from-blue-500/30 to-purple-500/30 border-2 border-white/30 shadow-xl'
          : 'bg-white/5 backdrop-blur-md border border-white/10 hover:bg-white/10 hover:border-white/20'
      }`}
    >
      {badge && (
        <div className="absolute -top-1 -right-1">
          <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs px-3 py-1 rounded-full shadow-lg">
            {badge}
          </div>
        </div>
      )}
      <div className="text-center space-y-2">
        <div className="text-4xl font-bold text-white">{duration}</div>
        <div className="text-sm text-white/60">分钟</div>
        <div className="text-white/90 font-medium">{label}</div>
        <div className="text-xs text-white/50">{description}</div>
      </div>
    </motion.button>
  );
}

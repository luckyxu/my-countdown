import { motion } from 'motion/react';
import { Clock, Coffee, GraduationCap, Flame } from 'lucide-react';

interface QuickPresetProps {
  presets: Array<{ duration: number; label: string }>;
  onSelect: (duration: number) => void;
}

const presetIcons = [Coffee, GraduationCap, Flame];
const presetGradients = [
  'from-rose-500 to-pink-500',
  'from-blue-500 to-cyan-500',
  'from-purple-500 to-fuchsia-500',
];

export function QuickPreset({ presets, onSelect }: QuickPresetProps) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-4">
      {presets.map((preset, index) => {
        const Icon = presetIcons[index] || Clock;
        const gradient = presetGradients[index] || 'from-gray-500 to-gray-600';
        
        return (
          <motion.button
            key={preset.duration}
            onClick={() => onSelect(preset.duration)}
            whileHover={{ scale: 1.08, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className={`bg-gradient-to-br ${gradient} text-white px-6 py-4 rounded-2xl font-bold text-base transition-all duration-300 shadow-lg hover:shadow-2xl flex items-center gap-3 min-w-[160px]`}
            style={{
              boxShadow: `0 8px 32px -8px rgba(${index === 0 ? '244, 63, 94' : index === 1 ? '59, 130, 246' : '168, 85, 247'}, 0.4)`
            }}
          >
            <Icon className="w-5 h-5" />
            <span>{preset.label}</span>
          </motion.button>
        );
      })}
    </div>
  );
}
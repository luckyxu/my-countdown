import { motion } from 'motion/react';
import { LucideIcon } from 'lucide-react';

interface SubjectButtonProps {
  icon: LucideIcon;
  label: string;
  isSelected: boolean;
  onClick: () => void;
  gradient: string;
}

export function SubjectButton({ icon: Icon, label, isSelected, onClick, gradient }: SubjectButtonProps) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.05, y: -4 }}
      whileTap={{ scale: 0.95 }}
      className={`relative overflow-hidden rounded-2xl p-6 transition-all duration-300 ${
        isSelected 
          ? `${gradient} shadow-lg shadow-blue-500/50` 
          : 'bg-white/10 backdrop-blur-md hover:bg-white/20'
      }`}
    >
      <div className="flex flex-col items-center gap-3">
        <Icon className="w-8 h-8 text-white" strokeWidth={1.5} />
        <span className="text-white font-medium">{label}</span>
      </div>
      {isSelected && (
        <motion.div
          layoutId="subject-indicator"
          className="absolute inset-0 border-2 border-white/50 rounded-2xl"
          transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
        />
      )}
    </motion.button>
  );
}

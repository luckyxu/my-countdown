import { motion } from 'motion/react';
import { LucideIcon } from 'lucide-react';

interface Subject {
  id: string;
  icon: LucideIcon;
  label: string;
  gradient: string;
}

interface SubjectTabsProps {
  subjects: Subject[];
  selectedSubject: string;
  onSelect: (id: string) => void;
}

export function SubjectTabs({ subjects, selectedSubject, onSelect }: SubjectTabsProps) {
  return (
    <div className="bg-white/5 backdrop-blur-md rounded-3xl p-2 border border-white/10">
      <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
        {subjects.map((subject) => {
          const Icon = subject.icon;
          const isSelected = subject.id === selectedSubject;
          
          return (
            <motion.button
              key={subject.id}
              onClick={() => onSelect(subject.id)}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className={`relative overflow-hidden rounded-2xl p-4 transition-all duration-300 ${
                isSelected
                  ? `${subject.gradient} shadow-lg shadow-blue-500/30`
                  : 'bg-transparent hover:bg-white/5'
              }`}
            >
              <div className="flex flex-col items-center gap-2">
                <Icon 
                  className={`w-6 h-6 transition-all duration-300 ${
                    isSelected ? 'text-white' : 'text-white/50'
                  }`} 
                  strokeWidth={isSelected ? 2 : 1.5} 
                />
                <span 
                  className={`text-sm transition-all duration-300 ${
                    isSelected ? 'text-white font-semibold' : 'text-white/50 font-medium'
                  }`}
                >
                  {subject.label}
                </span>
              </div>
              
              {isSelected && (
                <motion.div
                  layoutId="subject-highlight"
                  className="absolute inset-0 rounded-2xl border-2 border-white/30"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}

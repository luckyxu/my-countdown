import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, LucideIcon } from 'lucide-react';

interface Subject {
  id: string;
  icon: LucideIcon;
  label: string;
  gradient: string;
}

interface SubjectSelectorProps {
  subjects: Subject[];
  selectedSubject: string;
  onSelect: (id: string) => void;
}

export function SubjectSelector({ subjects, selectedSubject, onSelect }: SubjectSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const selected = subjects.find(s => s.id === selectedSubject) || subjects[0];
  const SelectedIcon = selected.icon;

  return (
    <div className="relative">
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={`w-full ${selected.gradient} rounded-2xl p-6 shadow-xl transition-all duration-300`}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="bg-white/20 backdrop-blur-md rounded-xl p-3">
              <SelectedIcon className="w-8 h-8 text-white" strokeWidth={1.5} />
            </div>
            <div className="text-left">
              <div className="text-white/70 text-sm">当前科目</div>
              <div className="text-white text-2xl font-bold">{selected.label}</div>
            </div>
          </div>
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <ChevronDown className="w-6 h-6 text-white" />
          </motion.div>
        </div>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-40"
            />
            
            {/* Dropdown */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="absolute top-full left-0 right-0 mt-4 z-50 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-2 shadow-2xl"
            >
              <div className="grid grid-cols-1 gap-2">
                {subjects.map((subject) => {
                  const Icon = subject.icon;
                  const isSelected = subject.id === selectedSubject;
                  
                  return (
                    <motion.button
                      key={subject.id}
                      onClick={() => {
                        onSelect(subject.id);
                        setIsOpen(false);
                      }}
                      whileHover={{ scale: 1.02, x: 4 }}
                      whileTap={{ scale: 0.98 }}
                      className={`flex items-center gap-4 p-4 rounded-xl transition-all duration-300 ${
                        isSelected
                          ? `${subject.gradient} shadow-lg`
                          : 'hover:bg-white/10'
                      }`}
                    >
                      <div className={`rounded-lg p-2 ${isSelected ? 'bg-white/20' : 'bg-white/10'}`}>
                        <Icon className="w-6 h-6 text-white" strokeWidth={1.5} />
                      </div>
                      <span className="text-white text-lg font-medium">{subject.label}</span>
                      {isSelected && (
                        <motion.div
                          layoutId="check"
                          className="ml-auto w-2 h-2 bg-white rounded-full"
                        />
                      )}
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

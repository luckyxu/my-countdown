import { useState } from 'react';
import { motion } from 'motion/react';
import { BookOpen, Calculator, Globe, Atom, Beaker, Map, Play, Clock } from 'lucide-react';
import { SubjectTabs } from './components/SubjectTabs';
import { QuickPreset } from './components/QuickPreset';
import { TimeInput } from './components/TimeInput';

const subjects = [
  { id: 'chinese', icon: BookOpen, label: '语文', gradient: 'bg-gradient-to-br from-red-500 to-pink-500' },
  { id: 'math', icon: Calculator, label: '数学', gradient: 'bg-gradient-to-br from-blue-500 to-indigo-500' },
  { id: 'english', icon: Globe, label: '英语', gradient: 'bg-gradient-to-br from-green-500 to-emerald-500' },
  { id: 'physics', icon: Atom, label: '物理', gradient: 'bg-gradient-to-br from-purple-500 to-violet-500' },
  { id: 'chemistry', icon: Beaker, label: '化学', gradient: 'bg-gradient-to-br from-teal-500 to-cyan-500' },
  { id: 'geography', icon: Map, label: '地理', gradient: 'bg-gradient-to-br from-amber-500 to-orange-500' },
];

const presets = [
  { duration: 25, label: '番茄钟 25分' },
  { duration: 45, label: '课堂 45分' },
  { duration: 90, label: '深度 90分' },
];

export default function App() {
  const [selectedSubject, setSelectedSubject] = useState('math');
  const [selectedPreset, setSelectedPreset] = useState(25);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);

  const handlePresetClick = (duration: number) => {
    setSelectedPreset(duration);
    setHours(0);
    setMinutes(duration);
    setSeconds(0);
  };

  return (
    <div className="size-full min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 overflow-auto">
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [90, 0, 90],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"
        />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-12 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-3 mb-4">
            <Clock className="w-8 h-8 text-white" />
            <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              沉浸式倒计时
            </h1>
          </div>
          <p className="text-white/60 text-lg">专注学习，高效成长</p>
        </motion.div>

        {/* Subject Selection */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-12 max-w-md mx-auto"
        >
          <SubjectTabs
            subjects={subjects}
            selectedSubject={selectedSubject}
            onSelect={setSelectedSubject}
          />
        </motion.div>

        {/* Quick Preset & Time Input Combined */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10 shadow-2xl">
            {/* Title */}
            <h2 className="text-white text-2xl font-bold mb-6 text-center">设置倒计时</h2>
            
            {/* Quick Presets */}
            <div className="mb-8">
              <QuickPreset
                presets={presets}
                onSelect={handlePresetClick}
              />
            </div>

            {/* Time Input */}
            <div className="flex justify-center items-center gap-8">
              <TimeInput
                value={hours}
                onChange={setHours}
                max={999}
                label="小时"
              />
              <div className="text-white/30 text-5xl font-bold mb-12">:</div>
              <TimeInput
                value={minutes}
                onChange={setMinutes}
                max={59}
                label="分钟"
              />
              <div className="text-white/30 text-5xl font-bold mb-12">:</div>
              <TimeInput
                value={seconds}
                onChange={setSeconds}
                max={59}
                label="秒"
              />
            </div>
          </div>
        </motion.div>

        {/* Start Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex justify-center"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group relative overflow-hidden bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-12 py-6 rounded-full text-xl font-semibold shadow-2xl shadow-blue-500/50 transition-all duration-300"
          >
            <div className="flex items-center gap-3">
              <Play className="w-6 h-6 fill-current" />
              <span>开启专注时光</span>
            </div>
            <motion.div
              className="absolute inset-0 bg-white/20"
              initial={{ x: '-100%' }}
              whileHover={{ x: '100%' }}
              transition={{ duration: 0.5 }}
            />
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}
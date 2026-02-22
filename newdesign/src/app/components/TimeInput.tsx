import { motion } from 'motion/react';
import { ChevronUp, ChevronDown, ChevronsUp, ChevronsDown } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

interface TimeInputProps {
  value: number;
  onChange: (value: number) => void;
  max: number;
  label: string;
}

export function TimeInput({ value, onChange, max, label }: TimeInputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const increment = (amount: number) => {
    const newValue = value + amount;
    onChange(newValue > max ? max : newValue);
  };

  const decrement = (amount: number) => {
    const newValue = value - amount;
    onChange(newValue < 0 ? 0 : newValue);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(e.target.value) || 0;
    onChange(newValue > max ? max : newValue < 0 ? 0 : newValue);
  };

  const handleInputClick = () => {
    inputRef.current?.select();
  };

  return (
    <div className="flex flex-col items-center gap-4">
      {/* +10 and +1 buttons */}
      <div className="flex gap-2">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => increment(10)}
          className="text-white/60 hover:text-white transition-colors p-2 rounded-full hover:bg-white/10"
        >
          <ChevronsUp className="w-5 h-5" />
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => increment(1)}
          className="text-white/60 hover:text-white transition-colors p-2 rounded-full hover:bg-white/10"
        >
          <ChevronUp className="w-5 h-5" />
        </motion.button>
      </div>

      {/* Input field */}
      <div 
        className={`bg-white/10 backdrop-blur-md rounded-2xl min-w-[140px] border-2 transition-all duration-300 ${
          isFocused ? 'border-blue-400 shadow-lg shadow-blue-500/30' : 'border-white/20'
        }`}
      >
        <input
          ref={inputRef}
          type="number"
          value={value.toString().padStart(2, '0')}
          onChange={handleInputChange}
          onClick={handleInputClick}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          min={0}
          max={max}
          className="w-full bg-transparent text-6xl font-bold text-white text-center p-6 outline-none tabular-nums [-moz-appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
        />
      </div>

      {/* -1 and -10 buttons */}
      <div className="flex gap-2">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => decrement(1)}
          className="text-white/60 hover:text-white transition-colors p-2 rounded-full hover:bg-white/10"
        >
          <ChevronDown className="w-5 h-5" />
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => decrement(10)}
          className="text-white/60 hover:text-white transition-colors p-2 rounded-full hover:bg-white/10"
        >
          <ChevronsDown className="w-5 h-5" />
        </motion.button>
      </div>

      <div className="text-white/50 text-sm uppercase tracking-wider font-medium mt-1">
        {label}
      </div>
    </div>
  );
}
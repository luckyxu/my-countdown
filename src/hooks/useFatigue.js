import { useState, useEffect } from 'react';

function getFatigueInfo(date) {
  const h = date.getHours() + date.getMinutes() / 60;
  let level, label, emoji, colorClass, recommendedMinutes, message;

  if (h >= 9 && h < 11.5) {
    level = 'peak'; label = '高效期'; emoji = '🔥';
    colorClass = 'text-orange-300'; recommendedMinutes = 90;
    message = '现在是您的黄金专注时间，适合挑战高难度任务！';
  } else if (h >= 14 && h < 17) {
    level = 'good'; label = '较好'; emoji = '⚡';
    colorClass = 'text-yellow-300'; recommendedMinutes = 45;
    message = '下午精力充沛，适合稳步推进学习计划。';
  } else if (h >= 7 && h < 9) {
    level = 'moderate'; label = '普通'; emoji = '🌤️';
    colorClass = 'text-blue-300'; recommendedMinutes = 25;
    message = '早晨刚启动，建议从轻松任务开始热身。';
  } else if (h >= 19 && h < 21) {
    level = 'moderate'; label = '普通'; emoji = '🌙';
    colorClass = 'text-indigo-300'; recommendedMinutes = 45;
    message = '晚间复习巩固效果不错，保持专注！';
  } else if (h >= 12 && h < 14) {
    level = 'low'; label = '低效期'; emoji = '😴';
    colorClass = 'text-gray-400'; recommendedMinutes = 25;
    message = '午后困意来袭，建议短暂休息后再开始。';
  } else if (h >= 22) {
    level = 'low'; label = '低效期'; emoji = '🌑';
    colorClass = 'text-gray-400'; recommendedMinutes = 25;
    message = '深夜学习效率有限，注意不要过度消耗精力。';
  } else if (h < 7) {
    level = 'low'; label = '低效期'; emoji = '💤';
    colorClass = 'text-gray-400'; recommendedMinutes = 25;
    message = '凌晨时分，建议保证充足睡眠以获得更好的学习效果。';
  } else {
    level = 'moderate'; label = '普通'; emoji = '☀️';
    colorClass = 'text-blue-300'; recommendedMinutes = 25;
    message = '保持稳定节奏，专注当下。';
  }

  const hour = date.getHours();
  let greeting;
  if (hour < 6)       greeting = '深夜好';
  else if (hour < 9)  greeting = '早上好';
  else if (hour < 12) greeting = '上午好';
  else if (hour < 14) greeting = '中午好';
  else if (hour < 18) greeting = '下午好';
  else if (hour < 22) greeting = '晚上好';
  else                greeting = '夜深了';

  return { level, label, emoji, colorClass, recommendedMinutes, message, greeting };
}

export function useFatigue() {
  const [info, setInfo] = useState(() => getFatigueInfo(new Date()));

  useEffect(() => {
    const id = setInterval(() => setInfo(getFatigueInfo(new Date())), 60000);
    return () => clearInterval(id);
  }, []);

  return info;
}

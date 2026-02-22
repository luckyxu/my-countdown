import React, { useState } from 'react';
import { useTimer } from './hooks/useTimer';
import { useSessions } from './hooks/useSessions';
import BottomNav from './components/BottomNav';
import TimerSetup from './components/TimerSetup';
import TimerRunning from './components/TimerRunning';
import TimerFinished from './components/TimerFinished';
import SessionHistory from './components/SessionHistory';
import StatsDashboard from './components/StatsDashboard';

export default function App() {
  const [activeTab, setActiveTab] = useState('timer');
  const [currentCategory, setCurrentCategory] = useState('other');
  const [sessionStartTime, setSessionStartTime] = useState(null);

  const timer = useTimer();
  const { sessions, addSession, deleteSession } = useSessions();

  const isTimerActive = timer.isActive || timer.isPaused;

  const handleStart = (totalSeconds, category) => {
    setCurrentCategory(category);
    setSessionStartTime(new Date().toISOString());
    setActiveTab('timer');
    timer.start(totalSeconds);
  };

  const saveSession = (completed) => {
    const actualDuration = completed
      ? timer.plannedDuration
      : timer.plannedDuration - timer.remainingTime;
    addSession({
      id: Date.now().toString(),
      category: currentCategory,
      plannedDuration: timer.plannedDuration,
      actualDuration,
      startTime: sessionStartTime || new Date().toISOString(),
      completed,
    });
  };

  const handleTimerAbort = () => {
    saveSession(false);
    timer.reset();
  };

  const handleTimerAgain = () => {
    saveSession(true);
    timer.reset();
    setActiveTab('timer');
  };

  const handleTimerRest = () => {
    saveSession(true);
    timer.reset();
    setActiveTab('timer');
  };

  const showBottomNav = !isTimerActive && !timer.isFinished;

  return (
    <div
      className="min-h-screen w-full relative flex items-center justify-center font-sans overflow-hidden"
      style={{
        backgroundImage: "url('https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=2560&q=80')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Backdrop overlay */}
      <div
        className={`absolute inset-0 transition-all duration-1000 ${
          timer.isActive ? 'bg-black/30 backdrop-blur-sm' : 'bg-black/40 backdrop-blur-md'
        }`}
      />

      {/* Finished overlay (covers everything) */}
      {timer.isFinished && (
        <TimerFinished
          category={currentCategory}
          plannedDuration={timer.plannedDuration}
          actualDuration={timer.plannedDuration}
          onAgain={handleTimerAgain}
          onRest={handleTimerRest}
        />
      )}

      {/* Timer tab */}
      {activeTab === 'timer' && !timer.isFinished && (
        <>
          {!isTimerActive ? (
            <TimerSetup onStart={handleStart} />
          ) : (
            <TimerRunning
              displayTime={timer.displayTime}
              isPaused={timer.isPaused}
              isActive={timer.isActive}
              progress={timer.progress}
              category={currentCategory}
              onPause={timer.pause}
              onResume={timer.resume}
              onStop={handleTimerAbort}
            />
          )}
        </>
      )}

      {/* History tab */}
      {activeTab === 'history' && !timer.isFinished && (
        <div className="absolute inset-0 z-10 overflow-y-auto">
          <div className="flex flex-col items-center px-4 pt-4">
            <SessionHistory sessions={sessions} onDelete={deleteSession} />
          </div>
        </div>
      )}

      {/* Stats tab */}
      {activeTab === 'stats' && !timer.isFinished && (
        <div className="absolute inset-0 z-10 overflow-y-auto">
          <div className="flex flex-col items-center px-4 pt-4">
            <StatsDashboard sessions={sessions} />
          </div>
        </div>
      )}

      {/* Bottom navigation */}
      {showBottomNav && (
        <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
      )}
    </div>
  );
}

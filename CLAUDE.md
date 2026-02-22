# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a React-based countdown timer application with an immersive, full-screen interface. The app features a scenic background with glassmorphism UI design, allowing users to set custom countdown timers (hours, minutes, seconds) with pause/resume functionality.

## Development Commands

```bash
# Start development server with HMR (Hot Module Replacement)
npm run dev

# Build for production
npm run build

# Run ESLint to check code quality
npm run lint

# Preview production build locally
npm run preview
```

## Tech Stack

- **Framework**: React 19 with Vite
- **Styling**: Tailwind CSS with custom glassmorphism/backdrop-blur effects
- **Icons**: lucide-react
- **Build Tool**: Vite (with Fast Refresh)
- **Linting**: ESLint with React Hooks and React Refresh plugins

## Architecture

### Single-Component Application

The entire application logic resides in `src/App.jsx`. This is a single-page countdown timer with three main states:

1. **Setup State** (`!isActive && !isPaused && remainingTime === 0`): User inputs hours, minutes, seconds
2. **Running/Paused State** (`isActive || isPaused`): Displays large countdown numbers with control buttons
3. **Finished State** (`isFinished`): Full-screen completion modal with bell icon animation

### State Management

All state is managed via React hooks in `App.jsx`:
- `hours`, `minutes`, `seconds`: Input values (strings to allow empty state)
- `remainingTime`: Total remaining seconds (number)
- `isActive`: Whether countdown is currently running
- `isPaused`: Whether countdown is paused
- `isFinished`: Whether countdown has completed
- `timerRef`: useRef for setInterval cleanup

### Key Implementation Details

- **Input Validation**: `handleInputChange` enforces max limits (hours: 999, minutes/seconds: 59) and strips non-numeric characters
- **Timer Logic**: useEffect with setInterval decrements `remainingTime` every second when `isActive` is true
- **Responsive Design**: Uses viewport width units (`vw`) for countdown display to ensure full-screen scaling
- **Background**: Fixed Unsplash image with dynamic backdrop-blur that reduces when timer is active to emphasize scenery

## Styling Approach

The app uses Tailwind CSS with extensive utility classes for:
- Glassmorphism effects (`backdrop-blur`, `bg-black/30`, `border-white/20`)
- Responsive design (`md:` breakpoints for mobile/desktop)
- Animations (`animate-in`, `animate-[pulse_1s_ease-in-out_infinite]`)
- Dynamic opacity based on state (e.g., reduced opacity when paused)

Content configuration in `tailwind.config.js` includes `index.html` and all files in `src/**/*.{js,ts,jsx,tsx}`.

## ESLint Configuration

Custom rule: `'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }]` allows uppercase-prefixed unused variables (common for React component imports).

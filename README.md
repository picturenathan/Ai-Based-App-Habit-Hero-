# LifeLevels 🎮

A gamified life-tracker mobile app built with **Expo SDK 54**, **Expo Router**, and **NativeWind**. Earn XP by completing real-life tasks across four categories — Chores, Fitness, Learning, and Self-care — and level up as you go.

---

## Screenshots

> Run the app locally to see it in action (see [Getting Started](#getting-started) below).

| Home | Tasks | Profile |
|------|-------|---------|
| Level badge, XP bar, today's tasks | All tasks with category filters | Stats grid and XP breakdown |

---

## Features

- **XP System** — Every completed task awards XP. Earn 1000 XP to reach the next level.
- **Home Screen** — Greeting header, current level badge, animated XP progress bar, and a curated list of today's featured tasks.
- **Tasks Screen** — Full task browser with filter pills (All / Chores / Fitness / Learning / Self-care). Tasks are grouped by category; completed tasks show strikethrough styling.
- **Profile Screen** — Avatar with initials, level/XP progress, a 2×2 stat grid (Tasks Done, Day Streak, Total XP, Levels Gained), and per-category XP breakdown bars.
- **Shared State** — Task completions are shared across all three screens via React Context, so checking a task anywhere is reflected everywhere instantly.
- **Bottom Tab Navigator** — Three tabs (Home, Tasks, Profile) managed by Expo Router.

---

## Tech Stack

| Technology | Version | Purpose |
|---|---|---|
| [Expo](https://expo.dev) | ~54.0.0 | Build toolchain and runtime |
| [Expo Router](https://expo.github.io/router) | ~4.0.0 | File-based navigation + bottom tabs |
| [React Native](https://reactnative.dev) | 0.76.5 | Core mobile framework |
| [NativeWind](https://www.nativewind.dev) | ^4.1.23 | Tailwind CSS utility classes for React Native |
| [Tailwind CSS](https://tailwindcss.com) | ^3.4.0 | Utility-first CSS (compiled by NativeWind) |
| [react-native-safe-area-context](https://github.com/th3rdwave/react-native-safe-area-context) | 4.12.0 | Safe area insets for notch/status bar |
| [react-native-screens](https://github.com/software-mansion/react-native-screens) | ~4.4.0 | Native screen containers |

---

## Project Structure

```
lifelevels/
├── app/
│   ├── _layout.jsx      # Root layout: bottom tab navigator + shared AppContext
│   ├── index.jsx        # Screen 1 — Home (greeting, XP bar, today's tasks)
│   ├── tasks.jsx        # Screen 2 — All Tasks (filters, grouped by category)
│   ├── profile.jsx      # Screen 3 — Profile (stats, XP breakdown)
│   └── data.js          # Shared task data, XP constants, and helper functions
├── app.json             # Expo app configuration
├── babel.config.js      # Babel config (NativeWind JSX transform)
├── metro.config.js      # Metro bundler config (NativeWind CSS input)
├── global.css           # Tailwind base/components/utilities import
├── tailwind.config.js   # Tailwind config (content paths + custom colors)
└── package.json         # Dependencies and npm scripts
```

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18 or newer
- [npm](https://www.npmjs.com/) v9 or newer (comes with Node)
- [Expo Go](https://expo.dev/go) app installed on your iOS or Android device **or** an emulator/simulator running locally

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/your-username/lifelevels.git
   cd lifelevels
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the development server**

   ```bash
   npx expo start
   ```

4. **Open on a device**

   - **Physical device** — Scan the QR code in the terminal with the Expo Go app.
   - **iOS Simulator** — Press `i` in the terminal (requires Xcode on macOS).
   - **Android Emulator** — Press `a` in the terminal (requires Android Studio).
   - **Web browser** — Press `w` in the terminal.

---

## XP & Levelling System

```
Total XP  =  sum of XP from all completed tasks
Level     =  Math.floor(totalXP / 1000) + 1
Level XP  =  totalXP % 1000          (progress within current level)
Progress  =  Level XP / 1000         (0.0 → 1.0 for the progress bar)
```

Each level requires exactly **1000 XP**. There is no level cap.

---

## Task Data

26 tasks spread across 4 categories. All data lives in `app/data.js`.

| Category | Colour | Tasks | XP Range |
|---|---|---|---|
| 🟡 Chores | Amber `#f59e0b` | 6 tasks | 15 – 35 XP |
| 🟢 Fitness | Green `#22c55e` | 6 tasks | 20 – 50 XP |
| 🔵 Learning | Blue `#3b82f6` | 5 tasks | 20 – 40 XP |
| 🩷 Self-care | Pink `#ec4899` | 5 tasks | 15 – 35 XP |

---

## State Management

State is intentionally simple — no Redux, no external store.

- A `Set<string>` of completed task IDs lives in `useState` inside `_layout.jsx`.
- It is shared to all screens via React Context (`AppContext`).
- Any screen calls `useAppContext()` to get `{ completedIds, toggleTask }`.
- **State resets on app reload** — no persistence layer is used (by design for this assignment).

---

## Key Design Decisions

- **No TypeScript** — Plain JavaScript throughout, keeping it beginner-friendly.
- **No StyleSheet.create** — All styling is done with NativeWind Tailwind utility classes.
- **SafeAreaView from `react-native-safe-area-context`** — Used on every screen to handle notches and status bars correctly.
- **File-based routing** — Expo Router automatically maps `app/index.jsx` → `/`, `app/tasks.jsx` → `/tasks`, etc.
- **Custom tab icons** — Emoji-based icons with no third-party icon library dependency.

---

## Available Scripts

| Command | Description |
|---|---|
| `npx expo start` | Start the Expo development server |
| `npx expo start --android` | Open directly on Android |
| `npx expo start --ios` | Open directly on iOS |
| `npx expo start --web` | Open in a web browser |

---

## License

This project was created as a course assignment. Feel free to use it as a reference.

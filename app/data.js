// ============================================================
// data.js — Shared task data and XP helpers for LifeLevels
// ============================================================

/**
 * All tasks grouped by category.
 * Each task has a unique id, name, xp reward, and category key.
 */
export const TASKS_BY_CATEGORY = {
  chores: {
    label: "Chores",
    color: "#f59e0b",         // amber
    bgColor: "#2a1f00",
    lightColor: "#fef3c7",
    tasks: [
      { id: "c1", name: "Take out trash",      xp: 15, category: "chores" },
      { id: "c2", name: "Do the dishes",       xp: 20, category: "chores" },
      { id: "c3", name: "Vacuum living room",  xp: 25, category: "chores" },
      { id: "c4", name: "Do laundry",          xp: 30, category: "chores" },
      { id: "c5", name: "Clean bathroom",      xp: 35, category: "chores" },
      { id: "c6", name: "Wipe counters",       xp: 15, category: "chores" },
    ],
  },
  fitness: {
    label: "Fitness",
    color: "#22c55e",         // green
    bgColor: "#002211",
    lightColor: "#dcfce7",
    tasks: [
      { id: "f1", name: "Morning walk",        xp: 30, category: "fitness" },
      { id: "f2", name: "Stretch routine",     xp: 20, category: "fitness" },
      { id: "f3", name: "20-min workout",      xp: 50, category: "fitness" },
      { id: "f4", name: "Evening jog",         xp: 40, category: "fitness" },
      { id: "f5", name: "Yoga session",        xp: 35, category: "fitness" },
      { id: "f6", name: "Bike ride",           xp: 45, category: "fitness" },
    ],
  },
  learning: {
    label: "Learning",
    color: "#3b82f6",         // blue
    bgColor: "#00102a",
    lightColor: "#dbeafe",
    tasks: [
      { id: "l1", name: "Read for 20 mins",           xp: 25, category: "learning" },
      { id: "l2", name: "Watch educational video",     xp: 20, category: "learning" },
      { id: "l3", name: "Complete a course lesson",    xp: 40, category: "learning" },
      { id: "l4", name: "Practice a language",         xp: 30, category: "learning" },
      { id: "l5", name: "Write in a journal",          xp: 25, category: "learning" },
    ],
  },
  selfcare: {
    label: "Self-care",
    color: "#ec4899",         // pink
    bgColor: "#280018",
    lightColor: "#fce7f3",
    tasks: [
      { id: "s1", name: "Drink 8 glasses of water",   xp: 20, category: "selfcare" },
      { id: "s2", name: "Sleep 8 hours",              xp: 30, category: "selfcare" },
      { id: "s3", name: "Cook a healthy meal",        xp: 35, category: "selfcare" },
      { id: "s4", name: "Meditate for 10 mins",       xp: 25, category: "selfcare" },
      { id: "s5", name: "Skincare routine",           xp: 15, category: "selfcare" },
    ],
  },
};

/** Flat list of ALL tasks across every category */
export const ALL_TASKS = Object.values(TASKS_BY_CATEGORY).flatMap(
  (cat) => cat.tasks
);

/** Today's featured tasks shown on the Home screen (a curated subset) */
export const TODAY_TASK_IDS = ["f1", "l1", "c2", "s4", "f3", "l3"];

// ── XP helpers ──────────────────────────────────────────────

/** XP required per level */
export const XP_PER_LEVEL = 1000;

/** Compute level number from total XP (starts at 1) */
export function getLevel(totalXP) {
  return Math.floor(totalXP / XP_PER_LEVEL) + 1;
}

/** XP earned within the current level (0–999) */
export function getLevelXP(totalXP) {
  return totalXP % XP_PER_LEVEL;
}

/** Fractional progress within current level (0.0–1.0) */
export function getLevelProgress(totalXP) {
  return getLevelXP(totalXP) / XP_PER_LEVEL;
}

/**
 * Given a set of completed task IDs, compute per-category XP totals.
 * Returns { chores: N, fitness: N, learning: N, selfcare: N }
 */
export function getCategoryXP(completedIds) {
  const result = { chores: 0, fitness: 0, learning: 0, selfcare: 0 };
  for (const task of ALL_TASKS) {
    if (completedIds.has(task.id)) {
      result[task.category] += task.xp;
    }
  }
  return result;
}

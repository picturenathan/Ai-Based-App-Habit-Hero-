// ============================================================
// app/index.jsx — Home Screen
// ============================================================
// Shows:
//   • App header + greeting
//   • Level badge + XP progress bar
//   • Today's featured tasks with checkboxes

import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useAppContext } from "./_layout";
import {
  ALL_TASKS,
  TODAY_TASK_IDS,
  TASKS_BY_CATEGORY,
  getLevel,
  getLevelXP,
  getLevelProgress,
  XP_PER_LEVEL,
} from "./data";

// ── Sub-components ───────────────────────────────────────────

/** XP progress bar with level info */
function XPProgressBar({ totalXP }) {
  const level = getLevel(totalXP);
  const levelXP = getLevelXP(totalXP);
  const progress = getLevelProgress(totalXP); // 0.0 → 1.0

  return (
    <View className="bg-[#1a1a35] rounded-2xl p-4 mx-4 mb-4 border border-[#2d2d50]">
      {/* Level badge row */}
      <View className="flex-row items-center justify-between mb-3">
        <View className="flex-row items-center gap-2">
          <View className="bg-violet-600 rounded-xl px-3 py-1">
            <Text className="text-white font-bold text-sm">Level {level}</Text>
          </View>
          <Text className="text-gray-400 text-sm">
            {levelXP} / {XP_PER_LEVEL} XP
          </Text>
        </View>
        <Text className="text-yellow-400 font-bold text-sm">
          ⚡ {totalXP} total
        </Text>
      </View>

      {/* Progress bar track */}
      <View className="bg-[#0f0f23] rounded-full h-3 overflow-hidden">
        {/* Filled portion */}
        <View
          className="bg-violet-500 h-3 rounded-full"
          style={{ width: `${Math.round(progress * 100)}%` }}
        />
      </View>

      {/* Next level label */}
      <Text className="text-gray-500 text-xs mt-2 text-right">
        {XP_PER_LEVEL - levelXP} XP to Level {level + 1}
      </Text>
    </View>
  );
}

/** A single task row with checkbox */
function TaskRow({ task, isCompleted, onToggle }) {
  const cat = TASKS_BY_CATEGORY[task.category];

  return (
    <TouchableOpacity
      onPress={() => onToggle(task.id)}
      activeOpacity={0.7}
      className="flex-row items-center bg-[#1a1a35] rounded-xl px-4 py-3 mb-2 mx-4 border border-[#2d2d50]"
    >
      {/* Checkbox circle */}
      <View
        className={`w-6 h-6 rounded-full border-2 items-center justify-center mr-3 ${
          isCompleted
            ? "bg-violet-600 border-violet-600"
            : "border-gray-600 bg-transparent"
        }`}
      >
        {isCompleted && (
          <Text className="text-white text-xs font-bold">✓</Text>
        )}
      </View>

      {/* Task name */}
      <Text
        className={`flex-1 text-base ${
          isCompleted
            ? "line-through text-gray-500"
            : "text-white"
        }`}
      >
        {task.name}
      </Text>

      {/* Category pill */}
      <View
        className="rounded-full px-2 py-0.5 mr-2"
        style={{ backgroundColor: cat.bgColor }}
      >
        <Text className="text-xs font-medium" style={{ color: cat.color }}>
          {cat.label}
        </Text>
      </View>

      {/* XP badge */}
      <Text className="text-yellow-400 text-sm font-bold">+{task.xp}</Text>
    </TouchableOpacity>
  );
}

// ── Screen ───────────────────────────────────────────────────

export default function HomeScreen() {
  const { completedIds, toggleTask } = useAppContext();

  // Calculate total XP from all completed tasks
  const totalXP = ALL_TASKS.filter((t) => completedIds.has(t.id)).reduce(
    (sum, t) => sum + t.xp,
    0
  );

  // Get today's featured tasks (subset of all tasks)
  const todayTasks = TODAY_TASK_IDS.map((id) =>
    ALL_TASKS.find((t) => t.id === id)
  ).filter(Boolean);

  const completedToday = todayTasks.filter((t) => completedIds.has(t.id)).length;

  return (
    <SafeAreaView className="flex-1 bg-[#0f0f23]">
      <ScrollView showsVerticalScrollIndicator={false}>

        {/* ── Header ── */}
        <View className="flex-row items-center justify-between px-4 pt-4 pb-6">
          <View>
            <Text className="text-violet-400 text-sm font-medium tracking-widest uppercase">
              LifeLevels
            </Text>
            <Text className="text-white text-2xl font-bold mt-0.5">
              Good morning, Alex 👋
            </Text>
          </View>
          {/* Flame streak indicator */}
          <View className="bg-orange-900/50 rounded-xl px-3 py-2 border border-orange-700/50">
            <Text className="text-orange-400 font-bold text-lg">🔥 5</Text>
            <Text className="text-orange-500 text-xs text-center">streak</Text>
          </View>
        </View>

        {/* ── XP Progress Bar ── */}
        <XPProgressBar totalXP={totalXP} />

        {/* ── Today's Tasks header ── */}
        <View className="flex-row items-center justify-between px-4 mb-3">
          <Text className="text-white text-lg font-bold">Today's Tasks</Text>
          <Text className="text-gray-400 text-sm">
            {completedToday}/{todayTasks.length} done
          </Text>
        </View>

        {/* ── Task list ── */}
        {todayTasks.map((task) => (
          <TaskRow
            key={task.id}
            task={task}
            isCompleted={completedIds.has(task.id)}
            onToggle={toggleTask}
          />
        ))}

        {/* Bottom padding so content doesn't hide behind tab bar */}
        <View className="h-6" />
      </ScrollView>
    </SafeAreaView>
  );
}

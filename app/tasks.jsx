// ============================================================
// app/tasks.jsx — All Tasks Screen
// ============================================================
// Shows:
//   • Filter pills: All | Chores | Fitness | Learning | Self-care
//   • Tasks grouped by category, with checkboxes and XP values
//   • Completed tasks show strikethrough text

import { useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useAppContext } from "./_layout";
import { TASKS_BY_CATEGORY, ALL_TASKS } from "./data";

// ── Filter pill data ─────────────────────────────────────────

const FILTERS = [
  { key: "all",      label: "All" },
  { key: "chores",   label: "Chores" },
  { key: "fitness",  label: "Fitness" },
  { key: "learning", label: "Learning" },
  { key: "selfcare", label: "Self-care" },
];

// ── Sub-components ───────────────────────────────────────────

/** Filter pill button */
function FilterPill({ filter, isActive, onPress }) {
  // Get category color for active state
  const cat = TASKS_BY_CATEGORY[filter.key];
  const activeColor = cat ? cat.color : "#7c3aed";
  const activeBg = cat ? cat.bgColor : "#1e0048";

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      className="rounded-full px-4 py-2 mr-2 border"
      style={{
        backgroundColor: isActive ? activeBg : "#1a1a35",
        borderColor: isActive ? activeColor : "#2d2d50",
      }}
    >
      <Text
        className="text-sm font-semibold"
        style={{ color: isActive ? activeColor : "#9ca3af" }}
      >
        {filter.label}
      </Text>
    </TouchableOpacity>
  );
}

/** A single task row */
function TaskRow({ task, isCompleted, onToggle }) {
  const cat = TASKS_BY_CATEGORY[task.category];

  return (
    <TouchableOpacity
      onPress={() => onToggle(task.id)}
      activeOpacity={0.7}
      className="flex-row items-center px-4 py-3.5 border-b border-[#1f1f3a]"
    >
      {/* Checkbox */}
      <View
        className="w-6 h-6 rounded-full border-2 items-center justify-center mr-4 flex-shrink-0"
        style={{
          borderColor: isCompleted ? cat.color : "#4b5563",
          backgroundColor: isCompleted ? cat.color : "transparent",
        }}
      >
        {isCompleted && (
          <Text className="text-white text-xs font-bold">✓</Text>
        )}
      </View>

      {/* Task name */}
      <Text
        className={`flex-1 text-base ${
          isCompleted ? "line-through text-gray-600" : "text-white"
        }`}
      >
        {task.name}
      </Text>

      {/* XP reward */}
      <Text
        className="text-sm font-bold ml-3"
        style={{ color: isCompleted ? "#4b5563" : "#fbbf24" }}
      >
        +{task.xp} XP
      </Text>
    </TouchableOpacity>
  );
}

/** Category section header */
function CategoryHeader({ categoryKey }) {
  const cat = TASKS_BY_CATEGORY[categoryKey];
  return (
    <View
      className="flex-row items-center px-4 py-2.5"
      style={{ backgroundColor: cat.bgColor }}
    >
      <Text className="font-bold text-sm" style={{ color: cat.color }}>
        {cat.label.toUpperCase()}
      </Text>
    </View>
  );
}

// ── Screen ───────────────────────────────────────────────────

export default function TasksScreen() {
  const { completedIds, toggleTask } = useAppContext();
  const [activeFilter, setActiveFilter] = useState("all");

  // Which categories to show based on active filter
  const categoriesToShow =
    activeFilter === "all"
      ? Object.keys(TASKS_BY_CATEGORY)
      : [activeFilter];

  // Count total completed across all tasks
  const totalCompleted = ALL_TASKS.filter((t) => completedIds.has(t.id)).length;

  return (
    <SafeAreaView className="flex-1 bg-[#0f0f23]">

      {/* ── Screen header ── */}
      <View className="px-4 pt-4 pb-2">
        <Text className="text-white text-2xl font-bold">All Tasks</Text>
        <Text className="text-gray-400 text-sm mt-1">
          {totalCompleted} of {ALL_TASKS.length} completed
        </Text>
      </View>

      {/* ── Filter pills (horizontal scroll) ── */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="py-3 px-4"
        contentContainerStyle={{ paddingRight: 16 }}
      >
        {FILTERS.map((filter) => (
          <FilterPill
            key={filter.key}
            filter={filter}
            isActive={activeFilter === filter.key}
            onPress={() => setActiveFilter(filter.key)}
          />
        ))}
      </ScrollView>

      {/* ── Task list (grouped by category) ── */}
      <ScrollView showsVerticalScrollIndicator={false}>
        {categoriesToShow.map((catKey) => {
          const cat = TASKS_BY_CATEGORY[catKey];
          return (
            <View key={catKey} className="mb-4">
              {/* Category section header */}
              <CategoryHeader categoryKey={catKey} />

              {/* Tasks in this category */}
              <View className="bg-[#1a1a35]">
                {cat.tasks.map((task) => (
                  <TaskRow
                    key={task.id}
                    task={task}
                    isCompleted={completedIds.has(task.id)}
                    onToggle={toggleTask}
                  />
                ))}
              </View>
            </View>
          );
        })}

        {/* Bottom padding */}
        <View className="h-6" />
      </ScrollView>
    </SafeAreaView>
  );
}

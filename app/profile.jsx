// ============================================================
// app/profile.jsx — Profile Screen
// ============================================================
// Shows:
//   • Avatar with initials + username
//   • Level badge and total XP
//   • 2×2 stat card grid (Tasks Done, Day Streak, Total XP, Levels Gained)
//   • Per-category XP breakdown bars

import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useAppContext } from "./_layout";
import {
  ALL_TASKS,
  TASKS_BY_CATEGORY,
  getLevel,
  getLevelXP,
  getLevelProgress,
  getCategoryXP,
  XP_PER_LEVEL,
} from "./data";

// ── Sub-components ───────────────────────────────────────────

/** Avatar circle showing user initials */
function Avatar({ name }) {
  // Build initials from name (e.g. "Alex Morgan" → "AM")
  const initials = name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <View className="items-center mt-6 mb-4">
      {/* Glowing ring behind avatar */}
      <View className="w-24 h-24 rounded-full bg-violet-900/40 items-center justify-center border-2 border-violet-500">
        <Text className="text-white text-3xl font-bold">{initials}</Text>
      </View>
      <Text className="text-white text-xl font-bold mt-3">{name}</Text>
      <Text className="text-gray-400 text-sm mt-0.5">LifeLevels Member</Text>
    </View>
  );
}

/** A single stat card in the 2×2 grid */
function StatCard({ emoji, label, value, accent }) {
  return (
    <View className="flex-1 bg-[#1a1a35] rounded-2xl p-4 m-1.5 border border-[#2d2d50]">
      <Text style={{ fontSize: 24 }}>{emoji}</Text>
      <Text
        className="text-2xl font-bold mt-2"
        style={{ color: accent }}
      >
        {value}
      </Text>
      <Text className="text-gray-400 text-xs mt-0.5">{label}</Text>
    </View>
  );
}

/**
 * Horizontal XP bar for a single category.
 * maxXP is used to scale bars relative to the highest category.
 */
function CategoryXPBar({ categoryKey, xp, maxXP }) {
  const cat = TASKS_BY_CATEGORY[categoryKey];
  // Avoid division by zero; fill at least a tiny sliver if any XP earned
  const fillRatio = maxXP > 0 ? xp / maxXP : 0;

  return (
    <View className="mb-4">
      {/* Label row */}
      <View className="flex-row justify-between mb-1.5">
        <Text className="text-white text-sm font-medium">{cat.label}</Text>
        <Text className="text-yellow-400 text-sm font-bold">{xp} XP</Text>
      </View>

      {/* Bar track */}
      <View className="bg-[#0f0f23] rounded-full h-2.5 overflow-hidden">
        {/* Filled portion */}
        <View
          className="h-2.5 rounded-full"
          style={{
            width: `${Math.max(fillRatio * 100, xp > 0 ? 4 : 0)}%`,
            backgroundColor: cat.color,
          }}
        />
      </View>
    </View>
  );
}

// ── Screen ───────────────────────────────────────────────────

export default function ProfileScreen() {
  const { completedIds } = useAppContext();

  // ── Derive stats from completed tasks ──
  const totalXP = ALL_TASKS.filter((t) => completedIds.has(t.id)).reduce(
    (sum, t) => sum + t.xp,
    0
  );

  const level = getLevel(totalXP);
  const levelXP = getLevelXP(totalXP);
  const levelProgress = getLevelProgress(totalXP);
  const tasksDone = completedIds.size;
  // Levels gained = levels above 1
  const levelsGained = level - 1;

  // Per-category XP
  const categoryXP = getCategoryXP(completedIds);
  const maxCategoryXP = Math.max(...Object.values(categoryXP), 1); // for bar scaling

  return (
    <SafeAreaView className="flex-1 bg-[#0f0f23]">
      <ScrollView showsVerticalScrollIndicator={false}>

        {/* ── Avatar + name ── */}
        <Avatar name="Alex Morgan" />

        {/* ── Level badge + XP progress ── */}
        <View className="mx-4 mb-4 bg-[#1a1a35] rounded-2xl p-4 border border-[#2d2d50]">
          <View className="flex-row items-center justify-between mb-3">
            <View className="bg-violet-600 rounded-xl px-4 py-1.5">
              <Text className="text-white font-bold">⚔️ Level {level}</Text>
            </View>
            <Text className="text-yellow-400 font-bold">⚡ {totalXP} XP total</Text>
          </View>

          {/* Progress bar */}
          <View className="bg-[#0f0f23] rounded-full h-3 overflow-hidden">
            <View
              className="bg-violet-500 h-3 rounded-full"
              style={{ width: `${Math.round(levelProgress * 100)}%` }}
            />
          </View>
          <Text className="text-gray-500 text-xs mt-2">
            {levelXP} / {XP_PER_LEVEL} XP — Level {level + 1} needs {XP_PER_LEVEL - levelXP} more
          </Text>
        </View>

        {/* ── 2×2 Stat grid ── */}
        <Text className="text-gray-400 text-xs font-semibold tracking-widest uppercase px-4 mb-2">
          Stats
        </Text>
        <View className="flex-row flex-wrap px-2.5 mb-4">
          <View className="flex-row w-full">
            <StatCard
              emoji="✅"
              label="Tasks Done"
              value={tasksDone}
              accent="#22c55e"
            />
            <StatCard
              emoji="🔥"
              label="Day Streak"
              value="5"
              accent="#f97316"
            />
          </View>
          <View className="flex-row w-full">
            <StatCard
              emoji="⚡"
              label="Total XP"
              value={totalXP}
              accent="#fbbf24"
            />
            <StatCard
              emoji="🏆"
              label="Levels Gained"
              value={levelsGained}
              accent="#a78bfa"
            />
          </View>
        </View>

        {/* ── Category XP breakdown ── */}
        <Text className="text-gray-400 text-xs font-semibold tracking-widest uppercase px-4 mb-3">
          XP by Category
        </Text>
        <View className="mx-4 bg-[#1a1a35] rounded-2xl p-4 border border-[#2d2d50]">
          {Object.keys(TASKS_BY_CATEGORY).map((catKey) => (
            <CategoryXPBar
              key={catKey}
              categoryKey={catKey}
              xp={categoryXP[catKey]}
              maxXP={maxCategoryXP}
            />
          ))}
        </View>

        {/* Bottom padding */}
        <View className="h-8" />
      </ScrollView>
    </SafeAreaView>
  );
}

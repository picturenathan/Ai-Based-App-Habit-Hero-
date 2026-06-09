// ============================================================
// app/_layout.jsx — Root layout with bottom tab navigator
// ============================================================
// This is the entry point for Expo Router. It:
//   1. Imports global CSS (required by NativeWind)
//   2. Holds the shared "completedIds" state (which tasks are done)
//   3. Passes state down via React Context so all screens can read/write it
//   4. Renders the bottom tab navigator with 3 tabs

import "../global.css";

import { createContext, useContext, useState } from "react";
import { Tabs } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Text, View } from "react-native";

// ── Shared state context ─────────────────────────────────────

/**
 * AppContext holds the set of completed task IDs and a toggle function.
 * Any screen can call useAppContext() to read or update this state.
 */
export const AppContext = createContext(null);

export function useAppContext() {
  return useContext(AppContext);
}

// ── Tab bar icon helper ──────────────────────────────────────

/** Simple emoji-based tab icons — no icon library needed */
function TabIcon({ emoji, label, focused }) {
  return (
    <View className="items-center justify-center pt-1">
      <Text style={{ fontSize: 20 }}>{emoji}</Text>
      <Text
        className={`text-xs mt-0.5 ${
          focused ? "text-violet-400 font-semibold" : "text-gray-500"
        }`}
      >
        {label}
      </Text>
    </View>
  );
}

// ── Root Layout ──────────────────────────────────────────────

export default function RootLayout() {
  // completedIds is a Set of task id strings (e.g. "f1", "c3")
  // Using a Set makes lookup O(1) and toggle logic clean
  const [completedIds, setCompletedIds] = useState(new Set());

  /** Toggle a task's completion status */
  function toggleTask(taskId) {
    setCompletedIds((prev) => {
      const next = new Set(prev); // always create a new Set to trigger re-render
      if (next.has(taskId)) {
        next.delete(taskId);
      } else {
        next.add(taskId);
      }
      return next;
    });
  }

  return (
    // Provide shared state to all child screens
    <AppContext.Provider value={{ completedIds, toggleTask }}>
      <StatusBar style="light" />

      <Tabs
        screenOptions={{
          // Hide the default header — each screen has its own
          headerShown: false,

          // Tab bar appearance
          tabBarStyle: {
            backgroundColor: "#1a1a35",
            borderTopColor: "#2d2d50",
            borderTopWidth: 1,
            height: 70,
            paddingBottom: 8,
          },

          // Hide the default label (our TabIcon renders its own)
          tabBarShowLabel: false,

          // Active/inactive tint (applies to icon color if using vector icons)
          tabBarActiveTintColor: "#7c3aed",
          tabBarInactiveTintColor: "#6b7280",
        }}
      >
        {/* ── Tab 1: Home ── */}
        <Tabs.Screen
          name="index"
          options={{
            title: "Home",
            tabBarIcon: ({ focused }) => (
              <TabIcon emoji="🏠" label="Home" focused={focused} />
            ),
          }}
        />

        {/* ── Tab 2: Tasks ── */}
        <Tabs.Screen
          name="tasks"
          options={{
            title: "Tasks",
            tabBarIcon: ({ focused }) => (
              <TabIcon emoji="✅" label="Tasks" focused={focused} />
            ),
          }}
        />

        {/* ── Tab 3: Profile ── */}
        <Tabs.Screen
          name="profile"
          options={{
            title: "Profile",
            tabBarIcon: ({ focused }) => (
              <TabIcon emoji="👤" label="Profile" focused={focused} />
            ),
          }}
        />
      </Tabs>
    </AppContext.Provider>
  );
}

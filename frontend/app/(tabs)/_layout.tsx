import { Tabs } from "expo-router";
import { View, Text } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function TabLayout() {
  const insets = useSafeAreaInsets();
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#1da1f2",
        tabBarInactiveTintColor: "#657786",
        tabBarStyle: {
          backgroundColor: "#FFF",
          borderTopWidth: 1,
          borderTopColor: "#e1e8ed",
          height: 40 + insets.bottom,
          paddingTop: 8,
        },
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name='index'
        options={{
          tabBarIcon: ({ color, size }) => (
            <Feather name='home' size={size} color={color} />
          ),
          title: "",
        }}
      />
      <Tabs.Screen
        name='search'
        options={{
          tabBarIcon: ({ color, size }) => (
            <Feather name='search' size={size} color={color} />
          ),
          title: "",
        }}
      />
      <Tabs.Screen
        name='notification'
        options={{
          tabBarIcon: ({ color, size }) => (
            <Feather name='bell' size={size} color={color} />
          ),
          title: "",
        }}
      />
      <Tabs.Screen
        name='message'
        options={{
          tabBarIcon: ({ color, size }) => (
            <Feather name='mail' size={size} color={color} />
          ),
          title: "",
        }}
      />

      <Tabs.Screen
        name='profile'
        options={{
          tabBarIcon: ({ color, size }) => (
            <Feather name='user' size={size} color={color} />
          ),
          title: "",
        }}
      />
    </Tabs>
  );
}

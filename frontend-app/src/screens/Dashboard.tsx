import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React from 'react';

function Dashboard() {
  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-black">
      <View className="px-5 py-4">
        <Text className="text-3xl font-bold text-black dark:text-white">Dashboard</Text>
        <Text className="text-base text-gray-500 mt-2">Welcome to your Tiffin Management System</Text>
      </View>
    </SafeAreaView>
  )
}

export default Dashboard
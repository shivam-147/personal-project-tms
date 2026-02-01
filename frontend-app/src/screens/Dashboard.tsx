import { View, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React from 'react';
import { useRouter } from 'expo-router';
import { removeData } from "../services/storage";

function Dashboard() {
  const router = useRouter();

  const handleLogout = async () => {
    await removeData('x-access-token');
    router.replace('/login');
  }

  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-black">
      <View className="px-5 py-4 flex-1">
        <View className="flex-row justify-between items-center">
          <Text className="text-3xl font-bold text-black dark:text-white">Dashboard</Text>
          <TouchableOpacity
            onPress={handleLogout}
            className="bg-red-500 px-4 py-2 rounded-xl"
          >
            <Text className="text-white font-bold">Logout</Text>
          </TouchableOpacity>
        </View>

        <Text className="text-base text-gray-500 mt-2">Welcome to your Tiffin Management System</Text>

        {/* Placeholder for future content */}
        <View className="mt-10 flex-1 justify-center items-center">
          <Text className="text-gray-400">Content goes here...</Text>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default Dashboard
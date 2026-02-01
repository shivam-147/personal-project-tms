import { View, Text, TouchableOpacity, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useEffect } from 'react';
import { useRouter } from 'expo-router';
import { removeData } from "../services/storage";
import Api from "../services/Api";
import { endpoints } from "../utils/endpoints";
import { useSelector, useDispatch } from "react-redux";
import { showToast } from "../redux/toastSlice";
import { setClients } from "../redux/clientSlice";
import { setLoading } from "../redux/loaderSlice";
import ClientCard from "../components/clientCard";


function Dashboard() {
  const router = useRouter();
  const api = new Api()
  const dispatch = useDispatch()
  const { clients } = useSelector((state: any) => state.client)

  const handleLogout = async () => {
    await removeData('x-access-token');
    router.replace('/login');
  }

  useEffect(() => {
    const getClients = async () => {
      dispatch(setLoading(true))
      const response = await api.Get(endpoints.getClients)
      if (!response) {
        dispatch(
          showToast({
            title: 'Error',
            subtitle: 'Failed to fetch clients',
            type: 'error'
          })
        )
        dispatch(setLoading(false))
        return
      }

      if (response.success === true) {
        dispatch(setClients(response.payload.clients))
      } else {
        dispatch(
          showToast({
            title: 'Error',
            subtitle: response.message,
            type: 'error'
          })
        )
      }
      dispatch(setLoading(false))
    }
    getClients()
  }, [])

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

        {/* Client List */}
        <View className="mt-5 flex-1 w-full">
          <FlatList
            data={clients}
            renderItem={({ item }) => <ClientCard client={item} />}
            keyExtractor={(item) => item._id}
            contentContainerStyle={{ paddingBottom: 20 }}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </View>
    </SafeAreaView>
  )
}

export default Dashboard
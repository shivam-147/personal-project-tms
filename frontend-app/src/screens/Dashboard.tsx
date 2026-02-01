import { View, Text, TouchableOpacity, FlatList } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'expo-router';
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
  const [showModal, setShowModal] = useState(false)

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
      <View className="px-5 flex-1">
        {/* Client List */}
        <View className="flex-1 w-full">
          <FlatList
            data={clients}
            renderItem={({ item }) => <ClientCard client={item} />}
            keyExtractor={(item) => item._id}
            contentContainerStyle={{ paddingBottom: 20 }}
            showsVerticalScrollIndicator={false}
          />
        </View>

        <TouchableOpacity
          onPress={() => setShowModal(true)}
          className="absolute top-1 right-5 bg-indigo-600 h-14 w-14 rounded-full justify-center items-center shadow-lg active:scale-95"
          style={{ elevation: 5 }}
        >
          <Ionicons name="add" size={30} color="white" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

export default Dashboard
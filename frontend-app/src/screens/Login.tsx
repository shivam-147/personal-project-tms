import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { useDispatch } from 'react-redux';
import { useRouter } from 'expo-router';
import { setLoading } from '../redux/loaderSlice';
import { storeData } from '../services/storage';
import { endpoints } from '../utils/endpoints';
import { showToast } from '../redux/toastSlice';
import API from '../services/Api';

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const api = new API();

  const dispatch = useDispatch();
  const router = useRouter();



  const handleLogin = async () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email || !password) {
      dispatch(showToast({
        title: "Missing Fields",
        subtitle: "Please enter both email and password.",
        type: "info"
      }))
      return;
    }

    if (!emailRegex.test(email)) {
      dispatch(showToast({
        title: "Invalid Email",
        subtitle: "Please enter a valid email address.",
        type: "info"
      }));
      return;
    }

    dispatch(setLoading(true))
    const response = await api.Post(endpoints.login, { email, password })

    if (!response) {
      dispatch(showToast({
        title: "Error",
        subtitle: "Something went wrong. Please try again.",
        type: "error"
      }))
      dispatch(setLoading(false))
      return;
    }

    if (response.success === true) {
      dispatch(showToast({
        title: "Login Successful",
        subtitle: "You have successfully logged in.",
        type: "success"
      }))
      storeData('x-access-token', response.payload.token)
      router.replace('/dashboard')
    } else {
      dispatch(showToast({
        title: "Login Failed",
        subtitle: response.message,
        type: "error"
      }))
    }
    dispatch(setLoading(false))
  };

  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-black">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          showsVerticalScrollIndicator={false}
          className="px-6"
          keyboardShouldPersistTaps="handled"
        >
          <View className="flex-1 justify-center py-10">
            {/* Header Section */}
            <Animated.View entering={FadeInDown.delay(200).duration(1000).springify()} className="mb-10 items-center">
              <View className="h-20 w-20 bg-indigo-600 rounded-3xl items-center justify-center mb-6 shadow-lg shadow-indigo-500/50">
                <Ionicons name="cube-outline" size={40} color="white" />
              </View>
              <Text className="text-4xl font-bold text-gray-900 dark:text-white text-center">
                Welcome Back
              </Text>
              <Text className="text-gray-500 dark:text-gray-400 text-center mt-2 text-base">
                Sign in to continue to TMS
              </Text>
            </Animated.View>

            {/* Form Section */}
            <View className="space-y-6">

              {/* Email Input */}
              <Animated.View entering={FadeInDown.delay(400).duration(1000).springify()}>
                <Text className="text-gray-700 dark:text-gray-300 mb-2 font-medium ml-1">Email Address</Text>
                <View className="flex-row items-center bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl px-4 h-14 focus:border-indigo-500 focus:border-2 transition-all">
                  <Ionicons name="mail-outline" size={20} color="#6B7280" />
                  <TextInput
                    placeholder="name@example.com"
                    placeholderTextColor="#9CA3AF"
                    className="flex-1 ml-3 text-gray-900 dark:text-white text-base"
                    autoCapitalize="none"
                    keyboardType="email-address"
                    value={email}
                    onChangeText={(text) => setEmail(text)}
                  />
                </View>
              </Animated.View>

              {/* Password Input */}
              <Animated.View entering={FadeInDown.delay(600).duration(1000).springify()}>
                <Text className="text-gray-700 dark:text-gray-300 mb-2 font-medium ml-1">Password</Text>
                <View className="flex-row items-center bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl px-4 h-14 focus:border-indigo-500 focus:border-2 transition-all">
                  <Ionicons name="lock-closed-outline" size={20} color="#6B7280" />
                  <TextInput
                    placeholder="Enter your password"
                    placeholderTextColor="#9CA3AF"
                    className="flex-1 ml-3 text-gray-900 dark:text-white text-base"
                    secureTextEntry={!showPassword}
                    value={password}
                    onChangeText={(text) => setPassword(text)}
                  />
                  <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                    <Ionicons name={showPassword ? "eye-off-outline" : "eye-outline"} size={20} color="#6B7280" />
                  </TouchableOpacity>
                </View>
              </Animated.View>

              {/* Forgot Password */}
              <Animated.View entering={FadeInDown.delay(800).duration(1000).springify()} className="items-end">
                <TouchableOpacity>
                  <Text className="text-indigo-600 dark:text-indigo-400 font-semibold">Forgot Password?</Text>
                </TouchableOpacity>
              </Animated.View>

              {/* Login Button */}
              <Animated.View entering={FadeInDown.delay(1000).duration(1000).springify()} className="mt-4">
                <TouchableOpacity
                  className="bg-indigo-600 h-14 rounded-2xl justify-center items-center shadow-lg shadow-indigo-500/30 active:scale-95 transition-transform"
                  onPress={handleLogin}
                >
                  <Text className="text-white font-bold text-lg">Sign In</Text>
                </TouchableOpacity>
              </Animated.View>

            </View>

            {/* Footer Section */}
            <Animated.View entering={FadeInUp.delay(1200).duration(1000).springify()} className="mt-12 flex-row justify-center">
              <Text className="text-gray-500 dark:text-gray-400 text-base">Don't have an account? </Text>
              <TouchableOpacity onPress={() => router.push('/register')}>
                <Text className="text-indigo-600 dark:text-indigo-400 font-bold text-base">Sign Up</Text>
              </TouchableOpacity>
            </Animated.View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

export default Login
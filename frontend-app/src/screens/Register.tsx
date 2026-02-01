import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { useDispatch } from 'react-redux';
import { useRouter } from 'expo-router';
import { setLoading } from '../redux/loaderSlice';
import { storeData } from '../services/storage';

// Replace with your machine's IP address if testing on a physical device.
const API_URL = 'http://localhost:3000/api/auth/register';

function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const dispatch = useDispatch();
  const router = useRouter();

  const handleRegister = async () => {
    if (!name || !email || !password || !confirmPassword) {
      Alert.alert("Missing Fields", "Please fill in all fields.");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Password Mismatch", "Passwords do not match.");
      return;
    }

    try {
      dispatch(setLoading(true));
      console.log('Attempting register to:', API_URL);

      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        if (data.payload?.token) {
          await storeData('x-access-token', data.payload.token);
          Alert.alert("Success", "Account created successfully!", [
            { text: "OK", onPress: () => router.replace('/dashboard') }
          ]);
        } else {
          // If purely success message without token (sometimes API differs), handle it.
          // But controller sends token.
          Alert.alert("Registration Error", "No token received.");
        }
      } else {
        Alert.alert("Registration Failed", data.message || "Could not create account.");
      }
    } catch (error: any) {
      console.error("Register error:", error);
      Alert.alert("Network Error", "Could not connect to the server.");
    } finally {
      dispatch(setLoading(false));
    }
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
                <Ionicons name="person-add-outline" size={40} color="white" />
              </View>
              <Text className="text-4xl font-bold text-gray-900 dark:text-white text-center">
                Create Account
              </Text>
              <Text className="text-gray-500 dark:text-gray-400 text-center mt-2 text-base">
                Join TMS today
              </Text>
            </Animated.View>

            {/* Form Section */}
            <View className="space-y-6">

              {/* Name Input */}
              <Animated.View entering={FadeInDown.delay(300).duration(1000).springify()}>
                <Text className="text-gray-700 dark:text-gray-300 mb-2 font-medium ml-1">Full Name</Text>
                <View className="flex-row items-center bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl px-4 h-14 focus:border-indigo-500 focus:border-2 transition-all">
                  <Ionicons name="person-outline" size={20} color="#6B7280" />
                  <TextInput
                    placeholder="John Doe"
                    placeholderTextColor="#9CA3AF"
                    className="flex-1 ml-3 text-gray-900 dark:text-white text-base"
                    value={name}
                    onChangeText={setName}
                  />
                </View>
              </Animated.View>

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
                    onChangeText={setEmail}
                  />
                </View>
              </Animated.View>

              {/* Password Input */}
              <Animated.View entering={FadeInDown.delay(500).duration(1000).springify()}>
                <Text className="text-gray-700 dark:text-gray-300 mb-2 font-medium ml-1">Password</Text>
                <View className="flex-row items-center bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl px-4 h-14 focus:border-indigo-500 focus:border-2 transition-all">
                  <Ionicons name="lock-closed-outline" size={20} color="#6B7280" />
                  <TextInput
                    placeholder="Create a password"
                    placeholderTextColor="#9CA3AF"
                    className="flex-1 ml-3 text-gray-900 dark:text-white text-base"
                    secureTextEntry={!showPassword}
                    value={password}
                    onChangeText={setPassword}
                  />
                  <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                    <Ionicons name={showPassword ? "eye-off-outline" : "eye-outline"} size={20} color="#6B7280" />
                  </TouchableOpacity>
                </View>
              </Animated.View>

              {/* Confirm Password Input */}
              <Animated.View entering={FadeInDown.delay(600).duration(1000).springify()}>
                <Text className="text-gray-700 dark:text-gray-300 mb-2 font-medium ml-1">Confirm Password</Text>
                <View className="flex-row items-center bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl px-4 h-14 focus:border-indigo-500 focus:border-2 transition-all">
                  <Ionicons name="lock-closed-outline" size={20} color="#6B7280" />
                  <TextInput
                    placeholder="Confirm your password"
                    placeholderTextColor="#9CA3AF"
                    className="flex-1 ml-3 text-gray-900 dark:text-white text-base"
                    secureTextEntry={!showPassword}
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                  />
                </View>
              </Animated.View>

              {/* Register Button */}
              <Animated.View entering={FadeInDown.delay(800).duration(1000).springify()} className="mt-4">
                <TouchableOpacity
                  className="bg-indigo-600 h-14 rounded-2xl justify-center items-center shadow-lg shadow-indigo-500/30 active:scale-95 transition-transform"
                  onPress={handleRegister}
                >
                  <Text className="text-white font-bold text-lg">Sign Up</Text>
                </TouchableOpacity>
              </Animated.View>

            </View>

            {/* Footer Section */}
            <Animated.View entering={FadeInUp.delay(1000).duration(1000).springify()} className="mt-12 flex-row justify-center">
              <Text className="text-gray-500 dark:text-gray-400 text-base">Already have an account? </Text>
              <TouchableOpacity onPress={() => router.push('/login')}>
                <Text className="text-indigo-600 dark:text-indigo-400 font-bold text-base">Sign In</Text>
              </TouchableOpacity>
            </Animated.View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

export default Register
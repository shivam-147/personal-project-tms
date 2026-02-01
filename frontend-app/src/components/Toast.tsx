import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, Platform } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import Animated, { FadeInUp, FadeOutUp, SlideInUp, SlideOutUp } from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { RootState } from '../redux/store';
import { hideToast } from '../redux/toastSlice';

const TOAST_DURATION = 3000;

const Toast = () => {
    const dispatch = useDispatch();
    const insets = useSafeAreaInsets();
    const { title, subtitle, type, visible } = useSelector((state: RootState) => state.toast);

    useEffect(() => {
        if (visible) {
            const timer = setTimeout(() => {
                dispatch(hideToast());
            }, TOAST_DURATION);

            return () => clearTimeout(timer);
        }
    }, [visible, dispatch]);

    if (!visible) return null;

    let backgroundColor = 'bg-white';
    let iconName: keyof typeof Ionicons.glyphMap = 'checkmark-circle';
    let iconColor = 'text-green-500';
    let borderColor = 'border-l-4 border-green-500';

    switch (type) {
        case 'success':
            iconName = 'checkmark-circle';
            iconColor = '#22c55e'; // green-500
            borderColor = 'border-green-500';
            break;
        case 'error':
            iconName = 'alert-circle';
            iconColor = '#ef4444'; // red-500
            borderColor = 'border-red-500';
            break;
        case 'info':
            iconName = 'information-circle';
            iconColor = '#3b82f6'; // blue-500
            borderColor = 'border-blue-500';
            break;
        case 'warn':
            iconName = 'warning';
            iconColor = '#f97316'; // orange-500
            borderColor = 'border-orange-500';
            break;
        default:
            break;
    }

    return (
        <Animated.View
            entering={SlideInUp.duration(500)}
            exiting={SlideOutUp.duration(500)}
            className="absolute left-0 right-0 z-50 items-center shadow-lg bg-gray shadow-black/10"
            style={{ top: insets.top + (Platform.OS === 'android' ? 10 : 0) }}
        >
            <View className={`w-[90%] bg-white dark:bg-gray-800 rounded-xl flex-row items-center p-4 shadow-md border-l-4 ${borderColor}`}>
                <Ionicons name={iconName} size={28} color={iconColor} />
                <View className="ml-3 flex-1">
                    <Text className="text-gray-900 dark:text-white font-bold text-base">{title}</Text>
                    {subtitle ? (
                        <Text className="text-gray-500 dark:text-gray-400 text-sm mt-0.5">{subtitle}</Text>
                    ) : null}
                </View>
                <TouchableOpacity onPress={() => dispatch(hideToast())}>
                    <Ionicons name="close" size={20} color="#9CA3AF" />
                </TouchableOpacity>
            </View>
        </Animated.View>
    );
};

export default Toast;

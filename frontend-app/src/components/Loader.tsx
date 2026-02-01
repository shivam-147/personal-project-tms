import React, { useEffect } from 'react';
import { View, Modal, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withRepeat,
    withSequence,
    withTiming,
    withDelay,
    Easing
} from 'react-native-reanimated';

// Define the root state type since it's not exported from store yet
// ideally you should export RootState from your store.ts
export interface RootState {
    loader: {
        isLoading: boolean;
    };
}

const Bar = ({ index, color }: { index: number; color: string }) => {
    const scaleY = useSharedValue(0.5);
    const opacity = useSharedValue(0.6);

    useEffect(() => {
        // Stagger the animation based on index
        const delay = index * 100;

        // Create the repeating animation
        const animate = () => {
            scaleY.value = withDelay(delay, withRepeat(
                withSequence(
                    withTiming(1.5, { duration: 500, easing: Easing.inOut(Easing.ease) }),
                    withTiming(0.5, { duration: 500, easing: Easing.inOut(Easing.ease) })
                ),
                -1, // Infinite
                true // Reverse
            ));

            opacity.value = withDelay(delay, withRepeat(
                withSequence(
                    withTiming(1, { duration: 500 }),
                    withTiming(0.6, { duration: 500 })
                ),
                -1,
                true
            ));
        };

        animate();
    }, [index, scaleY, opacity]);

    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{ scaleY: scaleY.value }],
            opacity: opacity.value,
        };
    });

    return (
        <Animated.View
            style={[
                styles.bar,
                animatedStyle,
                { backgroundColor: color }
            ]}
        />
    );
};

const Loader: React.FC = () => {
    // @ts-ignore
    const isLoading = useSelector((state: RootState) => state.loader.isLoading);

    if (!isLoading) return null;

    return (
        <Modal transparent visible={isLoading} animationType="fade">
            <View className="flex-1 justify-center items-center bg-black/50">
                <View className="flex-row items-center justify-center gap-1.5 h-12 rounded-xl">
                    {['#81fb07ff', '#f40707ff', '#bf08e0ff', '#9d0404ff', '#312e81'].map((color, i) => (
                        <Bar key={i} index={i} color={color} />
                    ))}
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    bar: {
        width: 6,
        height: 32,
        backgroundColor: '#4f46e5', // indigo-600
        borderRadius: 9999,
        marginHorizontal: 3,
    }
});

export default Loader;

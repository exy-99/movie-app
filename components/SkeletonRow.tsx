import React, { useEffect, useRef } from 'react';
import { Animated, ScrollView, View } from 'react-native';

const SkeletonItem = () => {
    const animatedValue = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(animatedValue, {
                    toValue: 1,
                    duration: 1000,
                    useNativeDriver: true,
                }),
                Animated.timing(animatedValue, {
                    toValue: 0,
                    duration: 1000,
                    useNativeDriver: true,
                }),
            ])
        ).start();
    }, []);

    const opacity = animatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: [0.3, 0.7],
    });

    return (
        <View className="mr-4 w-[120px]">
            <Animated.View
                style={{ opacity }}
                className="w-[120px] h-[180px] rounded-xl bg-gray-800 mb-2"
            />
            <Animated.View
                style={{ opacity }}
                className="w-[80%] h-4 bg-gray-800 rounded mb-1"
            />
            <Animated.View
                style={{ opacity }}
                className="w-[40%] h-3 bg-gray-800 rounded"
            />
        </View>
    );
};

export default function SkeletonRow() {
    return (
        <View className="mb-8">
            <View className="mb-4 px-5">
                <View className="w-32 h-6 bg-gray-800 rounded opacity-50" />
            </View>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingHorizontal: 20 }}
            >
                {[1, 2, 3, 4, 5].map((item) => (
                    <SkeletonItem key={item} />
                ))}
            </ScrollView>
        </View>
    );
}

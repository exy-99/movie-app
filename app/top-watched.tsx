import { Ionicons } from "@expo/vector-icons";
import { Stack, useRouter } from "expo-router";
import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { RankedHero } from "../components/RankedHero";
import { RankedItem } from "../components/RankedItem";

// Dummy Data for Top Watched
const HERO_MOVIE = {
    rank: 1,
    title: "Greenland 2",
    year: "2026",
    country: "USA",
    genre: "Thriller",
    description: "In the aftermath of a comet strike that decimated most of the planet, the Garrity family must leave the safety of their Greenland bunker.",
    duration: "2h 15m",
    image: { uri: "https://image.tmdb.org/t/p/w500/abf8tHznhSvl9BAlJXjF8xeJMjE.jpg" },
    rating: "8.9",
};

const RUNNER_UPS = [
    {
        rank: 2,
        title: "Avatar: Fire and Ash",
        genre: "Sci-Fi",
        duration: "2h 45m",
        rating: "8.7",
        image: { uri: "https://image.tmdb.org/t/p/w500/t6HIqrRAclMCA60NSSmgqi9Ur7e.jpg" },
    },
    {
        rank: 3,
        title: "Zootopia 2",
        genre: "Animation",
        duration: "1h 50m",
        rating: "8.5",
        image: { uri: "https://image.tmdb.org/t/p/w500/7M5e0eE5fF3b9gG6f6fF4h6h6.jpg" },
    },
    {
        rank: 4,
        title: "The Housemaid",
        genre: "Mystery",
        duration: "1h 55m",
        rating: "8.2",
        image: { uri: "https://image.tmdb.org/t/p/w500/s9Y3h3e3f3f3f3f3f3f3.jpg" },
    },
    {
        rank: 5,
        title: "Joker: Folie à Deux",
        genre: "Drama",
        duration: "2h 18m",
        rating: "7.9",
        image: { uri: "https://image.tmdb.org/t/p/w500/aciP8Km0waTLXEYf5ybAXdBe8dw.jpg" },
    },
];

export default function TopWatched() {
    const router = useRouter();

    return (
        <SafeAreaView className="flex-1 bg-white" edges={['top']}>
            <Stack.Screen options={{ headerShown: false }} />

            {/* Header */}
            <View className="px-5 py-4 flex-row justify-between items-center bg-white z-50">
                <TouchableOpacity onPress={() => router.back()} className="flex-row items-center">
                    <Ionicons name="arrow-back" size={24} color="#333" />
                    <Text className="ml-1 font-lato text-base text-gray-700">Back</Text>
                </TouchableOpacity>

                <Text className="text-xl font-playfairBold text-slate-900">Top Watched</Text>

                <TouchableOpacity className="p-2 bg-gray-50 rounded-full border border-gray-100">
                    <Ionicons name="filter" size={20} color="#333" />
                </TouchableOpacity>
            </View>

            <ScrollView className="flex-1" showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }}>

                {/* Hero Card (#1) */}
                <View className="px-4 mt-2 mb-6">
                    <RankedHero {...HERO_MOVIE} />
                </View>

                {/* Rankings List (#2+) */}
                <View className="px-5">
                    <Text className="text-lg font-playfair text-gray-400 mb-4 px-2">Runner Ups</Text>
                    {RUNNER_UPS.map((movie) => (
                        <RankedItem key={movie.rank} {...movie} />
                    ))}
                </View>

            </ScrollView>
        </SafeAreaView>
    );
}

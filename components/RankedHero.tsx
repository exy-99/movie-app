import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

interface RankedHeroProps {
    title: string;
    year: string;
    genre: string;
    duration: string;
    image: any;
    imdbRating?: string;
    rottenTomatoesRating?: string;
}

export const RankedHero: React.FC<RankedHeroProps> = ({
    title,
    year,
    genre,
    duration,
    image,
    imdbRating = "8.9",
    rottenTomatoesRating = "95%",
}) => {
    return (
        <View className="mb-8 relative shadow-xl shadow-black/40 mx-1">
            {/* Hero Image */}
            <View className="w-full aspect-[3/4] rounded-[32px] overflow-hidden bg-gray-900 relative">
                <Image
                    source={image}
                    className="w-full h-full"
                    resizeMode="cover"
                />

                {/* Gradient Overlay */}
                <LinearGradient
                    colors={['transparent', 'rgba(0,0,0,0.5)', 'rgba(0,0,0,0.95)']}
                    locations={[0, 0.45, 1]}
                    style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: '70%' }}
                />

                {/* #1 Badge */}
                <View className="absolute top-4 left-0 bg-yellow-400 pl-4 pr-3 py-1.5 rounded-r-xl border-l-[6px] border-yellow-600 shadow-md flex-row items-center z-10">
                    <Text className="text-yellow-900 font-playfairBold text-xl italic mr-1">#1</Text>
                    <Text className="text-yellow-900 font-latoBold text-[10px] uppercase tracking-wider mb-0.5">Top Watched</Text>
                </View>

                {/* Content Overlay */}
                <View className="absolute bottom-0 w-full p-6">
                    {/* Title */}
                    <Text className="text-4xl font-playfairBold text-white mb-2 leading-tight shadow-sm text-center">
                        {title}
                    </Text>

                    {/* Meta Info Row */}
                    <View className="flex-row items-center justify-center mb-4 space-x-2">
                        <Text className="text-gray-300 font-lato text-sm font-medium">{year}</Text>
                        <Text className="text-gray-500 text-[8px]">•</Text>
                        <Text className="text-gray-300 font-lato text-sm font-medium">{genre}</Text>
                        <Text className="text-gray-500 text-[8px]">•</Text>
                        <Text className="text-gray-300 font-lato text-sm italic">{duration}</Text>
                    </View>

                    {/* Ratings Row */}
                    <View className="flex-row items-center justify-center space-x-4 mb-6">
                        <View className="flex-row items-center bg-gray-800/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-gray-600">
                            <Ionicons name="star" size={14} color="#FBBF24" />
                            <Text className="text-white font-bold ml-1.5 text-sm">{imdbRating}</Text>
                            <Text className="text-gray-400 text-[10px] ml-1">/10</Text>
                        </View>
                        <View className="flex-row items-center bg-gray-800/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-gray-600">
                            {/* Simple Tomato concept */}
                            <Ionicons name="water" size={14} color="#F87171" style={{ transform: [{ rotate: '180deg' }] }} />
                            <Text className="text-white font-bold ml-1.5 text-sm">{rottenTomatoesRating}</Text>
                        </View>
                    </View>

                    {/* Action Buttons */}
                    <View className="flex-row space-x-3">
                        <TouchableOpacity className="aspect-square bg-gray-800/80 rounded-2xl justify-center items-center border border-gray-600 active:bg-gray-700">
                            <Ionicons name="add" size={24} color="white" />
                        </TouchableOpacity>

                        <TouchableOpacity className="flex-1 bg-white rounded-2xl py-3.5 flex-row justify-center items-center shadow-lg active:opacity-90">
                            <Ionicons name="play" size={20} color="black" />
                            <Text className="text-black font-bold text-base ml-2 font-lato">Play Trailer</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    );
};

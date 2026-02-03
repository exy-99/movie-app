import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Image, Text, View } from "react-native";

interface RankedItemProps {
    rank: number;
    title: string;
    image: any;
    rating: string;
    duration: string;
    genre: string;
}

const getRankColor = (rank: number) => {
    switch (rank) {
        case 2: return "text-gray-300"; // Silverish
        case 3: return "text-orange-300"; // Bronzeish
        default: return "text-gray-400"; // Standard
    }
};

const getRankBorder = (rank: number) => {
    switch (rank) {
        case 2: return "border-gray-300";
        case 3: return "border-orange-300";
        default: return "border-transparent";
    }
};

export const RankedItem: React.FC<RankedItemProps> = ({
    rank,
    title,
    image,
    rating,
    duration,
    genre
}) => {
    const formattedRank = rank < 10 ? `0${rank}` : `${rank}`;
    const rankColor = getRankColor(rank);

    return (
        <View className="flex-row items-center mb-6 pl-2">
            {/* Rank Column */}
            <View className="mr-4 items-center justify-center w-8">
                <Text className={`text-2xl font-playfairBold font-italic ${rankColor}`}>
                    {formattedRank}
                </Text>
                {rank <= 3 && (
                    <View className={`h-[2px] w-4 mt-1 bg-current opacity-50 ${rankColor.replace('text-', 'bg-')}`} />
                )}
            </View>

            {/* Card Content (Side-by-Side) */}
            <View className="flex-1 flex-row bg-white rounded-2xl p-2 shadow-sm border border-gray-100">
                {/* Poster */}
                <View className="w-[80px] aspect-[2/3] rounded-xl overflow-hidden bg-gray-200">
                    <Image
                        source={image}
                        className="w-full h-full"
                        resizeMode="cover"
                    />
                </View>

                {/* Info */}
                <View className="flex-1 ml-3 py-1 justify-between">
                    <View>
                        <Text className="text-lg font-playfairBold text-slate-800 leading-tight mb-1" numberOfLines={2}>
                            {title}
                        </Text>

                        {/* Rating & Duration */}
                        <View className="flex-row items-center space-x-3 mb-2">
                            <View className="flex-row items-center">
                                <Ionicons name="star" size={12} color="#FBBF24" />
                                <Text className="text-slate-600 text-xs font-bold ml-1">{rating}</Text>
                            </View>
                            <Text className="text-gray-300 text-[10px]">•</Text>
                            <Text className="text-gray-500 text-xs font-lato">{duration}</Text>
                        </View>
                    </View>

                    {/* Genre Tag */}
                    <View className="self-start bg-gray-100 rounded px-2 py-0.5">
                        <Text className="text-gray-500 text-[10px] font-lato uppercase tracking-wider">
                            {genre}
                        </Text>
                    </View>
                </View>
            </View>
        </View>
    );
};

import React from "react";
import { Image, Text, View } from "react-native";

interface FeaturedMovieProps {
    title: string;
    director?: string;
    cast?: string;
    year: string;
    country: string;
    genre: string;
    description: string;
    duration: string;
    image: any;
}

export const FeaturedMovie: React.FC<FeaturedMovieProps> = ({
    title,
    director,
    year,
    country,
    genre,
    description,
    duration,
    image,
}) => {
    return (
        <View className="pt-4 pb-2 relative">
            {/* Wireframe Decoration: Top Left Content Bracket */}
            <View className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-black" />

            <View className="flex-row px-1">
                {/* Poster (Left) */}
                <View className="w-[110px] aspect-[2/3] mr-4 shadow-sm bg-gray-200 rounded-lg overflow-hidden">
                    <Image
                        source={image}
                        className="w-full h-full"
                        resizeMode="cover"
                    />
                </View>

                {/* Content (Right) */}
                <View className="flex-1">
                    {/* Director Super-title */}
                    <Text className="text-sm font-lato text-gray-600 mb-0.5 italic">
                        {director ? `${director.split(' ')[2] || director} film` : 'Cinema film'}
                    </Text>

                    {/* Title */}
                    <Text className="text-[32px] font-playfairBold text-red-900 leading-9 mb-1">
                        {title}
                    </Text>

                    {/* Meta: Year Country */}
                    <View className="flex-row items-center mb-2">
                        <Text className="text-lg font-lato text-gray-500 mr-3">{year}</Text>
                        <Text className="text-lg font-lato text-gray-400 font-light italic">{country}</Text>
                    </View>

                    {/* Genre Tag - Bordered */}
                    <View className="self-start border border-red-300 rounded px-1.5 py-0.5 mb-3">
                        <Text className="text-red-500 text-[11px] font-lato lowercase">
                            {genre}
                        </Text>
                    </View>

                    {/* Description */}
                    <Text className="text-[13px] font-lato text-gray-800 leading-5 mb-4" numberOfLines={4}>
                        {description}
                    </Text>
                </View>
            </View>

            {/* Duration & Bottom Right Bracket */}
            <View className="absolute bottom-[-5px] right-0 flex-row items-end">
                <Text className="text-xl font-lato text-gray-400 mr-2 mb-1">{duration}</Text>
                <View className="w-4 h-4 border-b-2 border-r-2 border-black mb-1" />
            </View>
        </View>
    );
};

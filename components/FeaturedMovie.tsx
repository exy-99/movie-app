import React from "react";
import { Image, Text, View } from "react-native";

interface FeaturedMovieProps {
    title: string;
    year: string;
    country: string;
    genre: string;
    description: string;
    duration: string;
    image: any;
}

export const FeaturedMovie: React.FC<FeaturedMovieProps> = ({
    title,
    year,
    country,
    genre,
    description,
    duration,
    image,
}) => {
    return (
        <View className="mb-8">
            <View className="flex-row">
                {/* Poster Image */}
                <View className="w-[55%] aspect-[2/3] rounded-2xl overflow-hidden mr-4 shadow-lg bg-gray-200">
                    <Image
                        source={image}
                        className="w-full h-full"
                        resizeMode="cover"
                    />
                </View>

                {/* Info Column */}
                <View className="flex-1 justify-between py-1">
                    <View>
                        <Text className="text-2xl font-playfairBold text-slate-800 leading-tight mb-2">
                            {title}
                        </Text>

                        <View className="flex-row items-center mb-3 space-x-4">
                            <Text className="text-gray-500 font-lato">{year}</Text>
                            <Text className="text-gray-500 font-lato">{country}</Text>
                        </View>

                        <View className="items-start mb-3">
                            <View className="border border-red-300 rounded px-1.5 py-0.5">
                                <Text className="text-red-400 text-xs font-latoBold uppercase tracking-wide">
                                    {genre}
                                </Text>
                            </View>
                        </View>

                        <Text className="text-gray-800 font-playfair text-sm leading-5" numberOfLines={10}>
                            {description}
                        </Text>
                    </View>

                    <View className="flex-row justify-end items-center mt-2 border-b-2 border-r-2 border-gray-300 w-full pb-1 pr-1" style={{ borderBottomWidth: 1, borderRightWidth: 1, borderColor: '#ccc', width: 'auto', alignSelf: 'flex-end', paddingBottom: 5, paddingRight: 5 }}>
                        <Text className="text-3xl text-gray-300 font-lato mr-1">
                            {duration}
                        </Text>
                    </View>
                </View>
            </View>
        </View>
    );
};

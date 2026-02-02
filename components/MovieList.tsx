
import React from "react";
import { Image, ScrollView, Text, View } from "react-native";

interface Movie {
    id: string;
    title: string;
    image: any;
}

interface MovieListProps {
    title: string;
    movies: Movie[];
}

export const MovieList: React.FC<MovieListProps> = ({ title, movies }) => {
    return (
        <View className="mb-6">
            <Text className="text-2xl font-playfair text-slate-700 mb-4 px-1">
                {title}
            </Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} className="pl-1">
                {movies.map((movie) => (
                    <View key={movie.id} className="mr-5 w-[140px]">
                        <View className="w-full aspect-[2/3] rounded-xl overflow-hidden mb-2 bg-gray-200 shadow-sm">
                            <Image
                                source={movie.image}
                                className="w-full h-full"
                                resizeMode="cover"
                            />
                        </View>
                        <Text className="text-slate-800 font-bold font-lato text-base leading-5">
                            {movie.title}
                        </Text>
                    </View>
                ))}
            </ScrollView>
        </View>
    );
};

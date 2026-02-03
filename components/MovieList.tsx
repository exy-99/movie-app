import React from "react";
import { Image, ScrollView, Text, View } from "react-native";

export interface Movie {
    id: string;
    title: string;
    image: any;
    rating: string;
    year: string;
    director?: string;
    status: 'theaters' | 'streaming';
}

interface MovieListProps {
    title: string;
    movies: Movie[];
}

export const MovieList: React.FC<MovieListProps> = ({ title, movies }) => {
    return (
        <View className="mb-8">
            {/* List Title - Clean with Bracket hint? Or just text */}
            <Text className="text-xl font-playfair text-black mb-4">
                {title}
            </Text>

            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {movies.map((movie) => (
                    <View key={movie.id} className="mr-5 w-[100px]">
                        {/* Poster */}
                        <View className="w-full aspect-[2/3] bg-gray-200 rounded-lg overflow-hidden mb-2 shadow-sm">
                            <Image
                                source={movie.image}
                                className="w-full h-full"
                                resizeMode="cover"
                            />
                        </View>

                        {/* Title */}
                        <Text className="text-sm font-lato text-black leading-4 text-center" numberOfLines={2}>
                            {movie.title}
                        </Text>
                    </View>
                ))}
            </ScrollView>
        </View>
    );
};

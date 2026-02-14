import { Movie } from "@/services/api";
import { getRoute } from "@/services/simkl";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import { Dimensions, FlatList, Image, Text, TouchableOpacity, View } from "react-native";

interface HeroCarouselProps {
    items: Movie[];
}

export default function HeroCarousel({ items }: HeroCarouselProps) {
    const router = useRouter();
    const [currentIndex, setCurrentIndex] = useState(0);
    const flatListRef = useRef<FlatList>(null);
    const { width, height } = Dimensions.get('window');
    const HERO_HEIGHT = height * 0.7;

    // Auto-Play
    useEffect(() => {
        if (items.length === 0) return;

        const intervalId = setInterval(() => {
            let nextIndex = currentIndex + 1;
            if (nextIndex >= items.length) {
                nextIndex = 0;
            }

            flatListRef.current?.scrollToIndex({
                index: nextIndex,
                animated: true,
            });
            setCurrentIndex(nextIndex);
        }, 8000); // 8 seconds per slide

        return () => clearInterval(intervalId);
    }, [currentIndex, items]);

    const renderItem = ({ item }: { item: Movie }) => {
        const mediaType = 'movie';

        const handlePress = () => {
            const route = getRoute(mediaType, Number(item.imdbId));
            router.push(route as any);
        };

        return (
            <View style={{ width: width, height: HERO_HEIGHT }}>
                <View className="flex-1 relative bg-[#000000]">
                    <Image
                        source={{ uri: item.imageSet?.verticalPoster?.w720 || item.imageSet?.verticalPoster?.w480 || 'https://via.placeholder.com/720x1080' }}
                        className="w-full h-full opacity-60"
                        resizeMode="cover"
                    />

                    {/* Cyberpunk Gradient Overlay - Pure Black */}
                    <LinearGradient
                        colors={['transparent', '#000000']}
                        locations={[0.4, 1]}
                        style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
                    />

                    {/* Top Scanline/Border */}
                    <View className="absolute top-0 w-full h-24 bg-gradient-to-b from-[#000000] to-transparent" />

                    {/* Content Overlay */}
                    <View className="absolute bottom-0 w-full px-5 pb-8 items-center">

                        {/* Dynamic Tag Box */}
                        <View className="border border-primary/30 bg-black/50 px-4 py-1.5 mb-6 backdrop-blur-sm">
                            <Text className="text-primary text-[10px] font-mono tracking-[0.2em] font-bold uppercase transition-all duration-300">
                                {item.genres?.slice(0, 3).map(g => g.name).join(' • ').toUpperCase() || 'FEATURED'}
                            </Text>
                        </View>

                        {/* Title with Glow Effect */}
                        <Text className="text-4xl font-black text-white text-center mb-6 font-mono tracking-tighter leading-tight italic"
                            style={{ textShadowColor: 'rgba(132, 249, 6, 0.5)', textShadowOffset: { width: 0, height: 0 }, textShadowRadius: 10 }}>
                            {item.title.toUpperCase()}
                        </Text>

                        {/* Action Buttons */}
                        <View className="flex-row items-center justify-center w-full max-w-md mb-10 px-4 gap-6">

                            {/* My List */}
                            <View className="items-center">
                                <TouchableOpacity className="items-center justify-center w-14 h-14 border border-white/30 bg-black/40 rounded-lg mb-2 active:bg-white/10">
                                    <Ionicons name="add" size={28} color="white" />
                                </TouchableOpacity>
                                <Text className="text-[10px] text-gray-400 font-mono tracking-widest font-bold">LIST</Text>
                            </View>

                            {/* Main Action - Green Block */}
                            <TouchableOpacity
                                onPress={handlePress}
                                className="w-48 h-14 bg-[#00FF41] flex-row items-center justify-center space-x-2 shadow-[0_0_40px_rgba(0,255,65,0.6)] rounded-sm border border-[#ccffcc] active:scale-95 transition-transform"
                            >
                                <Ionicons name="play-sharp" size={22} color="black" />
                                <Text className="text-black font-mono font-black text-lg tracking-[0.2em]">WATCH</Text>
                            </TouchableOpacity>

                            {/* Details */}
                            <View className="items-center">
                                <TouchableOpacity
                                    onPress={handlePress}
                                    className="items-center justify-center w-14 h-14 border border-white/30 bg-black/40 rounded-lg mb-2 active:bg-white/10"
                                >
                                    <Ionicons name="information-circle-outline" size={28} color="white" />
                                </TouchableOpacity>
                                <Text className="text-[10px] text-gray-400 font-mono tracking-widest font-bold">INFO</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        );
    };

    if (!items || items.length === 0) return null;

    return (
        <View style={{ height: HERO_HEIGHT }} className="mb-4">
            <FlatList
                ref={flatListRef}
                data={items}
                renderItem={renderItem}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item, index) => `hero-${item.imdbId}-${index}`}
                onMomentumScrollEnd={(event) => {
                    const index = Math.round(event.nativeEvent.contentOffset.x / width);
                    setCurrentIndex(index);
                }}
                getItemLayout={(data, index) => ({ length: width, offset: width * index, index })}
            />
        </View>
    );
}

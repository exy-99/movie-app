import ExternalLink from '@/components/ExternalLink';
import Header from "@/components/Header";
import { getContentRows, getHeroMovies, Movie } from "@/services/api";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Link, Stack } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import { ActivityIndicator, Dimensions, FlatList, Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import MovieSection from "../../components/MovieSection";
import SkeletonRow from "../../components/SkeletonRow";
import SmartGenreRow from "../../components/SmartGenreRow";

export default function Home() {
  const [heroMovies, setHeroMovies] = useState<Movie[]>([]);
  const [contentRows, setContentRows] = useState<{
    topRated: Movie[];
    newReleases: Movie[];
  } | null>(null);
  const [loadingHero, setLoadingHero] = useState(true);
  const [loadingRows, setLoadingRows] = useState(true);

  const [currentHeaderIndex, setCurrentHeaderIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);
  const { width, height } = Dimensions.get('window');

  // Hero Height = 70% for immersive look
  const HERO_HEIGHT = height * 0.7;


  // 1. Fetch Data
  useEffect(() => {
    const loadHero = async () => {
      setLoadingHero(true);
      const data = await getHeroMovies();
      setHeroMovies(data);
      setLoadingHero(false);
    };

    const loadRows = async () => {
      setLoadingRows(true);
      const data = await getContentRows();
      setContentRows(data);
      setLoadingRows(false);
    };

    loadHero();
    loadRows();
  }, []);

  // 2. Auto-Play Carousel
  useEffect(() => {
    if (heroMovies.length === 0) return;

    const intervalId = setInterval(() => {
      let nextIndex = currentHeaderIndex + 1;
      if (nextIndex >= Math.min(heroMovies.length, 5)) {
        nextIndex = 0;
      }

      flatListRef.current?.scrollToIndex({
        index: nextIndex,
        animated: true,
      });
      setCurrentHeaderIndex(nextIndex);
    }, 10000);

    return () => clearInterval(intervalId);
  }, [currentHeaderIndex, heroMovies]);

  const renderFeaturedItem = ({ item }: { item: Movie }) => (
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
            <Text className="text-primary text-[10px] font-mono tracking-[0.2em] font-bold uppercase">
              {item.genres?.slice(0, 3).map(g => g.name).join(' • ').toUpperCase() || 'CYBERPUNK • SCI-FI'}
            </Text>
          </View>

          {/* Title with Glow Effect */}
          <Text className="text-5xl font-black text-white text-center mb-6 font-mono tracking-tighter leading-tight italic"
            style={{ textShadowColor: 'rgba(132, 249, 6, 0.5)', textShadowOffset: { width: 0, height: 0 }, textShadowRadius: 10 }}>
            {item.title.toUpperCase()}
          </Text>

          {/* Action Buttons - CUSTOM LAYOUT FROM IMAGE */}
          <View className="flex-row items-start justify-between w-full max-w-md mb-10 px-4">

            {/* My List */}
            <View className="items-center">
              <TouchableOpacity className="items-center justify-center w-16 h-16 border border-white/30 bg-black/40 rounded-lg mb-2">
                <Ionicons name="add" size={30} color="white" />
              </TouchableOpacity>
              <Text className="text-[10px] text-gray-400 font-mono tracking-widest font-bold">MY LIST</Text>
            </View>

            {/* Main Action - Green Block */}
            <Link href={`/movie/${item.imdbId}?title=${encodeURIComponent(item.title)}&poster=${encodeURIComponent(item.imageSet?.verticalPoster?.w480 || 'https://via.placeholder.com/720x1080')}`} asChild>
              <TouchableOpacity className="bg-[#00FF41] w-56 h-16 flex-row items-center justify-center space-x-3 shadow-[0_0_60px_rgba(0,255,65,0.9)] rounded-sm border border-[#ccffcc]">
                <Ionicons name="play-sharp" size={24} color="black" />
                <Text className="text-black font-mono font-black text-lg tracking-[0.2em]">EXECUTE</Text>
              </TouchableOpacity>
            </Link>

            {/* Details */}
            <View className="items-center">
              <TouchableOpacity className="items-center justify-center w-16 h-16 border border-white/30 bg-black/40 rounded-lg mb-2">
                <Ionicons name="information-circle-outline" size={30} color="white" />
              </TouchableOpacity>
              <Text className="text-[10px] text-gray-400 font-mono tracking-widest font-bold">DETAILS</Text>
            </View>
          </View>

          {/* Protocol Marker REMOVED as per user request */}

        </View>
      </View>
    </View>
  );

  return (
    <View className="flex-1 bg-[#000000]">
      <Stack.Screen options={{ headerShown: false }} />

      {/* Header overlaid on top */}
      <View className="absolute top-0 left-0 right-0 z-50">
        <Header />
      </View>

      <ScrollView className="flex-1 bg-[#000000]" showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>

        {/* HERO SECTION */}
        {loadingHero ? (
          <View style={{ height: HERO_HEIGHT }} className="justify-center items-center bg-[#000000]">
            <ActivityIndicator size="large" color="#84f906" />
          </View>
        ) : (
          <View style={{ height: HERO_HEIGHT }} className="mb-4">
            <FlatList
              ref={flatListRef}
              data={heroMovies.slice(0, 5)}
              renderItem={renderFeaturedItem}
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item) => `featured-${item.imdbId}`}
              onMomentumScrollEnd={(event) => {
                const index = Math.round(event.nativeEvent.contentOffset.x / width);
                setCurrentHeaderIndex(index);
              }}
              getItemLayout={(data, index) => ({ length: width, offset: width * index, index })}
            />
          </View>
        )}



        {loadingRows ? (
          <View className="pt-4">
            <SkeletonRow />
            <SkeletonRow />
            <SkeletonRow />
          </View>
        ) : (
          contentRows && (
            <View className="gap-8">
              {/* TRENDING_NOW (Was ANIME_SECTOR) */}
              <MovieSection
                title="TRENDING_NOW"
                movies={contentRows.newReleases}
                variant="large"
                layout="double-scroll"
              />

              {/* TOP_RATED (Was TRENDING_NOW) */}
              <MovieSection
                title="TOP_RATED"
                movies={contentRows.topRated}
                variant="large"
                layout="double-scroll"
              />

              {/* Smart Genre Rows - All Large Double Scroll */}
              <SmartGenreRow
                title="ACTION"
                genre="Action"
                variant="large"
                layout="double-scroll"
              />

              <SmartGenreRow
                title="COMEDY"
                genre="Comedy"
                variant="large"
                layout="double-scroll"
              />
            </View>
          )
        )}

        <ExternalLink
          url="https://simkl.com"
          text="SYSTEM_CORE: SIMKL"
          style={{ marginTop: 40, marginBottom: 40, alignSelf: 'center', opacity: 0.5 }}
        />

      </ScrollView >
    </View >
  );
}

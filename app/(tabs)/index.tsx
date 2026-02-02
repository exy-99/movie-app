import { Ionicons } from "@expo/vector-icons";
import { Stack } from "expo-router";
import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { FeaturedMovie } from "../../components/FeaturedMovie";
import { MovieList } from "../../components/MovieList";

// Dummy Data
const FEATURED_MOVIE = {
  title: "GREENLAND 2",
  year: "2026",
  country: "USA",
  genre: "thriller",
  description:
    "In the aftermath of a comet strike that decimated most of the planet, the Garrity family must leave the safety of their Greenland bunker to traverse a shattered world in search of a new home.",
  duration: "2h 15m",
  image: { uri: "https://image.tmdb.org/t/p/w500/abf8tHznhSvl9BAlJXjF8xeJMjE.jpg" }, // Using a real-ish looking placeholder or real URL if compatible
};

const LATEST_MOVIES = [
  {
    id: "1",
    title: "Anaconda",
    image: { uri: "https://image.tmdb.org/t/p/w500/8j58iSEQqpr027OxJD1P5D42BOi.jpg" },
  },
  {
    id: "2",
    title: "Zootopia 2",
    image: { uri: "https://image.tmdb.org/t/p/w500/7M5e0eE5fF3b9gG6f6fF4h6h6.jpg" }, // distinct validish url or placeholder
  },
  {
    id: "3",
    title: "Avatar: Fire and Ash",
    image: { uri: "https://image.tmdb.org/t/p/w500/t6HIqrRAclMCA60NSSmgqi9Ur7e.jpg" },
  },
  {
    id: "4",
    title: "The Housemaid",
    image: { uri: "https://image.tmdb.org/t/p/w500/s9Y3h3e3f3f3f3f3f3f3.jpg" }, // placeholder
  },
];

export default function Home() {
  const [menuVisible, setMenuVisible] = React.useState(false);

  return (
    <SafeAreaView className="flex-1 bg-white" edges={['top']}>
      <Stack.Screen options={{ headerShown: false }} />

      {/* Header */}
      <View className="px-5 py-4 flex-row justify-between items-center border-b border-gray-100 mb-2 z-50">
        <Text className="text-3xl font-hennyPenny text-black">WatchMe</Text>
        <TouchableOpacity onPress={() => setMenuVisible(!menuVisible)}>
          <Ionicons name={menuVisible ? "close-outline" : "menu-outline"} size={32} color="black" />
        </TouchableOpacity>
      </View>

      {/* Dropdown Menu */}
      {menuVisible && (
        <View className="absolute top-20 right-5 bg-white shadow-xl rounded-xl p-4 w-48 z-50 border border-gray-200">
          <TouchableOpacity className="py-3 border-b border-gray-100 flex-row items-center">
            <Ionicons name="person-outline" size={20} color="#333" />
            <Text className="ml-3 font-lato text-gray-700">Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity className="py-3 border-b border-gray-100 flex-row items-center">
            <Ionicons name="settings-outline" size={20} color="#333" />
            <Text className="ml-3 font-lato text-gray-700">Settings</Text>
          </TouchableOpacity>
          <TouchableOpacity className="py-3 flex-row items-center">
            <Ionicons name="help-circle-outline" size={20} color="#333" />
            <Text className="ml-3 font-lato text-gray-700">Help</Text>
          </TouchableOpacity>
        </View>
      )}

      <ScrollView className="flex-1 px-5" showsVerticalScrollIndicator={false}>
        {/* Top Watched Section */}
        <View className="mt-4 mb-2">
          <View className="flex-row items-start mb-4">
            <View className="border-l-2 border-gray-400 pl-3">
              <Text className="text-2xl text-gray-700 font-playfair">Top Watched</Text>
            </View>
          </View>
          <FeaturedMovie {...FEATURED_MOVIE} />
        </View>

        {/* Latest Movies Section */}
        <View className="mb-8">
          <Text className="text-2xl text-gray-700 font-playfair mb-4 px-1">Latest Movies</Text>
          <MovieList title="" movies={LATEST_MOVIES} />
        </View>

        {/* Second Row/Another List (Optional based on screenshot having rows) */}
        <View className="flex-row flex-wrap justify-between">
          {/* Just reusing the list component data for grid view simulation or similar */}
          {LATEST_MOVIES.map((movie) => (
            <View key={movie.id} className="w-[48%] mb-6">
              <View className="w-full aspect-[2/3] rounded-xl overflow-hidden mb-2 bg-gray-200">
                <View style={{ backgroundColor: '#ccc', width: '100%', height: '100%' }}>
                  {/* Fallback if image fails, or use actual image */}
                  <Text className="hidden">{movie.title}</Text>
                  <Text> </Text>
                  {/* We need actual Image component here as well if we want grid */}
                </View>
              </View>
              <Text className="text-slate-800 font-bold font-lato text-base">{movie.title}</Text>
            </View>
          ))}
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

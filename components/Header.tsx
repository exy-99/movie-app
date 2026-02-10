import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Header() {
    return (
        <SafeAreaView edges={['top']} className="px-4 pb-4 flex-row justify-between items-center z-50 bg-transparent pt-2">

            {/* LEFT: LOGO */}
            <View className="flex-row items-center">
                <Text className="text-xl font-hennyPenny text-primary">
                    WatchMe
                </Text>
            </View>

            {/* CENTER: NAV TABS */}
            <View className="flex-row gap-8">
                <TouchableOpacity className="border-b-2 border-primary pb-1">
                    <Text className="text-primary font-mono text-base tracking-widest font-bold">FILMS</Text>
                </TouchableOpacity>
                <TouchableOpacity className="border-b-2 border-transparent">
                    <Text className="text-gray-500 font-mono text-base tracking-widest">SERIES</Text>
                </TouchableOpacity>
                <TouchableOpacity className="border-b-2 border-transparent">
                    <Text className="text-gray-500 font-mono text-base tracking-widest">ANIME</Text>
                </TouchableOpacity>
            </View>

            {/* RIGHT: SEARCH */}
            <Link href="/search" asChild>
                <TouchableOpacity>
                    <Ionicons name="search" size={24} color="#84f906" />
                </TouchableOpacity>
            </Link>
        </SafeAreaView>
    );
}

import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Profile() {
  return (
    <View className="flex-1 bg-[#000000]">
      <SafeAreaView edges={["top"]} className="flex-1">
        <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
          {/* Header */}
          <View className="px-4 py-4 flex-row justify-between items-center">
            <Text className="text-3xl font-hennyPenny text-primary shadow-black drop-shadow-md">
              Profile
            </Text>
            <TouchableOpacity>
              <Ionicons name="settings-outline" size={24} color="white" />
            </TouchableOpacity>
          </View>

          {/* User Info */}
          <View className="items-center mt-6">
            <View className="relative">
              <View className="w-32 h-32 rounded-full bg-gray-800 border-2 border-primary justify-center items-center overflow-hidden">
                <Ionicons name="person" size={60} color="#666" />
                {/* <Image 
                  source={{ uri: "https://via.placeholder.com/150" }} 
                  className="w-full h-full" 
                /> */}
              </View>
              <TouchableOpacity className="absolute bottom-0 right-0 bg-primary p-2 rounded-full border-4 border-black">
                <Ionicons name="camera" size={16} color="black" />
              </TouchableOpacity>
            </View>
            <Text className="text-white text-2xl font-bold mt-4 font-lato">
              user
            </Text>
            <Text className="text-gray-400 text-sm">@user</Text>
          </View>

          {/* Stats */}
          {/* <View className="flex-row justify-around mt-8 px-4">
            <View className="items-center">
              <Text className="text-primary text-xl font-bold">142</Text>
              <Text className="text-gray-500 text-xs uppercase tracking-wider">Movies</Text>
            </View>
            <View className="w-[1px] bg-gray-800" />
            <View className="items-center">
              <Text className="text-primary text-xl font-bold">58</Text>
              <Text className="text-gray-500 text-xs uppercase tracking-wider">TV Shows</Text>
            </View>
            <View className="w-[1px] bg-gray-800" />
            <View className="items-center">
              <Text className="text-primary text-xl font-bold">23</Text>
              <Text className="text-gray-500 text-xs uppercase tracking-wider">Anime</Text>
            </View>
          </View> */}

          {/* Menu Actions */}
          {/* <View className="mt-10 px-4 gap-4">
            <MenuOption icon="heart-outline" label="Favorites" />
            <MenuOption icon="time-outline" label="Watch History" />
            <MenuOption icon="list-outline" label="My Lists" />
            <MenuOption icon="notifications-outline" label="Notifications" badge={3} />
            <MenuOption icon="card-outline" label="Subscription" />
            <MenuOption icon="help-circle-outline" label="Help & Support" />
          </View> */}

          {/* Logout */}
          <View className="mt-10 px-4 mb-4">
            <TouchableOpacity className="flex-row items-center justify-center p-4 border border-red-900/50 rounded-xl bg-red-950/10">
              <Ionicons name="log-out-outline" size={20} color="#FF453A" />
              <Text className="text-[#FF453A] font-bold ml-2">Log Out</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

function MenuOption({ icon, label, badge }: { icon: keyof typeof Ionicons.glyphMap; label: string; badge?: number }) {
  return (
    <TouchableOpacity className="flex-row items-center bg-gray-900/40 p-4 rounded-xl active:bg-gray-800">
      <View className="w-10 h-10 rounded-full bg-gray-800 justify-center items-center">
        <Ionicons name={icon} size={20} color="#00FF41" />
      </View>
      <Text className="text-white font-semibold ml-4 flex-1 text-base">{label}</Text>
      {badge ? (
        <View className="bg-primary px-2 py-0.5 rounded-full mr-2">
          <Text className="text-black text-xs font-bold">{badge}</Text>
        </View>
      ) : null}
      <Ionicons name="chevron-forward" size={20} color="#666" />
    </TouchableOpacity>
  );
}
import { Text, View } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
export default function Index() {
  return (
    <SafeAreaView className="flex-1 items-center justify-center">
      <Text className="text-5xl text-slate-500 font-bold ">Welcome!</Text>
    </SafeAreaView>
  );
}

import SignOutButton from "@/component/SignOutButton";
import { SignedOut, useClerk } from "@clerk/clerk-expo";
import {
  Button,
  Text,
  View,
  Pressable,
  Touchable,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  const { signOut } = useClerk();
  return (
    <SafeAreaView >
      <Text className='text-4xl font-bold text-blue-500'>
        Welcome to Alema!
      </Text>

      <SignOutButton />
    </SafeAreaView>
  );
}

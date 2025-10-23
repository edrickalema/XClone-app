import { SignedOut, useClerk } from "@clerk/clerk-expo";
import {
  Button,
  Text,
  View,
  Pressable,
  Touchable,
  TouchableOpacity,
} from "react-native";

export default function App() {
  const { signOut } = useClerk();
  return (
    <View className='flex-1 items-center justify-center bg-white'>
      <Text className='text-4xl font-bold text-blue-500'>
        Welcome to Alema!
      </Text>

      <TouchableOpacity onPress={() => signOut()}>
        <Text>Out</Text>
      </TouchableOpacity>
    </View>
  );
}

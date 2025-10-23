import { useClerk } from "@clerk/clerk-expo";
import { Alert } from "react-native";

export const useSignOut = () => {
  const { signOut } = useClerk();

  const handlesSignOut = () => {
    Alert.alert("Logout", "Are you sure you want to logout", [
      { text: "Logout", style: "destructive", onPress: () => signOut() },
      { text: "Cancel", style: "cancel" },
    ]);
  };

  return {
    handlesSignOut,
  };
};

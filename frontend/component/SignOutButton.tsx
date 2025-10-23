import { useSignOut } from "@/hooks/useSignOut";
import { Feather } from "@expo/vector-icons";
import { View, Text, TouchableOpacity } from "react-native";
export default function SignOutButton() {

    const {handlesSignOut} = useSignOut()
  return (
    <TouchableOpacity onPress={handlesSignOut}>
      <Feather color={"#E0245E"} size={24} name='log-out' />
    </TouchableOpacity>
  );
}

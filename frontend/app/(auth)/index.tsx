import { useSocialAuth } from "@/hooks/useSocialAuth";
import { useState } from "react";
import {
  ActivityIndicator,
  Image,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function Index() {
  const { isLoading, handleSocialAuth } = useSocialAuth();
  return (
    <View className='flex-1 bg-white'>
      <View className='flex-1 px-8 justify-between'>
        <View className='flex-1 justify-center'>
          {/* APP DEMO IMAGE */}
          <View className='items-center'>
            <Image
              source={require("../../assets/images/auth2.png")}
              className='size-96'
              resizeMode='contain'
            />
          </View>

          <View className='flex-col gap-3 mt-4'>
            <TouchableOpacity
              onPress={() => handleSocialAuth("oauth_google")}
              className='flex-row items-center justify-center bg-white border border-gray-300 rounded-full py-3 px-6'
              disabled={isLoading}
              style={{
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.1,
                shadowRadius: 2,
                elevation: 2,
              }}
            >
              {isLoading ? (
                <ActivityIndicator size={"small"} color={"#6875e"} />
              ) : (
                <View className=' flex-row items-center justify-center'>
                  <View>
                    <Image
                      resizeMode='contain'
                      className='size-10 mr-3'
                      source={require("../../assets/images/google.png")}
                    />
                  </View>
                  <Text className='text-black font-bold text-base'>
                    Continue with Google
                  </Text>
                </View>
              )}
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => handleSocialAuth("oauth_apple")}
              className='flex-row items-center justify-center bg-white border border-gray-300 rounded-full py-3 px-6'
              disabled={isLoading}
              style={{
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.1,
                shadowRadius: 2,
                elevation: 2,
              }}
            >
              {isLoading ? (
                <ActivityIndicator size={"small"} color={"#6875e"} />
              ) : (
                <View className=" flex-row items-center justify-center'">
                  <View>
                    <Image
                      resizeMode='contain'
                      className='size-8 mr-3'
                      source={require("../../assets/images/apple.png")}
                    />
                  </View>
                  <Text className='text-black font-bold text-base'>
                    Continue with Apple
                  </Text>
                </View>
              )}
            </TouchableOpacity>
          </View>

          <Text className='text-center max-w-sm text-gray-500 text-xs ledaing-4 mt-6 px-2'>
            By signing up, you agree to our{" "}
            <Text className='text-blue-500'>Terms</Text> {", "}
            <Text className='text-blue-500'>Privacy policy</Text> {", and"}{" "}
            <Text className='text-blue-500'>Cookie use</Text>.
          </Text>
        </View>
      </View>
    </View>
  );
}

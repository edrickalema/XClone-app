import { Image, Text, TouchableOpacity, View } from "react-native";

export default function Index() {
  return (
    <View className='flex-1 bg-white'>
      <View className='flex-1 px-8 justify-between'>
        <View className='flex-1 justify-center'>
          {/* APP DEMO IMAGE */}
          <View className='items-center'>
            <Image
              source={require("../../assets/images/auth1.png")}
              className='size-96'
              resizeMode='contain'
            />
          </View>

          <View className='flex-col gap-2'>
            <TouchableOpacity
              onPress={() => {}}
              className='flex-row items-center justify-center bg-white border border-gray-300 rounded-full py-3 px-6'
              disabled={true}
              style={{
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.1,
                shadowRadius: 2,
                elevation: 2,
              }}
            >
              <View>
                <Image
                  resizeMode='contain'
                  className='size-10 mr-3'
                  source={require("../../assets/images/google.png")}
                />
              </View>

              <Text className='text-black font-bold text-base'>
                Continue with google
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {}}
              className='flex-row items-center justify-center bg-white border border-gray-300 rounded-full py-3 px-6'
              disabled={true}
              style={{
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.1,
                shadowRadius: 2,
                elevation: 2,
              }}
            >
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
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}

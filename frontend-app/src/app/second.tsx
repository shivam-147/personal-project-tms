import { Link, useLocalSearchParams } from "expo-router";
import { Button, Text, View } from "react-native";

export default function Index() {

    const param = useLocalSearchParams<{name?: string}>()

  return (
    <View className="flex-1 justify-center items-center bg-green-300">
      <Text className="text-3xl text-red-500">Second</Text>
      <Text>{param.name}</Text>
      <Link href="/third" push asChild>
        <Button title="go to third" />
      </Link>
    </View>
  );
}

import { Link, useRouter } from "expo-router";
import { Button, Text, View } from "react-native";

export default function Index() {

    const router = useRouter()

  return (
    <View className="flex-1 justify-center items-center bg-purple-300">

        <Text className="text-3xl text-red-500">Third</Text>

        <Link href="/" push asChild>
        <Button title="go to index" />
        </Link>

        <Link href="/second" replace asChild>
        <Button title="replace to second" />
        </Link>

        <Button title='to index by router'onPress={() => router.push('/')} />

    </View>
  );
}

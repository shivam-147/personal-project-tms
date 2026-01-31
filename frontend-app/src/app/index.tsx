import { Link } from "expo-router";
import { Button, Text, View } from "react-native";

export default function Index() {
  return (
    <View className="flex-1 justify-center items-center">
      <Text className="text-3xl text-red-500">Hello, world</Text>
      <Link href={{
        pathname: '/second',
        params: {name: 'shivam'}
      }} push asChild>
        <Button title="go to second with greeting shivam"/>
      </Link>
    </View>
  );
}

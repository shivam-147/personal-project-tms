import { Stack } from "expo-router";
import '../../global.css';
import { Provider } from "react-redux";
import { store } from "../redux/store";
import Loader from "../components/Loader";
import Toast from "../components/Toast";
import { SafeAreaProvider } from "react-native-safe-area-context";


export default function RootLayout() {
  return (
    <Provider store={store}>
      <Loader />
      <Toast />
      <SafeAreaProvider>
        <Stack
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="(home)" />
          <Stack.Screen name="login" />
          <Stack.Screen name="register" />
        </Stack>
      </SafeAreaProvider>
    </Provider>
  )
}

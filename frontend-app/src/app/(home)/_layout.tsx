import { View, Text, TouchableOpacity } from 'react-native';
import { Drawer } from 'expo-router/drawer';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

function CustomDrawerContent(props: any) {
    const router = useRouter();
    const insets = useSafeAreaInsets();

    const user = {
        name: 'John Doe',
        email: 'john.doe@example.com',
        initials: 'JD',
    };

    const handleLogout = () => {
        router.replace('/login');
    };

    return (
        <View style={{ flex: 1 }}>
            <DrawerContentScrollView
                {...props}
                scrollEnabled={false}
                contentContainerStyle={{ backgroundColor: '#fff', padding: 0 }}
            >
                {/* Header Section */}
                <View
                    className="bg-indigo-600 px-6 pb-6 w-full mb-4 rounded-xl"
                    style={{ paddingTop: insets.top + 20 }}
                >
                    <View className="h-16 w-16 rounded-full bg-white items-center justify-center mb-3 shadow-sm">
                        <Text className="text-xl font-bold text-indigo-600">{user.initials}</Text>
                    </View>
                    <Text className="text-white text-lg font-bold">{user.name}</Text>
                    <Text className="text-indigo-100 text-sm">{user.email}</Text>
                </View>

                {/* Drawer Items */}
                <View className="flex-1 bg-white px-2">
                    <DrawerItemList {...props} />
                </View>
            </DrawerContentScrollView>

            {/* Logout Section */}
            <View className="p-4 border-t border-gray-100 mb-2" style={{ paddingBottom: 20 + insets.bottom }}>
                <TouchableOpacity
                    onPress={handleLogout}
                    className="flex-row items-center p-3 rounded-xl active:bg-gray-50"
                >
                    <Ionicons name="log-out-outline" size={24} color="#ef4444" />
                    <Text className="ml-3 text-gray-700 font-medium text-base">Logout</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

export default function ClientLayout() {
    return (
        <Drawer
            drawerContent={(props) => <CustomDrawerContent {...props} />}
            screenOptions={{
                headerShown: true,
                drawerActiveBackgroundColor: '#e0e7ff',
                drawerActiveTintColor: '#4338ca',
                drawerInactiveTintColor: '#4b5563',
                drawerLabelStyle: {
                    fontSize: 15,
                    fontWeight: '500',
                    marginLeft: 0,
                },
                drawerItemStyle: {
                    borderRadius: 12,
                    marginHorizontal: 0,
                    marginVertical: 4,
                    paddingHorizontal: 10,
                },
                headerStyle: { backgroundColor: '#fff', elevation: 0, shadowOpacity: 0, borderBottomWidth: 1, borderBottomColor: '#f3f4f6' },
                headerTintColor: '#1f2937',
                headerTitleStyle: { fontWeight: '600' },
                drawerType: 'front',
            }}
        >
            <Drawer.Screen
                name="dashboard"
                options={{
                    drawerLabel: 'Home',
                    title: 'Home',
                    drawerIcon: ({ color }) => <Ionicons name="home-outline" size={22} color={color} />,
                }}
            />
            <Drawer.Screen
                name="profile"
                options={{
                    drawerLabel: 'Profile',
                    title: 'Profile',
                    drawerIcon: ({ color }) => <Ionicons name="person-outline" size={22} color={color} />,
                }}
            />
        </Drawer>
    );
}
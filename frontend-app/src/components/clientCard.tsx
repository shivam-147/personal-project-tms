import { View, Text, TouchableOpacity } from "react-native";
import { useMemo } from "react";
import { useRouter } from "expo-router";

export default function ClientCard({ client }: { client: any }) {

    const router = useRouter();

    const initials = useMemo(() => {
        const name = client.name || "";
        if (!name) return "";
        const parts = name.trim().split(" ");
        if (parts.length > 1) {
            return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
        }
        return parts[0][0]?.toUpperCase() || "";
    }, [client.name]);

    const backgroundColor = useMemo(() => {
        const colors = [
            "#EF4444", "#F97316", "#F59E0B", "#84CC16",
            "#10B981", "#06B6D4", "#6366F1", "#8B5CF6",
            "#D946EF", "#F43F5E"
        ];
        let hash = 0;
        // Use _id for uniqueness, fallback to name
        const str = client._id || client.name || "default";
        for (let i = 0; i < str.length; i++) {
            hash = str.charCodeAt(i) + ((hash << 5) - hash);
        }
        return colors[Math.abs(hash) % colors.length];
    }, [client._id, client.name]);

    return (
        <View
            className="flex-row items-center p-4 bg-white mb-3 rounded-2xl border border-gray-100 dark:bg-neutral-900 dark:border-neutral-800"
            style={{
                elevation: 2,
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.05,
                shadowRadius: 8
            }}
        >
            <View
                className="w-12 h-12 rounded-full items-center justify-center mr-4"
                style={{ backgroundColor }}
            >
                <Text className="text-white text-lg font-bold">
                    {initials}
                </Text>
            </View>
            <TouchableOpacity className="flex-1 flex-row justify-between items-center"
            >
                <View className="flex-1 pr-2">
                    <Text className="text-lg font-bold text-gray-900 dark:text-white capitalize" numberOfLines={1}>
                        {client.name}
                    </Text>
                    <Text className="text-md text-gray-500 dark:text-gray-400" numberOfLines={1}>
                        {client.email}
                    </Text>
                </View>

                <View className="items-end mr-4">
                    <Text className="text-xs font-medium text-gray-500 dark:text-gray-400">
                        {client.frequency}
                    </Text>
                    <Text className="text-sm font-semibold text-green-600 dark:text-green-400">
                        ₹{client.ratePerTiffine}
                    </Text>
                </View>

                <View className="items-end">
                    <Text className="text-xs font-medium text-gray-500 dark:text-gray-400">
                        Adv: ₹{client.advanceAmount}
                    </Text>
                    <Text className="text-xs text-gray-400 dark:text-gray-500">
                        {new Date(client.dateOfStart).toLocaleDateString()}
                    </Text>
                </View>
            </TouchableOpacity>
        </View>
    )
}
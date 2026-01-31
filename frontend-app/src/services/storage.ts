import Storage from "expo-native-storage";

const storeData = async (key: string, data: any) => {
    try {
        const value = JSON.stringify(data)
        await Storage.setItem(key, value)
    } catch (err: any) {
        console.log('[STORE DATA ERROR] ', err.message)
    }
}

const restoreData = async (key: string) => {
    try {
        const data = await Storage.getItem(key)
        if (!data) return null

        return JSON.parse(data)
    } catch (err: any) {
        console.log('[STORE DATA ERROR] ', err.message)
    }
}

const removeData = async (key: string) => {
    try {
        await Storage.removeItem(key)
    } catch (err: any) {
        console.log('[REMOVE DATA ERROR] ', err.message)
    }
}

export { restoreData, storeData, removeData };

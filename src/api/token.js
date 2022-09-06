import AsyncStorage from "@react-native-async-storage/async-storage";
import { TOKEN } from "../utils/constants";

export async function setTokenApi(token) {
    try {
        await AsyncStorage.setItem(TOKEN, token)
        return true
    } catch (error) {
        return null;
    }
}

export const getTokenApi = async () => {
    try {
        const token = await AsyncStorage.getItem(TOKEN);
        return token;
    } catch (error) {
        return null;
    }
}

export const removeTokenApi = async () => {
    try {
        await AsyncStorage.removeItem(TOKEN)
        return true
    } catch (error) {
        return null
    }
}
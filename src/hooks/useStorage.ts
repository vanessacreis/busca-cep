import AsyncStorage from "@react-native-async-storage/async-storage";

export const useStorage = () => {
	const getValue = async (key: string) => {
		try {
			const value = await AsyncStorage.getItem(key);
			if (!value) return null;
			return JSON.parse(value);
		} catch (err) {
			console.error("Error:", key, err);
			return null;
		}
	};
	const saveValue = async (key: string, value: unknown) => {
		try {
			await AsyncStorage.setItem(key, JSON.stringify(value));
		} catch (err) {
			console.error("Error:", err);
		}
	};

	return {
		getValue,
		saveValue,
	};
};

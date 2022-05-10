import AsyncStorage from "@react-native-community/async-storage";

export const storeToLocal = async (key, value) => {
  try {
    const jsonValue = typeof value == "object" ? JSON.stringify(value) : value;
    console.log("value => ", typeof value);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (e) {
    console.log(`Error in storing ${key} =>`, e);
  }
};

export const getFromLocal = async (key) => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.log(`Error in getting value of ${key} =>`, e);
  }
};

export const removeFromLocal = async (key) => {
  try {
    const jsonValue = await AsyncStorage.removeItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
  }
};
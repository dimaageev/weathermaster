import AsyncStorage from "@react-native-async-storage/async-storage";
import { HistoryItem } from "@src/store/types";

const storeArrayInAsyncStorage = async (
  key: "history",
  array: Array<HistoryItem | undefined>
) => {
  try {
    const serializedArray = JSON.stringify(array);
    await AsyncStorage.setItem(key, serializedArray);
  } catch (error) {
    console.error("Error storing array in AsyncStorage:", error);
  }
};

export const getArrayFromAsyncStorage = async (key: "history") => {
  try {
    const serializedArray = await AsyncStorage.getItem(key);
    if (serializedArray === null) return [];

    return JSON.parse(serializedArray);
  } catch (error) {
    console.error("Error retrieving array from AsyncStorage:", error);
  }
  return null;
};

export const addElementToArrayInAsyncStorage = async (
  key: "history",
  element: HistoryItem | undefined
) => {
  try {
    const currentArray = await getArrayFromAsyncStorage(key);
    if (currentArray) {
      const updatedArray = [...currentArray, element];
      await storeArrayInAsyncStorage(key, updatedArray);
    } else {
      await storeArrayInAsyncStorage(key, [element]);
    }
  } catch (error) {
    console.error("Error updating array in AsyncStorage:", error);
  }
};

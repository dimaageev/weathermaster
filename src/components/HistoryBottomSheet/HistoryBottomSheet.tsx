import React, {
  forwardRef,
  useMemo,
  useCallback,
  useEffect,
  useState,
} from "react";
import { View, Text, TouchableOpacity, FlatList } from "react-native";
import {
  BottomSheetModal,
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
} from "@gorhom/bottom-sheet";
import { getArrayFromAsyncStorage } from "@src/utils/asyncStorage";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { startLoading, stopLoading } from "@src/utils/refs/loader";
import Ionicons from "@expo/vector-icons/Ionicons";

import st from "./style";
import { HistoryItem } from "@src/store/types";
import HistoryItemComponent from "../HistoryItem/HistoryItem";

interface Props {}

const HistoryBottomSheet = forwardRef<BottomSheetModal, Props>(({}, ref) => {
  const [history, setHistory] = useState<Array<HistoryItem>>([]);
  const snapPoints = useMemo(() => ["70%", "90%"], []);

  const renderBackdrop = useCallback(
    (props: BottomSheetBackdropProps) => (
      <BottomSheetBackdrop {...props} disappearsOnIndex={-1} />
    ),
    []
  );

  const onChange = async () => {
    startLoading();
    const historyArr = await getArrayFromAsyncStorage("history");
    setHistory(historyArr);
    stopLoading();
  };

  const removeHistory = async () => {
    try {
      await AsyncStorage.removeItem("history");
      onChange();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <BottomSheetModal
      ref={ref}
      snapPoints={snapPoints}
      index={1}
      onChange={onChange}
      backdropComponent={renderBackdrop}
    >
      <View>
        <View style={st.headerContainer}>
          <Text style={{ color: "red" }}>Delete History</Text>
          <TouchableOpacity onPress={removeHistory} style={st.button}>
            <Ionicons name="trash-outline" size={28} color="red" />
          </TouchableOpacity>
        </View>
      </View>
      <FlatList
        data={history}
        renderItem={({ item }) => <HistoryItemComponent item={item} />}
      />
    </BottomSheetModal>
  );
});

export default HistoryBottomSheet;

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
import useTheme from "@src/hooks/useTheme";
import { COLORS_COMMON } from "@src/constants/colors";
import Divider from "../Divider/Divider";

interface Props {}

const HistoryBottomSheet = forwardRef<BottomSheetModal, Props>(({}, ref) => {
  const [history, setHistory] = useState<Array<HistoryItem>>([]);
  const snapPoints = useMemo(() => ["70%", "90%"], []);
  const { theme } = useTheme();

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
      backgroundStyle={{ backgroundColor: theme.background }}
      handleIndicatorStyle={{ backgroundColor: theme.label }}
      onChange={onChange}
      backdropComponent={renderBackdrop}
    >
      <View style={st.headerContainer}>
        <Text style={{ color: COLORS_COMMON.red }}>Delete History</Text>
        <TouchableOpacity onPress={removeHistory} style={st.button}>
          <Ionicons name="trash-outline" size={28} color={COLORS_COMMON.red} />
        </TouchableOpacity>
      </View>
      <FlatList
        showsVerticalScrollIndicator={false}
        ListFooterComponent={
          <>
            <Divider xl />
            <Divider xl />
          </>
        }
        data={history.reverse()}
        renderItem={({ item }) => <HistoryItemComponent item={item} />}
      />
    </BottomSheetModal>
  );
});

export default HistoryBottomSheet;

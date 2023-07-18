import React, {
  forwardRef,
  useMemo,
  useCallback,
  useEffect,
  useState,
} from "react";
import { View, Text, TouchableOpacity } from "react-native";
import {
  BottomSheetModal,
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
} from "@gorhom/bottom-sheet";
import { getArrayFromAsyncStorage } from "@src/utils/asyncStorage";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface Props {}

const HistoryBottomSheet = forwardRef<BottomSheetModal, Props>(({}, ref) => {
  const [history, setHistory] = useState<any>([]);
  const snapPoints = useMemo(() => ["40%", "70%"], []);

  const renderBackdrop = useCallback(
    (props: BottomSheetBackdropProps) => <BottomSheetBackdrop {...props} />,
    []
  );

  const onChange = async () => {
    const array = await getArrayFromAsyncStorage("history");
    setHistory(array);
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
        <TouchableOpacity onPress={removeHistory}>
          <Text>Remove History</Text>
        </TouchableOpacity>
      </View>
      {history.map((item: any) => (
        <Text>{item.date}</Text>
      ))}
    </BottomSheetModal>
  );
});

export default HistoryBottomSheet;

import React, { forwardRef, useMemo, useCallback } from "react";
import { View } from "react-native";
import {
  BottomSheetModalProvider,
  BottomSheetModal,
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
} from "@gorhom/bottom-sheet";

interface Props {}

const HistoryBottomSheet = forwardRef<BottomSheetModal, Props>(({}, ref) => {
  const snapPoints = useMemo(() => ["40%", "70%"], []);

  const renderBackdrop = useCallback(
    (props: BottomSheetBackdropProps) => <BottomSheetBackdrop {...props} />,
    []
  );

  return (
    <BottomSheetModalProvider>
      <BottomSheetModal
        ref={ref}
        snapPoints={snapPoints}
        index={1}
        backdropComponent={renderBackdrop}
      >
        <View />
      </BottomSheetModal>
    </BottomSheetModalProvider>
  );
});

export default HistoryBottomSheet;
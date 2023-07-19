import { useCallback, useMemo, useRef, useState } from "react";
import { HomeScreen } from "@screens/index";
import {
  Header,
  HistoryBottomSheet,
  LevelModal,
  Loader,
} from "@src/components";
import { saveLoaderRef } from "@src/utils/refs/loader";
import { useDataset } from "@src/hooks/useDataset";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { Alert } from "react-native";
import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";

import "react-native-gesture-handler";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import useTheme from "@src/hooks/useTheme";
import { StatusBar } from "expo-status-bar";

export default function App() {
  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const { level, setLevel, dataset } = useDataset();
  const { theme } = useTheme();

  const onRestart = () => {
    Alert.alert(
      "Are you sure that you want to restart a game?",
      "Interrupted game won't be visible in your history",
      [
        {
          text: "Yes",
          onPress: () => setLevel(""),
          style: "destructive",
        },
        {
          text: "Cancel",
          onPress: () => {},
        },
      ]
    );
  };
  const onHistory = useCallback(() => {
    bottomSheetRef?.current?.present();
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <StatusBar
        translucent
        style={theme.label === "#FFF" ? "light" : "dark"}
      />
      <SafeAreaProvider>
        <BottomSheetModalProvider>
          <SafeAreaView style={{ flex: 1, backgroundColor: theme.background }}>
            <Header onLeftIconPress={onRestart} onRightIconPress={onHistory} />
            {!!dataset && (
              <HomeScreen
                level={level}
                dataset={dataset}
                onGameOver={() => setLevel("")}
              />
            )}
          </SafeAreaView>
          <Loader ref={saveLoaderRef} />
          <LevelModal level={level} setLevel={setLevel} />
          <HistoryBottomSheet ref={bottomSheetRef} />
        </BottomSheetModalProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

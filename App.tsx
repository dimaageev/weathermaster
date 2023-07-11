import { useState } from "react";
import { HomeScreen } from "@screens/index";
import { Header, LevelModal, Loader } from "@src/components";
import { saveLoaderRef } from "@src/utils/refs/loader";
import { useDataset } from "@src/hooks/useDataset";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { Alert } from "react-native";

export default function App() {
  const { level, setLevel, dataset } = useDataset();

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
  const onHistory = () => {};

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <Header onLeftIconPress={onRestart} onRightIconPress={onHistory} />
        {!!dataset && <HomeScreen level={level} dataset={dataset} />}
      </SafeAreaView>
      <Loader ref={saveLoaderRef} />
      <LevelModal level={level} setLevel={setLevel} />
    </SafeAreaProvider>
  );
}

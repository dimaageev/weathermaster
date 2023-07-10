import { useState } from "react";
import { HomeScreen } from "@screens/index";
import { LevelModal, Loader } from "@src/components";
import { saveLoaderRef } from "@src/utils/refs/loader";
import { useDataset } from "@src/hooks/useDataset";

export default function App() {
  const { level, setLevel, dataset } = useDataset();

  return (
    <>
      {!!dataset && <HomeScreen level={level} dataset={dataset} />}
      <Loader ref={saveLoaderRef} />
      <LevelModal level={level} setLevel={setLevel} />
    </>
  );
}

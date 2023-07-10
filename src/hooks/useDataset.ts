import { Level } from "@src/components/LevelModal/types";
import { EASY, HARD, MEDIUM } from "@src/constants/dataset";
import { useMemo, useState } from "react";

export const useDataset = () => {
  const [level, setLevel] = useState<Level>("");

  let dataset = useMemo(() => {
    switch (level) {
      case "easy":
        return EASY;
      case "medium":
        return MEDIUM;
      case "hard":
        return HARD;
      default:
        return;
    }
  }, [level]);

  return {
    level,
    setLevel,
    dataset,
  };
};

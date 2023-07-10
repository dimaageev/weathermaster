export type Level = "easy" | "medium" | "hard" | "";

export interface LevelModalProps {
  level: Level;
  setLevel: (value: Level) => void;
}

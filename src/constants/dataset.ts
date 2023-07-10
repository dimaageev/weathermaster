export type Dataset = {
  label: string;
  rounds: number;
  cardAmount: number;
  mistakes: number;
  help: number;
};

export const EASY = {
  label: "easy",
  rounds: 10,
  cardAmount: 2,
  mistakes: 1,
  help: 0,
};
export const MEDIUM = {
  label: "medium",
  rounds: 15,
  cardAmount: 3,
  mistakes: 1,
  help: 1,
};
export const HARD = {
  label: "hard",
  rounds: 20,
  cardAmount: 4,
  mistakes: 1,
  help: 1,
};

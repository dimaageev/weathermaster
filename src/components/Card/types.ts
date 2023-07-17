import { City } from "@src/store/types";

export interface CardProps {
  index: number;
  cityItem: City;
  flippedCards: Array<number> | undefined;
  disabled: boolean;
  highest: boolean;
  onCardPress: (item: City) => void;
}

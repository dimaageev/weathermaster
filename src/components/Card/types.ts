import { City } from "@src/store/types";

export interface CardProps {
  index: number;
  cityItem: City;
  highest: boolean;
  onCardPress: (item: City) => void;
}

import { City } from "@src/store/types";

export interface CardProps {
  cityItem: City;
  highest: boolean;
  onCardPress: (item: City) => void;
}

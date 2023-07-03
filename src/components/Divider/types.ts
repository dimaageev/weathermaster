import { StyleProp, ViewStyle } from "react-native";

export interface DividerProps {
  style?: StyleProp<ViewStyle>;
  sm?: boolean;
  md?: boolean;
  xl?: boolean;
  line?: boolean;
}

import React, { FC } from "react";
import { View } from "react-native";
import styles from "./styles";
import { DividerProps } from "./types";

const Divider: FC<DividerProps> = ({ style, sm, md, xl, line, ...props }) => {
  return (
    <View
      style={[
        styles.container,
        sm ? styles.sm : null,
        md ? styles.md : null,
        xl ? styles.xl : null,
        line ? styles.line : null,
        style,
      ]}
      {...props}
    />
  );
};

export default Divider;

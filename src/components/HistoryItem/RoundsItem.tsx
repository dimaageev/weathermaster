import React, { FC } from "react";
import { View, Text } from "react-native";
import { RoundItemProps } from "./types";

const RoundsItem: FC<RoundItemProps> = ({ round }) => {
  return (
    <View>
      <Text>{round?.correctAnswer?.temp}</Text>
    </View>
  );
};

export default RoundsItem;

import React, { FC } from "react";
import { View, Text } from "react-native";
import { CardProps } from "./types";

const Card: FC<CardProps> = ({ cityItem }) => {
  return (
    <View>
      <Text>{`${cityItem?.city}, ${
        cityItem?.countryCode === "US" ? cityItem?.region + ", " : ""
      } ${cityItem?.country}: ${cityItem?.temp}`}</Text>
    </View>
  );
};

export default Card;

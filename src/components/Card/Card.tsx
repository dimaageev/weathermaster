import React, { FC, useState } from "react";
import { View, Text, Pressable } from "react-native";
import { CardProps } from "./types";
import { MotiView } from "moti";

import st from "./styles";
import useTheme from "@src/hooks/useTheme";

const Card: FC<CardProps> = ({ cityItem }) => {
  const [flipped, setFlipped] = useState(false);
  const { theme } = useTheme();

  return (
    <Pressable
      style={[st.pressable, { backgroundColor: theme.background }]}
      onPress={() => setFlipped(!flipped)}
    >
      <MotiView style={st.wrapper}>
        {!flipped ? (
          <Text>{`${cityItem?.city}, ${
            cityItem?.countryCode === "US" ? cityItem?.region + ", " : ""
          } ${cityItem?.country}`}</Text>
        ) : (
          <Text>{cityItem?.temp}</Text>
        )}
      </MotiView>
    </Pressable>
  );
};

export default Card;

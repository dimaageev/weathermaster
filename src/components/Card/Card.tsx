import React, { FC, useState } from "react";
import { View, Text, Pressable } from "react-native";
import { CardProps } from "./types";
import { MotiText, MotiView } from "moti";

import st from "./styles";
import useTheme from "@src/hooks/useTheme";

const Card: FC<CardProps> = ({ cityItem, highest, onCardPress }) => {
  const [flipped, setFlipped] = useState(false);
  const { theme } = useTheme();

  const pressHandler = () => {
    onCardPress(cityItem);
    setFlipped(!flipped);
  };

  return (
    <Pressable
      style={[
        st.pressable,
        {
          backgroundColor: theme.background,
          borderWidth: flipped ? 2 : 0,
          borderColor: highest && flipped ? "green" : "red",
        },
      ]}
      onPress={pressHandler}
    >
      <MotiView
        style={st.wrapper}
        // from={{

        // }}
        // animate={{
        //   scaleX: flipped ? 0.05 : 1,
        // }}
        // transition={{
        //   loop: true,
        //   repeat: 2,
        //   duration: 200,
        // }}
      >
        {!flipped ? (
          <MotiText
          // from={{
          //   transform: [{ scale: flipped ? 1 : 0 }],
          // }}
          // animate={{
          //   transform: [{ scale: flipped ? 0 : 1 }],
          // }}
          // transition={{
          //   type: "timing",
          // }}
          >{`${cityItem?.city}, ${
            cityItem?.countryCode === "US" ? cityItem?.region + ", " : ""
          } ${cityItem?.country}`}</MotiText>
        ) : (
          <MotiText
          // from={{
          //   transform: [{ scale: flipped ? 0 : 1 }],
          // }}
          // animate={{
          //   transform: [{ scale: flipped ? 1 : 0 }],
          // }}
          // transition={{
          //   type: "timing",
          // }}
          >
            {cityItem?.temp}
          </MotiText>
        )}
      </MotiView>
    </Pressable>
  );
};

export default Card;

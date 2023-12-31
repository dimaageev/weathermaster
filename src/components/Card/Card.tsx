import React, { FC, useEffect, useState } from "react";
import { View, Text, Pressable } from "react-native";
import { CardProps } from "./types";
import { MotiView } from "moti";

import st from "./styles";
import useTheme from "@src/hooks/useTheme";
import { COLORS_COMMON } from "@src/constants/colors";

const Card: FC<CardProps> = ({
  index,
  cityItem,
  flippedCards,
  disabled,
  highest,
  onCardPress,
}) => {
  // const [flipped, setFlipped] = useState(false);
  const { theme } = useTheme();

  const pressHandler = () => {
    onCardPress(cityItem);
    // setFlipped(true);
  };

  return (
    <Pressable
      style={[st.pressable]}
      onPress={pressHandler}
      disabled={disabled}
    >
      <MotiView
        from={{
          translateY: 500,
        }}
        animate={{
          translateY: 0,
        }}
        transition={{
          delay: index * 500,
          type: "timing",
        }}
      >
        <MotiView
          style={[
            st.wrapper,
            {
              shadowColor: theme.label,
              backgroundColor: theme.background,
              borderWidth: flippedCards?.includes(cityItem.id) ? 2 : 0,
              borderColor:
                highest && flippedCards?.includes(cityItem.id)
                  ? COLORS_COMMON.green
                  : COLORS_COMMON.red,
            },
          ]}
          animate={{
            scaleX: flippedCards?.includes(cityItem.id) ? -1 : 1,
          }}
          transition={{
            type: "timing",
          }}
        >
          {!flippedCards?.includes(cityItem.id) ? (
            <Text style={[st.cityLabel, { color: theme.label }]}>{`${
              cityItem?.city
            }, ${cityItem?.region || ""}, ${cityItem?.country}`}</Text>
          ) : (
            <Text
              style={{
                color: theme.label,
                transform: [{ scaleX: -1 }],
              }}
            >
              {cityItem?.temp}
            </Text>
          )}
        </MotiView>
      </MotiView>
    </Pressable>
  );
};

export default Card;

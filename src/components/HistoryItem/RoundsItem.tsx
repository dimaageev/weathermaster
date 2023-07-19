import React, { FC } from "react";
import { View, Text } from "react-native";
import { RoundItemProps } from "./types";

import st from "./style";
import useTheme from "@src/hooks/useTheme";
import { COLORS_COMMON } from "@src/constants/colors";

const RoundsItem: FC<RoundItemProps> = ({ round, roundNumber }) => {
  const { theme } = useTheme();

  return (
    <View style={[st.roundContainer, { borderColor: theme.label }]}>
      <Text style={[st.roundHeaderLabel, { color: theme.label }]}>
        Round {roundNumber}
      </Text>
      <View style={st.answerContainer}>
        <Text style={[st.roundHeaderLabel, { color: theme.label }]}>
          Answers
        </Text>
        {round?.answers?.map((item, index) => (
          <View key={index}>
            <Text
              style={{
                color:
                  item.id === round?.correctAnswer?.id
                    ? COLORS_COMMON.green
                    : theme.label,
              }}
            >
              {item.city},{item.country}: {item.temp}
            </Text>
          </View>
        ))}
      </View>
      <View style={st.answerContainer}>
        <Text style={[st.roundHeaderLabel, { color: theme.label }]}>
          My answer{round?.myAnswers?.length! > 1 ? "s" : ""}
        </Text>
        {round?.myAnswers?.map((item, index) => (
          <View key={index}>
            <Text
              style={{
                color:
                  item.id === round?.correctAnswer?.id
                    ? COLORS_COMMON.green
                    : COLORS_COMMON.red,
              }}
            >
              {item.city},{item.country}: {item.temp}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
};

export default RoundsItem;

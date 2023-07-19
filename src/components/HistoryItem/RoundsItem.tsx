import React, { FC } from "react";
import { View, Text } from "react-native";
import { RoundItemProps } from "./types";

import st from "./style";
const RoundsItem: FC<RoundItemProps> = ({ round, roundNumber }) => {
  return (
    <View style={st.roundContainer}>
      <Text style={st.roundHeaderLabel}>Round {roundNumber}</Text>
      <View style={st.answerContainer}>
        <Text style={st.roundHeaderLabel}>Answers</Text>
        {round?.answers?.map((item, index) => (
          <View key={index}>
            <Text
              style={{
                color: item.id === round?.correctAnswer?.id ? "green" : "black",
              }}
            >
              {item.city},{item.country}: {item.temp}
            </Text>
          </View>
        ))}
      </View>
      <View style={st.answerContainer}>
        <Text style={st.roundHeaderLabel}>
          My answer{round?.myAnswers?.length! > 1 ? "s" : ""}
        </Text>
        {round?.myAnswers?.map((item, index) => (
          <View key={index}>
            <Text
              style={{
                color: item.id === round?.correctAnswer?.id ? "green" : "red",
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

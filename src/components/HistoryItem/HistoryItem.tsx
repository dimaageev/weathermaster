import React, { FC, useState } from "react";
import { View, Text, FlatList } from "react-native";
import { HistoryItemProps } from "./types";
import { TouchableOpacity } from "@gorhom/bottom-sheet";

import st from "./style";
import Ionicons from "@expo/vector-icons/Ionicons";
import RoundsItem from "./RoundsItem";

const HistoryItem: FC<HistoryItemProps> = ({ item }) => {
  const [detailsVisible, setDetailsVisible] = useState(false);

  const handleDetails = () => {
    setDetailsVisible((prev) => !prev);
  };

  return (
    <View style={st.wrapper}>
      <TouchableOpacity
        style={st.container}
        onPress={handleDetails}
        activeOpacity={1}
      >
        <Text>{item.date}</Text>
        <Text>{item.level?.toUpperCase()}</Text>
        <View
          style={[
            st.statusContainer,
            { backgroundColor: item.status === "win" ? "green" : "red" },
          ]}
        >
          <Text style={{ color: "white", fontWeight: "700" }}>
            {item.status?.toUpperCase()}
          </Text>
        </View>

        <Ionicons
          name={`chevron-${detailsVisible ? "up" : "down"}-outline`}
          size={22}
        />
      </TouchableOpacity>
      {detailsVisible ? (
        <View style={st.detailsContainer}>
          <Text style={{ fontWeight: "700" }}>Score: {item.score}</Text>
          <Text>Had Mistakes: {item.hadMistakes}</Text>
          <Text>Used helps: {item.helpsUsed}</Text>
          {/* {item.rounds.map((item, index) => (
            <RoundsItem
              key={`${item?.correctAnswer?.id} + ${index}`}
              round={item}
              roundNumber={index + 1}
            />
          ))} */}
          <FlatList
            data={item.rounds}
            renderItem={({ item, index }) => (
              <RoundsItem round={item} roundNumber={index + 1} />
            )}
          />
        </View>
      ) : null}
    </View>
  );
};

export default HistoryItem;

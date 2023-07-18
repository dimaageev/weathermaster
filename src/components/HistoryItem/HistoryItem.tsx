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
    <>
      <TouchableOpacity
        style={[
          st.container,
          detailsVisible
            ? {
                borderBottomLeftRadius: 0,
                borderBottomRightRadius: 0,
                borderBottomWidth: 0,
              }
            : {},
        ]}
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
          <FlatList
            data={item.rounds}
            renderItem={({ item }) => <RoundsItem round={item} />}
          />
        </View>
      ) : null}
    </>
  );
};

export default HistoryItem;

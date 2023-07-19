import React, { FC, useState } from "react";
import { View, Text, FlatList } from "react-native";
import { HistoryItemProps } from "./types";
import { TouchableOpacity } from "@gorhom/bottom-sheet";

import st from "./style";
import Ionicons from "@expo/vector-icons/Ionicons";
import RoundsItem from "./RoundsItem";
import { COLORS_COMMON } from "@src/constants/colors";
import useTheme from "@src/hooks/useTheme";

const HistoryItem: FC<HistoryItemProps> = ({ item }) => {
  const [detailsVisible, setDetailsVisible] = useState(false);
  const { theme } = useTheme();

  const handleDetails = () => {
    setDetailsVisible((prev) => !prev);
  };

  return (
    <View
      style={[
        st.wrapper,
        { backgroundColor: theme.background, borderColor: theme.label },
      ]}
    >
      <TouchableOpacity
        style={st.container}
        onPress={handleDetails}
        activeOpacity={1}
      >
        <Text style={{ color: theme.label }}>{item.date}</Text>
        <Text style={{ color: theme.label }}>{item.level?.toUpperCase()}</Text>
        <View
          style={[
            st.statusContainer,
            {
              backgroundColor:
                item.status === "win" ? COLORS_COMMON.green : COLORS_COMMON.red,
            },
          ]}
        >
          <Text style={{ color: COLORS_COMMON.white, fontWeight: "700" }}>
            {item.status?.toUpperCase()}
          </Text>
        </View>

        <Ionicons
          name={`chevron-${detailsVisible ? "up" : "down"}-outline`}
          size={22}
          color={theme.label}
        />
      </TouchableOpacity>
      {detailsVisible ? (
        <View style={st.detailsContainer}>
          <Text style={{ color: theme.label, fontWeight: "700" }}>
            Score: {item.score}
          </Text>
          <Text style={{ color: theme.label }}>
            Had Mistakes: {item.hadMistakes}
          </Text>
          <Text style={{ color: theme.label }}>
            Used helps: {item.helpsUsed}
          </Text>
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

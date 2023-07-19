import React, { FC } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Props } from "./types";

import st from "./style";
import Ionicons from "@expo/vector-icons/Ionicons";
import useTheme from "@src/hooks/useTheme";

const Header: FC<Props> = ({ onLeftIconPress, onRightIconPress }) => {
  const { theme } = useTheme();

  return (
    <View style={[st.container, { backgroundColor: theme.background }]}>
      <TouchableOpacity onPress={onLeftIconPress}>
        <Ionicons name="refresh" size={32} color={theme.label} />
      </TouchableOpacity>
      <TouchableOpacity onPress={onRightIconPress}>
        <Ionicons name="ios-book-outline" size={32} color={theme.label} />
      </TouchableOpacity>
    </View>
  );
};

export default Header;

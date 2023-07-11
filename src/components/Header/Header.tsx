import React, { FC } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Props } from "./types";

import st from "./style";
import Ionicons from "@expo/vector-icons/Ionicons";

const Header: FC<Props> = ({ onLeftIconPress, onRightIconPress }) => {
  return (
    <View style={st.container}>
      <TouchableOpacity onPress={onLeftIconPress}>
        <Ionicons name="refresh" size={32} />
      </TouchableOpacity>
      <TouchableOpacity onPress={onRightIconPress}>
        <Ionicons name="ios-book-outline" size={32} />
      </TouchableOpacity>
    </View>
  );
};

export default Header;

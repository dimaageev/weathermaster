import React, { FC } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Level, LevelModalProps } from "./types";
import Modal from "react-native-modal";

import st from "./style";
import styles from "@src/styles";
import useTheme from "@src/hooks/useTheme";

const LevelModal: FC<LevelModalProps> = ({ level, setLevel }) => {
  const { theme } = useTheme();
  const labels = ["Easy", "Medium", "Hard"];

  return (
    <View>
      <Modal isVisible={!level} style={styles.align}>
        <View style={[st.container, { backgroundColor: theme.card }]}>
          {labels.map((label) => (
            <TouchableOpacity
              key={label}
              onPress={() => setLevel(label.toLowerCase() as Level)}
            >
              <Text style={{ color: theme.label }}>{label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </Modal>
    </View>
  );
};

export default LevelModal;

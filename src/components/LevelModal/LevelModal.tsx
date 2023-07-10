import React, { FC } from "react";
import { View, Button } from "react-native";
import { Level, LevelModalProps } from "./types";
import Modal from "react-native-modal";

import st from "./style";
import styles from "@src/styles";

const LevelModal: FC<LevelModalProps> = ({ level, setLevel }) => {
  const labels = ["Easy", "Medium", "Hard"];

  return (
    <View>
      <Modal isVisible={!level} style={styles.align}>
        <View style={st.container}>
          {labels.map((label) => (
            <Button
              key={label}
              title={label}
              onPress={() => setLevel(label.toLowerCase() as Level)}
            />
          ))}
        </View>
      </Modal>
    </View>
  );
};

export default LevelModal;

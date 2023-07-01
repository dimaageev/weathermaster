import React, { useEffect } from "react";
import { View, Text } from "react-native";

import styles from "@src/styles";
import { getCities } from "@src/store/api";

const HomeScreen = () => {
  useEffect(() => {
    getCities();
  }, []);

  return (
    <View style={styles.background}>
      <Text>HomeScreen</Text>
    </View>
  );
};

export default HomeScreen;

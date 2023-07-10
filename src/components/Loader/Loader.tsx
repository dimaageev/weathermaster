import React, { PureComponent } from "react";
import { View } from "react-native";
import LottieView from "lottie-react-native";

import styles from "./styles";

export default class Loader extends PureComponent {
  state = {
    loaderIsActive: false,
    source: require("./loader.json"),
  };

  start = () => {
    this.setState({ loaderIsActive: true });
  };

  stop = () => {
    this.setState({ loaderIsActive: false });
  };

  status = () => this.state.loaderIsActive;

  render(): React.ReactNode {
    return this.state.loaderIsActive ? (
      <View style={styles.absolute}>
        <LottieView
          source={this.state.source}
          autoPlay
          style={{ transform: [{ scale: 0.5 }] }}
        />
      </View>
    ) : null;
  }
}

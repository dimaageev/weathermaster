import React, { useEffect, useState } from "react";
import { View, Text, FlatList } from "react-native";
import { getRandomCity } from "@src/store/api";
import { City } from "@src/store/types";

import styles from "@src/styles";
import st from "./styles";

const HomeScreen = () => {
  const [randomCities, setRandomCities] = useState<City[]>();

  useEffect(() => {
    (async () => {
      const cities: City[] = [];
      for (let i = 0; i < 3; i++) {
        const city = await getRandomCity();
        cities.push(city);
      }
      setRandomCities(cities);
    })();
  }, []);

  return (
    <View style={styles.background}>
      <FlatList
        contentContainerStyle={st.flatlistContainer}
        data={randomCities}
        renderItem={({ item }) => {
          return (
            <Text>{`${item?.city}, ${
              item?.countryCode === "US" ? item?.region + ", " : ""
            } ${item?.country}: ${item?.temp}`}</Text>
          );
        }}
      />
    </View>
  );
};

export default HomeScreen;

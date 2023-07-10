import React, { useEffect, useState, FC } from "react";
import { View, FlatList } from "react-native";
import { getRandomCity } from "@src/store/api";
import { City } from "@src/store/types";

import styles from "@src/styles";
import st from "./styles";
import { Card } from "@src/components";
import { Level } from "@src/components/LevelModal/types";
import { Dataset } from "@src/constants/dataset";

interface Props {
  level: Level;
  dataset?: Dataset;
}

const HomeScreen: FC<Props> = ({ level, dataset }) => {
  const [randomCities, setRandomCities] = useState<City[]>();

  useEffect(() => {
    (async () => {
      const cities: City[] = [];
      for (let i = 0; i < dataset?.cardAmount!; i++) {
        const city = await getRandomCity();
        cities.push(city);
      }
      setRandomCities(cities);
    })();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        contentContainerStyle={st.flatlistContainer}
        data={randomCities}
        renderItem={({ item }) => <Card cityItem={item} />}
      />
    </View>
  );
};

export default HomeScreen;

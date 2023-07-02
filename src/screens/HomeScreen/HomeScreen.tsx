import React, { useEffect, useState } from "react";
import { View, Text, FlatList } from "react-native";

import styles from "@src/styles";
import { getRandomCity } from "@src/store/api";
import { City } from "@src/store/types";

const HomeScreen = () => {
  const [randomCities, setRandomCities] = useState<City[]>();

  console.log(randomCities);

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
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
        data={randomCities}
        renderItem={({ item }) => (
          <Text>{`${item?.city}, ${item?.country}`}</Text>
        )}
      />
    </View>
  );
};

export default HomeScreen;

import React, { useEffect, useState, FC } from "react";
import { View, FlatList, Text } from "react-native";
import { getRandomCity } from "@src/store/api";
import { City } from "@src/store/types";

import styles from "@src/styles";
import st from "./styles";
import { Card } from "@src/components";
import { Level } from "@src/components/LevelModal/types";
import { Dataset } from "@src/constants/dataset";
import { statusLoader } from "@src/utils/refs/loader";

interface Props {
  level: Level;
  dataset?: Dataset;
}

const HomeScreen: FC<Props> = ({ level, dataset }) => {
  const [randomCities, setRandomCities] = useState<City[]>();
  const [highestTempCity, setHighestTempCity] = useState<City>();
  const [currentRound, setCurrentRound] = useState<number>(1);
  const [gameOver, setGameOver] = useState<boolean>(false);

  // console.log(highestTempCity);

  useEffect(() => {
    (async () => {
      const cities: City[] = [];
      for (let i = 0; i < dataset?.cardAmount!; i++) {
        const city = await getRandomCity();
        cities.push(city);
      }
      setRandomCities(cities);
      setHighestTempCity([...cities].sort((a, b) => b.temp - a.temp)[0]);
    })();
  }, [currentRound]);

  const onCardPress = (item: City) => {
    if (item.id === highestTempCity?.id) {
      setCurrentRound((prev) => prev + 1);
    } else {
      setGameOver(true);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        bounces={false}
        ListHeaderComponent={() =>
          randomCities ? (
            <Text>
              Round: {currentRound} / {dataset?.rounds}
            </Text>
          ) : null
        }
        contentContainerStyle={st.flatlistContainer}
        data={randomCities}
        renderItem={({ item }) => (
          <Card
            cityItem={item}
            highest={item.id === highestTempCity?.id}
            onCardPress={onCardPress}
          />
        )}
      />
    </View>
  );
};

export default HomeScreen;

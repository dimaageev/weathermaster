import React, { useEffect, useState, FC } from "react";
import { View, FlatList, Text, Alert } from "react-native";
import { getRandomCity } from "@src/store/api";
import { City } from "@src/store/types";

import st from "./styles";
import { Card } from "@src/components";
import { Level } from "@src/components/LevelModal/types";
import { Dataset } from "@src/constants/dataset";
import Ionicons from "@expo/vector-icons/Ionicons";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useDataset } from "@src/hooks/useDataset";

interface Props {
  level: Level;
  dataset?: Dataset;
  onGameOver: () => void;
}

const HomeScreen: FC<Props> = ({ level, dataset, onGameOver }) => {
  const [randomCities, setRandomCities] = useState<City[]>();
  const [highestTempCity, setHighestTempCity] = useState<City>();
  const [currentRound, setCurrentRound] = useState<number>(1);
  const [helpsLeft, setHelpsLeft] = useState(dataset?.help);
  const [mistakesLeft, setMistakesLeft] = useState(dataset?.mistakes);
  const [flippedCards, setFlippedCards] = useState<Array<number> | undefined>(
    []
  );
  const [gameOver, setGameOver] = useState<boolean>(false);

  console.log(highestTempCity);

  useEffect(() => {
    (async () => {
      const cities: City[] = [];
      for (let i = 0; i < dataset?.cardAmount!; i++) {
        const city = await getRandomCity();
        cities.push(city);
      }
      setFlippedCards([]);
      setRandomCities(cities);
      setHighestTempCity([...cities].sort((a, b) => b.temp - a.temp)[0]);
    })();
  }, [currentRound]);

  const onCardPress = (item: City) => {
    const turnAll = randomCities?.map((city) => city.id);
    if (!flippedCards?.includes(item.id)) {
      setFlippedCards([...flippedCards!, item.id]);
      if (mistakesLeft === 0) {
        setTimeout(() => {
          setFlippedCards(turnAll);
        }, 1000);
      }
    }
    if (item.id === highestTempCity?.id) {
      setTimeout(() => {
        setFlippedCards(turnAll);
      }, 1000);
      setTimeout(() => {
        setCurrentRound((prev) => prev + 1);
      }, 2000);
    } else {
      setMistakesLeft((prev) => prev! - 1);
      console.log(mistakesLeft);
      if (mistakesLeft! === 0) {
        setTimeout(() => {
          setFlippedCards(turnAll);
        }, 1000);
        setTimeout(() => {
          setGameOver(true);
          Alert.alert("Game Over", "", [
            {
              text: "Ok",
              onPress: () => onGameOver(),
            },
          ]);
        }, 2000);
      }
    }
  };

  const helpHandler = () => {
    const arr = randomCities?.filter((city) => city.id !== highestTempCity?.id);
    arr?.splice(0, level === "hard" ? 2 : 1, highestTempCity!);
    setRandomCities(arr?.sort(() => Math.random() - 0.5));
    setHelpsLeft((prev) => prev! - 1);
  };

  const onHelpPress = () => {
    Alert.alert("Are you sure that you want to use your help?", "", [
      {
        text: "Yes",
        onPress: () => helpHandler(),
      },
      {
        text: "Cancel",
        onPress: () => {},
      },
    ]);
  };

  return (
    <View style={{ flex: 1, alignItems: "center" }}>
      <View style={st.headerContainer}>
        <Text>
          Round: {currentRound} / {dataset?.rounds}
        </Text>
        <Text>Mistakes left: {mistakesLeft! < 0 ? "0" : mistakesLeft}</Text>
        <Text>Helps left: {helpsLeft}</Text>
      </View>
      <FlatList
        bounces={false}
        contentContainerStyle={st.flatlistContainer}
        data={randomCities}
        renderItem={({ item, index }) => (
          <Card
            index={index}
            cityItem={item}
            flippedCards={flippedCards}
            disabled={flippedCards?.length! > 0 && mistakesLeft! < 0}
            highest={item.id === highestTempCity?.id}
            onCardPress={onCardPress}
          />
        )}
      />
      {helpsLeft! > 0 ? (
        <TouchableOpacity style={st.footerContainer} onPress={onHelpPress}>
          <Ionicons name="bulb-outline" size={26} />
          <Text>Ask for help</Text>
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

export default HomeScreen;

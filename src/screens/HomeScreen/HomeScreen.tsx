import "react-native-get-random-values";
import React, { useEffect, useState, FC } from "react";
import { View, FlatList, Text, Alert, TouchableOpacity } from "react-native";
import { getRandomCity } from "@src/store/api";
import { City, Round } from "@src/store/types";

import st from "./styles";
import { Card } from "@src/components";
import { Level } from "@src/components/LevelModal/types";
import { Dataset } from "@src/constants/dataset";
import Ionicons from "@expo/vector-icons/Ionicons";
import { v4 as uuidv4 } from "uuid";
import { format } from "date-fns";
import { addElementToArrayInAsyncStorage } from "@src/utils/asyncStorage";
import { startLoading, stopLoading } from "@src/utils/refs/loader";
import useTheme from "@src/hooks/useTheme";

interface Props {
  level: Level;
  dataset?: Dataset;
  onGameOver: () => void;
}

const HomeScreen: FC<Props> = ({ level, dataset, onGameOver }) => {
  const { theme } = useTheme();

  const [randomCities, setRandomCities] = useState<City[]>();
  const [highestTempCity, setHighestTempCity] = useState<City>();
  const [currentRound, setCurrentRound] = useState<number>(1);
  const [helpsLeft, setHelpsLeft] = useState(dataset?.help);
  const [mistakesLeft, setMistakesLeft] = useState(dataset?.mistakes);
  const [flippedCards, setFlippedCards] = useState<Array<number> | undefined>(
    []
  );
  const [pickedCards, setPickedCards] = useState<Array<City>>([]);
  const [gameOver, setGameOver] = useState<false | "win" | "lost">(false);
  const [historyRounds, setHistoryRounds] = useState<Array<Round | undefined>>(
    []
  );
  // console.log(highestTempCity);

  useEffect(() => {
    if (randomCities && highestTempCity && pickedCards) {
      setHistoryRounds([
        ...historyRounds,
        {
          answers: randomCities,
          correctAnswer: highestTempCity,
          myAnswers: pickedCards,
        },
      ]);
    }
  }, [currentRound, gameOver]);

  async function onFinish(status: "win" | "lost") {
    startLoading();
    const historyItem = {
      id: uuidv4(),
      score: `${currentRound - 1} / ${dataset?.rounds}`,
      status: status,
      level: dataset?.label,
      helpsUsed: dataset?.help! - helpsLeft!,
      hadMistakes: dataset?.mistakes! - mistakesLeft!,
      rounds: historyRounds,
      date: format(new Date(), "dd-MM-yy"),
    };
    await addElementToArrayInAsyncStorage("history", historyItem);
    onGameOver();
    stopLoading();
  }

  useEffect(() => {
    if (currentRound <= dataset?.rounds!) {
      (async () => {
        setGameOver(false);
        const cities: City[] = [];
        for (let i = 0; i < dataset?.cardAmount!; i++) {
          const city = await getRandomCity();
          cities.push(city);
        }
        setPickedCards([]);
        setFlippedCards([]);
        setRandomCities(cities);
        setHighestTempCity([...cities].sort((a, b) => b.temp - a.temp)[0]);
      })();
    } else {
      setGameOver("win");
      // Alert.alert("You won!", "Now you are the weathermaster", [
      //   {
      //     text: "Ok",
      //     onPress: () => onFinish("win"),
      //   },
      // ]);
    }
  }, [currentRound]);

  const onCardPress = (item: City) => {
    const turnAll = randomCities?.map((city) => city.id);
    if (!flippedCards?.includes(item.id)) {
      setPickedCards([...pickedCards!, item]);
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
        if (currentRound <= dataset?.rounds!) {
          setCurrentRound((prev) => prev + 1);
        }
      }, 2000);
    } else {
      setMistakesLeft((prev) => prev! - 1);
      if (mistakesLeft! === 0) {
        setTimeout(() => {
          setFlippedCards(turnAll);
        }, 1000);
        setTimeout(() => {
          setGameOver("lost");
          // Alert.alert("Game Over!", "", [
          //   {
          //     text: "Ok",
          //     onPress: () => onFinish("lost"),
          //   },
          // ]);
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

  return gameOver ? (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: theme.background,
      }}
    >
      <Text style={{ color: theme.label, fontSize: 50 }}>
        {gameOver === "win" ? "You won" : "You lost"}
      </Text>
      <Text style={{ color: theme.label, fontSize: 36, textAlign: "center" }}>
        {gameOver === "win" ? "You're a weathermaster" : "Maybe try again"}
      </Text>
      <TouchableOpacity
        onPress={() => onFinish(gameOver)}
        style={{
          borderWidth: 1,
          borderColor: theme.label,
          borderRadius: 10,
          padding: 10,
          marginTop: 10,
        }}
      >
        <Text style={{ color: theme.label, fontSize: 36 }}>Ok</Text>
      </TouchableOpacity>
    </View>
  ) : (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        backgroundColor: theme.background,
      }}
    >
      {currentRound <= dataset?.rounds! ? (
        <View style={st.headerContainer}>
          <Text style={{ color: theme.label }}>
            Round: {currentRound} / {dataset?.rounds}
          </Text>
          <Text style={{ color: theme.label }}>
            Mistakes left: {mistakesLeft! < 0 ? "0" : mistakesLeft}
          </Text>
          <Text style={{ color: theme.label }}>Helps left: {helpsLeft}</Text>
        </View>
      ) : null}
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
        <TouchableOpacity
          style={[
            st.footerContainer,
            flippedCards?.length! > 0 ? { opacity: 0.4 } : {},
          ]}
          onPress={onHelpPress}
          disabled={flippedCards?.length! > 0}
        >
          <Ionicons name="bulb-outline" size={26} color={theme.label} />
          <Text style={{ color: theme.label }}>Ask for help</Text>
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

export default HomeScreen;

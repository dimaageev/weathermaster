export interface City {
  city: string;
  country: string;
  countryCode: string;
  id: number;
  latitude: number;
  longitude: number;
  name: string;
  population: number;
  region: string;
  regionCode: string;
  regionWdId: string;
  type: string;
  wikiDataId: string;
  temp: number;
}

export interface HistoryItem {
  id: string;
  score: string;
  status: string;
  level: string;
  helpsUsed: number;
  rounds: {
    answers: Array<Pick<City, "id" | "city" | "region" | "country" | "temp">>;
    correctAnswer: Pick<City, "id" | "city" | "region" | "country" | "temp">;
  };
  date: string;
}

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

export type Round = {
  answers?: Array<City>;
  correctAnswer?: City;
  myAnswers?: Array<City>;
};

export interface HistoryItem {
  id: string;
  score: string;
  status: string;
  level?: string;
  helpsUsed: number;
  hadMistakes: number;
  rounds: Array<Round | undefined>;
  date: string;
}

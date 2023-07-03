import { WEATHER_API } from "@src/constants/keys";
import { City } from "./types";
import axios from "axios";
import { setRandomNumber } from "@src/utils/mathUtils";
import { startLoading, stopLoading } from "@src/utils/refs/loader";

export const getRandomCity = () => {
  return new Promise<City>((resolve, reject) => {
    let totalPages = 0;

    startLoading();
    axios
      .get(
        "http://geodb-free-service.wirefreethought.com/v1/geo/cities?limit=10&offset=1&hateoasMode=off"
      )
      .then((response: any) => {
        totalPages = Math.ceil(response.data.metadata.totalCount);
        const pageNumber = setRandomNumber(1, totalPages);

        axios
          .get(
            `http://geodb-free-service.wirefreethought.com/v1/geo/cities?limit=10&offset=${pageNumber}&hateoasMode=off`
          )
          .then((response: any) => {
            const randomCity =
              response.data.data[
                setRandomNumber(0, response.data.data.length - 1)
              ];
            axios
              .get(
                `https://api.openweathermap.org/data/2.5/weather?lat=${randomCity.latitude}&lon=${randomCity.longitude}&appid=${WEATHER_API}&units=metric`
              )
              .then((response: any) => {
                randomCity.temp = response.data.main.temp;
                stopLoading();
                resolve(randomCity);
              })
              .catch((err: any) => {
                stopLoading();
                reject(err);
              });
          })
          .catch((err: any) => {
            stopLoading();
            reject(err);
          });
      })
      .catch((err: any) => {
        stopLoading();
        reject(err);
      });
  });
};

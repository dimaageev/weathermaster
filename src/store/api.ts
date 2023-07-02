import { City } from "./types";
import axios from "axios";

function setRandomNumber(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export const getRandomCity = () => {
  return new Promise<City>((resolve, reject) => {
    let totalPages = 0;

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
            console.log(randomCity);
            resolve(randomCity);
          })
          .catch((err: any) => {
            reject(err);
          });
      })
      .catch((err: any) => {
        reject(err);
      });
  });
};

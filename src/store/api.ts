const axios = require("axios").default;

export const getCities = () => {
  axios
    .get(
      "http://geodb-free-service.wirefreethought.com/v1/geo/cities?limit=10&offset=1&hateoasMode=off"
    )
    .then(function (response: any) {
      console.log(response);
    });
};

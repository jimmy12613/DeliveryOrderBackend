// HTTPS Req Setup
const https = require("https");

const isValidCoordinate = (coordinate) => {
  const [lat, long] = coordinate;

  const isValidLat =
    !isNaN(lat) &&
    (typeof lat == "string" || typeof lat == "String") &&
    Number(lat) >= -90 &&
    Number(lat) <= 90;

  const isValidLong =
    !isNaN(long) &&
    (typeof long == "string" || typeof long == "String") &&
    Number(long) >= -180 &&
    Number(long) <= 180;

  if (!isValidLat) {
    throw new Error("Invalid latitude");
  }

  if (!isValidLong) {
    throw new Error("Invalid longitude");
  }

  return isValidLat && isValidLong;
};

const isValidOrder = (origin, destination) => {
  return (
    origin.length == 2 &&
    destination.length == 2 &&
    isValidCoordinate(origin) &&
    isValidCoordinate(destination)
  );
};

const getGoogleMapsApiOptions = () => {
  return {
    host: "routes.googleapis.com",
    port: 443,
    path: "/directions/v2:computeRoutes",
    method: "POST",
    rejectUnauthorized: false,
    headers: {
      "Content-Type": "application/json",
      "X-Goog-Api-Key": process.env.GOOGLE_MAPS_API_KEY,
      "X-Goog-FieldMask": "routes.distanceMeters",
    },
  };
};


const getLocationObject = (location) => ({
  location: {
    latLng: {
      latitude: parseFloat(location[0]),
      longitude: parseFloat(location[1]),
    },
  },
});

const getGoogleMapsApiBody = (origin, destination) => ({
  origin: getLocationObject(origin),
  destination: getLocationObject(destination),
});

const isValidPageAndLimit = (page, limit) => {
  return (
    !isNaN(page) &&
    !isNaN(limit) &&
    Number.isInteger(page) &&
    Number.isInteger(limit) &&
    page >= 1
  );
};

const getDistanceFromGoogleMaps = async (origin, destination) => {
  return new Promise((resolve, reject) => {
    const options = getGoogleMapsApiOptions();
    const body = getGoogleMapsApiBody(origin, destination);

    const reqGoogleMaps = https.request(options, (resGoogleMaps) => {
      let data = "";

      resGoogleMaps.setEncoding("utf8");

      resGoogleMaps.on("data", function (chunk) {
        data += chunk;
      });

      resGoogleMaps.on("end", async () => {
        try {
          const resBody = JSON.parse(data);
          const distance = resBody.routes[0].distanceMeters;
          if (distance != undefined) {
            resolve(distance);
          } else {
            reject(new Error("distance undefined"));
          }
        } catch (error) {
          console.error(error);
          reject(error);
        }
      });

      reqGoogleMaps.on("error", (err) => {
        console.log(err);
        reject(new Error("reqGoogleMaps error"));
      });
    });

    reqGoogleMaps.write(JSON.stringify(body));
    reqGoogleMaps.end();
  });
};

module.exports = {
  isValidOrder,
  isValidCoordinate,
  isValidPageAndLimit,
  getDistanceFromGoogleMaps,
};

const http = require("http");

export default function request(url) {
  return new Promise((resolve) => {
    // An example of an http request, for instance to fetch
    // user data from an API.
    http.get({ path: url }, (response) => {
      let data = "";
      response.on("data", (_data) => (data += _data));
      response.on("end", () => resolve(data));
    });
  });
}

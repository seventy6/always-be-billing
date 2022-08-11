import { useEffect } from "react";
const axios = require("axios").default;

export function GoGo({ children }) {
  useEffect(() => {
    const callHome = () => {
      return axios
        .post("https://harmonious-sfogliatella-afbf82.netlify.app/api/gogo", {
          headers: {
            // "x-api-key": "",
          },
        })
        .catch((err) => {
          if (err.response.status === 404) {
            throw new Error(`${err.config.url} not found`);
          } else if (err.response.status === 403) {
            throw new Error(`${err.config.url} auth issue`);
          }
          throw err;
        })
        .then(async (response) => {
          console.log(response.data);
        });
    };

    //callHome();

    //return () => callHome();
  }, []);
  // And return another component
  return <>{children}</>;
}

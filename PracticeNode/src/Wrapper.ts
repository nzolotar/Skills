import { LCTBody } from "./LCTBody";
import { LCTGetToken } from "./LCTToken";

const lctToken = new LCTGetToken();
const lctBody = new LCTBody();

const bodyObject = {
  id: 1,
  test: "test value",
};

//Get the token
lctToken
  .getToken()
  .then((token) => {
    console.log("Token:", token);
    // Do something with the token

    lctBody
      .sendBody(bodyObject, token)
      .then((response) => {
        console.log("response:", response);
      })
      .catch((error) => {
        console.error("Error getting response:", error);
      });
  })
  .catch((error) => {
    console.error("Error getting token:", error);
  });

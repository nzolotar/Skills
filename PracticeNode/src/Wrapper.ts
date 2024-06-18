import { LCTApi } from "./LCTApi";

const lctApi = new LCTApi();

// Generate the token payload signature
const payloadSignature = lctApi.generateTokenPayloadSignature();
console.log("Payload Signature:", payloadSignature);

// Get the token
lctApi
  .getToken()
  .then((token) => {
    console.log("Token:", token);
    // Do something with the token
  })
  .catch((error) => {
    console.error("Error getting token:", error);
  });

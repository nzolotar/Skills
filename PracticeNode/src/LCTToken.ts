import * as jwt from "jsonwebtoken";
import axios, { AxiosResponse } from "axios";

export class LCTGetToken {
  private readonly orgId: string = "00LCT00000106l11Z8";
  private readonly apiKey: string =
    "872ba32ce620c6c69ea5eb161eaf04ce666a499f6ed204b4";
  private readonly secretKey: string =
    "27da82cb6b8cea958a9f946572ad16125e763946195ce9d6fc6ffdde8f6acd315f50a5c095997ddbdf018ff5e7373068c3f79fac7b910aa8a6b51e1942c4949e" +
    this.orgId;
  private readonly lctApiPartnerUrl: string = "https://lct1-qa.herokuapp.com";

  public generateTokenPayloadSignature(): string {
    const payload = {
      oi: this.orgId,
      ak: this.apiKey,
      iat: new Date().getTime(),
    };

    //console.log("payload:", payload);
    const payloadBase64 = Buffer.from(JSON.stringify(payload)).toString(
      "base64"
    );
    return jwt.sign(payloadBase64, this.secretKey, { algorithm: "HS512" });
  }

  public async getToken(): Promise<string> {
    let token = "empty";
    const tokenPath = `${this.lctApiPartnerUrl}/api-partner/v1/generate-token`;
    let signature = this.generateTokenPayloadSignature();
    console.log("getToken:", signature);
    // try {
    //   const response: AxiosResponse = await axios.get(tokenPath, {
    //     headers: {
    //       "Payload-Signature": signature,
    //     },
    //   });
    //   //console.log("getToken response:", response.status, response.data);
    //   if (response.status === 200) {
    //     token = response.data.token; // Generated Token
    //   }
    // } catch (e) {
    //   // Handle exceptions
    //   console.log("getToken error message:", e.message);
    // }
    return token;
  }
}

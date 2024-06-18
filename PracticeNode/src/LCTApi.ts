import * as jwt from "jsonwebtoken";
import axios, { AxiosResponse } from "axios";

export class LCTApi {
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
    const payloadBase64 = Buffer.from(JSON.stringify(payload)).toString(
      "base64"
    );
    return jwt.sign(payloadBase64, this.secretKey, { algorithm: "HS512" });
  }

  public async getToken(): Promise<string> {
    let token = "";
    try {
      const response: AxiosResponse = await axios.get(
        `${this.lctApiPartnerUrl}/v1/get-token`,
        {
          headers: {
            "Payload-Signature": this.generateTokenPayloadSignature(),
          },
        }
      );
      console.log("response:", response.status, response.data);
      if (response.status === 200) {
        token = response.data.token; // Generated Token
      }
    } catch (e) {
      // Handle exceptions
      console.log("error message:", e.message);
    }
    return token;
  }
}

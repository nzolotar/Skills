import * as jwa from "jwa";
import * as jwt from "jsonwebtoken";
import axios, { AxiosResponse } from "axios";

export class LCTBody {
  private readonly orgId: string = "00LCT00000106l11Z8";
  private readonly secretKey: string =
    "27da82cb6b8cea958a9f946572ad16125e763946195ce9d6fc6ffdde8f6acd315f50a5c095997ddbdf018ff5e7373068c3f79fac7b910aa8a6b51e1942c4949e" +
    this.orgId;
  private readonly lctApiPartnerUrl: string = "https://lct1-qa.herokuapp.com";

  private signBody(body: any) {
    const hmacSHA256 = jwa("HS256");
    return hmacSHA256.sign(
      Buffer.from(JSON.stringify(body)).toString("utf-8"),
      this.secretKey
    );
  }
  public generatePayloadSignature(body?: any): string {
    const payload = { oi: this.orgId, iat: new Date().getTime() };
    if (body) {
      payload["sign"] = this.signBody(body);
    }
    const payloadBase64 = Buffer.from(JSON.stringify(payload)).toString(
      "base64"
    );
    return jwt.sign(payloadBase64, this.secretKey, { algorithm: "HS512" });
  }
  public async sendBody(body?: any, token?: string): Promise<string> {
    let response = "";
    const callPath = `${this.lctApiPartnerUrl}/api-partner/v1/test`;
    let bodySignature = this.generatePayloadSignature(body);
    console.log("bodySignature:", bodySignature);
    // try {
    //   const response: AxiosResponse = await axios.get(tokenPath, {
    //     headers: {
    //       "Payload-Signature": bodySignature,
    //     },
    //   });
    //   console.log("response:", response.status, response.data);
    //   if (response.status === 200) {
    //     token = response.data.token; // Generated Token
    //   }
    // } catch (e) {
    //   // Handle exceptions
    //   console.log("error message:", e.message);
    // }
    return response;
  }
}

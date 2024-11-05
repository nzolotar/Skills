const LCTApiPartner = {
  parseBase64: (value) => {
    return Buffer.from(value)
      .toString("base64")
      .replace(/=+$/, "")
      .replace(/\+/g, "-")
      .replace(/\//g, "_");
  },
  getSecretKey: () => {
    return pm.environment.get("secret") + pm.environment.get("orgId");
  },
  getHeader: () => {
    return { alg: "HS512" };
  },
  getPayload: (forGenerateTokenRequest = false) => {
    const payload = {
      oi: pm.environment.get("orgId"),
      iat: new Date().getTime(),
    };

    if (forGenerateTokenRequest) {
      payload.ak = pm.environment.get("apiKey");
    }

    if (!forGenerateTokenRequest && pm.request.body.raw) {
      payload.sign = LCTApiPartner.generateBodySignature(
        JSON.stringify(JSON.parse(pm.request.body.raw))
      );
    }

    return payload;
  },
  generateBodySignature: (bodyAsString) => {
    const signatureHexString = CryptoJS.HmacSHA256(
      Buffer.from(bodyAsString).toString("utf-8"),
      LCTApiPartner.getSecretKey()
    ).toString();
    return Buffer.from(signatureHexString, "hex")
      .toString("base64")
      .replace(/=+$/, "")
      .replace(/\+/g, "-")
      .replace(/\//g, "_");
  },
  getPayloadSignature: (forGenerateTokenRequest = false) => {
    const secretKey = LCTApiPartner.getSecretKey();
    const payloadBase64 = LCTApiPartner.parseBase64(
      LCTApiPartner.parseBase64(
        JSON.stringify(LCTApiPartner.getPayload(forGenerateTokenRequest))
      )
    );
    const headerBase64 = LCTApiPartner.parseBase64(
      JSON.stringify(LCTApiPartner.getHeader())
    );
    const contentBase64 = `${headerBase64}.${payloadBase64}`;

    const signatureHexString = CryptoJS.HmacSHA512(
      contentBase64,
      secretKey
    ).toString();
    const signatureBase64 = Buffer.from(signatureHexString, "hex")
      .toString("base64")
      .replace(/=+$/, "")
      .replace(/\+/g, "-")
      .replace(/\//g, "_");

    return `${contentBase64}.${signatureBase64}`;
  },
  isTokenExpired: () => {
    const token = pm.environment.get("token");
    const timestampToken = pm.environment.get("timestampToken");
    return (
      typeof token == undefined ||
      typeof timestampToken == undefined ||
      token == null ||
      timestampToken == null ||
      token == "" ||
      timestampToken == "" ||
      new Date().getTime() - parseInt(timestampToken, 10) >= 60 * 60 * 1000
    );
  },
  prepareRequestParams: () => {
    pm.request.headers.add({
      key: "Payload-Signature",
      value: LCTApiPartner.getPayloadSignature(),
    });
    if (LCTApiPartner.isTokenExpired()) {
      LCTApiPartner.callGenerateTokenEndpoint().then((response) => {
        console.log(response.data.token);
        pm.environment.set("token", response.data.token);
        pm.environment.set("timestampToken", new Date().getTime());
      });
    }
  },
  callGenerateTokenEndpoint: async () => {
    return new Promise((resolve) => {
      pm.sendRequest(
        {
          url: `${pm.environment.get("baseUrl")}/${pm.environment.get(
            "version"
          )}/generate-token`,
          method: "GET",
          header: {
            "Payload-Signature": LCTApiPartner.getPayloadSignature(true),
          },
        },
        function (err, res) {
          if (res.code == 200) {
            resolve({ err, data: res.json() });
          }
        }
      );
    });
  },
};

LCTApiPartner.prepareRequestParams();

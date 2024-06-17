import * as jwt from 'jsonwebtoken';
import axios, { AxiosResponse } from 'axios';

export class LCTApi {
    private readonly orgId: string = 'ORG-ID';
    private readonly apiKey: string = 'API-KEY';
    private readonly secretKey: string = 'SECRET-KEY' + this.orgId;
    private readonly lctApiPartnerUrl: string = 'LCT-API-PARTNER-URL';

    public generateTokenPayloadSignature(): string {
        const payload = {
            oi: this.orgId,
            ak: this.apiKey,
            iat: new Date().getTime(),
        };
        const payloadBase64 = Buffer.from(JSON.stringify(payload)).toString('base64');
        return jwt.sign(payloadBase64, this.secretKey, { algorithm: 'HS512' });
    }

    public async getToken(): Promise<string> {
        let token = '';
        try {
            const response: AxiosResponse = await axios.get(`${this.lctApiPartnerUrl}/v1/get-token`, {
                headers: {
                    'Payload-Signature': this.generateTokenPayloadSignature(),
                },
            });
            if (response.status === 200) {
                token = response.data.token; // Generated Token
                console.log(token);
            }
        } catch (e) {
            // Handle exceptions
        }
        return token;
    }
}
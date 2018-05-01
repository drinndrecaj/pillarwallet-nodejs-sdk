import * as request from 'request-promise';
const auth = require('@pillarwallet/plr-auth-sdk');

export class Requester {
    static sign(SignParams: Object,privateKey: string) {
        try {
            const signature = auth.sign(SignParams,privateKey) as string;
            return signature;
        } catch (e) {
            return null;
        }
    }
        
    static execute(incomingRequestOptions: any) {
        return request(incomingRequestOptions);
    }
}
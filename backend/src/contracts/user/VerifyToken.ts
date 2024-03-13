import { Verify } from "@/adapters";

export interface VerifyUserToken {
    verify(token: string): Promise<boolean>;
}

export class VerifyToken implements VerifyUserToken {
    constructor(private readonly tokenValidator: Verify) { }
    async verify(token: string): Promise<boolean> {
        return this.tokenValidator.verify(token);
    }
}
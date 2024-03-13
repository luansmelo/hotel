import { Decrypter } from "@/adapters";
import { UserModel } from "@/contracts/user";
import { FindUserByTokenContract } from "@/contracts/user/FindUserByTokenAndRole";

export class FindUserByToken implements FindUserByToken {
    constructor(private readonly decrypter: Decrypter,
        private readonly findUserByTokenRepository: FindUserByTokenContract
    ) { }

    async findByToken(token: string, role?: string): Promise<UserModel | null> {
        const result = await this.decrypter.decrypt(token) as { sub: string };

        if (result) {
            return this.findUserByTokenRepository.findByIdAndRole(result.sub, role);
        }

        return null;
    }
}
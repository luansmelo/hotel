import { FindUserByTokenContract } from "@/contracts/user/FindUserByTokenAndRole";
import { Decrypter } from "@/data/protocols/cryptography";
import { UserModel } from "@/domain/models/User";

export class FindUserByToken implements FindUserByToken {
    constructor(private readonly decrypter: Decrypter,
        private readonly findUserByTokenRepository: FindUserByTokenContract
    ) { }

    async findByToken(token: string, role?: string): Promise<UserModel | null> {
        const result = await this.decrypter.decrypt(token) as { id: string };

        if (result) {
            return this.findUserByTokenRepository.findByIdAndRole(result.id, role);
        }

        return null;
    }
}
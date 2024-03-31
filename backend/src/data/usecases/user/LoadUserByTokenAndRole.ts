
import { Decrypter } from "@/data/protocols/cryptography";
import { LoadUserByTokenRepository } from "@/data/protocols/db/user/LoadUserByTokenRepository.protocol";
import { UserModel } from "@/domain/models/User";
import { FindUserByToken } from "@/domain/usecases/user/LoadUserByIdAndToken";

export class LoadUserByToken implements FindUserByToken {
    constructor(
        private readonly decrypter: Decrypter,
        private readonly loadUser: LoadUserByTokenRepository
    ) { }

    async findByToken(token: string, role?: string): Promise<UserModel | null> {
        const result = await this.decrypter.decrypt(token) as { id: string };

        if (result) {
            return this.loadUser.loadByIdAndRole(result.id, role);
        }

        return null;
    }
}
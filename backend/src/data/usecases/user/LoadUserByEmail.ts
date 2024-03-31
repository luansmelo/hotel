import { LoadUserByEmailRepository } from "@/data/protocols/db/user/LoadUserByEmailRepository.protocol";
import { UserModel } from "@/domain/models/User";
import { LoadUserByEmail } from "@/domain/usecases/user/LoadUserByEmail";

export class LoadUserByEmailUseCase implements LoadUserByEmail {
  constructor(private readonly findUser: LoadUserByEmailRepository) { }

  async loadByEmail(email: string): Promise<UserModel | null> {
    return this.findUser.loadByEmail(email);
  }
}

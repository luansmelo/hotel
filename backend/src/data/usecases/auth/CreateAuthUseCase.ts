import { CreateAuth } from "@/contracts/auth/AuthenticationContract";
import { Encrypter, HasherComparer } from "@/data/protocols/cryptography";
import { EmailValidator } from "@/utils/EmailValidatorAdapter";
import { UserModel } from "@/domain/models/User";
import { LoadUserByEmailRepository } from "@/data/protocols/db/user/LoadUserByEmailRepository.protocol";
import { CreateUserModel } from "@/domain/usecases/user/CreateUser";

export class CreateAuthUseCase implements CreateAuth {
  constructor(
    private readonly findUser: LoadUserByEmailRepository,
    private readonly emailValidator: EmailValidator,
    private readonly hashed: HasherComparer,
    private readonly encrypter: Encrypter
  ) {}

  async authenticate(userModel: CreateUserModel): Promise<UserModel | null> {
    const isValid = this.emailValidator.isValid(userModel.email);

    if (!isValid) return null;

    const user = await this.findUser.loadByEmail(userModel.email);

    if (!user) return null;

    const hashedPassword = await this.hashed.compare(
      userModel.password,
      user.password
    );

    if (!hashedPassword) return null;

    const token = await this.encrypter.encrypt({
      id: user.id,
      role: user.role,
    });

    return {
      ...user,
      password: undefined,
      access_token: token,
    };
  }
}
import { Encrypter, HasherComparer } from "@/data/protocols/cryptography";
import { EmailValidator } from "@/utils/EmailValidatorAdapter";
import { LoadUserByEmailRepository } from "@/data/protocols/db/user/LoadUserByEmailRepository.protocol";
import { CreateUserModel } from "@/domain/usecases/user/CreateUser";
import { AuthenticatedUserModel, Authentication } from "@/domain/usecases/user/Authentication";

export class CreateAuthUseCase implements Authentication {
  constructor(
    private readonly findUser: LoadUserByEmailRepository,
    private readonly emailValidator: EmailValidator,
    private readonly hashed: HasherComparer,
    private readonly encrypter: Encrypter
  ) { }

  async auth(userModel: CreateUserModel): Promise<AuthenticatedUserModel> {
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
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      token,
    };
  }
}

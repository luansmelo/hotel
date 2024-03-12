import { FindUserByEmailContract, UserModel } from "@/contracts/user";
import { CreateUserModel } from "@/entities/user/createUser";
import { EmailValidator } from "@/utils/email-validator-adapter";
import { UnauthorizedError } from "@/utils/errors/httpErrors";
import { CreateAuth } from "@/contracts/auth/AuthenticationContract";
import { Encrypter, HasherCompare } from "@/adapters";

export class CreateAuthUseCase implements CreateAuth {
  constructor(
    private readonly findUser: FindUserByEmailContract,
    private readonly emailValidator: EmailValidator,
    private readonly hashed: HasherCompare,
    private readonly encrypter: Encrypter
  ) {}

  async authenticate(userModel: CreateUserModel): Promise<UserModel> {
    const isValid = this.emailValidator.isValid(userModel.email);

    if (!isValid) throw new UnauthorizedError("email inválido");

    const user = await this.findUser.findByEmail(userModel.email);

    if (!user) throw new UnauthorizedError("conta não encontrada");

    const hashedPassword = await this.hashed.compare(
      userModel.password,
      user.password
    );

    if (!hashedPassword) throw new UnauthorizedError("crendênciais inválidas");

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

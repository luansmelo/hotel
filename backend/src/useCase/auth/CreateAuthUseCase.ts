import { FindUserByEmailContract, UserModel } from "@/contracts/user";
import { CreateUserModel } from "@/entities/user/createUser";
import { EmailValidator } from "@/adapters/EmailValidatorAdapter";

import { CreateAuth } from "@/contracts/auth/AuthenticationContract";
import { Encrypter, HasherCompare } from "@/adapters";

export class CreateAuthUseCase implements CreateAuth {
  constructor(
    private readonly findUser: FindUserByEmailContract,
    private readonly emailValidator: EmailValidator,
    private readonly hashed: HasherCompare,
    private readonly encrypter: Encrypter
  ) {}

  async authenticate(userModel: CreateUserModel): Promise<UserModel | null> {
    const isValid = this.emailValidator.isValid(userModel.email);

    if (!isValid) return null;

    const user = await this.findUser.findByEmail(userModel.email);

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

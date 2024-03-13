import {
  CreateUser,
  CreateUserContract,
  FindUserByEmailContract,
  UserModel,
} from "@/contracts/user";

import { CreateUserModel } from "@/entities/user/createUser";
import { EmailValidator } from "@/adapters/EmailValidatorAdapter";
import { HasherProtocol } from "@/adapters/BcrypterAdapter";
import { UserAlreadyExistsError } from "@/utils/errors/UserAlreadyExistsError";
import { InvalidCredentialsError } from "@/utils/errors/InvalidCredentialsError";

export class CreateUserUseCase implements CreateUser {
  constructor(
    private readonly createUser: CreateUserContract,
    private readonly findUser: FindUserByEmailContract,
    private readonly emailValidator: EmailValidator,
    private readonly hasher: HasherProtocol
  ) { }

  async create(userModel: CreateUserModel): Promise<UserModel> {
    const isValid = this.emailValidator.isValid(userModel.email);

    if (!isValid) throw new InvalidCredentialsError("email inválido");

    const user = await this.findUser.findByEmail(userModel.email);

    if (user) throw new UserAlreadyExistsError("usuário já cadastrado");

    const hashedPassword = await this.hasher.hash(userModel.password);

    const data = Object.assign({}, userModel, { password: hashedPassword });

    const userCreated = await this.createUser.save(data);

    return userCreated;
  }
}

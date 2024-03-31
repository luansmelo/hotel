import {
  FindUserByEmailContract,
} from "@/contracts/user";

import { CreateUserModel } from "@/entities/user/createUser";
import { InvalidCredentialsError } from "@/presentation/errors/InvalidCredentialsError";
import { CreateUserRepository } from "@/data/protocols/db/user/CreateUserRepository.protocol";
import { EmailValidator } from "@/utils/EmailValidatorAdapter";
import { Hasher } from "@/data/protocols/cryptography";
import { CreateUser } from "@/domain/usecases/user/CreateUser";
import { UserModel } from "@/domain/models/User";
import { UserAlreadyExistsError } from "@/presentation/errors/UserAlreadyExistsError";

export class CreateUserUseCase implements CreateUser {
  constructor(
    private readonly createUser: CreateUserRepository,
    private readonly findUser: FindUserByEmailContract,
    private readonly emailValidator: EmailValidator,
    private readonly hasher: Hasher
  ) { }

  async create(userModel: CreateUserModel): Promise<UserModel> {
    const isValid = this.emailValidator.isValid(userModel.email);

    if (!isValid) throw new InvalidCredentialsError("email inválido");

    const user = await this.findUser.findByEmail(userModel.email);

    if (user) throw new UserAlreadyExistsError("usuário já cadastrado");

    const hashedPassword = await this.hasher.hash(userModel.password);

    const data = Object.assign({}, userModel, { password: hashedPassword });

    const userCreated = await this.createUser.create(data);

    return userCreated;
  }
}

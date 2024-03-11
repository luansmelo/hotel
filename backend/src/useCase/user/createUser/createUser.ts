import {
  CreateUser,
  CreateUserContract,
  FindUserByEmailContract,
  UserModel,
} from "@/contracts/user";

import { CreateUserModel } from "@/entities/user/createUser";
import { EmailValidator } from "@/utils/email-validator-adapter";
import { BadRequestError } from "@/utils/errors/httpErrors";
import { Encrypter } from "@/adapters/bcrypter.adapter";

export class CreateUserUseCase implements CreateUser {
  constructor(
    private readonly createUser: CreateUserContract,
    private readonly findUser: FindUserByEmailContract,
    private readonly emailValidator: EmailValidator,
    private readonly encrypter: Encrypter
  ) {}

  async create(userModel: CreateUserModel): Promise<UserModel> {
    const isValid = this.emailValidator.isValid(userModel.email);

    if (!isValid) throw new BadRequestError("email inválido");

    const user = await this.findUser.findByEmail(userModel.email);

    if (user) throw new BadRequestError("usuário já cadastrado");

    const hashedPassword = await this.encrypter.encrypt(userModel.password);

    const data = Object.assign({}, userModel, { password: hashedPassword });

    const userCreated = await this.createUser.save(data);

    userCreated.password = undefined;

    return userCreated;
  }
}

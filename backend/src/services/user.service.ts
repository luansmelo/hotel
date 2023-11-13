import {
  UserRepositoryContract,
  UserServiceContract,
} from "../utils/contracts/user-contract";
import bcrypt from "bcrypt";
import { UserLoginData, UserRegistrationData } from "../dto/user.dto";
import {
  ConflictError,
  NotFoundError,
  UnauthorizedError,
} from "../errors/httpErrors";
import { uuid } from "uuidv4";
import JwtUtils from "../utils/jwtUtils";

export class UserService implements UserServiceContract {
  constructor(private readonly repository: UserRepositoryContract) {}

  async signup(input: UserRegistrationData) {
    const user = await this.repository.getByEmail(input.email);

    if (user) throw new ConflictError("user already exists");

    const hashedPassword = await bcrypt.hash(input.password, 10);

    const data = {
      id: uuid(),
      email: input.email,
      name: input.name,
      password: hashedPassword,
      created_at: new Date().toDateString(),
      updated_at: new Date().toDateString(),
    };

    await this.repository.create(data);

    return {
      access_token: JwtUtils.generateToken(data.id),
    };
  }

  async signin(input: UserLoginData) {
    const user = await this.repository.getByEmail(input.email);

    if (!user) throw new NotFoundError("Conta não encontrada");

    const isPasswordValid = await bcrypt.compare(input.password, user.password);

    if (!isPasswordValid) throw new UnauthorizedError("Senha incorreta");

    return {
      access_token: JwtUtils.generateToken(user.id),
    };
  }
}

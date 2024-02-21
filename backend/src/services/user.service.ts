import {
  UserRepositoryContract,
  UserServiceContract,
} from "@/utils/contracts/user-contract";
import { AuthPayload, UserContractInput } from "@/dto/user.dto";
import {
  BadRequestError,
  ConflictError,
  NotFoundError,
  UnauthorizedError,
} from "@/utils/errors/httpErrors";
import { uuid } from "uuidv4";
import JwtUtils from "@/utils/jwtUtils";
import { EmailValidator } from "@/utils/email-validator-adapter";
import bcrypt from "bcrypt";

export class UserService implements UserServiceContract {
  constructor(
    private readonly repository: UserRepositoryContract,
    private readonly emailValidator: EmailValidator
  ) {}

  async signup(input: UserContractInput) {
    const isValid = this.emailValidator.isValid(input.email);

    if (!isValid) throw new BadRequestError("email inválido");

    const user = await this.repository.getByEmail(input.email);

    if (user) throw new ConflictError("usuário já cadastrado");

    const hashedPassword = await bcrypt.hash(input.password, 10);

    const data = {
      id: uuid(),
      email: input.email,
      name: input.name,
      password: hashedPassword,
      created_at: new Date().toDateString(),
      updated_at: new Date().toDateString(),
    };

    const userCreated = await this.repository.save(data);

    return {
      id: userCreated.id,
      name: userCreated.name,
      email: userCreated.email,
      role: userCreated.role,
      isAuthorized: userCreated.isAuthorized,
    };
  }

  async authenticate(input: AuthPayload) {
    const user = await this.repository.getByEmail(input.email);

    if (!user) throw new UnauthorizedError("conta não encontrada");

    const isValid = await bcrypt.compare(input.password, user.password);

    if (!isValid) throw new UnauthorizedError("crendênciais inválidas");

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      isAuthorized: user.isAuthorized,
      access_token: JwtUtils.generateToken(user.id, user.role),
    };
  }
}

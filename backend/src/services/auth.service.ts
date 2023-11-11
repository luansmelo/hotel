import {
  AuthRepositoryContract,
  AuthServiceContract,
} from "../contracts/auth-contract";
import { AuthDTO, AuthToken } from "../dto/auth.dto";
import bcrypt from "bcrypt";
import jwt, { Secret } from "jsonwebtoken";
import { NotFoundError, UnauthorizedError } from "../errors/httpErrors";

export class AuthService implements AuthServiceContract {
  constructor(private readonly repo: AuthRepositoryContract) {}

  async signin(input: AuthDTO): Promise<AuthToken> {
    const account = await this.repo.signin(input.email);

    if (!account) throw new NotFoundError("Conta não encontrada");

    const isPasswordValid = await bcrypt.compare(
      input.password,
      account.password
    );

    if (!isPasswordValid) throw new UnauthorizedError("Senha incorreta");

    return {
      access_token: this.gerateToken(account.id!),
    };
  }

  gerateToken(id: string): string {
    return jwt.sign({}, process.env.JWT_SECRET as Secret, {
      expiresIn: `${process.env.JWT_EXPIRES_IN}h`,
      subject: id,
    });
  }
} 

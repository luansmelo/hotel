
import env from "@/config/env";
import { JwtAdapter } from "@/infra/token";
import { AuthMiddleware } from "@/presentation/middlewares/AuthMiddleware";
import { LoadUserByToken } from "@/data/usecases/user/LoadUserByTokenAndRole";
import { UserRepository } from "@/infra/db/mysql/user/UserRepository";
import { VerifyToken } from "@/data/usecases/user/VerifyToken";

export const makeAuthMiddleware = (): AuthMiddleware => {
    const userAccountRepository = new UserRepository();

    const jwtAdapter = new JwtAdapter(env.jwt.secret!, env.jwt.expiresIn!);

    const findUserByToken = new LoadUserByToken(jwtAdapter, userAccountRepository);

    const verifyToken = new VerifyToken(jwtAdapter);

    return new AuthMiddleware(findUserByToken, verifyToken);
};  
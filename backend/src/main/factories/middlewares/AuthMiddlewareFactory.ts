import { VerifyToken } from "@/contracts/user/VerifyToken";
import { UserRepository } from "@/infra/db/mysql/UserRepository";
import { FindUserByToken } from "@/data/usecases/user/FindUserByTokenAndRole";

import env from "@/config/env";
import { JwtAdapter } from "@/infra/token";
import { AuthMiddleware } from "@/presentation/middlewares/AuthMiddleware";

export const makeAuthMiddleware = (): AuthMiddleware => {
    const userAccountRepository = new UserRepository();

    const jwtAdapter = new JwtAdapter(env.jwt.secret!, env.jwt.expiresIn!);

    const findUserByToken = new FindUserByToken(jwtAdapter, userAccountRepository);

    const verifyToken = new VerifyToken(jwtAdapter);

    return new AuthMiddleware(findUserByToken, verifyToken);
};  
import prisma from "@/config/prisma";

import { JwtAdapter } from "@/adapters";
import { VerifyToken } from "@/contracts/user/VerifyToken";
import { UserRepository } from "@/repositories/UserRepository";
import { FindUserByToken } from "@/useCase/user/FindUserByTokenAndRole";
import { AuthMiddleware } from "@/middlewares/AuthMiddleware";
import env from "@/config/env";

export const makeAuthMiddleware = (): AuthMiddleware => {
    const userAccountRepository = new UserRepository(prisma);

    const jwtAdapter = new JwtAdapter(env.jwt.secret!, env.jwt.expiresIn!);

    const findUserByToken = new FindUserByToken(jwtAdapter, userAccountRepository);

    const verifyToken = new VerifyToken(jwtAdapter);

    return new AuthMiddleware(findUserByToken, verifyToken);
};  
import { VerifyToken } from "@/data/usecases/user/VerifyToken";
import { UserRepository } from "@/infra/db/mysql/user/UserRepository";
import env from "@/config/env";
import { ROLE } from "@/config/constants";
import { JwtAdapter } from "@/infra/token";
import { AuthMiddleware } from "@/presentation/middlewares/AuthMiddleware";
import { LoadUserByToken } from "@/data/usecases/user/LoadUserByTokenAndRole";

export const makeAuthAdminMiddleware = (): AuthMiddleware => {
    const userAccountRepository = new UserRepository();

    const jwtAdapter = new JwtAdapter(env.jwt.secret!, env.jwt.expiresIn!);

    const findUserByToken = new LoadUserByToken(jwtAdapter, userAccountRepository);

    const verifyToken = new VerifyToken(jwtAdapter);

    return new AuthMiddleware(findUserByToken, verifyToken, ROLE.Admin);
};  
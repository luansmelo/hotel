import { VerifyUserToken } from "@/contracts/user/VerifyToken";
import { errorHandler } from "@/presentation/helpers/errorHandler/errorHandler";
import { forbidden, ok, unauthorized } from "@/presentation/helpers/httpCodesHelper";
import { HttpRequest } from "@/presentation/protocols/httpRequest";
import { HttpResponse } from "@/presentation/protocols/httpResponse";
import { Middleware } from "@/presentation/protocols/middleware";
import { AccessDeniedError } from "@/presentation/errors/AccessDeniedError";
import { InvalidTokenError } from "@/presentation/errors/InvalidTokenError";
import { FindUserByToken } from "@/domain/usecases/user/LoadUserByIdAndToken";

export class AuthMiddleware implements Middleware {
    constructor(
        private readonly findUserByToken: FindUserByToken,
        private readonly verifyToken: VerifyUserToken,
        private readonly role?: string,
    ) { }

    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {

        try {
            const token = httpRequest.headers as { 'x-access-token': string };

            if (token && token['x-access-token']) {
                const validToken = await this.verifyToken.verify(token['x-access-token']);
                if (!validToken) {
                    return unauthorized(new InvalidTokenError());
                }

                const user = await this.findUserByToken.findByToken(token['x-access-token'], this.role);

                if (user) {
                    return ok({ userId: user.id });
                }
            }

            const error = forbidden(new AccessDeniedError());

            return new Promise((resolve) => resolve(error));
        } catch (error) {
            return errorHandler(error);
        }
    }
}

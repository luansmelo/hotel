import { FindUserByToken } from "@/contracts/user/FindUserByTokenAndRole";
import { VerifyUserToken } from "@/contracts/user/VerifyToken";
import { HttpRequest } from "@/controllers/protocols/httpRequest";
import { HttpResponse } from "@/controllers/protocols/httpResponse";
import { Middleware } from "@/controllers/protocols/middleware";
import { AccessDeniedError } from "@/utils/errors/AccessDeniedError";
import { InvalidTokenError } from "@/utils/errors/InvalidTokenError";
import { errorHandler } from "@/utils/helpers/errorHandler/errorHandler";
import { forbidden, ok, unauthorized } from "@/utils/helpers/httpCodesHelper";

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

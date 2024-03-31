
import { Router } from "express";
import { adaptRoute } from "../../adapters/express/ExpressRouteAdapter";
import { makeLoginController } from "../../factories/user/LoginFactory";

export default (app: Router): void => {
    const authRouter = Router();

    authRouter.post("/", adaptRoute(makeLoginController()));

    app.use('/auth', authRouter);
}

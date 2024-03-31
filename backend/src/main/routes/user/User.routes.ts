import { Router } from "express";
import { adaptRoute } from "@/main/adapters/express/ExpressRouteAdapter";
import { adaptMiddleware } from "@/main/adapters/middlewares/ExpressMiddlewareAdapter";
import { makeCreateUserController } from "@/main/factories";
import { makeAuthAdminMiddleware } from "@/main/factories/middlewares/AuthAdminMiddlewareFactory";
import { makeLoadUsersFactory } from "@/main/factories/user/LoadUsersFactory";

export default (router: Router): void => {
  const userRouter = Router();

  userRouter.post("/signup", adaptMiddleware(makeAuthAdminMiddleware()), adaptRoute(makeCreateUserController()));
  userRouter.get("/", adaptMiddleware(makeAuthAdminMiddleware()), adaptRoute(makeLoadUsersFactory()));
  
  router.use('/user', userRouter);
}

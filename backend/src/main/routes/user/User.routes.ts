import { Router } from "express";
import { adaptRoute } from "@/main/adapters/express/ExpressRouteAdapter";
import { adaptMiddleware } from "@/main/adapters/middlewares/ExpressMiddlewareAdapter";
import { makeCreateUserController } from "@/main/factories";
import { makeAuthAdminMiddleware } from "@/main/factories/middlewares/AuthAdminMiddlewareFactory";
import { makeLoadUsersFactory } from "@/main/factories/user/LoadUsersFactory";
import { makeFindUserById } from "@/main/factories/user/LoadUserByIdFactory";
import { makeUpdateUser } from "@/main/factories/user/UpdateUserFactory";

export default (router: Router): void => {
  const userRouter = Router();

  userRouter.post("/signup", adaptRoute(makeCreateUserController()));
  userRouter.get("/", adaptMiddleware(makeAuthAdminMiddleware()), adaptRoute(makeLoadUsersFactory()));

  // admin router 
  userRouter.get("/user/:id", adaptMiddleware(makeAuthAdminMiddleware()), adaptRoute(makeFindUserById()));
  userRouter.put("/user/:id", adaptMiddleware(makeAuthAdminMiddleware()), adaptRoute(makeUpdateUser()));

  router.use('/user', userRouter);
}
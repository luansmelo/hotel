import { Router } from "express";
import { makeCreateUserController } from "@/factories/user/CreateUserFactory";
import { adaptRoute } from "@/adapters";
import { makeFindUsersFactory } from "@/factories/user/FindUsersFactory";
import { makeAuthAdminMiddleware } from "@/factories/middlewares/AuthAdminMiddlewareFactory";
import { adaptMiddleware } from "@/controllers/middlewares/ExpressMiddlewareAdapter";

export default (router: Router): void => {
  const userRouter = Router();

  userRouter.post("/signup", adaptMiddleware(makeAuthAdminMiddleware()), adaptRoute(makeCreateUserController()));
  userRouter.get("/", adaptMiddleware(makeAuthAdminMiddleware()), adaptRoute(makeFindUsersFactory()));
  
  router.use('/user', userRouter);
}

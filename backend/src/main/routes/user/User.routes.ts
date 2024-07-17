import { Router } from "express";
import { adaptRoute } from "@/main/adapters/express/ExpressRouteAdapter";
import { adaptMiddleware } from "@/main/adapters/middlewares/ExpressMiddlewareAdapter";
import { makeCreateUserController } from "@/main/factories";
import { makeAuthAdminMiddleware } from "@/main/factories/middlewares/AuthAdminMiddlewareFactory";
import { makeLoadUsersFactory } from "@/main/factories/user/LoadUsersFactory";
import { makeFindUserById } from "@/main/factories/user/LoadUserByIdFactory";
import { makeUpdateUser } from "@/main/factories/user/UpdateUserFactory";
import { makeDeleteUser } from "@/main/factories/user/DeleteUserFactory";
import MulterAdapter from "@/main/adapters/multer/MulterAdapter";

const uploadMiddleware = new MulterAdapter({
  allowedMimes: ['image/png', 'image/jpeg'],
  notAllowedMessage: 'Only .png, .jpg format allowed!',
  fileSizeLimit: 16 * 1024 * 1024,
  savePath: 'medias/users',
}).getMiddleware();

export default (router: Router): void => {
  const userRouter = Router();

  userRouter.post("/signup", adaptRoute(makeCreateUserController()));
  userRouter.get("/", adaptMiddleware(makeAuthAdminMiddleware()), adaptRoute(makeLoadUsersFactory()));

  // admin router 
  userRouter.get("/:id", adaptMiddleware(makeAuthAdminMiddleware()), adaptRoute(makeFindUserById()));
  userRouter.put("/:id", adaptMiddleware(makeAuthAdminMiddleware()), adaptRoute(makeUpdateUser()));
  userRouter.delete("/:id", adaptMiddleware(makeAuthAdminMiddleware()), adaptRoute(makeDeleteUser()));
  userRouter.put("/:id/picture", adaptMiddleware(makeAuthAdminMiddleware()), uploadMiddleware, adaptRoute(makeUpdateUser()));
  router.use('/user', userRouter);
}
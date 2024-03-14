import { Router } from "express";
import {
  makeCreateGroupController,
  makeUpdateGroupController,
  makeFindGroupByIdController,
  makeFindGroupsController,
  makeDeleteGroupController,
} from "@/factories";

import { adaptRoute } from "@/adapters";
import { adaptMiddleware } from "@/controllers/middlewares/ExpressMiddlewareAdapter";
import { makeAuthMiddleware } from "@/factories/middlewares/AuthMiddlewareFactory";
import { makeAuthAdminMiddleware } from "@/factories/middlewares/AuthAdminMiddlewareFactory";

export default (router: Router): void => {
  const groupRouter = Router();

  groupRouter.get("/:id", adaptMiddleware(makeAuthMiddleware()), adaptRoute(makeFindGroupByIdController()));
  groupRouter.get("/", adaptMiddleware(makeAuthMiddleware()), adaptRoute(makeFindGroupsController()));

  // Admin Routes
  groupRouter.post("/create", adaptMiddleware(makeAuthAdminMiddleware()), adaptRoute(makeCreateGroupController()));
  groupRouter.put("/:id", adaptMiddleware(makeAuthAdminMiddleware()), adaptRoute(makeUpdateGroupController()));
  groupRouter.delete("/:id", adaptMiddleware(makeAuthAdminMiddleware()), adaptRoute(makeDeleteGroupController()));

  router.use('/group', groupRouter);
}



import { Router } from "express";
import {
  makeCreateGroupController,
  makeUpdateGroupController,
  makeFindGroupByIdController,
  makeFindGroupsController,
  makeDeleteGroupController,
} from "../../factories";

import { makeAuthMiddleware } from "../../factories/middlewares/AuthMiddlewareFactory";
import { makeAuthAdminMiddleware } from "../../factories/middlewares/AuthAdminMiddlewareFactory";
import { adaptRoute } from "../../adapters/express/ExpressRouteAdapter";
import { adaptMiddleware } from "../../adapters/middlewares/ExpressMiddlewareAdapter";

export default (router: Router): void => {
  const groupRouter = Router();

  groupRouter.get("/:id", adaptMiddleware(makeAuthMiddleware()), adaptRoute(makeFindGroupByIdController()));
  groupRouter.get("/", adaptMiddleware(makeAuthMiddleware()), adaptRoute(makeFindGroupsController()));

  // Admin Routes
  groupRouter.post("/", adaptMiddleware(makeAuthAdminMiddleware()), adaptRoute(makeCreateGroupController()));
  groupRouter.put("/:id", adaptMiddleware(makeAuthAdminMiddleware()), adaptRoute(makeUpdateGroupController()));
  groupRouter.delete("/:id", adaptMiddleware(makeAuthAdminMiddleware()), adaptRoute(makeDeleteGroupController()));

  router.use('/group', groupRouter);
}



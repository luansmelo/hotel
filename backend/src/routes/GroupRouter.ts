import { Router } from "express";
import {
  makeCreateGroupController,
  makeUpdateGroupController,
  makeFindGroupByIdController,
  makeFindGroupsController,
  makeDeleteGroupController,
} from "@/factories";

import { adaptRoute } from "@/adapters";
import { adaptMiddleware } from "@/adapters/middlewares/ExpressMiddlewareAdapter";
import { makeAuthMiddleware } from "@/factories/authMiddleware/AuthMiddlewareFactory";

export default (router: Router): void => {
  const groupRouter = Router();

  groupRouter.get("/:id", adaptMiddleware(makeAuthMiddleware()), adaptRoute(makeFindGroupByIdController()));
  groupRouter.get("/", adaptMiddleware(makeAuthMiddleware()), adaptRoute(makeFindGroupsController()));

  // Admin Routes
  groupRouter.post("/create", adaptMiddleware(makeAuthMiddleware()), adaptRoute(makeCreateGroupController()));
  groupRouter.put("/:id", adaptMiddleware(makeAuthMiddleware()), adaptRoute(makeUpdateGroupController()));
  groupRouter.delete("/:id", adaptMiddleware(makeAuthMiddleware()), adaptRoute(makeDeleteGroupController()));

  router.use('/group', groupRouter);
}



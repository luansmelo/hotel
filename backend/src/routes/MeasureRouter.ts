import { Router } from "express";
import {
  makeCreateMeasureController,
  makeUpdateMeasureController,
  makeFindMeasuresController,
  makeDeleteMeasureController,
  makeFindMeasureByIdController,
} from "@/factories/";

import { adaptMiddleware } from "@/controllers/middlewares/ExpressMiddlewareAdapter";
import { makeAuthMiddleware } from "@/factories/authMiddleware/AuthMiddlewareFactory";
import { adaptRoute } from "@/adapters";
import { makeAuthAdminMiddleware } from "@/factories/authAdminMiddleware/AuthAdminMiddlewareFactory";

export default (router: Router): void => {
  const measureRouter = Router();

  measureRouter.get("/:id", adaptMiddleware(makeAuthMiddleware()), adaptRoute(makeFindMeasureByIdController()));
  measureRouter.get("/", adaptMiddleware(makeAuthMiddleware()), adaptRoute(makeFindMeasuresController()));

  // Admin Routes
  measureRouter.post("/create", adaptMiddleware(makeAuthAdminMiddleware()), adaptRoute(makeCreateMeasureController()));
  measureRouter.delete("/:id", adaptMiddleware(makeAuthAdminMiddleware()), adaptRoute(makeDeleteMeasureController()));
  measureRouter.put("/:id", adaptMiddleware(makeAuthAdminMiddleware()), adaptRoute(makeUpdateMeasureController()));

  router.use('/measure', measureRouter);
}

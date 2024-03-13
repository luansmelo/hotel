import { Router } from "express";
import {
  makeCreateMeasureController,
  makeUpdateMeasureController,
  makeFindMeasuresController,
  makeDeleteMeasureController,
  makeFindMeasureByIdController,
} from "@/factories/";

import { adaptMiddleware } from "@/adapters/middlewares/ExpressMiddlewareAdapter";
import { makeAuthMiddleware } from "@/factories/authMiddleware/AuthMiddlewareFactory";
import { adaptRoute } from "@/adapters";

export default (router: Router): void => {
  const measureRouter = Router();

  measureRouter.get("/:id", adaptMiddleware(makeAuthMiddleware()), adaptRoute(makeFindMeasureByIdController()));
  measureRouter.get("/", adaptMiddleware(makeAuthMiddleware()), adaptRoute(makeFindMeasuresController()));

  // Admin Routes
  measureRouter.post("/create", adaptMiddleware(makeAuthMiddleware()), adaptRoute(makeCreateMeasureController()));
  measureRouter.delete("/:id", adaptMiddleware(makeAuthMiddleware()), adaptRoute(makeDeleteMeasureController()));
  measureRouter.put("/:id", adaptMiddleware(makeAuthMiddleware()), adaptRoute(makeUpdateMeasureController()));

  router.use('/measure', measureRouter);
}

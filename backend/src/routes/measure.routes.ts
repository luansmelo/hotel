import { Request, Response, Router, NextFunction } from "express";
import { MeasurementUnitSchema } from "@/validators/measurementUnit.validation";
import { CreateMeasureModel } from "@/entities/measure/createMeasure";
import {
  makeCreateMeasureController,
  makeUpdateMeasureController,
  makeFindMeasuresController,
  makeDeleteMeasureController,
  makeFindMeasureByIdController,
} from "@/factories/";
import { allowed, authenticated, validate } from "@/middlewares";
import { ROLE } from "@/config/constants";

const router = Router();
const slug = "/measure";

router.post(
  "/create",
  authenticated,
  allowed([ROLE.Admin]),
  validate(MeasurementUnitSchema),
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const payload: CreateMeasureModel = MeasurementUnitSchema.parse(
        request.body
      ) as CreateMeasureModel;

      const controller = makeCreateMeasureController();

      const result = await controller.create(payload);

      return response.status(201).send(result);
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  "/:id",
  authenticated,
  allowed([ROLE.Admin, ROLE.User]),
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const id = request.params.id;
      const controller = makeFindMeasureByIdController();

      const result = await controller.findById(id);

      return response.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  "/",
  authenticated,
  allowed([ROLE.Admin, ROLE.User]),
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const controller = makeFindMeasuresController();
      const result = await controller.findAll();

      return response.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }
);

router.delete(
  "/:id",
  authenticated,
  allowed([ROLE.Admin]),
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const id = request.params.id;
      const controller = makeDeleteMeasureController();

      const result = await controller.deleteById(id);

      return response.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }
);

router.put(
  "/:id",
  authenticated,
  allowed([ROLE.Admin]),
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const id = request.params.id;

      const payload: CreateMeasureModel = MeasurementUnitSchema.parse(
        request.body
      ) as CreateMeasureModel;

      const controller = makeUpdateMeasureController();

      const result = await controller.updateById(id, payload);

      return response.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }
);

export { router, slug };

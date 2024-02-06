import { Request, Response, Router, NextFunction } from "express";
import { validate } from "../middleware/validate";
import { authenticated } from "../middleware/authenticated";
import { makeMeasurementUnitController } from "../utils/factories/makeMeasurementUnitController";
import { MeasurementUnitInput } from "../dto/measurementUnit.dto";
import { MeasurementUnitSchema } from "../validation/measurementUnit.validation";
import { allowed } from "../middleware/allowed";
import { ROLE } from "../config/constants";

const router = Router();
const slug = "/measurementUnit";

router.post(
  "/create",
  authenticated,
  allowed([ROLE.Admin]),
  validate(MeasurementUnitSchema),
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const input: MeasurementUnitInput = MeasurementUnitSchema.parse(
        request.body
      ) as MeasurementUnitInput;
      const controller = makeMeasurementUnitController();
      const result = await controller.create(input);

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
      const controller = makeMeasurementUnitController();
      const result = await controller.getById(id);

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
      const controller = makeMeasurementUnitController();
      const result = await controller.getAll();

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
      const controller = makeMeasurementUnitController();
      await controller.deleteById(id);
      return response.status(200).send({ message: "sucesso" });
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
      const input: MeasurementUnitInput = MeasurementUnitSchema.parse(
        request.body
      ) as MeasurementUnitInput;
      const controller = makeMeasurementUnitController();
      const result = await controller.updateById(id, input);
      return response.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }
);

export { router, slug };

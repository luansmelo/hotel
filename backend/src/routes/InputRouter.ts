import { Request, Response, Router, NextFunction } from "express";
import { InputSchema } from "@/validators/InputValidation";
import { ROLE } from "@/config/constants";
import { allowed, authenticated, validate } from "@/middlewares";
import {
  makeCreateInputController,
  makeDeleteInputController,
  makeFindInputsController,
  makeUpdateInputController,
  makeFindInputByIdController,
} from "@/factories/input";
import { CreateInputModel } from "@/entities/input/createInput";

const router = Router();
const slug = "/input";

router.post(
  "/create",
  authenticated,
  allowed([ROLE.Admin]),
  validate(InputSchema),
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const input: CreateInputModel = InputSchema.parse(
        request.body
      ) as CreateInputModel;

      const controller = makeCreateInputController();

      const result = await controller.create(input);

      return response.status(201).send(result);
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
      const controller = makeFindInputsController();
      const result = await controller.findAll();

      return response.status(200).send({ data: result });
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

      const controller = makeFindInputByIdController();
      const result = await controller.findById(id);

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
  validate(InputSchema),
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const id = request.params.id;
      const input: CreateInputModel = InputSchema.parse(
        request.body
      ) as CreateInputModel;

      const controller = makeUpdateInputController();

      await controller.updateById(id, input);

      return response.status(200).send({
        message: "Insumo editado com sucesso!",
      });
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
      const controller = makeDeleteInputController();

      const result = await controller.deleteById(id);

      response.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }
);

export { router, slug };

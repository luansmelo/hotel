import { Request, Response, Router, NextFunction } from "express";
import { InputRegister } from "../dto/input.dto";
import { makeInputController } from "../utils/factories/makeInputController";
import { validate } from "../middleware/validate";
import { InputSchema } from "../validation/input.validation";
import { authenticated } from "../middleware/authenticated";
import { allowed } from "../middleware/allowed";
import { ROLE } from "../config/constants";

const router = Router();
const slug = "/input";

router.post(
  "/create",
  authenticated,
  allowed([ROLE.Admin]),
  validate(InputSchema),
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const input: InputRegister = InputSchema.parse(
        request.body
      ) as InputRegister;
      console.log(input);
      const controller = makeInputController();

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
      const controller = makeInputController();
      const result = await controller.getAll();

      return response.status(200).send({ data: result });
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
      const input: InputRegister = InputSchema.parse(
        request.body
      ) as InputRegister;

      const controller = makeInputController();

      await controller.updateById(id, input);

      return response.status(200).send({ message: "sucesso" });
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
      const controller = makeInputController();

      await controller.deleteById(id);

      response.status(200).send({ message: "sucesso" });
    } catch (error) {
      next(error);
    }
  }
);

export { router, slug };

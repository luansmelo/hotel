import { Request, Response, Router, NextFunction } from "express";
import { InputRegister } from "../dto/input.dto";
import { makeInputController } from "../utils/factories/makeInputController";
import { validate } from "../middleware/validate";
import { InputSchema } from "../validation/input.validation";
import { authenticated } from "../middleware/authenticated";
import { Role, allowed } from "../middleware/allowed";

const router = Router();
const slug = "/input";

router.post(
  "/create",
  authenticated,
  allowed([Role.Admin]),
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const input = request.body;

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
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const id = request.params.id;
      const input: InputRegister = request.body;

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

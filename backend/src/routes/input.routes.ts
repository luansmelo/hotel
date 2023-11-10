import { Request, Response, Router, NextFunction } from "express";
import { InputDTO, InputSchema } from "../dto/input.dto";
import { makeInputController } from "../utils/factories/makeInputController";
import { validate } from "../middleware/validate";

const router = Router();
const slug = "/input";

router.post(
  "/create",
  validate(InputSchema),
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const input: InputDTO = InputSchema.parse(request.body);

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
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const controller = makeInputController();
      const result = await controller.getAll();

      return response.status(200).send({ inputList: result });
    } catch (error) {
      next(error);
    }
  }
);

router.patch(
  "/:id",
  validate(InputSchema),
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const id = request.params.id;
      const input: InputDTO = InputSchema.parse(request.body);
      const controller = makeInputController();

      await controller.updateById(id, input);

      return response.status(200).send({ message: "Insumo atualizado!" });
    } catch (error) {
      next(error);
    }
  }
);

router.delete(
  "/:id",
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const id = request.params.id;
      const controller = makeInputController();

      await controller.deleteById(id);

      response.status(200).send({ message: "Insumo excluído com sucesso!" });
    } catch (error) {
      next(error);
    }
  }
);

export { router, slug };

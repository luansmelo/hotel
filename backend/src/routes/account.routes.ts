import { Request, Response, Router, NextFunction } from "express";
import { AccountDTO } from "../dto/account.dto";
import { makeAccountController } from "../utils/factories/makeAccountController";

const router = Router();
const slug = "/account";

router.post(
  "/create",
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const input: AccountDTO = request.body;
      const controller = makeAccountController();
      const result = await controller.create(input);

      return response.status(201).send(result);
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  "/:email",
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const email = request.params.email;
      const controller = makeAccountController();
      const result = await controller.getByEmail(email);

      return response.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }
);

export { router, slug };

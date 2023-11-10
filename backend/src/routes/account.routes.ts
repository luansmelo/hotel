import { Request, Response, Router, NextFunction } from "express";
import { AccountDTO, AccountSchema } from "../dto/account.dto";
import { makeAccountController } from "../utils/factories/makeAccountController";
import { validate } from "../middleware/validate";

const router = Router();
const slug = "/account";

router.post(
  "/create",
  validate(AccountSchema),
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const input: AccountDTO = AccountSchema.parse(request.body);
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

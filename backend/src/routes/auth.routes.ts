import { Request, Response, Router, NextFunction } from "express";
import { makeAuthController } from "../utils/factories/makeAuthController";
import { validate } from "../middleware/validate";
import { AuthDTO, AuthSchema } from "../dto/auth.dto";

const router = Router();
const slug = "/auth";

router.post(
  "/login",
  validate(AuthSchema),
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const input: AuthDTO = AuthSchema.parse(request.body);

      const controller = makeAuthController();

      const result = await controller.signin(input);

      return response.status(201).send(result);
    } catch (error) {
      next(error);
    }
  }
);

export { router, slug };

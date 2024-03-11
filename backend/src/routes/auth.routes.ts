import { AuthPayload } from "@/dto/user/user.dto";
import { makeAuthController } from "@/factories/auth/createAuth/createAuthFactory";
import { validate } from "@/middlewares/validate";
import { UserLoginSchema } from "@/validators/user.validation";
import { Router, Request, Response, NextFunction } from "express";

const router = Router();
const slug = "/auth";

router.post(
  "/",
  validate(UserLoginSchema),
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const input: AuthPayload = UserLoginSchema.parse(
        request.body
      ) as AuthPayload;

      const controller = makeAuthController();

      const result = await controller.authenticate(input);

      return response.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }
);

export { router, slug };

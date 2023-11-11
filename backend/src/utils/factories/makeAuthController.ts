import prisma from "../../database";
import { AuthController } from "../../controllers/auth.controller";
import { AuthRepository } from "../../repositories/auth.repository";
import { AuthService } from "../../services/auth.service";

export function makeAuthController(): AuthController {
  const authRepository = new AuthRepository(prisma);
  const authService = new AuthService(authRepository);
  const authController = new AuthController(authService);
  return authController;
}

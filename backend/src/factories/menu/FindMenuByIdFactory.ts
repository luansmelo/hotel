import prisma from "@/config/prisma";

import { FindMenuByIdController } from "@/controllers/menu/FindMenuByIdController";
import { MenuRepository } from "@/repositories/MenuRepository";
import { FindMenuByIdUseCase } from "@/useCase/menu/FindMenuByIdUseCase";

export function makeFindMenuByIdController(): FindMenuByIdController {
  const repo = new MenuRepository(prisma);

  const menu = new FindMenuByIdUseCase(repo);

  return new FindMenuByIdController(menu);
}

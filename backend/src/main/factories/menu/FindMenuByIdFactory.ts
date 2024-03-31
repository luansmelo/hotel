import prisma from "@/config/prisma";

import { FindMenuByIdController } from "@/presentation/controllers/menu/FindMenuByIdController";
import { MenuRepository } from "@/infra/db/mysql/MenuRepository";
import { FindMenuByIdUseCase } from "@/data/usecases/menu/FindMenuByIdUseCase";

export function makeFindMenuByIdController(): FindMenuByIdController {
  const repo = new MenuRepository(prisma);

  const menu = new FindMenuByIdUseCase(repo);

  return new FindMenuByIdController(menu);
}

import prisma from "@/config/prisma";

import { UpdateMenuController } from "@/presentation/controllers/menu/UpdateMenuController";
import { MenuRepository } from "@/infra/db/mysql/MenuRepository";
import { FindMenuByIdUseCase } from "@/data/usecases/menu/FindMenuByIdUseCase";
import { UpdateMenuUseCase } from "@/data/usecases/menu/UpdateMenuUseCase";

export function makeUpdateMenuController(): UpdateMenuController {
  const repo = new MenuRepository(prisma);

  const findMenuById = new FindMenuByIdUseCase(repo);

  const updateMenu = new UpdateMenuUseCase(repo, findMenuById);

  return new UpdateMenuController(updateMenu);
}

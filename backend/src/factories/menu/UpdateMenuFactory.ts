import prisma from "@/config/prisma";

import { UpdateMenuController } from "@/controllers/menu/UpdateMenuController";
import { MenuRepository } from "@/repositories/MenuRepository";
import { FindMenuByIdUseCase } from "@/useCase/menu/FindMenuByIdUseCase";
import { UpdateMenuUseCase } from "@/useCase/menu/UpdateMenuUseCase";

export function makeUpdateMenuController(): UpdateMenuController {
  const repo = new MenuRepository(prisma);

  const findMenuById = new FindMenuByIdUseCase(repo);

  const updateMenu = new UpdateMenuUseCase(repo, findMenuById);

  return new UpdateMenuController(updateMenu);
}

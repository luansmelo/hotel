import prisma from "@/config/prisma";

import { CreateMenuController } from "@/controllers/menu/CreateMenuController";
import { MenuRepository } from "@/repositories/MenuRepository";
import { CreateMenuUseCase } from "@/useCase/menu/CreateMenuUseCase";
import { FindMenuByNameUseCase } from "@/useCase/menu/FindMenuByNameUseCase";

export function makeCreateMenuController(): CreateMenuController {
  const repo = new MenuRepository(prisma);

  const findMenuByName = new FindMenuByNameUseCase(repo);

  const createMenu = new CreateMenuUseCase(repo, findMenuByName);

  return new CreateMenuController(createMenu);
}

import prisma from "@/config/prisma";

import { CreateMenuController } from "@/presentation/controllers/menu/CreateMenuController";
import { MenuRepository } from "@/infra/db/mysql/MenuRepository";
import { CreateMenuUseCase } from "@/data/usecases/menu/CreateMenuUseCase";
import { FindMenuByNameUseCase } from "@/data/usecases/menu/FindMenuByNameUseCase";

export function makeCreateMenuController(): CreateMenuController {
  const repo = new MenuRepository(prisma);

  const findMenuByName = new FindMenuByNameUseCase(repo);

  const createMenu = new CreateMenuUseCase(repo, findMenuByName);

  return new CreateMenuController(createMenu);
}

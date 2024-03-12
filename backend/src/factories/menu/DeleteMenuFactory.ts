import prisma from "@/config/prisma";

import { DeleteMenuController } from "@/controllers/menu/DeleteProductController";
import { MenuRepository } from "@/repositories/MenuRepository";
import { DeleteMenuUseCase } from "@/useCase/menu/DeleteMenuUseCase";
import { FindMenuByIdUseCase } from "@/useCase/menu/FindMenuByIdUseCase";

export function makeDeleteMenuController(): DeleteMenuController {
  const repo = new MenuRepository(prisma);

  const findMenuById = new FindMenuByIdUseCase(repo);

  const deleteMenu = new DeleteMenuUseCase(repo, findMenuById);

  return new DeleteMenuController(deleteMenu);
}

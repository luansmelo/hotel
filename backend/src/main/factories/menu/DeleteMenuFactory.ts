import prisma from "@/config/prisma";

import { DeleteMenuController } from "@/presentation/controllers/menu/DeleteProductController";
import { MenuRepository } from "@/infra/db/mysql/MenuRepository";
import { DeleteMenuUseCase } from "@/data/usecases/menu/DeleteMenuUseCase";
import { FindMenuByIdUseCase } from "@/data/usecases/menu/FindMenuByIdUseCase";

export function makeDeleteMenuController(): DeleteMenuController {
  const repo = new MenuRepository(prisma);

  const findMenuById = new FindMenuByIdUseCase(repo);

  const deleteMenu = new DeleteMenuUseCase(repo, findMenuById);

  return new DeleteMenuController(deleteMenu);
}

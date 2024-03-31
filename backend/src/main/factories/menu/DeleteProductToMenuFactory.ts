import prisma from "@/config/prisma";

import { DeleteProductToMenuController } from "@/presentation/controllers/menu/DeleteProductToMenuController";
import { MenuRepository } from "@/infra/db/mysql/MenuRepository";
import { DeleteProductToMenuUseCase } from "@/data/usecases/menu/DeleteProductToMenuUseCase";
import { FindMenuByIdUseCase } from "@/data/usecases/menu/FindMenuByIdUseCase";

export function makeDeleteProductToMenuController(): DeleteProductToMenuController {
  const repo = new MenuRepository(prisma);

  const findMenuById = new FindMenuByIdUseCase(repo);

  const deleteProductToMenu = new DeleteProductToMenuUseCase(
    repo,
    findMenuById
  );

  return new DeleteProductToMenuController(deleteProductToMenu);
}

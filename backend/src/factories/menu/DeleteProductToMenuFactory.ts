import prisma from "@/config/prisma";

import { DeleteProductToMenuController } from "@/controllers/menu/DeleteProductToMenuController";
import { MenuRepository } from "@/repositories/MenuRepository";
import { DeleteProductToMenuUseCase } from "@/useCase/menu/DeleteProductToMenuUseCase copy";
import { FindMenuByIdUseCase } from "@/useCase/menu/FindMenuByIdUseCase";

export function makeDeleteProductToMenuController(): DeleteProductToMenuController {
  const repo = new MenuRepository(prisma);

  const findMenuById = new FindMenuByIdUseCase(repo);

  const deleteProductToMenu = new DeleteProductToMenuUseCase(
    repo,
    findMenuById
  );

  return new DeleteProductToMenuController(deleteProductToMenu);
}

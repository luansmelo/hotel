import prisma from "@/config/prisma";

import { AddProductToMenuController } from "@/controllers/menu/AddProductToMenuController";
import { MenuRepository } from "@/repositories/MenuRepository";
import { AddProductToMenuUseCase } from "@/useCase/menu/AddProductToMenuUseCase";
import { FindMenuByIdUseCase } from "@/useCase/menu/FindMenuByIdUseCase";

export function makeAddProductToMenuController(): AddProductToMenuController {
  const repo = new MenuRepository(prisma);

  const findMenuById = new FindMenuByIdUseCase(repo);

  const addProduct = new AddProductToMenuUseCase(repo, findMenuById);

  return new AddProductToMenuController(addProduct);
}

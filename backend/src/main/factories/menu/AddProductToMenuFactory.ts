import prisma from "@/config/prisma";

import { AddProductToMenuController } from "@/presentation/controllers/menu/AddProductToMenuController";
import { MenuRepository } from "@/infra/db/mysql/MenuRepository";
import { AddProductToMenuUseCase } from "@/data/usecases/menu/AddProductToMenuUseCase";
import { FindMenuByIdUseCase } from "@/data/usecases/menu/FindMenuByIdUseCase";

export function makeAddProductToMenuController(): AddProductToMenuController {
  const repo = new MenuRepository(prisma);

  const findMenuById = new FindMenuByIdUseCase(repo);

  const addProduct = new AddProductToMenuUseCase(repo, findMenuById);

  return new AddProductToMenuController(addProduct);
}

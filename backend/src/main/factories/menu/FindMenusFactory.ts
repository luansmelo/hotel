import prisma from "@/config/prisma";
import { FindMenusController } from "@/presentation/controllers/menu/FindMenusController";
import { MenuRepository } from "@/infra/db/mysql/MenuRepository";
import { FindMenusUseCase } from "@/data/usecases/menu/FindMenusUseCase";

export function makeFindMenusController(): FindMenusController {
  const repo = new MenuRepository(prisma);

  const menu = new FindMenusUseCase(repo);

  return new FindMenusController(menu);
}

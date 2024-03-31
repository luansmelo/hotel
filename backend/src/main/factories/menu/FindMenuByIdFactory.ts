import { FindMenuByIdController } from "@/presentation/controllers/menu/FindMenuByIdController";
import { FindMenuByIdUseCase } from "@/data/usecases/menu/FindMenuByIdUseCase";
import { MenuRepository } from "@/infra/db/mysql/menu/MenuRepository";

export function makeFindMenuByIdController(): FindMenuByIdController {
  const repo = new MenuRepository();

  const menu = new FindMenuByIdUseCase(repo);

  return new FindMenuByIdController(menu);
}

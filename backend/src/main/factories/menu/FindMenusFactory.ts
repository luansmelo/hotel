import { FindMenusController } from "@/presentation/controllers/menu/FindMenusController";
import { MenuRepository } from "@/infra/db/mysql/menu/MenuRepository";
import { ValidationComposite } from "@/validation/validators";
import { SortMenuValidator } from "@/validation/validators/SortMenuValidator";

export function makeFindMenusController(): FindMenusController {
  const repo = new MenuRepository();

  const validation = new SortMenuValidator();

  const composition = new ValidationComposite([validation]);

  return new FindMenusController(repo, composition);
}

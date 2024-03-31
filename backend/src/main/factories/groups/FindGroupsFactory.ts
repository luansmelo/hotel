import { FindGroupsController } from "@/presentation/controllers/groups/FindGroupsController";
import { GroupRepository } from "@/infra/db/mysql/GroupRepository";
import { FindGroupsUseCase } from "@/data/usecases/group/FindGroupsUseCase";
import { SortGroupValidator } from "@/validators/sort/SortGroupValidator";
import { ValidationComposite } from "@/validators/ValidationComposition";

export function makeFindGroupsController(): FindGroupsController {
  const repo = new GroupRepository();

  const categories = new FindGroupsUseCase(repo);

  const validation = new SortGroupValidator();

  const composition = new ValidationComposite([validation]);

  return new FindGroupsController(categories, composition);
}

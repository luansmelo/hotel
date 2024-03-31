import { FindGroupsUseCase } from "@/data/usecases/group/LoadGroups";
import { GroupRepository } from "@/infra/db/mysql/group/GroupRepository";
import { LoadGroupsController } from "@/presentation/controllers/groups/FindGroupsController";
import { ValidationComposite } from "@/validation/validators";
import { SortGroupValidator } from "@/validation/validators/SortGroupValidator";


export function makeFindGroupsController(): LoadGroupsController {
  const repo = new GroupRepository();

  const categories = new FindGroupsUseCase(repo);

  const validation = new SortGroupValidator();

  const composition = new ValidationComposite([validation]);

  return new LoadGroupsController(categories, composition);
}

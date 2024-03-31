import { LoadGroupByIdUseCase } from "@/data/usecases/group/LoadGroupById";
import { GroupRepository } from "@/infra/db/mysql/group/GroupRepository";
import { FindGroupByIdController } from "@/presentation/controllers/groups/FindGroupByIdController";

export function makeFindGroupByIdController(): FindGroupByIdController {
  const repo = new GroupRepository();

  const categories = new LoadGroupByIdUseCase(repo);

  return new FindGroupByIdController(categories);
}

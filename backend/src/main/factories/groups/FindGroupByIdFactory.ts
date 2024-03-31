import { FindGroupByIdController } from "@/presentation/controllers/groups/FindGroupByIdController";
import { GroupRepository } from "@/infra/db/mysql/GroupRepository";
import { FindGroupByIdUseCase } from "@/data/usecases/group/FindGroupByIdUseCase";

export function makeFindGroupByIdController(): FindGroupByIdController {
  const repo = new GroupRepository();

  const categories = new FindGroupByIdUseCase(repo);

  return new FindGroupByIdController(categories);
}

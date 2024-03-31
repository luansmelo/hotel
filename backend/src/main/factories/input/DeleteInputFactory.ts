import { DeleteInputController } from "@/presentation/controllers/input/DeleteInputController";
import { DeleteInputUseCase } from "@/data/usecases/input/DeleteInputUseCase";
import { InputRepository } from "@/infra/db/mysql/input/InputRepository";

export function makeDeleteInputController(): DeleteInputController {
  const repo = new InputRepository();

  const deleteInput = new DeleteInputUseCase(repo, repo);

  return new DeleteInputController(deleteInput);
}

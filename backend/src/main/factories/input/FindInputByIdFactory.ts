import { FindInputByIdController } from "@/presentation/controllers/input/FindInputByIdController";
import { InputRepository } from "@/infra/db/mysql/input/InputRepository";
import { LoadInputByIdUseCase } from "@/data/usecases/input/FindInputByIdUseCase";

export function makeFindInputByIdController(): FindInputByIdController {
  const repo = new InputRepository();

  const input = new LoadInputByIdUseCase(repo);

  return new FindInputByIdController(input);
}

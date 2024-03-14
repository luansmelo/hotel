import prisma from "@/config/prisma";

import { CreateInputController } from "@/controllers/input/CreateInputController";
import { GroupRepository } from "@/repositories/GroupRepository";
import { InputRepository } from "@/repositories/InputRepository";
import { MeasureRepository } from "@/repositories/MeasureRepository";
import { FindGroupByIdUseCase } from "@/useCase/group/FindGroupByIdUseCase";
import { CreateInputUseCase } from "@/useCase/input/CreateInputUseCase";
import { FindInputByCodeUseCase } from "@/useCase/input/FindInputByCodeUseCase";
import { FindInputByNameUseCase } from "@/useCase/input/FindInputByNameUseCase";
import { FindMeasureByIdUseCase } from "@/useCase/measure/FindMeasureByIdUseCase";
import { makeInputValidationFactory } from "./InputValidationFactory";

export function makeCreateInputController(): CreateInputController {
  const repo = new InputRepository(prisma);

  const measureRepo = new MeasureRepository(prisma);
  
  const groupRepo = new GroupRepository(prisma);

  const findInputByName = new FindInputByNameUseCase(repo);

  const findInputByCode = new FindInputByCodeUseCase(repo);

  const findMeasureById = new FindMeasureByIdUseCase(measureRepo);

  const findGroupById = new FindGroupByIdUseCase(groupRepo);

  const createCategory = new CreateInputUseCase(
    repo,
    findInputByName,
    findInputByCode,
    findMeasureById,
    findGroupById
  );

  const validator = makeInputValidationFactory()

  return new CreateInputController(createCategory, validator);
}

import { CreateIngredientRepository } from "@/data/protocols/db/input/CreateIngredientRepository.protocol";
import { mapperInput } from "@/data/usecases/input/mapper/mapperInput";
import { Input, InputGroups } from "@/data/local/entity/input";
import { CreateInputModel } from "@/domain/usecases/input/CreateInput";
import { InputModel } from "@/domain/models/Input";
import { FindInputsParams, FindInputsResponse } from "@/domain/usecases/input/FindInputsParams";
import { LoadInputByCodeRepository } from "@/data/protocols/db/input/LoadIngredientByCodeRepository.protocol";
import { LoadInputByIdRepository } from "@/data/protocols/db/input/LoadIngredientByIdRepository.protocol";
import { LoadInputByNameRepository } from "@/data/protocols/db/input/LoadIngredientByNameRepository.protocol";
import { LoadInputsRepository } from "@/data/protocols/db/input/LoadIngredientsRepository.protocol";
import { UpdateIngredientRepository } from "@/data/protocols/db/input/UpdateIngredientRepository.protocol";
import { DeleteIngredientRepository } from "@/data/protocols/db/input/DeleteIngredientRepository.protocol";
import { CountTotalIngredientsRepository } from "@/data/protocols/db/input/CountTotalIngredientsRepository.protocol";

export class IngredientRepository
  implements
  CreateIngredientRepository,
  LoadInputByCodeRepository,
  LoadInputByIdRepository,
  LoadInputByNameRepository,
  LoadInputsRepository,
  DeleteIngredientRepository,
  UpdateIngredientRepository,
  CountTotalIngredientsRepository {

  async create(input: CreateInputModel): Promise<InputModel> {
    const { groupIds, ...rest } = input
    const createInput = await Input.create({
      data: {
        ...rest,
        groups: {
          create: groupIds.map((groupId) => ({
            groupId,
          })),
        },
      },
      select: {
        id: true,
        name: true,
        unitPrice: true,
        measurement: true,
        code: true,
        groups: {
          include: {
            group: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
      },
    });

    return mapperInput(createInput);
  }

  async loadById(id: string): Promise<InputModel | null> {
    const db = await Input.findUnique({
      where: { id },
      include: {
        measurement: {
          select: {
            id: true,
            name: true,
          },
        },
        groups: {
          include: {
            group: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
      },
    });

    if (!db) return null;
    return mapperInput(db);
  }

  async findByIds(ids: string[]): Promise<InputModel[]> {
    const db = await Input.findFirst({
      where: { id: { in: ids } },
      include: {
        measurement: {
          select: {
            id: true,
            name: true,
          },
        },
        groups: {
          include: {
            group: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
      },
    });

    if (!db) return null;

    const serialized = {
      id: db.id,
      name: db.name,
      code: db.code,
      unitPrice: db.unitPrice,
      measurement: db.measurement,
      groups: db.groups.map((e) => e.group),
    } as unknown as InputModel[];

    return serialized;
  }

  async loadByName(name: string): Promise<InputModel | null> {
    const db = await Input.findUnique({
      where: { name },
      include: {
        measurement: {
          select: {
            id: true,
            name: true,
          },
        },
        groups: {
          include: {
            group: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
      },
    });

    if (!db) return null;

    return mapperInput(db);
  }

  async loadByCode(code: string): Promise<InputModel | null> {
    const db = await Input.findUnique({
      where: { code },
      include: {
        measurement: {
          select: {
            id: true,
            name: true,
          },
        },
        groups: {
          include: {
            group: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
      },
    });

    if (!db) return null;

    return mapperInput(db);
  }

  async loadAll(
    findParams: FindInputsParams
  ): Promise<FindInputsResponse | null> {

    const page = findParams.page || 1;
    const limit = process.env.PAGE_LIMIT
      ? parseInt(process.env.PAGE_LIMIT)
      : 10;
    const offset = (page - 1) * limit;
    const order = findParams.order || "asc";
    const sort = findParams.sort || "name";

    const input = await Input.findMany({
      orderBy: {
        [sort]: order,
      },
      include: {
        measurement: {
          select: {
            id: true,
            name: true,
          },
        },
        groups: {
          include: {
            group: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
      },
      take: limit,
      skip: offset,
    });

    const totalItems = input.length;
    const totalPages = Math.ceil(totalItems / limit);

    const ingredients = input.map((inputs) => mapperInput(inputs));

    return {
      ingredients,
      totalPages,
      totalItems,
    };
  }

  async updateById(
    id: string,
    input: Partial<CreateInputModel>
  ): Promise<Partial<InputModel>> {
    const newGroups = input.groupIds || [];

    const existingGroups = await InputGroups.findMany({
      where: { ingredientId: id },
      select: { groupId: true },
    });

    const groupsToDelete = existingGroups.filter(
      (existingGroup) => !newGroups.includes(existingGroup.groupId)
    );

    const groupsToAdd = newGroups.filter(
      (groupId) =>
        !existingGroups.some(
          (existingGroup) => existingGroup.groupId === groupId
        )
    );

    return Input.update({
      where: { id },
      data: {
        name: input.name,
        code: input.code,
        measurementId: input.measurementId,
        unitPrice: input.unitPrice,
        groups: {
          deleteMany: {
            groupId: {
              in: groupsToDelete.map((group) => group.groupId),
            },
          },

          createMany: {
            data: groupsToAdd.map((groupId) => ({
              groupId,
            })),
          },
        },
      },
    });
  }

  async deleteById(id: string): Promise<InputModel> {
    const db = await Input.delete({
      where: { id },
      include: {
        measurement: {
          select: {
            id: true,
            name: true,
          },
        },
        groups: {
          include: {
            group: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
      },
    });

    return mapperInput(db);
  }

  async countTotalIngredients(): Promise<number> {
    const count = await Input.count();
    return count;
  }
}

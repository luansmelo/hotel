import { PrismaClient } from "@prisma/client";
import {
  CreateInputContract,
  DeleteInputContract,
  FindInputByCodeContract,
  FindInputByIdContract,
  FindInputByNameContract,
  FindInputsContract,
  InputModel,
  UpdateInputContract,
} from "@/contracts/input";
import { CreateInputModel } from "@/entities/input/createInput";
import { FindInputsByIdContract } from "@/contracts/input/FindInputsByIdContract";
import {
  FindInputsParams,
  FindInputsResponse,
} from "@/entities/input/FindInputsParams";
import { mapperInput } from "@/data/usecases/input/mapper/mapperInput";

export class InputRepository
  implements
  CreateInputContract,
  FindInputByCodeContract,
  FindInputByIdContract,
  FindInputByNameContract,
  FindInputsByIdContract,
  FindInputsContract,
  DeleteInputContract,
  UpdateInputContract {
  constructor(private readonly db: PrismaClient) { }

  async save(input: CreateInputModel): Promise<InputModel> {
    const createInput = await this.db.input.create({
      data: {
        ...input,
        groups: {
          create: input.groups.map((groupId) => ({
            groupId,
          })),
        },
      },
      select: {
        id: true,
        name: true,
        unitPrice: true,
        measurementUnit: true,
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

  async findById(id: string): Promise<InputModel | null> {
    const db = await this.db.input.findUnique({
      where: { id },
      include: {
        measurementUnit: {
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
    const db = await this.db.input.findFirst({
      where: { id: { in: ids } },
      include: {
        measurementUnit: {
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
      measurementUnit: db.measurementUnit,
      groups: db.groups.map((e) => e.group),
    } as unknown as InputModel[];

    return serialized;
  }

  async findByName(name: string): Promise<InputModel | null> {
    const db = await this.db.input.findUnique({
      where: { name },
      include: {
        measurementUnit: {
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

  async findByCode(code: string): Promise<InputModel | null> {
    const db = await this.db.input.findUnique({
      where: { code },
      include: {
        measurementUnit: {
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

  async findAll(
    findParams: FindInputsParams
  ): Promise<FindInputsResponse | null> {

    const page = findParams.page || 1;
    const limit = process.env.PAGE_LIMIT
      ? parseInt(process.env.PAGE_LIMIT)
      : 10;
    const offset = (page - 1) * limit;
    const order = findParams.order || "ASC";
    const sort = findParams.sort || "name";

    const input = await this.db.input.findMany({
      orderBy: [
        {
          [sort]: order,
        },
      ],
      include: {
        measurementUnit: {
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

    const inputs = input.map((inputs) => mapperInput(inputs));

    return {
      inputs,
      totalPages,
      totalItems,
    };
  }

  async updateById(
    id: string,
    input: Partial<CreateInputModel>
  ): Promise<Partial<InputModel>> {
    const newGroups = input.groups || [];

    return this.db.$transaction(async (prisma) => {
      const existingGroups = await prisma.groupsOnInputs.findMany({
        where: { inputId: id },
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

      return prisma.input.update({
        where: { id },
        data: {
          name: input.name,
          code: input.code,
          measurementUnitId: input.measurementUnitId,
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
    });
  }

  async deleteById(id: string): Promise<InputModel> {
    const db = await this.db.input.delete({
      where: { id },
      include: {
        measurementUnit: {
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
}

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

export class InputRepository
  implements
    CreateInputContract,
    FindInputByCodeContract,
    FindInputByIdContract,
    FindInputByNameContract,
    FindInputsContract,
    DeleteInputContract,
    UpdateInputContract
{
  constructor(private readonly db: PrismaClient) {}

  async save(input: CreateInputModel): Promise<InputModel> {
    const formattedInput = await this.db.input.create({
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

    const mappedSerializedInput = {
      ...formattedInput,
      groups: formattedInput.groups.map((e) => e.group),
    };

    return mappedSerializedInput;
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

    const serialized = {
      ...db,
      measurement: db.measurementUnit,
      groups: db.groups.map((e) => e.group),
    };

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

    const serialized = {
      ...db,
      groups: db?.groups?.map((e) => e.group),
    };

    return serialized;
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

    const serialized = {
      ...db,
      groups: db?.groups?.map((e) => e.group),
    };

    return serialized;
  }

  async findAll(): Promise<InputModel[] | null> {
    const db = await this.db.input.findMany({
      orderBy: {
        name: "asc",
      },
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

    const serializedFormattedInput = db.map((inputs) => ({
      ...inputs,
      measurementUnitId: inputs.measurementUnitId,
      groups: inputs.groups.map((input) => input.group),
    }));

    return serializedFormattedInput;
  }

  async updateById(
    id: string,
    input: Partial<CreateInputModel>
  ): Promise<void> {
    const newGroups = input.groups || [];

    await this.db.$transaction(async (prisma) => {
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

      await prisma.input.update({
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

    return {
      ...db,
      groups: db.groups.map((e) => e.group),
    };
  }
}

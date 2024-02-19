import { InputRepositoryContract } from "../utils/contracts/input-contract";
import { InputContract, InputRegister } from "../dto/input.dto";
import { PrismaClient } from "@prisma/client";
import { uuid } from "uuidv4";

export class InputRepository implements InputRepositoryContract {
  constructor(private readonly db: PrismaClient) {}

  async save(input: InputContract) {
    return this.db.input.create({
      data: {
        ...input,
        groups: {
          create: input.groups.map((groupId) => ({
            id: uuid(),
            groupId,
          })),
        },
      },
      select: {
        id: true,
        name: true,
        unitPrice: true,
        measurementUnit: {
          select: {
            id: true,
            name: true,
          },
        },
        code: true,
        groups: true,
      },
    });
  }

  async getById(id: string) {
    const db = await this.db.input.findUnique({ where: { id } });

    return db;
  }

  async getByCode(code: string): Promise<any> {
    const db = await this.db.input.findUnique({ where: { code } });

    return db;
  }

  async getAll() {
    const db = await this.db.input.findMany({
      orderBy: {
        name: "asc",
      },
      include: {
        measurementUnit: {
          select: {
            name: true,
          },
        },
        groups: {
          select: {
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

    return db;
  }

  async updateById(id: string, input: InputRegister) {
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

  async deleteById(id: string) {
    await this.db.input.delete({
      where: { id },
    });
  }
}

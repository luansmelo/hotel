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

    await this.db.input.update({
      where: { id },
      data: {
        name: input.name,
        code: input.code,
        measurementUnitId: input.measurementUnitId,
        unitPrice: input.unitPrice,
        groups: {
          deleteMany: {
            inputId: id,
          },
          createMany: {
            data: newGroups.map((groupId) => ({
              groupId,
            })),
          },
          updateMany: newGroups.map((groupId) => ({
            where: { inputId: id },
            data: {
              groupId,
            },
          })),
        },
      },
    });
  }

  async deleteById(id: string) {
    await this.db.input.delete({
      where: { id },
    });
  }
}

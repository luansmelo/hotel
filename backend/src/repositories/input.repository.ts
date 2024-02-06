import { InputRepositoryContract } from "../utils/contracts/input-contract";
import { InputContract, InputRegister } from "../dto/input.dto";
import { PrismaClient } from "@prisma/client";
import { uuid } from "uuidv4";

export class InputRepository implements InputRepositoryContract {
  constructor(private readonly db: PrismaClient) {}

  async save(input: InputContract) {
    const db = await this.db.input.create({
      data: {
        ...input,
        group: {
          create: input.group.map((groupId) => ({
            id: uuid(),
            groupId,
          })),
        },
      },
    });

    return db;
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
        group: {
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
    const newGroups = input.group || [];

    await this.db.input.update({
      where: { id },
      data: {
        name: input.name,
        code: input.code,
        measurementUnitId: input.measurementUnitId,
        unitPrice: input.unitPrice,
        group: {
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

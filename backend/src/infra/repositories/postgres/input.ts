import { PrismaClient } from "@prisma/client";

import {
  CreateInputRepo,
  InputRepository,
} from "../../../data/contracts/repositories/input";
import { InputContract } from "../../../data/contracts/domain/input";

export class PostgresInputRepository implements InputRepository {
  constructor(private readonly db: PrismaClient) {}
  async create(input: CreateInputRepo): Promise<InputContract> {
    const db = await this.db.input.create({
      data: input,
    });

    return db;
  }
  async getByID(input: string): Promise<InputContract> {
    const db = await this.db.input.findUnique({ where: { id: input } });

    if (!db) throw new Error("Input not found");

    return db;
  }
}

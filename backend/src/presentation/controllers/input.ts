import { Request, Response } from "express";
import {
  InputContract,
  CreateInputContract,
} from "../../data/contracts/domain/input";
import { HttpResponse } from "../contracts/http-response";
import { InputUseCases } from "../../domain/use-cases/input";

export class InputController {
  constructor(private readonly service: InputUseCases) {}
  async create(
    req: Request,
    res: Response
  ): Promise<Response<HttpResponse<InputContract>>> {
    try {
      const input: CreateInputContract = {
        name: req.body.name,
        code: req.body.code,
        unitPrice: req.body.unitPrice,
        measurementUnit: req.body.measurementUnit,
        grammage: req.body.grammage,
        group: req.body.group,
      };

      const data = await this.service.create(input);

      return res.status(200).json({
        data,
      });
    } catch (err: any) {
      return res.status(500).json({
        data: err.message,
      });
    }
  }
  async getByID(input: string): Promise<HttpResponse<InputContract>> {
    try {
      const data = await this.service.getByID(input);

      return {
        data,
      };
    } catch (err: any) {
      return {
        data: err.message,
      };
    }
  }
}

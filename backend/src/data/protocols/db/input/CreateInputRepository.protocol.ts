import { InputModel } from "@/domain/models/Input";
import { CreateInputModel } from "@/domain/usecases/input/CreateInput";

export interface CreateInputRepository {
    create(input: CreateInputModel): Promise<InputModel>;
}
import { CreateMeasureController } from "./CreateMeasureController";
import { MeasureModel } from "@/domain/models/Measure";
import { Validation } from "@/validation/protocols";
import { HttpRequest } from "@/presentation/protocols";
import { CreateMeasureModel, CreateMeasureUseCaseContract } from "@/domain/usecases/measure/CreateMeasure";

const makeCreateMeasureStub = () => {
    class CreateMeasureStub implements CreateMeasureUseCaseContract {
        async create(input: CreateMeasureModel): Promise<MeasureModel> {
            return Promise.resolve({
                id: 'valid_id',
                name: input.name,
            })
        }
    }
    return new CreateMeasureStub()
}

const makeSut = () => {
    const createMeasureStub = makeCreateMeasureStub()
    const sut = new CreateMeasureController(createMeasureStub)
    return {
        sut,
        createMeasureStub
    }
}

const makeFakeRequest = (): HttpRequest => ({
    body: {
        name: 'any_name'
    }
})

describe('Create Measure Controller', () => {
    it('should call createMeasure with correct values', async () => {
        const { sut, createMeasureStub } = makeSut()
        const httpRequest = makeFakeRequest()

        const addSpy = jest.spyOn(createMeasureStub, 'create')
        sut.handle(httpRequest)

        expect(addSpy).toHaveBeenCalledWith(httpRequest.body)
    })

    it('should return 200 if valid data is provided', async () => {
        const { sut } = makeSut()
        const httpRequest = makeFakeRequest()

        const httpResponse = await sut.handle(httpRequest)

        expect(httpResponse.statusCode).toBe(200)
        expect(httpResponse.body).toHaveProperty('id')
    })

    it('should return 500 if createMeasure throws ', async () => {
        const { sut, createMeasureStub } = makeSut();
        const httpRequest = makeFakeRequest();
        jest.spyOn(createMeasureStub, 'create').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())));
        const httpResponse = await sut.handle(httpRequest);
        expect(httpResponse.statusCode).toBe(500);
    });
})
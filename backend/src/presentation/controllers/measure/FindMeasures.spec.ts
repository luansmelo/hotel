import { HttpRequest } from "@/presentation/protocols";
import { Validation } from "@/validation/protocols";
import { FindMeasuresController } from "./FindMeasuresController";
import { MeasureModel } from "@/domain/models/Measure";
import { LoadMeasuresUseCaseContract } from "@/domain/usecases/measure/LoadMeasures";

const httpRequest: HttpRequest = {
    query: {
        name: 'any_name',
        sort: 'any_sort'
    }
}

const makeValidation = (): Validation => {
    class ValidationStub implements Validation {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        validate(input: unknown): Error | void {
            return undefined;
        }
    }
    return new ValidationStub();
};

const makeLoadMeasuresStub = () => {
    class LoadMeasuresStub implements LoadMeasuresUseCaseContract {
        async loadAll(): Promise<MeasureModel[]> {
            return Promise.resolve(
                [{
                    id: 'any_id',
                    name: 'any_name'
                }],
            )
        }
    }

    return new LoadMeasuresStub()
}

const makeSut = () => {
    const validationStub = makeValidation()
    const loadMeasuresStub = makeLoadMeasuresStub()
    const sut = new FindMeasuresController(loadMeasuresStub)
    return { sut, loadMeasuresStub, validationStub }
}

describe('LoadMeasuresController', () => {
    it('should return 200 if FindMeasures returns a list Measures', async () => {
        const { sut } = makeSut()
        const httpResponse = await sut.handle(httpRequest)

        expect(httpResponse.statusCode).toBe(200)
        expect(httpResponse.body).toEqual(
            [
                {
                    id: 'any_id',
                    name: 'any_name'
                },
            ],
        )
    })

    it('should return 500 if LoadMeasures throws', async () => {
        const { sut, loadMeasuresStub } = makeSut()
        jest.spyOn(loadMeasuresStub, 'loadAll').mockImplementationOnce(() => {
            throw new Error()
        })

        const httpResponse = await sut.handle(httpRequest)
        expect(httpResponse.statusCode).toBe(500)
    })
})
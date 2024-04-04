import { HttpRequest } from "@/presentation/protocols";
import { Validation } from "@/validation/protocols";
import { FindMeasuresController } from "./FindMeasuresController";
import { LoadMeasuresUseCaseContract } from "@/domain/usecases/measure/LoadMeasures";
import { FindMeasuresParams, FindMeasuresResponse } from "@/domain/usecases/measure/FindMeasuresParams";

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
        async loadAll(params: FindMeasuresParams): Promise<FindMeasuresResponse> {
            return Promise.resolve({
                measures: [
                    {
                        id: 'any_id',
                        name: 'any_name',
                    }
                ],
                totalPages: 1,
                totalItems: 1
            })
        }
    }

    return new LoadMeasuresStub()
}

const makeSut = () => {
    const validationStub = makeValidation()
    const loadMeasuresStub = makeLoadMeasuresStub()
    const sut = new FindMeasuresController(loadMeasuresStub, validationStub)
    return { sut, loadMeasuresStub, validationStub }
}

describe('LoadMeasuresController', () => {
    it('should return 200 if FindMeasures returns a list Measures', async () => {
        const { sut } = makeSut()
        const httpResponse = await sut.handle(httpRequest)

        expect(httpResponse.statusCode).toBe(200)
        expect(httpResponse.body).toEqual({
            measures: [
                {
                    id: 'any_id',
                    name: 'any_name',
                }
            ],
            totalPages: 1,
            totalItems: 1
        })
    })

    it('should return 500 if LoadMeasures throws', async () => {
        const { sut, loadMeasuresStub } = makeSut()
        jest.spyOn(loadMeasuresStub, 'loadAll').mockImplementationOnce(() => {
            throw new Error()
        })

        const httpResponse = await sut.handle(httpRequest)
        expect(httpResponse.statusCode).toBe(500)
    })

    it('should call Validation with correct value', async () => {
        const { sut, validationStub } = makeSut()
        const validateSpy = jest.spyOn(validationStub, 'validate')

        sut.handle(httpRequest)

        expect(validateSpy).toHaveBeenCalledWith(httpRequest.query)
    })

    it('should return 400 if Validation returns an error', async () => {
        const { sut, validationStub } = makeSut()

        jest.spyOn(validationStub, 'validate').mockReturnValueOnce(new Error())

        const httpResponse = await sut.handle(httpRequest)

        expect(httpResponse.statusCode).toBe(400)
    })
})
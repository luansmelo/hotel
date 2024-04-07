import { HttpRequest } from "@/presentation/protocols";
import { Validation } from "@/validation/protocols";
import { FindProductsController } from "./FindProductsController";
import { LoadProductsUseCaseContract } from "@/domain/usecases/product/LoadProducts";
import { FindProductsParams, FindProductsResponse } from "@/domain/usecases/product/FindProductsParams";

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

const makeLoadProductsStub = () => {
    class LoadProductsStub implements LoadProductsUseCaseContract {
        async loadAll(params: FindProductsParams): Promise<FindProductsResponse> {
            return Promise.resolve({
                products: [
                    {
                        id: 'any_id',
                        name: 'any_name',
                        description: 'any_description',
                        accession: 0,
                        preparationTime: '00:00',
                        resource: 'any_resource'
                    }
                ],
                totalPages: 1,
                totalItems: 1
            })
        }
    }

    return new LoadProductsStub()
}

const makeSut = () => {
    const validationStub = makeValidation()
    const loadProductsStub = makeLoadProductsStub()
    const sut = new FindProductsController(loadProductsStub, validationStub)
    return { sut, loadProductsStub, validationStub }
}

describe('LoadProductsController', () => {
    it('should return 200 if FindProducts returns a list Products', async () => {
        const { sut } = makeSut()
        const httpResponse = await sut.handle(httpRequest)

        expect(httpResponse.statusCode).toBe(200)
        expect(httpResponse.body).toEqual({
            products: [
                {
                    id: 'any_id',
                    name: 'any_name',
                    description: 'any_description',
                    accession: 0,
                    preparationTime: '00:00',
                    resource: 'any_resource'
                }
            ],
            totalPages: 1,
            totalItems: 1
        })
    })

    it('should return 500 if LoadProducts throws', async () => {
        const { sut, loadProductsStub } = makeSut()
        jest.spyOn(loadProductsStub, 'loadAll').mockImplementationOnce(() => {
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
import { HttpRequest } from "@/presentation/protocols";
import { LoadCategoriesUseCaseContract } from "@/domain/usecases/category/LoadCategories";
import { Validation } from "@/validation/protocols";
import { FindCategoriesParams, FindCategoriesResponse } from "@/domain/usecases/category/FindCategoriesParams";
import { FindCategoriesController } from "./FindCategoriesController";

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

const makeLoadCategoriesStub = () => {
    class LoadCategoriesStub implements LoadCategoriesUseCaseContract {
        async loadAll(params: FindCategoriesParams): Promise<FindCategoriesResponse> {
            return Promise.resolve({
                categories: [{
                    id: 'any_id',
                    name: 'any_name'
                }],
                totalPages: 1,
                totalItems: 1
            })
        }
    }

    return new LoadCategoriesStub()
}

const makeSut = () => {
    const validationStub = makeValidation()
    const loadCategoriesStub = makeLoadCategoriesStub()
    const sut = new FindCategoriesController(loadCategoriesStub, validationStub)
    return { sut, loadCategoriesStub, validationStub }
}

describe('FindCategoriesController', () => {
    it('should call FindCategories with correct values', async () => {
        const { sut, loadCategoriesStub } = makeSut()
        const loadSpyCategories = jest.spyOn(loadCategoriesStub, 'loadAll')
        sut.handle(httpRequest)
        expect(loadSpyCategories).toHaveBeenCalledWith(httpRequest.query)
    })

    it('should return 200 if FindCategories returns a list categories', async () => {
        const { sut } = makeSut()
        const httpResponse = await sut.handle(httpRequest)

        expect(httpResponse.statusCode).toBe(200)
        expect(httpResponse.body).toEqual({
            categories: [
                {
                    id: 'any_id',
                    name: 'any_name'
                },
            ],
            totalPages: 1,
            totalItems: 1,
        })
    })

    it('should return 500 if LoadCategories throws', async () => {
        const { sut, loadCategoriesStub } = makeSut()
        jest.spyOn(loadCategoriesStub, 'loadAll').mockImplementationOnce(() => {
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
import { CategoryModel } from "@/domain/models/Category";
import { FindCategoryByIdController } from "./FindCategoryByIdController";
import { LoadCategoryByIdUseCaseContract } from "@/domain/usecases/category/LoadCategoryById";

const mockRequest = () => ({
    params: {
        id: 'any_id'
    }
})

const makeFindCategoryByIdStub = () => {
    class FindCategoryByIdStub implements LoadCategoryByIdUseCaseContract {
        async loadById(id: string): Promise<CategoryModel> {
            return Promise.resolve({
                'id': 'any_id',
                name: 'any_name'
            })
        }
    }

    return new FindCategoryByIdStub()
}

const makeSut = () => {
    const findCategoryByIdStub = makeFindCategoryByIdStub()
    const sut = new FindCategoryByIdController(findCategoryByIdStub)
    return { sut, findCategoryByIdStub }
}

describe('FindCategoryByIdController', () => {
    it('should return 200 on success', async () => {
        const { sut } = makeSut()
        const httpResponse = await sut.handle(mockRequest())
        expect(httpResponse.statusCode).toBe(200)
        expect(httpResponse.body).toEqual({
            id: 'any_id',
            name: 'any_name'
        })
    })

    it('should return 404 if FindCategoryById returns null', async () => {
        const { sut, findCategoryByIdStub } = makeSut()
        jest.spyOn(findCategoryByIdStub, 'loadById').mockReturnValueOnce(
            new Promise(resolve => resolve(null)),
        );
        const httpResponse = await sut.handle(mockRequest())
        expect(httpResponse.statusCode).toBe(404)
    })

    it('should return 500 if FindCategoryById throws', async () => {
        const { sut, findCategoryByIdStub } = makeSut()

        jest.spyOn(findCategoryByIdStub, 'loadById').mockImplementationOnce(() => {
            throw new Error()
        })

        const httpResponse = await sut.handle(mockRequest())
        expect(httpResponse.statusCode).toBe(500)
    })
})
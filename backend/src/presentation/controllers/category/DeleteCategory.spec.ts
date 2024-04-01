import { DeleteCategoryUseCaseContract } from "@/domain/usecases/category/DeleteCategory";
import { DeleteCategoryController } from "./DeleteCategoryController";
import { CategoryModel } from "@/domain/models/Category";

const mockRequest = () => {
    return {
        params: {
            id: 'any_id'
        }
    }
}

const makeDeleteCategoryStub = () => {
    class DeleteCategoryStub implements DeleteCategoryUseCaseContract {
        async deleteById(id: string): Promise<CategoryModel> {
            return Promise.resolve({
                'id': 'any_id',
                name: 'any_name'
            });
        }
    }
    return new DeleteCategoryStub()
}

const makeSut = () => {
    const deleteCategoryStub = makeDeleteCategoryStub()
    const sut = new DeleteCategoryController(deleteCategoryStub)
    return { sut, deleteCategoryStub }
}

describe('Delete Category Controller', () => {
    it('should return 200 on sucess', async () => {
        const { sut } = makeSut()
        const httpRequest = mockRequest()

        const response = await sut.handle(httpRequest)
        expect(response.statusCode).toBe(200)
    })

    it('should call deleteCategory with correct values', () => {
        const { sut, deleteCategoryStub } = makeSut();
        const deleteSpy = jest.spyOn(deleteCategoryStub, 'deleteById');
        const request = mockRequest();
        sut.handle(request);
        expect(deleteSpy).toHaveBeenCalledWith(request.params.id);
    });

    it('should return 500 if deleteCategory throws', async () => {
        const { sut, deleteCategoryStub } = makeSut()
        jest.spyOn(deleteCategoryStub, 'deleteById').mockImplementationOnce(() => {
            throw new Error()
        })

        const httpRequest = mockRequest()
        const httpResponse = await sut.handle(httpRequest)
        expect(httpResponse.statusCode).toBe(500)
    })
})
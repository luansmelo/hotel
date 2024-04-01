import { DeleteCategoryUseCase } from "./DeleteCategoryUseCase";
import { DeleteCategoryRepository } from "@/data/protocols/db/category/DeleteCategoryRepository.protocol.ts";
import { CategoryModel } from "@/domain/models/Category";
import { LoadCategoryByIdRepository } from "@/data/protocols/db/category/LoadCategoryByIdRepository.protocol";

const mockRequest = () => {
    return {
        id: 'any_id'
    }
}

const makeLoadCategoryByIdStub = () => {
    class LoadCategoryByIdRepositoryStub implements LoadCategoryByIdRepository {
        async loadById(id: string): Promise<CategoryModel> {
            return Promise.resolve({
                id: 'any_id',
                name: 'any_name'
            })
        }
    }
    return new LoadCategoryByIdRepositoryStub()
}

const makeDeleteCategoryRepositoryStub = () => {
    class DeleteCategoryRepositoryStub implements DeleteCategoryRepository {
        async deleteById(id: string): Promise<CategoryModel> {
            return Promise.resolve({
                id: 'any_id',
                name: 'any_name'
            })
        }
    }
    return new DeleteCategoryRepositoryStub()
}

const makeSut = () => {
    const deleteCategoryRepositoryStub = makeDeleteCategoryRepositoryStub()
    const loadCategoryByIdRepositoryStub = makeLoadCategoryByIdStub()
    const sut = new DeleteCategoryUseCase(deleteCategoryRepositoryStub, loadCategoryByIdRepositoryStub)
    return { sut, deleteCategoryRepositoryStub, loadCategoryByIdRepositoryStub }
}

describe('Delete Category Usecase', () => {
    it('should call LoadCategoryRepository with correct values', async () => {
        const { sut, loadCategoryByIdRepositoryStub } = makeSut()
        const findSpy = jest.spyOn(loadCategoryByIdRepositoryStub, 'loadById')
        const httpRequest = mockRequest()
        await sut.deleteById(httpRequest.id)
        expect(findSpy).toHaveBeenCalledWith(httpRequest.id)
    })

    it('should call DeleteCategory with correct values', async () => {
        const { sut, deleteCategoryRepositoryStub } = makeSut()
        const findSpy = jest.spyOn(deleteCategoryRepositoryStub, 'deleteById')
        const httpRequest = mockRequest()
        await sut.deleteById(httpRequest.id)
        expect(findSpy).toHaveBeenCalledWith(httpRequest.id)
    })

    it('should throw if DeleteCategory throws', async () => {
        const { sut, deleteCategoryRepositoryStub } = makeSut()
        jest.spyOn(deleteCategoryRepositoryStub, 'deleteById').mockImplementationOnce(() => {
            throw new Error()
        })

        const httpRequest = mockRequest()
        const promise = sut.deleteById(httpRequest.id)
        expect(promise).rejects.toThrow()
    })
})
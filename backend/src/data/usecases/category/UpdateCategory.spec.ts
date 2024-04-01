import { CategoryModel } from "@/domain/models/Category";
import { CreateCategoryModel } from "@/domain/usecases/category/CreateCategory";
import { UpdateCategoryUseCase } from "./UpdateCategoryUseCase";
import { UpdateCategoryRepository } from "@/data/protocols/db/category/UpdateCategoryRepository.protocol";
import { LoadCategoryByIdRepository } from "@/data/protocols/db/category/LoadCategoryByIdRepository.protocol";

const makeFakeRequest = () => ({
    id: 'any_id',
    name: 'any_name'
})

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

const makeUpdateCategoryRepositoryStub = () => {
    class UpdateCategoryRepositoryStub implements UpdateCategoryRepository {
        async updateById(id: string, input: Partial<CreateCategoryModel>): Promise<Partial<CategoryModel>> {
            return Promise.resolve({
                id: 'any_id',
                name: 'new_name'
            })
        }
    }
    return new UpdateCategoryRepositoryStub()
}

const makeSut = () => {
    const loadCategoryByIdRepositoryStub = makeLoadCategoryByIdStub()
    const updateCategoryRepositoryStub = makeUpdateCategoryRepositoryStub()
    const sut = new UpdateCategoryUseCase(updateCategoryRepositoryStub, loadCategoryByIdRepositoryStub)
    return { sut, updateCategoryRepositoryStub, loadCategoryByIdRepositoryStub }
}

describe('UpdateCategory Usecase', () => {
    it('should call UpdateCategoryRepository with correct values', async () => {
        const { sut, updateCategoryRepositoryStub } = makeSut()
        const updateSpy = jest.spyOn(updateCategoryRepositoryStub, 'updateById')

        const httpRequest = makeFakeRequest()
        await sut.updateById(httpRequest.id, {
            ...httpRequest
        })
        expect(updateSpy).toHaveBeenCalledWith(httpRequest.id, {
            name: httpRequest.name
        })
    })

    it('should return null if updateCategoryRepository returns null', async () => {
        const { sut, updateCategoryRepositoryStub } = makeSut();
        jest.spyOn(updateCategoryRepositoryStub, 'updateById').mockReturnValueOnce(new Promise(resolve => resolve(null)));
        const httpRequest = makeFakeRequest();
        const result = await sut.updateById(httpRequest.id, { ...httpRequest });
        expect(result).toBeNull();
    });

    it('should return an updated category if updateCategoryRepository returns an updated category', async () => {
        const { sut } = makeSut();
        const httpRequest = makeFakeRequest();
        const result = await sut.updateById(httpRequest.id, { ...httpRequest });
        expect(result?.name).toBe('new_name');
    });
})
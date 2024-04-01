import { LoadCategoriesRepository } from "@/data/protocols/db/category/LoadCategoriesRepository.protocol";
import { FindCategoriesParams, FindCategoriesResponse } from "@/domain/usecases/category/FindCategoriesParams";
import { LoadCategoriesUseCase } from "./LoadCategoriesUseCase";

const fakeRequest = {
    page: 1,
    name: 'any_name',
};

const makeLoadAllCategoriesRepositoryStub = () => {
    class LoadCategoriesRepositoryStub implements LoadCategoriesRepository {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        async loadAll(params: FindCategoriesParams): Promise<FindCategoriesResponse> {
            return new Promise(resolve => resolve({
                categories: [
                    {
                        id: 'any_id',
                        name: 'any_name',
                    }
                ],
                totalPages: 1,
                totalItems: 1
            }));
        }
    }

    return new LoadCategoriesRepositoryStub();
};

const makeSut = () => {
    const loadCategoriesRepositoryStub = makeLoadAllCategoriesRepositoryStub();
    const sut = new LoadCategoriesUseCase(loadCategoriesRepositoryStub);
    return { sut, loadCategoriesRepositoryStub };
};

describe('Load Categories Use Case', () => {
    it('should call LoadCategoriesRepository with correct values', () => {
        const { sut, loadCategoriesRepositoryStub } = makeSut();
        const loadCategoriesSpy = jest.spyOn(loadCategoriesRepositoryStub, 'loadAll');
        sut.loadAll(fakeRequest);
        expect(loadCategoriesSpy).toHaveBeenCalledWith(fakeRequest);
    });

    it('should return a list of Categories on success', async () => {
        const { sut } = makeSut();
        const Categories = await sut.loadAll(fakeRequest);
        expect(Categories).toEqual({
            categories: [
                {
                    id: 'any_id',
                    name: 'any_name',
                }
            ],
            totalPages: 1,
            totalItems: 1
        });
    });

    it('should throw if LoadCategoriesRepository throws', async () => {
        const { sut, loadCategoriesRepositoryStub } = makeSut();
        jest.spyOn(loadCategoriesRepositoryStub, 'loadAll').mockImplementationOnce(() => {
            throw new Error();
        });
        const promise = sut.loadAll(fakeRequest);
        await expect(promise).rejects.toThrow();
    });
});
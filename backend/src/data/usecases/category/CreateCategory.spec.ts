import prisma from "@/config/prisma";

import { CreateCategoryUseCase } from "./CreateCategoryUseCase";
import { CreateCategoryRepository } from "@/data/protocols/db/category/CreateCategoryRepository.protocol";
import { CategoryModel } from "@/domain/models/Category";
import { CreateCategoryModel } from "@/domain/usecases/category/CreateCategory";
import { LoadCategoryByNameRepository } from "@/data/protocols/db/category/LoadCategoryByNameRepository.protocol.ts";

type SutTypes = {
    sut: CreateCategoryUseCase,
    loadCategoryByNameStub: LoadCategoryByNameRepository,
    createCategoryRepositoryStub: CreateCategoryRepository
}

const makeCreateCategoryRepositoryStub = (): CreateCategoryRepository => {
    class CreateCategoryRepositoryStub implements CreateCategoryRepository {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        async create(account: CreateCategoryModel): Promise<CategoryModel> {
            const fakeCategory: CategoryModel = {
                id: 'valid_id',
                name: 'valid_name',
            };

            return Promise.resolve(fakeCategory);
        }

    }
    return new CreateCategoryRepositoryStub();
};

const makeLoadCategoryByNameStub = () => {
    class LoadCategoryByNameRepositoryStub implements LoadCategoryByNameRepository {
        async loadByName(name: string): Promise<CategoryModel> {
            return Promise.resolve(null)
        }
    }
    return new LoadCategoryByNameRepositoryStub()
}

const makeSut = (): SutTypes => {
    const loadCategoryByNameStub = makeLoadCategoryByNameStub()
    const createCategoryRepositoryStub = makeCreateCategoryRepositoryStub();
    const sut = new CreateCategoryUseCase(createCategoryRepositoryStub, loadCategoryByNameStub);
    return { sut, createCategoryRepositoryStub, loadCategoryByNameStub };
};

describe('Category Create Usecase', () => {
    beforeEach(async () => {
        await prisma.$executeRaw`DELETE FROM category;`;
    });

    afterAll(async () => {
        prisma.$disconnect();
    });

    it('Should call createUserRepository with correct values', async () => {
        const { sut, createCategoryRepositoryStub } = makeSut();
        const createUserRepositorySpy = jest.spyOn(createCategoryRepositoryStub, 'create');

        const categoryData: CreateCategoryModel = {
            name: 'valid_name',
        };

        await sut.create(categoryData);

        expect(createUserRepositorySpy).toHaveBeenCalledWith({
            ...categoryData,
        });
    });

    it('Should throw if createCategoryRepository throws', async () => {
        const { sut, createCategoryRepositoryStub } = makeSut();
        jest.spyOn(createCategoryRepositoryStub, 'create').mockReturnValueOnce(Promise.reject(new Error()));
        const categoryData: CreateCategoryModel = {
            name: 'name',
        };
        const promise = sut.create(categoryData);
        await expect(promise).rejects.toThrow();
    });

    it('Should return a category on success', async () => {
        const { sut } = makeSut();
        const categoryData: CreateCategoryModel = {
            name: 'any_name',
        };

        const category = await sut.create(categoryData);

        expect(category).toEqual({
            id: 'valid_id',
            name: 'valid_name',
        });
    });

    it('Should throw if loadByName returns a category', async () => {
        const { sut, loadCategoryByNameStub } = makeSut();
        const categoryData: CreateCategoryModel = {
            name: 'valid_name',
        };

        jest.spyOn(loadCategoryByNameStub, 'loadByName').mockReturnValueOnce(Promise.resolve({
            ...categoryData,
            id: 'valid_id',
        }));
        const promise = sut.create(categoryData);
        await expect(promise).rejects.toThrow();
    });
})
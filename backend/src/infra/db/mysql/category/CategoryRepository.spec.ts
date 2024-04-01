import prisma from "@/config/prisma";
import { CategoryRepository } from "./CategoryRepository";

const makeFakeCategory = () => ({
    name: 'any_Name'
})

const makeSut = () => {
    return new CategoryRepository()
}

describe('Category MySQL Repository', () => {
    beforeEach(async () => {
        await prisma.$executeRaw`DELETE FROM category;`;
    });

    afterAll(async () => {
        prisma.$disconnect();
    });

    it('should return a category on success on create', async () => {
        const sut = makeSut()
        const category = await sut.create(makeFakeCategory())

        expect(category).toBeTruthy()
    })

    it('should return a list of categories', async () => {
        const sut = makeSut()
        const createCategory = await sut.create(makeFakeCategory())

        const categories = await sut.loadAll({ page: 1, })

        expect(categories).toEqual({
            categories: [{
                ...createCategory
            }],
            totalPages: 1,
            totalItems: 1
        })
    })

    it('should return an updated category on success on UpdateCategory', async () => {
        const sut = makeSut()
        const createCategory = await sut.create(makeFakeCategory())
        const updateCategory = await sut.updateById(createCategory.id, {
            name: 'new_name'
        })
        expect(updateCategory.name).toBe('new_name')
    })

    it('should delete a category on success on deleteCategory', async () => {
        const sut = makeSut()
        const createCategory = await sut.create(makeFakeCategory())
        const deleteCategory = await sut.deleteById(createCategory.id)

        expect(deleteCategory).toEqual(createCategory)
    })

    it('should return a category on success on loadById', async () => {
        const sut = makeSut()
        const createCategory = await sut.create(makeFakeCategory())
        const loadCategoryById = await sut.loadById(createCategory.id)

        expect(loadCategoryById).toEqual(createCategory)
    })

    it('should return null if category not found on loadById', async () => {
        const sut = makeSut()
        const loadCategoryById = await sut.loadById('any_id')

        expect(loadCategoryById).toBeNull()
    })

    it('should return a category on success on loadByName', async () => {
        const sut = makeSut()
        const createCategory = await sut.create(makeFakeCategory())
        const loadCategoryById = await sut.loadByName(createCategory.name)

        expect(loadCategoryById).toEqual(createCategory)
    })

    it('should return null if category not found on loadByName', async () => {
        const sut = makeSut()
        const loadCategoryById = await sut.loadByName('any_name')

        expect(loadCategoryById).toBeNull()
    })
})
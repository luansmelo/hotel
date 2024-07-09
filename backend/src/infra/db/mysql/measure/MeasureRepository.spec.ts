import prisma from "@/config/prisma";
import { MeasureRepository } from "./MeasureRepository";

const makeFakeMeasure = () => ({
    name: 'any_Name'
})

const makeSut = () => {
    return new MeasureRepository()
}

describe('Measure MySQL Repository', () => {
    beforeEach(async () => {
        await prisma.$executeRaw`DELETE FROM measurement;`;
    });

    afterAll(async () => {
        prisma.$disconnect();
    });

    it('should return a Measure on success on create', async () => {
        const sut = makeSut()
        const Measure = await sut.create(makeFakeMeasure())

        expect(Measure).toBeTruthy()
    })

    it('should return a list of category', async () => {
        const sut = makeSut()
        const createMeasure = await sut.create(makeFakeMeasure())

        const measure = await sut.loadAll({ page: 1, })

        expect(measure).toEqual({
            measures: [{
                ...createMeasure
            }],
            totalPages: 1,
            totalItems: 1
        })
    })

    it('should return an updated Measure on success on UpdateMeasure', async () => {
        const sut = makeSut()
        const createMeasure = await sut.create(makeFakeMeasure())
        const updateMeasure = await sut.updateById(createMeasure.id, {
            name: 'new_name'
        })
        expect(updateMeasure.name).toBe('new_name')
    })

    it('should delete a Measure on success on deleteMeasure', async () => {
        const sut = makeSut()
        const createMeasure = await sut.create(makeFakeMeasure())
        const deleteMeasure = await sut.deleteById(createMeasure.id)

        expect(deleteMeasure).toEqual(createMeasure)
    })

    it('should return a Measure on success on loadById', async () => {
        const sut = makeSut()
        const createMeasure = await sut.create(makeFakeMeasure())
        const loadMeasureById = await sut.loadById(createMeasure.id)

        expect(loadMeasureById).toEqual(createMeasure)
    })

    it('should return null if Measure not found on loadById', async () => {
        const sut = makeSut()
        const loadMeasureById = await sut.loadById('any_id')

        expect(loadMeasureById).toBeNull()
    })

    it('should return a Measure on success on loadByName', async () => {
        const sut = makeSut()
        const createMeasure = await sut.create(makeFakeMeasure())
        const loadMeasureById = await sut.loadByName(createMeasure.name)

        expect(loadMeasureById).toEqual(createMeasure)
    })

    it('should return null if Measure not found on loadByName', async () => {
        const sut = makeSut()
        const loadMeasureById = await sut.loadByName('any_name')

        expect(loadMeasureById).toBeNull()
    })
})
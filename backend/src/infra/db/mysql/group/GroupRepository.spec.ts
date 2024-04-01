import prisma from "@/config/prisma";
import { GroupRepository } from "./GroupRepository";

const makeFakeGroup = () => ({
    name: 'any_Name'
})

const makeSut = () => {
    return new GroupRepository()
}

describe('Group MySQL Repository', () => {
    beforeEach(async () => {
        await prisma.$executeRaw`DELETE FROM \`group\`;`;
    });

    afterAll(async () => {
        prisma.$disconnect();
    });

    it('should return a Group on success on create', async () => {
        const sut = makeSut()
        const Group = await sut.create(makeFakeGroup())

        expect(Group).toBeTruthy()
    })

    it('should return a list of groups', async () => {
        const sut = makeSut()
        const createGroup = await sut.create(makeFakeGroup())

        const groups = await sut.loadAll({ page: 1, })

        expect(groups).toEqual({
            groups: [{
                ...createGroup
            }],
            totalPages: 1,
            totalItems: 1
        })
    })

    it('should return an updated Group on success on UpdateGroup', async () => {
        const sut = makeSut()
        const createGroup = await sut.create(makeFakeGroup())
        const updateGroup = await sut.updateById(createGroup.id, {
            name: 'new_name'
        })
        expect(updateGroup.name).toBe('new_name')
    })

    it('should delete a Group on success on deleteGroup', async () => {
        const sut = makeSut()
        const createGroup = await sut.create(makeFakeGroup())
        const deleteGroup = await sut.deleteById(createGroup.id)

        expect(deleteGroup).toEqual(createGroup)
    })

    it('should return a Group on success on loadById', async () => {
        const sut = makeSut()
        const createGroup = await sut.create(makeFakeGroup())
        const loadGroupById = await sut.loadById(createGroup.id)

        expect(loadGroupById).toEqual(createGroup)
    })

    it('should return null if Group not found on loadById', async () => {
        const sut = makeSut()
        const loadGroupById = await sut.loadById('any_id')

        expect(loadGroupById).toBeNull()
    })

    it('should return a Group on success on loadByName', async () => {
        const sut = makeSut()
        const createGroup = await sut.create(makeFakeGroup())
        const loadGroupById = await sut.loadByName(createGroup.name)

        expect(loadGroupById).toEqual(createGroup)
    })

    it('should return null if Group not found on loadByName', async () => {
        const sut = makeSut()
        const loadGroupById = await sut.loadByName('any_name')

        expect(loadGroupById).toBeNull()
    })
})
import { DeleteGroupUseCase } from "./DeleteGroup";
import { DeleteGroupRepository } from "@/data/protocols/db/group/DeleteGroupRepository.protocol.ts"; 
import { GroupModel } from "@/domain/models/Group";
import { LoadGroupByIdRepository } from "@/data/protocols/db/group/LoadGroupByIdRepository.protocol"; 

const mockRequest = () => {
    return {
        id: 'any_id'
    }
}

const makeLoadGroupByIdStub = () => {
    class LoadGroupByIdRepositoryStub implements LoadGroupByIdRepository {
        async loadById(id: string): Promise<GroupModel> {
            return Promise.resolve({
                id: 'any_id',
                name: 'any_name'
            })
        }
    }
    return new LoadGroupByIdRepositoryStub()
}

const makeDeleteGroupRepositoryStub = () => {
    class DeleteGroupRepositoryStub implements DeleteGroupRepository {
        async deleteById(id: string): Promise<GroupModel> {
            return Promise.resolve({
                id: 'any_id',
                name: 'any_name'
            })
        }
    }
    return new DeleteGroupRepositoryStub()
}

const makeSut = () => {
    const deleteGroupRepositoryStub = makeDeleteGroupRepositoryStub()
    const loadGroupByIdRepositoryStub = makeLoadGroupByIdStub()
    const sut = new DeleteGroupUseCase(deleteGroupRepositoryStub, loadGroupByIdRepositoryStub)
    return { sut, deleteGroupRepositoryStub, loadGroupByIdRepositoryStub }
}

describe('Delete Group Usecase', () => {
    it('should call LoadGroupRepository with correct values', async () => {
        const { sut, loadGroupByIdRepositoryStub } = makeSut()
        const findSpy = jest.spyOn(loadGroupByIdRepositoryStub, 'loadById')
        const httpRequest = mockRequest()
        await sut.deleteById(httpRequest.id)
        expect(findSpy).toHaveBeenCalledWith(httpRequest.id)
    })

    it('should call DeleteGroup with correct values', async () => {
        const { sut, deleteGroupRepositoryStub } = makeSut()
        const findSpy = jest.spyOn(deleteGroupRepositoryStub, 'deleteById')
        const httpRequest = mockRequest()
        await sut.deleteById(httpRequest.id)
        expect(findSpy).toHaveBeenCalledWith(httpRequest.id)
    })

    it('should throw if DeleteGroup throws', async () => {
        const { sut, deleteGroupRepositoryStub } = makeSut()
        jest.spyOn(deleteGroupRepositoryStub, 'deleteById').mockImplementationOnce(() => {
            throw new Error()
        })

        const httpRequest = mockRequest()
        const promise = sut.deleteById(httpRequest.id)
        expect(promise).rejects.toThrow()
    })
})
import { LoadGroupByIdRepository } from "@/data/protocols/db/group/LoadGroupByIdRepository.protocol";
import { UpdateGroupRepository } from "@/data/protocols/db/group/UpdateGroupRepository.protocol";
import { GroupModel } from "@/domain/models/Group";
import { CreateGroupModel } from "@/domain/usecases/group/CreateGroup";
import { UpdateGroupUseCase } from "./UpdateGroup";
import { LoadGroupByNameRepository } from "@/data/protocols/db/group/LoadGroupByNameRepository.protocol.ts";

const makeFakeRequest = () => ({
    id: 'any_id',
    name: 'any_name'
})

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

const makeLoadGroupByNameStub = () => {
    class LoadGroupByNameRepositoryStub implements LoadGroupByNameRepository {
        async loadByName(id: string): Promise<GroupModel> {
            return Promise.resolve(null)
        }
    }

    return new LoadGroupByNameRepositoryStub()
}

const makeUpdateGroupRepositoryStub = () => {
    class UpdateGroupRepositoryStub implements UpdateGroupRepository {
        async updateById(id: string, input: Partial<CreateGroupModel>): Promise<Partial<GroupModel>> {
            return Promise.resolve({
                id: 'any_id',
                name: 'new_name'
            })
        }
    }
    return new UpdateGroupRepositoryStub()
}

const makeSut = () => {
    const loadGroupByIdRepositoryStub = makeLoadGroupByIdStub()
    const loadGroupByNameRepositoryStub = makeLoadGroupByNameStub()
    const updateGroupRepositoryStub = makeUpdateGroupRepositoryStub()
    const sut = new UpdateGroupUseCase(updateGroupRepositoryStub, loadGroupByIdRepositoryStub, loadGroupByNameRepositoryStub)
    return { sut, updateGroupRepositoryStub, loadGroupByIdRepositoryStub }
}

describe('UpdateGroup Usecase', () => {
    it('should call UpdateGroupRepository with correct values', async () => {
        const { sut, updateGroupRepositoryStub } = makeSut()
        const updateSpy = jest.spyOn(updateGroupRepositoryStub, 'updateById')

        const httpRequest = makeFakeRequest()
        await sut.updateById(httpRequest.id, {
            ...httpRequest
        })
        expect(updateSpy).toHaveBeenCalledWith(httpRequest.id, {
            name: httpRequest.name
        })
    })

    it('should return null if updateGroupRepository returns null', async () => {
        const { sut, updateGroupRepositoryStub } = makeSut();
        jest.spyOn(updateGroupRepositoryStub, 'updateById').mockReturnValueOnce(new Promise(resolve => resolve(null)));
        const httpRequest = makeFakeRequest();
        const result = await sut.updateById(httpRequest.id, { ...httpRequest });
        expect(result).toBeNull();
    });

    it('should return an updated Group if updateGroupRepository returns an updated Group', async () => {
        const { sut } = makeSut();
        const httpRequest = makeFakeRequest();
        const result = await sut.updateById(httpRequest.id, { ...httpRequest });
        expect(result?.name).toBe('new_name');
    });
})
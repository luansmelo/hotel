import { CreateGroupUseCase } from "./CreateGroup";
import { CreateGroupRepository } from "@/data/protocols/db/group/CreateGroupRepository.protocol";
import { GroupModel } from "@/domain/models/Group";
import { CreateGroupModel } from "@/domain/usecases/group/CreateGroup";
import { LoadGroupByNameRepository } from "@/data/protocols/db/group/LoadGroupByNameRepository.protocol.ts";

type SutTypes = {
    sut: CreateGroupUseCase,
    loadGroupByNameStub: LoadGroupByNameRepository,
    createGroupRepositoryStub: CreateGroupRepository
}

const makeCreateGroupRepositoryStub = (): CreateGroupRepository => {
    class CreateGroupRepositoryStub implements CreateGroupRepository {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        async create(account: CreateGroupModel): Promise<GroupModel> {
            const fakeGroup: GroupModel = {
                id: 'valid_id',
                name: 'valid_name',
            };

            return Promise.resolve(fakeGroup);
        }

    }
    return new CreateGroupRepositoryStub();
};

const makeLoadGroupByNameStub = () => {
    class LoadGroupByNameRepositoryStub implements LoadGroupByNameRepository {
        async loadByName(name: string): Promise<GroupModel> {
            return Promise.resolve(null)
        }
    }
    return new LoadGroupByNameRepositoryStub()
}

const makeSut = (): SutTypes => {
    const loadGroupByNameStub = makeLoadGroupByNameStub()
    const createGroupRepositoryStub = makeCreateGroupRepositoryStub();
    const sut = new CreateGroupUseCase(createGroupRepositoryStub, loadGroupByNameStub);
    return { sut, createGroupRepositoryStub, loadGroupByNameStub };
};

describe('Group Create Usecase', () => {
    it('should call createUserRepository with correct values', async () => {
        const { sut, createGroupRepositoryStub } = makeSut();
        const createUserRepositorySpy = jest.spyOn(createGroupRepositoryStub, 'create');

        const GroupData: CreateGroupModel = {
            name: 'valid_name',
        };

        await sut.create(GroupData);

        expect(createUserRepositorySpy).toHaveBeenCalledWith({
            ...GroupData,
        });
    });

    it('should throw if createGroupRepository throws', async () => {
        const { sut, createGroupRepositoryStub } = makeSut();
        jest.spyOn(createGroupRepositoryStub, 'create').mockReturnValueOnce(Promise.reject(new Error()));
        const GroupData: CreateGroupModel = {
            name: 'name',
        };
        const promise = sut.create(GroupData);
        await expect(promise).rejects.toThrow();
    });

    it('should return a Group on success', async () => {
        const { sut } = makeSut();
        const GroupData: CreateGroupModel = {
            name: 'any_name',
        };

        const Group = await sut.create(GroupData);

        expect(Group).toEqual({
            id: 'valid_id',
            name: 'valid_name',
        });
    });

    it('Should throw if loadByName returns a Group', async () => {
        const { sut, loadGroupByNameStub } = makeSut();
        const GroupData: CreateGroupModel = {
            name: 'valid_name',
        };

        jest.spyOn(loadGroupByNameStub, 'loadByName').mockReturnValueOnce(Promise.resolve({
            ...GroupData,
            id: 'valid_id',
        }));
        const promise = sut.create(GroupData);
        await expect(promise).rejects.toThrow();
    });
})
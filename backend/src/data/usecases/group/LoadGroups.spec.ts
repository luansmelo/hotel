import { LoadGroupsRepository } from "@/data/protocols/db/group/LoadGroupsRepository.protocol";
import { FindGroupsUseCase } from "./LoadGroups";
import { FindGroupsParams, FindGroupsResponse } from "@/domain/usecases/group/FindGroupsParams";

const fakeRequest = {
    page: 1,
    name: 'any_name',
};

const makeLoadAllGroupsRepositoryStub = () => {
    class LoadGroupsRepositoryStub implements LoadGroupsRepository {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        async loadAll(params: FindGroupsParams): Promise<FindGroupsResponse> {
            return new Promise(resolve => resolve({
                groups: [
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

    return new LoadGroupsRepositoryStub();
};

const makeSut = () => {
    const loadGroupsRepositoryStub = makeLoadAllGroupsRepositoryStub();
    const sut = new FindGroupsUseCase(loadGroupsRepositoryStub);
    return { sut, loadGroupsRepositoryStub };
};

describe('Load Groups Use Case', () => {
    it('should call LoadGroupsRepository with correct values', () => {
        const { sut, loadGroupsRepositoryStub } = makeSut();
        const loadGroupsSpy = jest.spyOn(loadGroupsRepositoryStub, 'loadAll');
        sut.findAll(fakeRequest);
        expect(loadGroupsSpy).toHaveBeenCalledWith(fakeRequest);
    });

    it('should return a list of Groups on success', async () => {
        const { sut } = makeSut();
        const Groups = await sut.findAll(fakeRequest);
        expect(Groups).toEqual({
            groups: [
                {
                    id: 'any_id',
                    name: 'any_name',
                }
            ],
            totalPages: 1,
            totalItems: 1
        });
    });

    it('should throw if LoadGroupsRepository throws', async () => {
        const { sut, loadGroupsRepositoryStub } = makeSut();
        jest.spyOn(loadGroupsRepositoryStub, 'loadAll').mockImplementationOnce(() => {
            throw new Error();
        });
        const promise = sut.findAll(fakeRequest);
        await expect(promise).rejects.toThrow();
    });
});
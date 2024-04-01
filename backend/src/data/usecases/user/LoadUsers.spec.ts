import { LoadUsersRepository } from "@/data/protocols/db/user/LoadUsersRepository.protocol";
import { UserModel } from "@/domain/models/User";
import { LoadUsersUseCase } from "./LoadUsers";

const makeLoadAllUsersRepositoryStub = () => {
    class LoadUserRepositoryStub implements LoadUsersRepository {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        async loadAll(): Promise<UserModel[]> {
            return new Promise(resolve => resolve([
                {
                    id: 'any_id',
                    name: 'any_name',
                    email: 'any_email',
                    role: 'any_role'
                }
            ]));
        }
    }

    return new LoadUserRepositoryStub();
};

const makeSut = () => {
    const listAllUserRepositoryStub = makeLoadAllUsersRepositoryStub();
    const sut = new LoadUsersUseCase(listAllUserRepositoryStub);
    return { sut, listAllUserRepositoryStub };
};

describe('List Users Use Case', () => {
    it('should call ListAllUserRepository with correct values', () => {
        const { sut, listAllUserRepositoryStub } = makeSut();
        const listAllUserSpy = jest.spyOn(listAllUserRepositoryStub, 'loadAll');
        sut.loadAll();
        expect(listAllUserSpy).toHaveBeenCalledWith();
    });

    it('should return a list of users on success', async () => {
        const { sut } = makeSut();
        const users = await sut.loadAll();
        expect(users).toEqual(
            [{
                id: 'any_id',
                name: 'any_name',
                email: 'any_email',
                role: 'any_role'
            }],
        );
    });

    it('should throw if ListAllUserRepository throws', async () => {
        const { sut, listAllUserRepositoryStub } = makeSut();
        jest.spyOn(listAllUserRepositoryStub, 'loadAll').mockImplementationOnce(() => {
            throw new Error();
        });
        const promise = sut.loadAll();
        await expect(promise).rejects.toThrow();
    });
});
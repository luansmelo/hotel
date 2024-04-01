import { LoadUsersRepository } from "@/data/protocols/db/user/LoadUsersRepository.protocol";
import { LoadUsersUseCase } from "./LoadUsers";
import { UserModel } from "@/domain/models/User";

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
    const loadUsersRepositoryStub = makeLoadAllUsersRepositoryStub();
    const sut = new LoadUsersUseCase(loadUsersRepositoryStub);
    return { sut, loadUsersRepositoryStub };
};

describe('List Users Use Case', () => {
    it('should call LoadUsersRepository with correct values', () => {
        const { sut, loadUsersRepositoryStub } = makeSut();
        const loadUsersSpy = jest.spyOn(loadUsersRepositoryStub, 'loadAll');
        sut.loadAll();
        expect(loadUsersSpy).toHaveBeenCalledWith();
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

    it('should throw if LoadUsersRepository throws', async () => {
        const { sut, loadUsersRepositoryStub } = makeSut();
        jest.spyOn(loadUsersRepositoryStub, 'loadAll').mockImplementationOnce(() => {
            throw new Error();
        });
        const promise = sut.loadAll();
        await expect(promise).rejects.toThrow();
    });
});
import prisma from "@/config/prisma";

import { CreateUserUseCase } from "./CreateUser";
import { Hasher } from "@/data/protocols/cryptography";
import { CreateUserRepository } from "@/data/protocols/db/user/CreateUserRepository.protocol";
import { LoadUserByEmailRepository } from "@/data/protocols/db/user/LoadUserByEmailRepository.protocol";
import { UserModel } from "@/domain/models/User";
import { CreateUserModel } from "@/domain/usecases/user/CreateUser";

interface SutTypes {
    sut: CreateUserUseCase,
    hasherStub: Hasher,
    createUserRepositoryStub: CreateUserRepository,
    findByEmailRepositoryStub: LoadUserByEmailRepository
}

const makeCreateUserRepositoryStub = (): CreateUserRepository => {
    class CreateUserRepositoryStub implements CreateUserRepository {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        async create(account: CreateUserModel): Promise<UserModel> {
            const fakeAccount: UserModel = {
                id: 'valid_id',
                name: 'valid_name',
                email: 'valid_email',
                password: 'hashed_password',
                role: 'USER',
            };

            return Promise.resolve(fakeAccount);
        }

    }
    return new CreateUserRepositoryStub();
};

const makeFindUserByEmailRepositoryStub = () => {
    class FindUserByEmailRepositoryStub implements FindUserByEmailRepositoryStub {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        async loadByEmail(email: string): Promise<UserModel | null> {
            return Promise.resolve(null);
        }
    }
    return new FindUserByEmailRepositoryStub();
};

const makeHasherStub = () => {
    class HasherStub {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        async hash(password: string): Promise<string> {
            return Promise.resolve('hashed_password');
        }
    }
    return new HasherStub();
};

const makeSut = (): SutTypes => {
    const hasherStub = makeHasherStub();
    const findByEmailRepositoryStub = makeFindUserByEmailRepositoryStub();
    const createUserRepositoryStub = makeCreateUserRepositoryStub();
    const sut = new CreateUserUseCase(createUserRepositoryStub, findByEmailRepositoryStub, hasherStub,);
    return { sut, hasherStub, createUserRepositoryStub, findByEmailRepositoryStub };
};

describe('User Account', () => {
    beforeEach(async () => {
        await prisma.$executeRaw`DELETE FROM user;`;
    });

    afterAll(async () => {
        prisma.$disconnect();
    });

    it('Should call hasher with correct password', async () => {
        const { sut, hasherStub, findByEmailRepositoryStub } = makeSut();
        const hashSpy = jest.spyOn(hasherStub, 'hash');
        jest.spyOn(findByEmailRepositoryStub, 'loadByEmail').mockReturnValueOnce(Promise.resolve(null));
        const userData: CreateUserModel = {
            name: 'name',
            email: 'email',
            password: 'password',
            role: 'USER'
        };

        await sut.create(userData);
        expect(hashSpy).toHaveBeenCalledWith(userData.password);
    });

    it('Should throw if hasher throws', async () => {
        const { sut, hasherStub } = makeSut();
        jest.spyOn(hasherStub, 'hash').mockReturnValueOnce(Promise.reject(new Error()));
        const userData: CreateUserModel = {
            name: 'name',
            email: 'email',
            password: 'password',
            role: 'USER'
        };
        const promise = sut.create(userData);
        await expect(promise).rejects.toThrow();
    });

    it('Should call createUserRepository with correct values', async () => {
        const { sut, createUserRepositoryStub } = makeSut();
        const createUserRepositorySpy = jest.spyOn(createUserRepositoryStub, 'create');
        const userData: CreateUserModel = {
            name: 'name',
            email: 'email',
            password: 'password',
            role: 'USER'
        };

        await sut.create(userData);

        expect(createUserRepositorySpy).toHaveBeenCalledWith({
            ...userData,
            password: 'hashed_password',
        });
    });

    it('Should throw if createAccountRepository throws', async () => {
        const { sut, createUserRepositoryStub } = makeSut();
        jest.spyOn(createUserRepositoryStub, 'create').mockReturnValueOnce(Promise.reject(new Error()));
        const userData: CreateUserModel = {
            name: 'name',
            email: 'email',
            password: 'password',
            role: 'USER'
        };
        const promise = sut.create(userData);
        await expect(promise).rejects.toThrow();

    });

    it('Should return an user account on success', async () => {
        const { sut } = makeSut();
        const userData: CreateUserModel = {
            name: 'valid_name',
            email: 'valid_email',
            password: 'password',
            role: 'USER'
        };

        const userAccount = await sut.create(userData);
        expect(userAccount).toEqual({
            id: 'valid_id',
            name: 'valid_name',
            email: 'valid_email',
            password: 'hashed_password',
            role: 'USER',
        });
    });

    it('Should throw if findByEmail returns an user', async () => {
        const { sut, findByEmailRepositoryStub } = makeSut();
        const userData: CreateUserModel = {
            name: 'valid_name',
            email: 'valid_email',
            password: 'password',
            role: 'USER'
        };

        jest.spyOn(findByEmailRepositoryStub, 'loadByEmail').mockReturnValueOnce(Promise.resolve({
            ...userData,
            id: 'valid_id',
            password: 'hashed_password',
            role: 'USER',
        }));
        const promise = sut.create(userData);
        await expect(promise).rejects.toThrow();
    });
})
import { LoadUserByTokenRepository } from "@/data/protocols/db/user/LoadUserByTokenRepository.protocol";
import { Decrypter } from "@/data/protocols/cryptography";
import { LoadUserByToken } from "./LoadUserByTokenAndRole";
import { UserModel } from "@/domain/models/User";

const makeFakeUser = () => ({
    id: 'valid_id',
    name: 'valid_name',
    email: 'valid_email',
    role: 'valid_role'
})

const makeSut = () => {
    class DecrypterStub implements Decrypter {
        async decrypt(token: string): Promise<string | object> {
            return Promise.resolve({
                id: 'valid_id'
            })
        }
    }

    class LoadUserByIdAndTokenRepositoryStub implements LoadUserByTokenRepository {
        async loadByIdAndRole(token: string, role?: string): Promise<UserModel> {
            return Promise.resolve(makeFakeUser())
        }
    }

    const decrypterStub = new DecrypterStub()
    const findUserByIdAndRoleStub = new LoadUserByIdAndTokenRepositoryStub()
    const sut = new LoadUserByToken(decrypterStub, findUserByIdAndRoleStub)

    return {
        sut,
        decrypterStub,
        findUserByIdAndRoleStub
    }
}

describe('find user by token', () => {
    it('should call decrypter with correct value', async () => {
        const { sut, decrypterStub } = makeSut();
        const decryptSpy = jest.spyOn(decrypterStub, 'decrypt');
        await sut.findByToken('any_token', 'any_role');
        expect(decryptSpy).toHaveBeenCalledWith('any_token');
    });

    it('should return null if decrypter returns null', async () => {
        const { sut, decrypterStub } = makeSut();
        jest.spyOn(decrypterStub, 'decrypt').mockReturnValueOnce(new Promise(resolve => resolve(null)));
        const account = await sut.findByToken('any_token', 'any_role');
        expect(account).toBeNull();
    });

    it('should call findUserByIdRoleRepository with correct values', async () => {
        const { sut, findUserByIdAndRoleStub } = makeSut();
        const findSpy = jest.spyOn(findUserByIdAndRoleStub, 'loadByIdAndRole');
        await sut.findByToken('any_token', 'any_role');
        expect(findSpy).toHaveBeenCalledWith('valid_id', 'any_role');
    });

    it('should return null if findUserByIdRoleRepository returns null', async () => {
        const { sut, findUserByIdAndRoleStub } = makeSut();
        jest.spyOn(findUserByIdAndRoleStub, 'loadByIdAndRole').mockReturnValueOnce(new Promise(resolve => resolve(null)));
        const user = await sut.findByToken('any_token', 'any_role');
        expect(user).toBeNull();
    });

    it('should return an account on success', async () => {
        const { sut } = makeSut();
        const user = await sut.findByToken('any_token', 'any_role');
        expect(user).toEqual(makeFakeUser());
    });

    it('should throw if decrypter throws', async () => {
        const { sut, decrypterStub } = makeSut();
        jest.spyOn(decrypterStub, 'decrypt').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())));
        const promise = sut.findByToken('any_token', 'any_role');
        await expect(promise).rejects.toThrow();
    });

    it('should throw if findUserByTokenRepository throws', async () => {
        const { sut, findUserByIdAndRoleStub } = makeSut();
        jest.spyOn(findUserByIdAndRoleStub, 'loadByIdAndRole').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())));
        const promise = sut.findByToken('any_token', 'any_role');
        await expect(promise).rejects.toThrow();
    });
});
import { Encrypter, HasherComparer } from "@/data/protocols/cryptography";
import { LoadUserByEmailRepository } from "@/data/protocols/db/user/LoadUserByEmailRepository.protocol";
import { UserModel } from "@/domain/models/User";
import { CreateAuthUseCase } from "./CreateAuthUseCase";

const makeFakeUser = (): UserModel => ({
    id: 'any_id',
    name: 'any_name',
    email: 'any_email',
    password: 'hashed_password',
    role: 'USER',

});

const makeFakeRequest = () => ({
    email: 'any@email.com',
    password: 'any_password'
});

const makeLoadUserByEmailRepositoryStub = () => {
    class LoadUserByEmailRepositoryStub implements LoadUserByEmailRepository {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        async loadByEmail(email: string): Promise<UserModel | null> {
            return await new Promise(resolve => resolve(makeFakeUser()));
        }
    }
    return new LoadUserByEmailRepositoryStub();
};

const makeHashCompareStub = () => {
    class HashCompareStub implements HasherComparer {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        async compare(password: string, hashedPassword: string): Promise<boolean> {
            return await new Promise(resolve => resolve(true));
        }
    }
    return new HashCompareStub();
};

const makeEncrypterStub = () => {
    class EncrypterStub implements Encrypter {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        decrypt(token: string): Promise<string | object> {
            throw new Error('Method not implemented.');
        }
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        async encrypt(payload: string | object | Buffer): Promise<string> {
            return await new Promise(resolve => resolve('any_token'));
        }
    }
    return new EncrypterStub();
};

const makeSut = () => {
    const loadUserByEmailRepositoryStub = makeLoadUserByEmailRepositoryStub();
    const hashCompareStub = makeHashCompareStub();
    const encrypterStub = makeEncrypterStub();
    const sut = new CreateAuthUseCase(loadUserByEmailRepositoryStub, hashCompareStub, encrypterStub);
    return {
        sut,
        loadUserByEmailRepositoryStub,
        hashCompareStub,
        encrypterStub
    };
};

describe('Authentication usecase', () => {
    it('should call loadUserByEmailRepository with correct email', () => {

        const { sut, loadUserByEmailRepositoryStub } = makeSut();
        const loadUserSpy = jest.spyOn(loadUserByEmailRepositoryStub, 'loadByEmail');
        sut.auth(makeFakeRequest());
        expect(loadUserSpy).toHaveBeenCalledWith(makeFakeRequest().email);
    });

    it('should throw if loadUserByEmailRepository throws', async () => {
        const { sut, loadUserByEmailRepositoryStub } = makeSut();
        jest.spyOn(loadUserByEmailRepositoryStub, 'loadByEmail').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())));
        const promise = sut.auth(makeFakeRequest());
        await expect(promise).rejects.toThrow();
    });

    it('should return null if loadUserByEmailRepository returns null', async () => {
        const { sut, loadUserByEmailRepositoryStub } = makeSut();
        jest.spyOn(loadUserByEmailRepositoryStub, 'loadByEmail').mockReturnValueOnce(new Promise(resolve => resolve(null)));
        const accessToken = await sut.auth(makeFakeRequest());
        expect(accessToken).toBeNull();
    });

    it('should call HashComparer with correct values', async () => {
        const { sut, hashCompareStub } = makeSut();
        const compareSpy = jest.spyOn(hashCompareStub, 'compare');
        await sut.auth(makeFakeRequest());
        expect(compareSpy).toHaveBeenCalledWith(makeFakeRequest().password, makeFakeUser().password);
    });

    it('should throw if HashComparer throws', async () => {
        const { sut, hashCompareStub } = makeSut();
        jest.spyOn(hashCompareStub, 'compare').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())));
        const promise = sut.auth(makeFakeRequest());
        await expect(promise).rejects.toThrow();
    });

    it('should return null if HashComparer returns false', async () => {
        const { sut, hashCompareStub } = makeSut();
        jest.spyOn(hashCompareStub, 'compare').mockReturnValueOnce(new Promise(resolve => resolve(false)));
        const accessToken = await sut.auth(makeFakeRequest());
        expect(accessToken).toBeNull();
    });

    it('should call Encrypter with correct id', async () => {
        const { sut, encrypterStub } = makeSut();
        const generateSpy = jest.spyOn(encrypterStub, 'encrypt');
        await sut.auth(makeFakeRequest());
        expect(generateSpy).toHaveBeenCalledWith({ id: makeFakeUser().id, role: makeFakeUser().role });
    });

    it('should throw if Encrypter throws', async () => {
        const { sut, encrypterStub } = makeSut();
        jest.spyOn(encrypterStub, 'encrypt').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())));
        const promise = sut.auth(makeFakeRequest());
        await expect(promise).rejects.toThrow();
    });

    it('should return user data and token on success', async () => {
        const { sut } = makeSut();
        const user = await sut.auth(makeFakeRequest());
        expect(user).toEqual({
            id: makeFakeUser().id,
            name: makeFakeUser().name,
            email: makeFakeUser().email,
            token: 'any_token',
            role: makeFakeUser().role,
        });
    });
});
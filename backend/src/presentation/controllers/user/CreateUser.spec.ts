import { UserModel } from "@/domain/models/User";
import { CreateUserController } from "./CreateUserController";
import { InvalidParamError } from "@/presentation/errors/InvalidParamError";
import { CreateUser, CreateUserModel } from "@/domain/usecases/user/CreateUser";
import { badRequest } from "@/presentation/helpers/httpCodesHelper";
import { UserAlreadyExistsError } from "@/presentation/errors/UserAlreadyExistsError";
import { Validation } from "@/validation/protocols";

const makeValidation = (): Validation => {
    class ValidationStub implements Validation {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        validate(input: unknown): Error | void {
            return undefined;
        }
    }
    return new ValidationStub();
};

const makeSaveUser = (): CreateUser => {
    class SaveUserAccountStub implements CreateUser {
        create(input: CreateUserModel): Promise<UserModel> {
            return new Promise((resolve) => resolve(null))
        }
    }
    return new SaveUserAccountStub();
}

const makeSut = () => {
    const validationStub = makeValidation()
    const saveUserStub = makeSaveUser()
    return {
        sut: new CreateUserController(saveUserStub, validationStub),
        saveUserStub,
        validationStub
    }
}

describe('Create User', () => {
    it('should call handle with correct values', async () => {
        const { sut } = makeSut()

        const handleSpy = jest.spyOn(sut, 'handle')

        const httpRequest = {
            body: {
                name: 'any name',
                email: 'any email',
                password: 'any password',
                role: 'any role',
            },
        }

        await sut.handle(httpRequest)

        expect(handleSpy).toHaveBeenCalledWith(httpRequest)
    })

    it('should return 400 if email already in use', async () => {
        const { sut, saveUserStub } = makeSut();
        const httpRequest = {
            body: {
                name: 'any name',
                email: 'any email',
                password: 'any password',
                gender: 'any gender',
            },
        };

        jest.spyOn(saveUserStub, 'create').mockReturnValueOnce(new Promise((resolve, reject) => reject(new UserAlreadyExistsError())));

        const httpResponse = await sut.handle(httpRequest);
        expect(httpResponse).toEqual(badRequest(new UserAlreadyExistsError()));
        expect(httpResponse.statusCode).toBe(400);
    });

    it('should call save with correct values', async () => {
        const { sut, saveUserStub } = makeSut();
        const saveSpy = jest.spyOn(saveUserStub, 'create');

        const httpRequest = {
            body: {
                name: 'any name',
                email: 'any email',
                password: 'any password',
                gender: 'any gender',
            },
        };
        await sut.handle(httpRequest);
        expect(saveSpy).toHaveBeenCalledWith(httpRequest.body);

    });

    it('should call validation with correct values', async () => {
        const { sut, validationStub } = makeSut();
        const validationSpy = jest.spyOn(validationStub, 'validate');

        const httpRequest = {
            body: {
                name: 'any name',
                email: 'any email',
                password: 'any password',
                role: 'any role',
            },
        };
        await sut.handle(httpRequest);
        expect(validationSpy).toHaveBeenCalledWith(httpRequest.body);

    });

    it('should return 400 if validation returns error', async () => {
        const { sut, validationStub } = makeSut();
        jest.spyOn(validationStub, 'validate').mockReturnValueOnce(new InvalidParamError('any_field'));

        const httpRequest = {
            body: {
                name: 'any name',
                email: 'any email',
                password: 'any password',
                role: 'any role',
            },
        };
        const httpResponse = await sut.handle(httpRequest);
        expect(httpResponse).toEqual(badRequest(new InvalidParamError('any_field')));

    });
})
import { AuthenticatedUserModel, Authentication, AuthenticationModel } from '@/domain/usecases/user/Authentication';
import { InvalidParamError } from '@/presentation/errors/InvalidParamError';
import { LoginController } from './LoginController';
import { HttpRequest } from '@/presentation/protocols';
import { Validation } from '@/validation/protocols';
import { ok } from 'assert';
import { badRequest } from '@/presentation/helpers/httpCodesHelper';

const makeFakeRequest = (): HttpRequest => ({
    body: {
        email: 'any_email',
        password: 'any_password',
    },
});

const makeValidation = (): Validation => {
    class ValidationStub implements Validation {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        validate(input: unknown): Error | void {
            return undefined;
        }
    }
    return new ValidationStub();
};

const makeAuthentication = (): Authentication => {
    class AuthenticationStub implements Authentication {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        async auth(authenticationModel: AuthenticationModel): Promise<AuthenticatedUserModel | null> {
            return new Promise(resolve => resolve({
                id: 'valid_id',
                name: 'valid_name',
                email: 'valid_email',
                token: 'valid_token',
                role: 'any_role',
            }));
        }
    }
    return new AuthenticationStub();
};

const makeSut = () => {
    const authenticationStub = makeAuthentication();
    const validationStub = makeValidation();

    const sut = new LoginController(authenticationStub, validationStub);
    return {
        sut,
        authenticationStub,
        validationStub,
    };
};

describe('Login Controller', () => {

    it('should call authentication with correct values', async () => {
        const { sut, authenticationStub } = makeSut();
        const authSpy = jest.spyOn(authenticationStub, 'auth');
        const httpRequest = {
            body: {
                email: 'any_email',
                password: 'any_password',
            },
        };
        await sut.handle(httpRequest);
        expect(authSpy).toHaveBeenCalledWith({ email: 'any_email', password: 'any_password' });
    });

    it('should return 401 if invalid credentials are provided', async () => {
        const { sut, authenticationStub } = makeSut();
        jest.spyOn(authenticationStub, 'auth').mockReturnValueOnce(new Promise(resolve => resolve(null)));
        const httpRequest = {
            body: {
                email: 'invalid_email',
                password: 'invalid_password',
            },
        };
        const httpResponse = await sut.handle(httpRequest);
        expect(httpResponse.statusCode).toBe(401);
    });

    it('should return 200 with user data if valid credentials are provided', async () => {
        const { sut } = makeSut();
        const httpResponse = await sut.handle(makeFakeRequest());
        expect(httpResponse.statusCode).toBe(200);
        expect(httpResponse.body).toEqual({
            id: 'valid_id',
            name: 'valid_name',
            email: 'valid_email',
            token: 'valid_token',
            role: 'any_role',
        });
    });

    it('should call validation with correct values', async () => {
        const { sut, validationStub } = makeSut();
        const validationSpy = jest.spyOn(validationStub, 'validate');

        const httpRequest = {
            body: {
                name: 'any name',
                email: 'any email',
                password: 'any password',
                role: 'any_role',
            },
        };
        await sut.handle(httpRequest);
        expect(validationSpy).toHaveBeenCalledWith(httpRequest.body);

    });

    it('should return 400 if validation returns error', async () => {
        const { sut, validationStub } = makeSut();
        jest.spyOn(validationStub, 'validate').mockReturnValueOnce(new InvalidParamError('any_field'));


        const httpResponse = await sut.handle(makeFakeRequest());
        expect(httpResponse).toEqual(badRequest(new InvalidParamError('any_field')));

    });

    it('should return 500 if validation throws', async () => {
        const { sut, validationStub } = makeSut();
        jest.spyOn(validationStub, 'validate').mockImplementationOnce(() => {
            throw new Error();
        });

        const httpResponse = await sut.handle(makeFakeRequest());
        expect(httpResponse.statusCode).toBe(500);
    });
});
import { UserModel } from "@/domain/models/User";
import { LoadUsers } from "@/domain/usecases/user/LoadUsers";
import { HttpRequest } from "@/presentation/protocols";
import { LoadUsersController } from "./LoadUsersController";

const httpRequest: HttpRequest = {}

const makeLoadUsersUseCase = () => {
    class LoadAllUserUseCaseStub implements LoadUsers {
        loadAll(): Promise<UserModel[] | null> {
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
    return new LoadAllUserUseCaseStub();
};

const makeSut = () => {
    const ListAllUserUseCaseStub = makeLoadUsersUseCase();
    const sut = new LoadUsersController(ListAllUserUseCaseStub);
    return { sut, ListAllUserUseCaseStub };
};

describe('ListAllUserController', () => {
    it('should call ListAllUserUseCase with correct values', () => {
        const { sut, ListAllUserUseCaseStub } = makeSut();
        const listAllUserSpy = jest.spyOn(ListAllUserUseCaseStub, 'loadAll');
        sut.handle(httpRequest);
        expect(listAllUserSpy).toHaveBeenCalledWith();
    });

    it('should return 200 if ListAllUserUseCase returns a list of users', async () => {
        const { sut } = makeSut();
        const httpResponse = await sut.handle(httpRequest);
        expect(httpResponse.statusCode).toBe(200);
        expect(httpResponse.body).toEqual(
            [{
                id: 'any_id',
                name: 'any_name',
                email: 'any_email',
                role: 'any_role'
            }],
        );
    });

    it('should return 500 if ListAllUserUseCase throws', async () => {
        const { sut, ListAllUserUseCaseStub } = makeSut();
        jest.spyOn(ListAllUserUseCaseStub, 'loadAll').mockImplementationOnce(() => {
            throw new Error();
        });
        const httpResponse = await sut.handle(httpRequest);
        expect(httpResponse.statusCode).toBe(500);
    });
});
import { GroupModel } from "@/domain/models/Group";
import { UpdateGroupController } from "./UpdateGroupController";
import { UpdateGroupUseCaseContract } from "@/domain/usecases/group/UpdateGroup";
import { CreateGroupModel } from "@/domain/usecases/group/CreateGroup";

const makeUpdateGroupStub = () => {
    class UpdateGroupStub implements UpdateGroupUseCaseContract {
        async updateById(id: string, input: Partial<CreateGroupModel>): Promise<Partial<GroupModel>> {
            return Promise.resolve({
                id: 'any_id',
                name: 'any_id'
            })
        }
    }
    return new UpdateGroupStub
}

const makeSut = () => {
    const updateGroupStub = makeUpdateGroupStub()
    const sut = new UpdateGroupController(updateGroupStub)

    return { sut, updateGroupStub }
}

const makeFakeRequest = () => ({
    params: {
        id: 'any_id',
    },
    body: {
        name: 'any_new_name'
    }
})

describe('UpdateGroupController', () => {
    it('should call UpdateGroup with correct values', async () => {
        const { sut, updateGroupStub } = makeSut();
        const updateSpy = jest.spyOn(updateGroupStub, 'updateById');
        const httpRequest = makeFakeRequest();
        await sut.handle(httpRequest);

        expect(updateSpy).toHaveBeenCalledWith(
            httpRequest.params.id,
            { name: httpRequest.body.name }
        );
    });

    it('should return 200 if UpdateGroup succeeds', async () => {
        const { sut } = makeSut();
        const request = makeFakeRequest();
        const httpResponse = await sut.handle(request);
        expect(httpResponse.statusCode).toBe(200);
        expect(httpResponse.body).toHaveProperty('id');
    });

    it('should return 500 if UpdateGroup throws', async () => {
        const { sut, updateGroupStub } = makeSut();
        jest.spyOn(updateGroupStub, 'updateById').mockImplementationOnce(() => {
            throw new Error();
        });
        const request = makeFakeRequest();
        const httpResponse = await sut.handle(request);
        expect(httpResponse.statusCode).toBe(500);
    });

    it('should return 404 if UpdateGroup returns null', async () => {
        const { sut, updateGroupStub } = makeSut();
        jest.spyOn(updateGroupStub, 'updateById').mockReturnValueOnce(
            new Promise(resolve => resolve(null)),
        );
        const request = makeFakeRequest();
        const httpResponse = await sut.handle(request);
        expect(httpResponse.statusCode).toBe(404);
    });
});

import { DeleteGroupUseCaseContract } from "@/domain/usecases/group/DeleteGroup";
import { DeleteGroupController } from "./DeleteGroupController";
import { GroupModel } from "@/domain/models/Group";

const mockRequest = () => {
    return {
        params: {
            id: 'any_id'
        }
    }
}

const makeDeleteGroupStub = () => {
    class DeleteGroupStub implements DeleteGroupUseCaseContract {
        async deleteById(id: string): Promise<GroupModel> {
            return Promise.resolve({
                'id': 'any_id',
                name: 'any_name'
            });
        }
    }
    return new DeleteGroupStub()
}

const makeSut = () => {
    const deleteGroupStub = makeDeleteGroupStub()
    const sut = new DeleteGroupController(deleteGroupStub)
    return { sut, deleteGroupStub }
}

describe('Delete Group Controller', () => {
    it('should return 200 on sucess', async () => {
        const { sut } = makeSut()
        const httpRequest = mockRequest()

        const response = await sut.handle(httpRequest)
        expect(response.statusCode).toBe(200)
    })

    it('should call deleteGroup with correct values', () => {
        const { sut, deleteGroupStub } = makeSut();
        const deleteSpy = jest.spyOn(deleteGroupStub, 'deleteById');
        const request = mockRequest();
        sut.handle(request);
        expect(deleteSpy).toHaveBeenCalledWith(request.params.id);
    });

    it('should return 500 if deleteGroup throws', async () => {
        const { sut, deleteGroupStub } = makeSut()
        jest.spyOn(deleteGroupStub, 'deleteById').mockImplementationOnce(() => {
            throw new Error()
        })

        const httpRequest = mockRequest()
        const httpResponse = await sut.handle(httpRequest)
        expect(httpResponse.statusCode).toBe(500)
    })
})
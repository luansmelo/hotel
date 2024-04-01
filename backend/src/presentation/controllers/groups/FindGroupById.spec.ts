import { GroupModel } from "@/domain/models/Group";
import { LoadGroupByIdUseCaseContract } from "@/domain/usecases/group/LoadGroupById";
import { FindGroupByIdController } from "./FindGroupByIdController";

const mockRequest = () => ({
    params: {
        id: 'any_id'
    }
})

const makeFindGroupByIdStub = () => {
    class FindGroupByIdStub implements LoadGroupByIdUseCaseContract {
        async loadById(id: string): Promise<GroupModel> {
            return Promise.resolve({
                'id': 'any_id',
                name: 'any_name'
            })
        }
    }

    return new FindGroupByIdStub()
}

const makeSut = () => {
    const findGroupByIdStub = makeFindGroupByIdStub()
    const sut = new FindGroupByIdController(findGroupByIdStub)
    return { sut, findGroupByIdStub }
}

describe('FindGroupByIdController', () => {
    it('should return 200 on success', async () => {
        const { sut } = makeSut()
        const httpResponse = await sut.handle(mockRequest())
        expect(httpResponse.statusCode).toBe(200)
        expect(httpResponse.body).toEqual({
            id: 'any_id',
            name: 'any_name'
        })
    })

    it('should return 404 if FindGroupById returns null', async () => {
        const { sut, findGroupByIdStub } = makeSut()
        jest.spyOn(findGroupByIdStub, 'loadById').mockReturnValueOnce(
            new Promise(resolve => resolve(null)),
        );
        const httpResponse = await sut.handle(mockRequest())
        expect(httpResponse.statusCode).toBe(404)
    })

    it('should return 500 if FindGroupById throws', async () => {
        const { sut, findGroupByIdStub } = makeSut()

        jest.spyOn(findGroupByIdStub, 'loadById').mockImplementationOnce(() => {
            throw new Error()
        })

        const httpResponse = await sut.handle(mockRequest())
        expect(httpResponse.statusCode).toBe(500)
    })
})
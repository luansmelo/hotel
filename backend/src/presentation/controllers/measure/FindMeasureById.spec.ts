import { MeasureModel } from "@/domain/models/Measure";
import { FindMeasureByIdController } from "./FindMeasureByIdController";
import { LoadMeasureByIdUseCaseContract } from "@/domain/usecases/measure/LoadMeasureById";

const mockRequest = () => ({
    params: {
        id: 'any_id'
    }
})

const makeFindMeasureByIdStub = () => {
    class FindMeasureByIdStub implements LoadMeasureByIdUseCaseContract {
        async loadById(id: string): Promise<MeasureModel> {
            return Promise.resolve({
                'id': 'any_id',
                name: 'any_name'
            })
        }
    }

    return new FindMeasureByIdStub()
}

const makeSut = () => {
    const findMeasureByIdStub = makeFindMeasureByIdStub()
    const sut = new FindMeasureByIdController(findMeasureByIdStub)
    return { sut, findMeasureByIdStub }
}

describe('FindMeasureByIdController', () => {
    it('should return 200 on success', async () => {
        const { sut } = makeSut()
        const httpResponse = await sut.handle(mockRequest())
        expect(httpResponse.statusCode).toBe(200)
        expect(httpResponse.body).toEqual({
            id: 'any_id',
            name: 'any_name'
        })
    })

    it('should return 404 if FindMeasureById returns null', async () => {
        const { sut, findMeasureByIdStub } = makeSut()
        jest.spyOn(findMeasureByIdStub, 'loadById').mockReturnValueOnce(
            new Promise(resolve => resolve(null)),
        );
        const httpResponse = await sut.handle(mockRequest())
        expect(httpResponse.statusCode).toBe(404)
    })

    it('should return 500 if FindMeasureById throws', async () => {
        const { sut, findMeasureByIdStub } = makeSut()

        jest.spyOn(findMeasureByIdStub, 'loadById').mockImplementationOnce(() => {
            throw new Error()
        })

        const httpResponse = await sut.handle(mockRequest())
        expect(httpResponse.statusCode).toBe(500)
    })
})
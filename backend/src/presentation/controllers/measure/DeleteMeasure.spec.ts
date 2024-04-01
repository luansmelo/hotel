import { DeleteMeasureUseCaseContract } from "@/domain/usecases/measure/DeleteMeasure";
import { DeleteMeasureController } from "./DeleteMeasureController";
import { MeasureModel } from "@/domain/models/Measure";

const mockRequest = () => {
    return {
        params: {
            id: 'any_id'
        }
    }
}

const makeDeleteMeasureStub = () => {
    class DeleteMeasureStub implements DeleteMeasureUseCaseContract {
        async deleteById(id: string): Promise<MeasureModel> {
            return Promise.resolve({
                'id': 'any_id',
                name: 'any_name'
            });
        }
    }
    return new DeleteMeasureStub()
}

const makeSut = () => {
    const deleteMeasureStub = makeDeleteMeasureStub()
    const sut = new DeleteMeasureController(deleteMeasureStub)
    return { sut, deleteMeasureStub }
}

describe('Delete Measure Controller', () => {
    it('should return 200 on sucess', async () => {
        const { sut } = makeSut()
        const httpRequest = mockRequest()

        const response = await sut.handle(httpRequest)
        expect(response.statusCode).toBe(200)
    })

    it('should call deleteMeasure with correct values', () => {
        const { sut, deleteMeasureStub } = makeSut();
        const deleteSpy = jest.spyOn(deleteMeasureStub, 'deleteById');
        const request = mockRequest();
        sut.handle(request);
        expect(deleteSpy).toHaveBeenCalledWith(request.params.id);
    });

    it('should return 500 if deleteMeasure throws', async () => {
        const { sut, deleteMeasureStub } = makeSut()
        jest.spyOn(deleteMeasureStub, 'deleteById').mockImplementationOnce(() => {
            throw new Error()
        })

        const httpRequest = mockRequest()
        const httpResponse = await sut.handle(httpRequest)
        expect(httpResponse.statusCode).toBe(500)
    })
})
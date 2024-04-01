import { MeasureModel } from "@/domain/models/Measure";
import { UpdateMeasureController } from "./UpdateMeasureController";
import { UpdateMeasureUseCaseContract } from "@/domain/usecases/measure/UpdateCategory";
import { CreateMeasureModel } from "@/domain/usecases/measure/CreateMeasure";


const makeUpdateMeasureStub = () => {
    class UpdateMeasureStub implements UpdateMeasureUseCaseContract {
        async updateById(id: string, input: Partial<CreateMeasureModel>): Promise<Partial<MeasureModel>> {
            return Promise.resolve({
                id: 'any_id',
                name: 'any_id'
            })
        }
    }
    return new UpdateMeasureStub
}

const makeSut = () => {
    const updateMeasureStub = makeUpdateMeasureStub()
    const sut = new UpdateMeasureController(updateMeasureStub)

    return { sut, updateMeasureStub }
}

const makeFakeRequest = () => ({
    params: {
        id: 'any_id',
    },
    body: {
        name: 'any_new_name'
    }
})

describe('UpdateMeasureController', () => {
    it('should call UpdateMeasure with correct values', async () => {
        const { sut, updateMeasureStub } = makeSut();
        const updateSpy = jest.spyOn(updateMeasureStub, 'updateById');
        const httpRequest = makeFakeRequest();
        await sut.handle(httpRequest);

        expect(updateSpy).toHaveBeenCalledWith(
            httpRequest.params.id,
            { name: httpRequest.body.name }
        );
    });

    it('should return 200 if UpdateMeasure succeeds', async () => {
        const { sut } = makeSut();
        const request = makeFakeRequest();
        const httpResponse = await sut.handle(request);
        expect(httpResponse.statusCode).toBe(200);
        expect(httpResponse.body).toHaveProperty('id');
    });

    it('should return 500 if UpdateMeasure throws', async () => {
        const { sut, updateMeasureStub } = makeSut();
        jest.spyOn(updateMeasureStub, 'updateById').mockImplementationOnce(() => {
            throw new Error();
        });
        const request = makeFakeRequest();
        const httpResponse = await sut.handle(request);
        expect(httpResponse.statusCode).toBe(500);
    });

    it('should return 404 if UpdateMeasure returns null', async () => {
        const { sut, updateMeasureStub } = makeSut();
        jest.spyOn(updateMeasureStub, 'updateById').mockReturnValueOnce(
            new Promise(resolve => resolve(null)),
        );
        const request = makeFakeRequest();
        const httpResponse = await sut.handle(request);
        expect(httpResponse.statusCode).toBe(404);
    });
});

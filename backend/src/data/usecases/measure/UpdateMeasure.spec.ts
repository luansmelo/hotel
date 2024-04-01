import { LoadMeasureByIdRepository } from "@/data/protocols/db/measure/LoadMeasureByIdRepository.protocol";
import { UpdateMeasureRepository } from "@/data/protocols/db/measure/UpdateMeasureRepository.protocol";
import { MeasureModel } from "@/domain/models/Measure";
import { CreateMeasureModel } from "@/domain/usecases/measure/CreateMeasure";
import { UpdateMeasureUseCase } from "./UpdateMeasureUseCase";
import { LoadMeasureByNameRepository } from "@/data/protocols/db/measure/LoadMeasureByNameRepository.protocol.ts";

const makeFakeRequest = () => ({
    id: 'any_id',
    name: 'any_name'
})

const makeLoadMeasureByIdStub = () => {
    class LoadMeasureByIdRepositoryStub implements LoadMeasureByIdRepository {
        async loadById(id: string): Promise<MeasureModel> {
            return Promise.resolve({
                id: 'any_id',
                name: 'any_name'
            })
        }
    }

    return new LoadMeasureByIdRepositoryStub()
}

const makeUpdateMeasureRepositoryStub = () => {
    class UpdateMeasureRepositoryStub implements UpdateMeasureRepository {
        async updateById(id: string, input: Partial<CreateMeasureModel>): Promise<Partial<MeasureModel>> {
            return Promise.resolve({
                id: 'any_id',
                name: 'new_name'
            })
        }
    }
    return new UpdateMeasureRepositoryStub()
}

const makeSut = () => {
    const loadMeasureByIdRepositoryStub = makeLoadMeasureByIdStub()
    const updateMeasureRepositoryStub = makeUpdateMeasureRepositoryStub()
    const sut = new UpdateMeasureUseCase(updateMeasureRepositoryStub, loadMeasureByIdRepositoryStub)
    return { sut, updateMeasureRepositoryStub, loadMeasureByIdRepositoryStub }
}

describe('UpdateMeasure Usecase', () => {
    it('should call UpdateMeasureRepository with correct values', async () => {
        const { sut, updateMeasureRepositoryStub } = makeSut()
        const updateSpy = jest.spyOn(updateMeasureRepositoryStub, 'updateById')

        const httpRequest = makeFakeRequest()
        await sut.updateById(httpRequest.id, {
            ...httpRequest
        })
        expect(updateSpy).toHaveBeenCalledWith(httpRequest.id, {
            name: httpRequest.name
        })
    })

    it('should return null if updateMeasureRepository returns null', async () => {
        const { sut, updateMeasureRepositoryStub } = makeSut();
        jest.spyOn(updateMeasureRepositoryStub, 'updateById').mockReturnValueOnce(new Promise(resolve => resolve(null)));
        const httpRequest = makeFakeRequest();
        const result = await sut.updateById(httpRequest.id, { ...httpRequest });
        expect(result).toBeNull();
    });

    it('should return an updated Measure if updateMeasureRepository returns an updated Measure', async () => {
        const { sut } = makeSut();
        const httpRequest = makeFakeRequest();
        const result = await sut.updateById(httpRequest.id, { ...httpRequest });
        expect(result?.name).toBe('new_name');
    });
})
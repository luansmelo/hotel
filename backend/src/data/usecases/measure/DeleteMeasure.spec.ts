import { DeleteMeasureUseCase } from "./DeleteMeasuresUseCase";
import { DeleteMeasureRepository } from "@/data/protocols/db/measure/DeleteMeasureRepository.protocol.ts";  
import { MeasureModel } from "@/domain/models/Measure";
import { LoadMeasureByIdRepository } from "@/data/protocols/db/measure/LoadMeasureByIdRepository.protocol";

const mockRequest = () => {
    return {
        id: 'any_id'
    }
}

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

const makeDeleteMeasureRepositoryStub = () => {
    class DeleteMeasureRepositoryStub implements DeleteMeasureRepository {
        async deleteById(id: string): Promise<MeasureModel> {
            return Promise.resolve({
                id: 'any_id',
                name: 'any_name'
            })
        }
    }
    return new DeleteMeasureRepositoryStub()
}

const makeSut = () => {
    const deleteMeasureRepositoryStub = makeDeleteMeasureRepositoryStub()
    const loadMeasureByIdRepositoryStub = makeLoadMeasureByIdStub()
    const sut = new DeleteMeasureUseCase(deleteMeasureRepositoryStub, loadMeasureByIdRepositoryStub)
    return { sut, deleteMeasureRepositoryStub, loadMeasureByIdRepositoryStub }
}

describe('Delete Measure Usecase', () => {
    it('should call LoadMeasureRepository with correct values', async () => {
        const { sut, loadMeasureByIdRepositoryStub } = makeSut()
        const findSpy = jest.spyOn(loadMeasureByIdRepositoryStub, 'loadById')
        const httpRequest = mockRequest()
        await sut.deleteById(httpRequest.id)
        expect(findSpy).toHaveBeenCalledWith(httpRequest.id)
    })

    it('should call DeleteMeasure with correct values', async () => {
        const { sut, deleteMeasureRepositoryStub } = makeSut()
        const findSpy = jest.spyOn(deleteMeasureRepositoryStub, 'deleteById')
        const httpRequest = mockRequest()
        await sut.deleteById(httpRequest.id)
        expect(findSpy).toHaveBeenCalledWith(httpRequest.id)
    })

    it('should throw if DeleteMeasure throws', async () => {
        const { sut, deleteMeasureRepositoryStub } = makeSut()
        jest.spyOn(deleteMeasureRepositoryStub, 'deleteById').mockImplementationOnce(() => {
            throw new Error()
        })

        const httpRequest = mockRequest()
        const promise = sut.deleteById(httpRequest.id)
        expect(promise).rejects.toThrow()
    })
})
import { CreateMeasureUseCase } from "./CreateMeasureUseCase";
import { CreateMeasureRepository } from "@/data/protocols/db/measure/CreateMeasureRepository.protocol";  
import { MeasureModel } from "@/domain/models/Measure";
import { CreateMeasureModel } from "@/domain/usecases/measure/CreateMeasure";
import { LoadMeasureByNameRepository } from "@/data/protocols/db/measure/LoadMeasureByNameRepository.protocol.ts";

type SutTypes = {
    sut: CreateMeasureUseCase,
    loadMeasureByNameStub: LoadMeasureByNameRepository,
    createMeasureRepositoryStub: CreateMeasureRepository
}

const makeCreateMeasureRepositoryStub = (): CreateMeasureRepository => {
    class CreateMeasureRepositoryStub implements CreateMeasureRepository {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        async create(account: CreateMeasureModel): Promise<MeasureModel> {
            const fakeMeasure: MeasureModel = {
                id: 'valid_id',
                name: 'valid_name',
            };

            return Promise.resolve(fakeMeasure);
        }

    }
    return new CreateMeasureRepositoryStub();
};

const makeLoadMeasureByNameStub = () => {
    class LoadMeasureByNameRepositoryStub implements LoadMeasureByNameRepository {
        async loadByName(name: string): Promise<MeasureModel> {
            return Promise.resolve(null)
        }
    }
    return new LoadMeasureByNameRepositoryStub()
}

const makeSut = (): SutTypes => {
    const loadMeasureByNameStub = makeLoadMeasureByNameStub()
    const createMeasureRepositoryStub = makeCreateMeasureRepositoryStub();
    const sut = new CreateMeasureUseCase(createMeasureRepositoryStub, loadMeasureByNameStub);
    return { sut, createMeasureRepositoryStub, loadMeasureByNameStub };
};

describe('Measure Create Usecase', () => {
    it('should call createUserRepository with correct values', async () => {
        const { sut, createMeasureRepositoryStub } = makeSut();
        const createUserRepositorySpy = jest.spyOn(createMeasureRepositoryStub, 'create');

        const MeasureData: CreateMeasureModel = {
            name: 'valid_name',
        };

        await sut.create(MeasureData);

        expect(createUserRepositorySpy).toHaveBeenCalledWith({
            ...MeasureData,
        });
    });

    it('should throw if createMeasureRepository throws', async () => {
        const { sut, createMeasureRepositoryStub } = makeSut();
        jest.spyOn(createMeasureRepositoryStub, 'create').mockReturnValueOnce(Promise.reject(new Error()));
        const MeasureData: CreateMeasureModel = {
            name: 'name',
        };
        const promise = sut.create(MeasureData);
        await expect(promise).rejects.toThrow();
    });

    it('should return a Measure on success', async () => {
        const { sut } = makeSut();
        const MeasureData: CreateMeasureModel = {
            name: 'any_name',
        };

        const Measure = await sut.create(MeasureData);

        expect(Measure).toEqual({
            id: 'valid_id',
            name: 'valid_name',
        });
    });

    it('Should throw if loadByName returns a Measure', async () => {
        const { sut, loadMeasureByNameStub } = makeSut();
        const MeasureData: CreateMeasureModel = {
            name: 'valid_name',
        };

        jest.spyOn(loadMeasureByNameStub, 'loadByName').mockReturnValueOnce(Promise.resolve({
            ...MeasureData,
            id: 'valid_id',
        }));
        const promise = sut.create(MeasureData);
        await expect(promise).rejects.toThrow();
    });
})
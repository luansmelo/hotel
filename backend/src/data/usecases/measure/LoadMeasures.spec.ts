import { LoadMeasuresRepository } from "@/data/protocols/db/measure/LoadMeasuresRepository.protocol";
import { LoadMeasuresUseCase } from "./LoadMeasuresUseCase";
import { MeasureModel } from "@/domain/models/Measure";

const fakeRequest = {
    page: 1,
    name: 'any_name',
};

const makeLoadAllMeasuresRepositoryStub = () => {
    class LoadMeasuresRepositoryStub implements LoadMeasuresRepository {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        async loadAll(): Promise<MeasureModel[]> {
            return new Promise(resolve => resolve(
                [
                    {
                        id: 'any_id',
                        name: 'any_name',
                    }
                ],

            ));
        }
    }

    return new LoadMeasuresRepositoryStub();
};

const makeSut = () => {
    const loadMeasuresRepositoryStub = makeLoadAllMeasuresRepositoryStub();
    const sut = new LoadMeasuresUseCase(loadMeasuresRepositoryStub);
    return { sut, loadMeasuresRepositoryStub };
};

describe('Load Measures Use Case', () => {

    it('should return a list of Measures on success', async () => {
        const { sut } = makeSut();
        const Measures = await sut.loadAll();
        expect(Measures).toEqual(
            [
                {
                    id: 'any_id',
                    name: 'any_name',
                }
            ],
        );
    });

    it('should throw if LoadMeasuresRepository throws', async () => {
        const { sut, loadMeasuresRepositoryStub } = makeSut();
        jest.spyOn(loadMeasuresRepositoryStub, 'loadAll').mockImplementationOnce(() => {
            throw new Error();
        });
        const promise = sut.loadAll();
        await expect(promise).rejects.toThrow();
    });
});
import { LoadMeasuresRepository } from "@/data/protocols/db/measure/LoadMeasuresRepository.protocol";
import { LoadMeasuresUseCase } from "./LoadMeasuresUseCase";

import { FindMeasuresParams, FindMeasuresResponse } from "@/domain/usecases/measure/FindMeasuresParams";

const fakeRequest = {
    page: 1,
    name: 'any_name',
};

const makeLoadAllMeasuresRepositoryStub = () => {
    class LoadMeasuresRepositoryStub implements LoadMeasuresRepository {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        async loadAll(params: FindMeasuresParams): Promise<FindMeasuresResponse> {
            return new Promise(resolve => resolve({
                measures: [
                    {
                        id: 'any_id',
                        name: 'any_name',
                    }
                ],
                totalPages: 1,
                totalItems: 1
            }));
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
        const Measures = await sut.loadAll(fakeRequest);
        expect(Measures).toEqual({
            measures: [
                {
                    id: 'any_id',
                    name: 'any_name',
                }
            ],
            totalPages: 1,
            totalItems: 1
        });
    });

    it('should throw if LoadMeasuresRepository throws', async () => {
        const { sut, loadMeasuresRepositoryStub } = makeSut();
        jest.spyOn(loadMeasuresRepositoryStub, 'loadAll').mockImplementationOnce(() => {
            throw new Error();
        });
        const promise = sut.loadAll(fakeRequest);
        await expect(promise).rejects.toThrow();
    });
});
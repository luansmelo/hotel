import { LoadProductsRepository } from "@/data/protocols/db/product/LoadProductsRepository.protocol";
import { FindProductsUseCase } from "./FindProductsUseCase";

import { FindProductsParams, FindProductsResponse } from "@/domain/usecases/product/FindProductsParams";

const fakeRequest = {
    page: 1,
    name: 'any_name',
};

const makeLoadAllProductsRepositoryStub = () => {
    class LoadProductsRepositoryStub implements LoadProductsRepository {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        async loadAll(params: FindProductsParams): Promise<FindProductsResponse> {
            return new Promise(resolve => resolve({
                products: [
                    {
                        id: 'any_id',
                        name: 'any_name',
                        description: 'any_description',
                        accession: 0,
                        preparationTime: '00:00',
                        resource: 'any_resource'
                    }
                ],
                totalPages: 1,
                totalItems: 1
            }));
        }
    }

    return new LoadProductsRepositoryStub();
};

const makeSut = () => {
    const loadProductsRepositoryStub = makeLoadAllProductsRepositoryStub();
    const sut = new FindProductsUseCase(loadProductsRepositoryStub);
    return { sut, loadProductsRepositoryStub };
};

describe('Load Products Use Case', () => {

    it('should return a list of Products on success', async () => {
        const { sut } = makeSut();
        const Products = await sut.loadAll(fakeRequest);
        expect(Products).toEqual({
            products: [
                {
                    id: 'any_id',
                    name: 'any_name',
                    description: 'any_description',
                    accession: 0,
                    preparationTime: '00:00',
                    resource: 'any_resource'
                }
            ],
            totalPages: 1,
            totalItems: 1
        });
    });

    it('should throw if LoadProductsRepository throws', async () => {
        const { sut, loadProductsRepositoryStub } = makeSut();

        jest.spyOn(loadProductsRepositoryStub, 'loadAll').mockImplementationOnce(() => {
            throw new Error();
        });

        const promise = sut.loadAll(fakeRequest);
        await expect(promise).rejects.toThrow();
    });
});
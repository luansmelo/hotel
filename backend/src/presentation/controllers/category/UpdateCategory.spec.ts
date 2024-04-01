import { CategoryModel } from "@/domain/models/Category";
import { CreateCategoryModel } from "@/domain/usecases/category/CreateCategory";
import { UpdateCategoryController } from "./UpdateCategoryController";
import { UpdateCategoryUseCaseContract } from "@/domain/usecases/category/UpdateCategory";

const makeUpdateCategoryStub = () => {
    class UpdateCategoryStub implements UpdateCategoryUseCaseContract {
        async updateById(id: string, input: Partial<CreateCategoryModel>): Promise<Partial<CategoryModel>> {
            return Promise.resolve({
                id: 'any_id',
                name: 'any_id'
            })
        }
    }
    return new UpdateCategoryStub
}

const makeSut = () => {
    const updateCategoryStub = makeUpdateCategoryStub()
    const sut = new UpdateCategoryController(updateCategoryStub)

    return { sut, updateCategoryStub }
}

const makeFakeRequest = () => ({
    params: {
        id: 'any_id',
    },
    body: {
        name: 'any_new_name'
    }
})

describe('UpdateCategoryController', () => {
    it('should call UpdateCategory with correct values', async () => {
        const { sut, updateCategoryStub } = makeSut();
        const updateSpy = jest.spyOn(updateCategoryStub, 'updateById');
        const httpRequest = makeFakeRequest();
        await sut.handle(httpRequest);

        expect(updateSpy).toHaveBeenCalledWith(
            httpRequest.params.id,
            { name: httpRequest.body.name }
        );
    });

    it('should return 200 if UpdateCategory succeeds', async () => {
        const { sut } = makeSut();
        const request = makeFakeRequest();
        const httpResponse = await sut.handle(request);
        expect(httpResponse.statusCode).toBe(200);
        expect(httpResponse.body).toHaveProperty('id');
    });

    it('should return 500 if UpdateCategory throws', async () => {
        const { sut, updateCategoryStub } = makeSut();
        jest.spyOn(updateCategoryStub, 'updateById').mockImplementationOnce(() => {
            throw new Error();
        });
        const request = makeFakeRequest();
        const httpResponse = await sut.handle(request);
        expect(httpResponse.statusCode).toBe(500);
    });

    it('should return 404 if UpdateCategory returns null', async () => {
        const { sut, updateCategoryStub } = makeSut();
        jest.spyOn(updateCategoryStub, 'updateById').mockReturnValueOnce(
            new Promise(resolve => resolve(null)),
        );
        const request = makeFakeRequest();
        const httpResponse = await sut.handle(request);
        expect(httpResponse.statusCode).toBe(404);
    });
});

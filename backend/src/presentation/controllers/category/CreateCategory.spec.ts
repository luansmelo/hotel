import { CreateCategoryModel, CreateCategoryUseCaseContract } from "@/domain/usecases/category/CreateCategory";
import { CreateCategoryController } from "./CreateCategoryController";
import { CategoryModel } from "@/domain/models/Category";
import { Validation } from "@/validation/protocols";
import { HttpRequest } from "@/presentation/protocols";
import { badRequest } from "@/presentation/helpers/httpCodesHelper";

const makeCreateCategoryStub = () => {
    class CreateCategoryStub implements CreateCategoryUseCaseContract {
        create(input: CreateCategoryModel): Promise<CategoryModel> {
            return Promise.resolve({
                id: 'valid_id',
                name: input.name,
            })
        }
    }
    return new CreateCategoryStub()
}

const makeValidationStub = () => {
    class ValidationStub implements Validation {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        validate(input: unknown): Error | void {
            return undefined;
        }
    }
    return new ValidationStub();
};

const makeSut = () => {
    const validationStub = makeValidationStub()
    const createCategoryStub = makeCreateCategoryStub()
    const sut = new CreateCategoryController(createCategoryStub, validationStub)
    return {
        sut,
        validationStub,
        createCategoryStub
    }
}

const makeFakeRequest = (): HttpRequest => ({
    body: {
        name: 'any_name'
    }
})

describe('Create Category Controller', () => {
    it('should call createCategory with correct values', async () => {
        const { sut, createCategoryStub } = makeSut()
        const httpRequest = makeFakeRequest()

        const addSpy = jest.spyOn(createCategoryStub, 'create')
        sut.handle(httpRequest)

        expect(addSpy).toHaveBeenCalledWith(httpRequest.body)
    })

    it('should return 200 if valid data is provided', async () => {
        const { sut } = makeSut()
        const httpRequest = makeFakeRequest()

        const httpResponse = await sut.handle(httpRequest)

        expect(httpResponse.statusCode).toBe(200)
        expect(httpResponse.body).toHaveProperty('id')
    })

    it('should return 500 if createCategory throws ', async () => {
        const { sut, createCategoryStub } = makeSut();
        const httpRequest = makeFakeRequest();
        jest.spyOn(createCategoryStub, 'create').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())));
        const httpResponse = await sut.handle(httpRequest);
        expect(httpResponse.statusCode).toBe(500);
    });

    it('should call validation with correct values', async () => {
        const { sut, validationStub } = makeSut();
        const httpRequest = makeFakeRequest();
        const validateSpy = jest.spyOn(validationStub, 'validate');
        sut.handle(httpRequest);
        expect(validateSpy).toHaveBeenCalledWith(httpRequest.body);
    });

    it('should return 400 if validation throws ', async () => {
        const { sut, validationStub } = makeSut();
        const httpRequest = makeFakeRequest();
        jest.spyOn(validationStub, 'validate').mockReturnValueOnce(new Error());
        const httpResponse = await sut.handle(httpRequest);
        expect(httpResponse).toEqual(badRequest(new Error()));
    });
})
import { ProductModel } from "@/domain/models/Product";
import { CreateProductModel, CreateProductUseCaseContract } from "@/domain/usecases/product/CreateProduct";
import { Validation } from "@/validation/protocols";
import { CreateProductController } from "./CreateProductController";
import { HttpRequest } from "@/presentation/protocols";
import { badRequest } from "@/presentation/helpers/httpCodesHelper";


const makeCreateProductStub = () => {
    class CreateProductStub implements CreateProductUseCaseContract {
        async create(input: CreateProductModel): Promise<ProductModel> {
            return Promise.resolve({
                id: 'valid_id',
                name: 'valid_name',
                description: 'valid_description',
                preparationTime: 'valid_time',
                resource: 'valid_resource',
                accession: 10,
            })
        }
    }
    return new CreateProductStub()
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
    const createProductStub = makeCreateProductStub()
    const sut = new CreateProductController(createProductStub, validationStub)
    return {
        sut,
        validationStub,
        createProductStub
    }
}

const makeFakeRequest = (): HttpRequest => ({
    body: {
        name: 'valid_name',
        description: 'valid_description',
        preparationTime: 'valid_time',
        resource: 'valid_resource',
        accession: 10,
    }
})

describe('Create Product Controller', () => {
    it('should call createProduct with correct values', async () => {
        const { sut, createProductStub } = makeSut()
        const httpRequest = makeFakeRequest()

        const addSpy = jest.spyOn(createProductStub, 'create')
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

    it('should return 500 if createProduct throws ', async () => {
        const { sut, createProductStub } = makeSut();
        const httpRequest = makeFakeRequest();
        jest.spyOn(createProductStub, 'create').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())));
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
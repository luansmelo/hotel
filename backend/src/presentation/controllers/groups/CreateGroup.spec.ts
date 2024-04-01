import { CreateGroupController } from "./CreateGroupController";
import { GroupModel } from "@/domain/models/Group";
import { Validation } from "@/validation/protocols";
import { HttpRequest } from "@/presentation/protocols";
import { badRequest } from "@/presentation/helpers/httpCodesHelper";
import { CreateGroupModel, CreateGroupUseCaseContract } from "@/domain/usecases/group/CreateGroup";

const makeCreateGroupStub = () => {
    class CreateGroupStub implements CreateGroupUseCaseContract {
        async create(input: CreateGroupModel): Promise<GroupModel> {
            return Promise.resolve({
                id: 'valid_id',
                name: input.name,
            })
        }
    }
    return new CreateGroupStub()
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
    const createGroupStub = makeCreateGroupStub()
    const sut = new CreateGroupController(createGroupStub, validationStub)
    return {
        sut,
        validationStub,
        createGroupStub
    }
}

const makeFakeRequest = (): HttpRequest => ({
    body: {
        name: 'any_name'
    }
})

describe('Create Group Controller', () => {
    it('should call createGroup with correct values', async () => {
        const { sut, createGroupStub } = makeSut()
        const httpRequest = makeFakeRequest()

        const addSpy = jest.spyOn(createGroupStub, 'create')
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

    it('should return 500 if createGroup throws ', async () => {
        const { sut, createGroupStub } = makeSut();
        const httpRequest = makeFakeRequest();
        jest.spyOn(createGroupStub, 'create').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())));
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
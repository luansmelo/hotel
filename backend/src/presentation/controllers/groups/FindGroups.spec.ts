import { HttpRequest } from "@/presentation/protocols";
import { Validation } from "@/validation/protocols";
import { FindGroupsParams, FindGroupsResponse } from "@/domain/usecases/group/FindGroupsParams";
import { LoadGroupsController } from "./FindGroupsController";
import { LoadGroupsUseCaseContract } from "@/domain/usecases/group/LoadGroups";
const httpRequest: HttpRequest = {
    query: {
        name: 'any_name',
        sort: 'any_sort'
    }
}

const makeValidation = (): Validation => {
    class ValidationStub implements Validation {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        validate(input: unknown): Error | void {
            return undefined;
        }
    }
    return new ValidationStub();
};

const makeLoadGroupsStub = () => {
    class LoadGroupsStub implements LoadGroupsUseCaseContract {
        async findAll(params: FindGroupsParams): Promise<FindGroupsResponse> {
            return Promise.resolve({
                groups: [{
                    id: 'any_id',
                    name: 'any_name'
                }],
                totalPages: 1,
                totalItems: 1
            })
        }
    }

    return new LoadGroupsStub()
}

const makeSut = () => {
    const validationStub = makeValidation()
    const loadGroupsStub = makeLoadGroupsStub()
    const sut = new LoadGroupsController(loadGroupsStub, validationStub)
    return { sut, loadGroupsStub, validationStub }
}

describe('LoadGroupsController', () => {
    it('should call FindGroups with correct values', async () => {
        const { sut, loadGroupsStub } = makeSut()
        const loadSpyGroups = jest.spyOn(loadGroupsStub, 'findAll')
        sut.handle(httpRequest)
        expect(loadSpyGroups).toHaveBeenCalledWith(httpRequest.query)
    })

    it('should return 200 if FindGroups returns a list Groups', async () => {
        const { sut } = makeSut()
        const httpResponse = await sut.handle(httpRequest)

        expect(httpResponse.statusCode).toBe(200)
        expect(httpResponse.body).toEqual({
            groups: [
                {
                    id: 'any_id',
                    name: 'any_name'
                },
            ],
            totalPages: 1,
            totalItems: 1,
        })
    })

    it('should return 500 if LoadGroups throws', async () => {
        const { sut, loadGroupsStub } = makeSut()
        jest.spyOn(loadGroupsStub, 'findAll').mockImplementationOnce(() => {
            throw new Error()
        })

        const httpResponse = await sut.handle(httpRequest)
        expect(httpResponse.statusCode).toBe(500)
    })

    it('should call Validation with correct value', async () => {
        const { sut, validationStub } = makeSut()
        const validateSpy = jest.spyOn(validationStub, 'validate')

        sut.handle(httpRequest)

        expect(validateSpy).toHaveBeenCalledWith(httpRequest.query)
    })

    it('should return 400 if Validation returns an error', async () => {
        const { sut, validationStub } = makeSut()

        jest.spyOn(validationStub, 'validate').mockReturnValueOnce(new Error())

        const httpResponse = await sut.handle(httpRequest)

        expect(httpResponse.statusCode).toBe(400)
    })
})
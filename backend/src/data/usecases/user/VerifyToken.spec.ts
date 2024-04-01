import { Verify } from "@/data/protocols/cryptography";
import { VerifyToken } from "./VerifyToken";

const makeSut = () => {
    class TokenValidator implements Verify {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        async verify(token: string): Promise<boolean> {
            return new Promise((resolve) => resolve(true));
        }
    }
    const tokenValidatorStub = new TokenValidator();
    const sut = new VerifyToken(tokenValidatorStub);
    return {
        sut,
        tokenValidatorStub

    };
};

describe('Verify User Token', () => {
    it('should call verify with correct value', async () => {
        const { sut, tokenValidatorStub } = makeSut();
        const verifySpy = jest.spyOn(tokenValidatorStub, 'verify');
        await sut.verify('any_token');
        expect(verifySpy).toHaveBeenCalledWith('any_token');
    });

    it('should return true if verify returns true', async () => {
        const { sut } = makeSut();
        const isValid = await sut.verify('any_token');
        expect(isValid).toBe(true);
    });
    
    it('should return false if verify returns false', async () => {
        const { sut, tokenValidatorStub } = makeSut();
        jest.spyOn(tokenValidatorStub, 'verify').mockReturnValueOnce(new Promise(resolve => resolve(false)));
        const isValid = await sut.verify('any_token');
        expect(isValid).toBe(false);
    });
});
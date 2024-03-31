import jwt from 'jsonwebtoken';
import { JwtAdapter } from './jwt-adapter';

const makeSut = () => {
	return new JwtAdapter('secret', '4d');
};

describe('JWT Adapter', () => {
	it('Should call sign with correct values', async () => {
		const sut = makeSut();
		const signSpy = jest.spyOn(jwt, 'sign');
		await sut.encrypt({ id: 'any_value' });
		expect(signSpy).toHaveBeenCalledWith({ id: 'any_value' }, 'secret', {
			expiresIn: '4d',
		});
	});

	it('Should return a token when success', async () => {
		const sut = makeSut();
		jest.spyOn(jwt, 'sign').mockImplementationOnce(() => 'any_token');
		const token = await sut.encrypt({ id: 'any_value' });
		expect(token).toBe('any_token');
	});
    
	it('Should throw if sign throws', async () => {
		const sut = makeSut();
		jest.spyOn(jwt, 'sign').mockImplementationOnce(() => {
			throw new Error();
		});
		const promise = sut.encrypt({ id: 'any_value' });
		await expect(promise).rejects.toThrow();
	});

	it('Should decrypt a token when success', async () => {
		const sut = makeSut();
		jest.spyOn(jwt, 'verify').mockImplementationOnce(() => 'any_value');
		const token = await sut.decrypt('any_token');
		expect(token).toBe('any_value');
	});
    
	it('Should throw if verify throws', async () => {
		const sut = makeSut();
		jest.spyOn(jwt, 'verify').mockImplementationOnce(() => {
			throw new Error();
		});
		const promise = sut.decrypt('any_token');
		await expect(promise).rejects.toThrow();
	});

	it('should return false if verify throws', async () => {
		const sut = makeSut();
		jest.spyOn(jwt, 'verify').mockImplementationOnce(() => {
			throw new Error();
		});
		const isValid = await sut.verify('any_token');
		expect(isValid).toBe(false);
	});
});
import bcrypt from 'bcrypt';
import { BcryptAdapter } from './bcypter-adapter';
import { CRYPTOGRAPHY_SALTING_ROUNDS } from '@/config/constants';

jest.mock('bcrypt', () => ({
	async hash(): Promise<string> {
		return new Promise((resolve) => resolve('any_value'));
	},

	async compare(): Promise<boolean> {
		return new Promise((resolve) => resolve(true));
	}
}));

const makeSut = (): BcryptAdapter => {
	return new BcryptAdapter(CRYPTOGRAPHY_SALTING_ROUNDS);
};

describe('Bcrypt Adapter', () => {
	it('Should call bcrypt hash with correct values', async () => {
		const sut = makeSut();
		const hashSpy = jest.spyOn(bcrypt, 'hash');
		await sut.hash('any_value');
		expect(hashSpy).toHaveBeenCalledWith('any_value', CRYPTOGRAPHY_SALTING_ROUNDS);
	});

	it('Should return a hash when hash success', async () => {
		const sut = makeSut();
		const hash = await sut.hash('any_value');
		expect(hash).toBe('any_value');
	});
	
	it('Should throw if bcrypt hash throws', async () => {
		const sut = makeSut();
		jest.spyOn(bcrypt, 'hash').mockImplementation((pass, salt, cb) => cb(new Error(), ''));
		const promise = sut.hash('any_value');
		await expect(promise).rejects.toThrow();
	});

	it('Should call bcrypt compare with correct values', async () => {
		const sut = makeSut();
		const compareSpy = jest.spyOn(bcrypt, 'compare');
		await sut.compare('any_value', 'any_hash');
		expect(compareSpy).toHaveBeenCalledWith('any_value', 'any_hash');
	});

	it('Should return true when compare success', async () => {
		const sut = makeSut();
		const isValid = await sut.compare('any_value', 'any_hash');
		expect(isValid).toBe(true);
	});

	it('Should return false when compare fails', async () => {
		const sut = makeSut();
		jest.spyOn(bcrypt, 'compare').mockImplementationOnce(() => false);
		const isValid = await sut.compare('any_value', 'any_hash');
		expect(isValid).toBe(false);
	});

	it('Should throw if bcrypt compare throws', async () => {
		const sut = makeSut();
		jest.spyOn(bcrypt, 'compare').mockImplementation((pass, salt, cb) => cb(new Error(), false));
		const promise = sut.hash('any_value');
		await expect(promise).rejects.toThrow();
	});
});
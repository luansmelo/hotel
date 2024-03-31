import prisma from "@/config/prisma";
import { UserRepository } from "./UserRepository";

const makeSut = (): UserRepository => {
    return new UserRepository();
};
describe('Account MySQL Repository', () => {

    beforeEach(async () => {
        await prisma.$executeRaw`DELETE FROM user;`;
    });

    afterAll(async () => {
        prisma.$disconnect();
    });

    it('Should return an account on success on create', async () => {
        const sut = makeSut();
        const account = await sut.create({
            name: 'any_name',
            email: 'any_email',
            password: 'any_password',
            role: 'USER'
        });
        expect(account).toBeTruthy();
        expect(account.id).toBeTruthy();
        expect(account.name).toBe('any_name');
        expect(account.email).toBe('any_email');
        expect(account.password).toBe('any_password');
    }
    );

    it('should return an account on sucess on update', async () => {
        const sut = makeSut();
        const account = await sut.create({
            name: 'any_name',
            email: 'any_email',
            password: 'any_password',
            role: 'USER',
        });

        const updatedAccount = await sut.updateById(account.id, { role: 'ADMIN' });
        expect(updatedAccount).toBeTruthy();
        expect(updatedAccount?.role).toBe('ADMIN');
    });

    it('should return an account on sucess on findByToken', async () => {
        const sut = makeSut();
        const account = await sut.create({
            name: 'any_name',
            email: 'any_email',
            password: 'any_password',
            role: 'USER'
        });
        const updatedAccount = await sut.loadByIdAndRole(account.id);
        expect(updatedAccount).toBeTruthy();
        expect(updatedAccount?.id).toBeTruthy();
    });

    it('should return a list of users on success listAllUsers', async () => {
        const sut = makeSut();
        const account = await sut.create({
            name: 'any_name',
            email: 'any_email',
            password: 'any_password',
            role: 'USER'
        });
        const users = await sut.loadAll();
        expect(users).toEqual(users);
    });
});
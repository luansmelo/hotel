import prisma from '@/config/prisma';
import app from '../../config/app';
import request from 'supertest';
import User from '@/data/local/entity/user';
import { hash } from 'bcrypt';

describe('User Routes', () => {
    let adminToken: string;

    beforeEach(async () => {
        await prisma.$executeRaw`DELETE FROM user;`;

        const pass = await hash('adminPassword', 12);
        await User.create({
            data: {
                name: 'Admin User',
                email: 'admin@example.com',
                password: pass,
                role: 'ADMIN'
            }
        });

        const authResponse = await request(app)
            .post('/api/auth')
            .send({
                email: 'admin@example.com',
                password: 'adminPassword'
            });

        adminToken = authResponse.body.token;
    });

    afterAll(async () => {
        prisma.$disconnect();
    });

    it('Should return an user on create an account', async () => {

        await request(app)
            .post('/api/user/signup')
            .set('x-access-token', adminToken)
            .send({
                name: 'any name',
                email: 'valid_email@mail.com',
                password: 'vAlid_p4ssw0rd',
                role: 'USER',
            })
            .expect(200);
    });

    it('Should not return password on success', async () => {

        const response = await request(app)
            .post('/api/user/signup')
            .set('x-access-token', adminToken)
            .send({
                name: 'any name',
                email: 'valid_email@mail.com',
                password: 'vAlid_p4ssw0rd',
                gender: 'MALE',
            });

        expect(response.body.password).toBeUndefined();
    });
});

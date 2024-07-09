import prisma from '@/config/prisma';
import app from '../../config/app';
import request from 'supertest';
import User from '@/data/local/entity/user';
import { hash } from 'bcrypt';

describe('Measure Routes', () => {
    let adminToken: string;

    beforeEach(async () => {
        await prisma.$executeRaw`DELETE FROM user;`;
        await prisma.$executeRaw`DELETE FROM measurement;`;

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

    it('should return 200 on success create a measure', async () => {

        await request(app)
            .post('/api/measure/create')
            .set('x-access-token', adminToken)
            .send({
                name: 'any_name',
            })
            .expect(200);
    });
});

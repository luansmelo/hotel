import request from 'supertest';
import app from '../../config/app';
import { noCacheMiddleware } from './NoCache';

describe('No Cache Middleware', () => {
    it('should disable cache', async () => {
        app.get('/test_no_cache', noCacheMiddleware, (req, res) => {
            res.send();
        });
        await request(app)
            .get('/test_no_cache')
            .expect('cache-control', 'no-store, no-cache, must-revalidate, proxy-revalidate')
            .expect('pragma', 'no-cache')
            .expect('expires', '0')
            .expect('surrogate-control', 'no-store');
    });

});
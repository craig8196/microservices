import request from 'supertest';

import { app } from '../../app';
import { signin } from '../../test/auth';


it('signs out of your account by clearing the cookie', async () => {
  const cookie = await signin();

  const response = await request(app)
    .post('/api/users/signout')
    .set('Cookie', cookie)
    .send({
      email: 'test@test.com',
      password: 'password'
    })
    .expect(200);

  expect(response.get('Set-Cookie')[0]).toEqual('express:sess=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; httponly');
});

